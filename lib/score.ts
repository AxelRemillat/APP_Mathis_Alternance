// Bonus de cible appliqué au score du modèle (Cowork #52) : l'ingénierie d'affaires
// est la cible n°1 de Mathis. Le bonus s'AJOUTE au score d'adéquation, il ne retire
// jamais rien : une offre finance, assurance ou banque garde le score du modèle.
// Code pur, sans import : scripts/test-score.mjs le teste directement avec Node.

export type Target = "business" | "finance" | "other";

const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

const BUSINESS = [
  /ingenieur(e)? d.affaires/, /business develop/, /\bbiz ?dev\b/, /charge(e)? d.affaires/,
  /account manager/, /ingenieur(e)? commercia/, /business manager/,
];
const FINANCE = [/\bbanque\b/, /bancaire/, /assurance/, /assureur/, /\bfinance/, /financier/, /courtage|courtier/, /sinistre/, /patrimon/];

export function targetOf(offer: { title: string; text: string }): { target: Target; inTitle: boolean } {
  const title = norm(offer.title);
  const all = `${title} ${norm(offer.text)}`;
  if (BUSINESS.some((r) => r.test(title))) return { target: "business", inTitle: true };
  if (BUSINESS.some((r) => r.test(all))) return { target: "business", inTitle: false };
  if (FINANCE.some((r) => r.test(all))) return { target: "finance", inTitle: false };
  return { target: "other", inTitle: false };
}

/** +2 si l'intitulé est un poste d'ingénieur d'affaires, +1 s'il n'apparaît que dans le texte. Plafond 10. */
export function withTargetBonus(score: number, offer: { title: string; text: string }) {
  const { target, inTitle } = targetOf(offer);
  const bonus = target === "business" ? (inTitle ? 2 : 1) : 0;
  return { score: Math.min(10, score + bonus), bonus, target };
}
