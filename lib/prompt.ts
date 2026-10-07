// Consigne envoyée au modèle pour analyser une offre face au profil.
export function buildPrompt(profile: string, offer: { title: string; company: string; text: string }) {
  return `Tu aides un candidat à décrocher une alternance. Réponds uniquement en JSON valide, en français.

PROFIL DU CANDIDAT :
${profile}

OFFRE (${offer.company || "entreprise non précisée"} — ${offer.title || "intitulé non précisé"}) :
${offer.text.slice(0, 12000)}

Rends exactement cet objet JSON :
{
  "score": nombre entier de 0 à 10 (adéquation réelle profil/offre ; 10 = parfait),
  "verdict": "une phrase : postuler ou non, et pourquoi",
  "strengths": ["3 à 5 éléments du profil à mettre en avant pour CETTE offre"],
  "gaps": ["écarts entre le profil et l'offre, et comment les compenser"],
  "keywords": ["5 à 8 mots-clés de l'offre à reprendre dans le CV et le message"],
  "redFlags": ["incompatibilités : lieu hors Lyon, durée, rythme, niveau, date de début ; liste vide si aucune"],
  "coverEmail": "e-mail de candidature de 120 à 170 mots : 'Bonjour,' puis une accroche liée à l'offre, la preuve MMA, le rythme d'alternance, une demande d'échange, signature 'Mathis Levrot'. Pas de formule creuse.",
  "linkedinNote": "note de connexion LinkedIn de 280 caractères maximum, adressée au recruteur",
  "questions": ["3 questions pertinentes à poser en entretien"]
}
Règles : n'invente aucune expérience absente du profil ; si une information manque, écris [à compléter].`;
}
