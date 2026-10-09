// Prompt à coller dans Claude (claude.ai). L'app analyse l'annonce avec un
// petit modèle par API ; ce prompt-ci sert à obtenir mieux, dans l'abonnement
// Claude de Mathis, sans coût d'API. Il demande du texte lisible, pas du JSON :
// personne ne lit du JSON dans une fenêtre de conversation.
import type { Analysis } from "./types";

export type PromptOffer = { title: string; company: string; url?: string; text: string };

// Un bloc n'apparaît que s'il porte quelque chose : une section vide fait croire
// au modèle qu'il manque une information, et il l'invente.
const section = (title: string, body: string) => (body.trim() ? `${title}\n${body.trim()}` : "");

const list = (label: string, items: readonly string[] | undefined) =>
  items?.length ? `${label} : ${items.join(" · ")}` : "";

function analysisBlock(analysis?: Analysis): string {
  if (!analysis) return "";
  const lines = [
    `Score d'adéquation estimé : ${analysis.score}/10`,
    analysis.verdict?.trim() ? `Premier avis : ${analysis.verdict.trim()}` : "",
    list("Points forts repérés", analysis.strengths),
    list("Manques repérés", analysis.gaps),
    list("Mots-clés de l'annonce", analysis.keywords),
    list("Points de vigilance", analysis.redFlags),
  ].filter(Boolean);
  return section(
    "ANALYSE DÉJÀ FAITE PAR UN PREMIER OUTIL (à vérifier, pas à reprendre telle quelle)",
    lines.join("\n"),
  );
}

export function buildClaudePrompt(input: {
  profile: string;
  letter: string;
  offer: PromptOffer;
  analysis?: Analysis;
}): string {
  const { profile, letter, offer, analysis } = input;
  const who = [offer.company.trim() || "entreprise non précisée", offer.title.trim() || "intitulé non précisé"].join(
    " — ",
  );

  return [
    `Tu m'aides à préparer une candidature en alternance. Réponds en français, en texte structuré avec des titres — pas de JSON, pas de tableau.`,
    section("MON PROFIL", profile),
    section("MA LETTRE TYPE (ma voix : garde-la, adapte-la)", letter),
    section(`L'ANNONCE (${who})${offer.url?.trim() ? `\nLien : ${offer.url.trim()}` : ""}`, offer.text),
    analysisBlock(analysis),
    `CE QUE JE TE DEMANDE, DANS CET ORDRE :

1. UN AVIS FRANC. Est-ce que je candidate, oui ou non, et pourquoi ? Dis-le en premier, en une phrase tranchée, puis trois à cinq lignes qui l'expliquent. Si l'annonce ne colle pas — lieu, rythme, dates, niveau, métier —, dis-le clairement plutôt que de me ménager. Un « non » argumenté m'est plus utile qu'un « oui » tiède.

2. UNE LETTRE DE MOTIVATION de 250 à 350 mots, adaptée à cette annonce et à cette entreprise. Reprends deux ou trois formulations de l'annonce, garde mes faits réels, ouvre par « Madame, Monsieur, » sauf si un nom de recruteur figure dans l'annonce.

3. UN E-MAIL DE CANDIDATURE court : 120 à 170 mots, « Bonjour, » puis une accroche liée à l'annonce, une preuve prise dans mon profil, mon rythme d'alternance, une demande d'échange, et ma signature.

4. UNE NOTE LINKEDIN pour le recruteur, moins de 300 caractères, signature comprise. Compte-les et donne le nombre entre parenthèses à la fin.

5. TROIS QUESTIONS PROBABLES EN ENTRETIEN pour ce poste, chacune suivie d'une piste de réponse tirée de mon profil — pas une réponse générique, une réponse qui s'appuie sur ce que j'ai vraiment fait.

RÈGLES, elles comptent autant que le reste :
- N'invente rien qui ne soit pas dans mon profil : ni expérience, ni chiffre, ni outil, ni diplôme. Si une information te manque, écris [à compléter] et continue.
- Pas de superlatifs invérifiables (« expertise reconnue », « passionné depuis toujours », « leader »). Un fait vaut mieux qu'un adjectif.
- Vouvoiement dans la lettre, l'e-mail et la note.
- Ton sobre : des phrases simples, aucune flatterie de l'entreprise, aucune formule creuse.
- Si deux de mes expériences disent la même chose, n'en garde qu'une.`,
  ]
    .filter((block) => block.trim() !== "")
    .join("\n\n");
}
