// Trois cas de test du bonus de cible (Cowork #52). Lancement : npm test (Node ≥ 23, types retirés nativement).
// Même score de départ pour les trois : on vérifie que seul le bonus départage, et qu'il ne pénalise personne.
import assert from "node:assert/strict";
import { withTargetBonus } from "../lib/score.ts";

const BASE = 6;
const cases = [
  { name: "Ingénieur d'affaires", title: "Alternance Ingénieur d'affaires H/F — Lyon", text: "Au sein de l'agence lyonnaise, vous développez un portefeuille de clients industriels, préparez les offres techniques et suivez les affaires." },
  { name: "Assurance", title: "Alternance Conseiller clientèle assurance", text: "Accueil des assurés, gestion des contrats et des sinistres, devis auto et habitation en agence à Lyon." },
  { name: "Hors cible", title: "Alternance Assistant logistique entrepôt", text: "Réception des marchandises, préparation des commandes et suivi des stocks sur notre plateforme." },
];

const results = cases.map((c) => ({ name: c.name, ...withTargetBonus(BASE, c) }));
for (const r of results) console.log(`${r.name.padEnd(22)} cible=${r.target.padEnd(8)} bonus=+${r.bonus}  score ${BASE} → ${r.score}`);

const [business, insurance, other] = results;
assert.equal(business.target, "business");
assert.equal(insurance.target, "finance");
assert.equal(other.target, "other");
assert.ok(business.score > insurance.score, "l'ingénieur d'affaires passe devant");
assert.equal(insurance.score, BASE, "l'assurance n'est pas pénalisée");
assert.ok(insurance.score >= other.score, "le hors-cible ne passe pas devant");
assert.equal(withTargetBonus(9, cases[0]).score, 10, "plafond à 10");
assert.equal(withTargetBonus(5, { title: "Alternance commerciale", text: "Poste de business developer junior" }).bonus, 1, "+1 si seulement dans le texte");
console.log("OK : ingénieur d'affaires > assurance ≥ hors cible");
