export type Status = "todo" | "sent" | "relance" | "interview" | "offer" | "no";

export const STATUSES: { id: Status; label: string }[] = [
  { id: "todo", label: "À contacter" },
  { id: "sent", label: "Candidature envoyée" },
  { id: "relance", label: "Relancée" },
  { id: "interview", label: "Entretien" },
  { id: "offer", label: "Proposition" },
  { id: "no", label: "Refus" },
];

/** Ce qu'on fait concrètement chez cette entreprise, et donc quel lien suivre. */
export type CompanyAction = "Postuler en ligne" | "Candidature spontanée" | "Trouver une agence";

export type Company = {
  id: string;
  name: string;
  category: string;
  location: string;
  angle: string;
  links: { label: string; url: string }[];
  /** Absent sur les entreprises ajoutées à la main avant ce champ. */
  action?: CompanyAction;
  priority: boolean;
  status: Status;
  note: string;
  sentAt?: string; // ISO date de la candidature, sert aux relances
  custom?: boolean;
};

export type Analysis = {
  score: number; // 0 à 10
  verdict: string;
  strengths: string[];
  gaps: string[];
  keywords: string[];
  redFlags: string[];
  coverEmail: string;
  coverLetter: string;
  linkedinNote: string;
  questions: string[];
};

/**
 * Une analyse telle que Mathis la retrouve : les champs saisis ET le resultat.
 * Sans les champs, reouvrir une analyse ne redonnerait ni le texte de
 * l annonce ni le prompt a copier — donc rien d exploitable.
 */
export type SavedAnalysis = {
  id: string;
  createdAt: string;
  offer: { company: string; title: string; url: string; text: string };
  analysis: Analysis;
};

export type Offer = {
  id: string;
  title: string;
  company: string;
  url: string;
  text: string;
  createdAt: string;
  status: Status;
  sentAt?: string;
  analysis?: Analysis;
};

export type AppData = {
  profile: string;
  letter: string;
  /** Noms des plateformes où l'inscription est faite (étape 1). */
  signups?: string[];
  companies: Company[];
  offers: Offer[];
  /** Les 50 analyses les plus recentes, la derniere en tete. */
  analyses?: SavedAnalysis[];
};
