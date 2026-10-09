// Le parcours : quatre étapes dans l'ordre, et de quoi savoir où on en est.
// Code pur : aucune dépendance React, pour que la progression se teste et se
// lise d'un coup d'œil.
import { PLATFORMS } from "./platforms";
import type { AppData } from "./types";

export type StepId = "signup" | "apply" | "find" | "write";

export interface Step {
  id: StepId;
  /** Libellé numéroté de la navigation. */
  label: string;
  title: string;
  /** Ce qu'on y fait, en une phrase à la deuxième personne. */
  what: string;
}

export const STEPS: readonly Step[] = [
  {
    id: "signup",
    label: "1. S'inscrire",
    title: "S'inscrire sur les plateformes qui comptent",
    what: "Crée tes comptes sur les sites qui publient vraiment des alternances en banque-assurance, et pose tes alertes.",
  },
  {
    id: "apply",
    label: "2. Candidater",
    title: "Candidater aux entreprises ciblées",
    what: "Quarante entreprises lyonnaises, chacune avec son lien d'action et un prompt prêt à coller dans Claude.",
  },
  {
    id: "find",
    label: "3. Trouver des offres",
    title: "Trouver des offres à analyser",
    what: "Les sources secondaires, les mots-clés à chercher et la requête LinkedIn prête à l'emploi.",
  },
  {
    id: "write",
    label: "4. Analyser & rédiger",
    title: "Analyser une offre et rédiger",
    what: "Colle une annonce : l'outil note l'adéquation, et Claude écrit la lettre, l'e-mail et la note LinkedIn.",
  },
];

/** Les plateformes de l'étape 1 : les ★★★ et ★★, celles qui méritent un compte. */
export const SIGNUP_PLATFORMS = PLATFORMS.filter((platform) => platform.stars >= 2);

/** Celles de l'étape 3 : le reste, à consulter sans forcément s'y inscrire. */
export const SEARCH_PLATFORMS = PLATFORMS.filter((platform) => platform.stars < 2);

export interface Progress {
  done: number;
  total: number;
  /** « 3/6 plateformes inscrites ». */
  label: string;
}

const OPEN_STATUSES = ["sent", "relance", "interview", "offer"];

export function progressOf(step: StepId, data: AppData): Progress {
  const signups = data.signups ?? [];
  switch (step) {
    case "signup": {
      const done = SIGNUP_PLATFORMS.filter((platform) => signups.includes(platform.name)).length;
      return { done, total: SIGNUP_PLATFORMS.length, label: `${done}/${SIGNUP_PLATFORMS.length} plateformes inscrites` };
    }
    case "apply": {
      const done = data.companies.filter((company) => company.status !== "todo").length;
      return { done, total: data.companies.length, label: `${done}/${data.companies.length} entreprises contactées` };
    }
    case "find": {
      // Une offre enregistrée prouve qu'on a trouvé où chercher.
      const done = data.offers.length;
      return { done, total: Math.max(5, done), label: `${done} offre${done === 1 ? "" : "s"} repérée${done === 1 ? "" : "s"}` };
    }
    case "write": {
      const done = data.offers.filter((offer) => offer.analysis).length;
      const total = Math.max(data.offers.length, 1);
      return { done, total, label: `${done}/${data.offers.length} offre${data.offers.length === 1 ? "" : "s"} analysée${done === 1 ? "" : "s"}` };
    }
  }
}

/**
 * L'étape en cours : la première qui n'est pas finie. Les plateformes d'abord,
 * parce que sans compte ni alerte on ne voit jamais passer les offres ; et on
 * ne renvoie « 4 » que si tout le reste est entamé.
 */
export function currentStep(data: AppData): Step {
  const unfinished = STEPS.find((step) => {
    const progress = progressOf(step.id, data);
    if (step.id === "signup") return progress.done < progress.total;
    if (step.id === "apply") return progress.done === 0;
    return progress.done === 0;
  });
  return unfinished ?? STEPS[STEPS.length - 1];
}

/** Combien de candidatures restent en attente de réponse — sert au tableau de bord. */
export const openApplications = (data: AppData): number =>
  data.companies.filter((company) => OPEN_STATUSES.includes(company.status)).length +
  data.offers.filter((offer) => OPEN_STATUSES.includes(offer.status)).length;
