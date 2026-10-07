// Consigne envoyée au modèle pour analyser une offre face au profil.
export function buildPrompt(profile: string, letter: string, offer: { title: string; company: string; text: string }) {
  return `Tu aides un candidat à décrocher une alternance. Réponds uniquement en JSON valide, en français.

PROFIL DU CANDIDAT :
${profile}

LETTRE DE MOTIVATION DE BASE DU CANDIDAT (à adapter, garder sa voix) :
${letter.slice(0, 6000)}

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
  "coverLetter": "la lettre de base adaptée à CETTE offre et à cette entreprise : 250 à 350 mots, reprend 2 ou 3 mots-clés de l'offre, garde les faits réels du candidat, en-tête 'Madame, Monsieur,' sauf si un nom de recruteur figure dans l'offre",
  "linkedinNote": "note de connexion LinkedIn de 280 caractères maximum, adressée au recruteur",
  "questions": ["3 questions pertinentes à poser en entretien"]
}
Règles : n'invente aucune expérience ni aucun chiffre absents du profil ; pas de superlatifs invérifiables (« systématiquement lauréat », « leader ») ; si une information manque, écris [à compléter]. Si le profil contient un numéro de téléphone, ajoute-le sous la signature de l'e-mail.`;
}
