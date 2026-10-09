// Onglet « Plateformes » : où chercher, quoi remplir, quelles alertes créer.
// Dépôt public : aucune donnée personnelle ici. Liens vérifiés le 09/10/2026 (réponse 200 ou redirection) ;
// quand la page carrières refuse les robots, on pointe la page d'accueil du site.

export type Link = { label: string; url: string };

export type Platform = {
  name: string;
  stars: 1 | 2 | 3;
  links: Link[];
  why: string;
  fill: string;
  alerts: string;
};

export const PLATFORMS: Platform[] = [
  {
    name: "Dogfinance",
    stars: 3,
    links: [{ label: "dogfinance.com", url: "https://dogfinance.com/" }],
    why: "Site spécialisé banque, finance et assurance : beaucoup d'offres d'alternance des grands groupes.",
    fill: "Profil complet avec le titre et l'accroche ci-dessous, CV en PDF.",
    alerts: "« alternance » + Lyon / Auvergne-Rhône-Alpes.",
  },
  {
    name: "Sites carrières des banques et assureurs",
    stars: 3,
    links: [
      { label: "Crédit Agricole", url: "https://groupecreditagricole.jobs/fr/" },
      { label: "BPCE (Caisse d'Épargne, Banque Populaire)", url: "https://recrutement.bpce.fr/" },
      { label: "Crédit Mutuel", url: "https://recrutement.creditmutuel.fr/" },
      { label: "CIC", url: "https://www.cic.fr/" },
      { label: "AXA", url: "https://www.axa.fr/" },
      { label: "Allianz", url: "https://careers.allianz.com/" },
      { label: "Generali", url: "https://www.generali.fr/" },
      { label: "Covéa (MMA, MAAF, GMF)", url: "https://www.covea.com/" },
      { label: "Groupama", url: "https://www.groupama-gan-recrute.com/" },
    ],
    why: "Les grands groupes publient d'abord chez eux, avant les sites d'emploi.",
    fill: "Un compte par site, le même CV et le même profil partout.",
    alerts:
      "Une alerte par site, « alternance » + Lyon : Crédit Agricole Centre-Est, Caisse d'Épargne Rhône Alpes, Banque Populaire AURA, Crédit Mutuel / CIC Lyonnaise de Banque, AXA, Allianz, Generali, Covéa, Groupama.",
  },
  {
    name: "La bonne alternance",
    stars: 3,
    links: [{ label: "labonnealternance.apprentissage.beta.gouv.fr", url: "https://labonnealternance.apprentissage.beta.gouv.fr/" }],
    why: "Portail officiel de l'État : des offres, et surtout les entreprises qui recrutent souvent des alternants même sans offre publiée.",
    fill: "Recherche par métier et par ville ; garder la lettre type pour les candidatures spontanées.",
    alerts: "Banque et assurance autour de Lyon : candidature spontanée aux entreprises qui recrutent souvent.",
  },
  {
    name: "LinkedIn",
    stars: 3,
    links: [{ label: "linkedin.com/jobs", url: "https://www.linkedin.com/jobs/" }],
    why: "Les recruteurs banque et assurance y sont présents.",
    fill: "Profil complet (titre, accroche, expériences), statut « Open to work » visible des recruteurs uniquement, suivre les pages des banques et assureurs.",
    alerts: "« alternance » à Lyon, et la requête avancée ci-dessous.",
  },
  {
    name: "Welcome to the Jungle",
    stars: 2,
    links: [{ label: "welcometothejungle.com", url: "https://www.welcometothejungle.com/fr" }],
    why: "Fintechs, courtiers et cabinets de conseil.",
    fill: "Profil et CV en PDF.",
    alerts: "« alternance » + banque / assurance / fintech à Lyon.",
  },
  {
    name: "Indeed et HelloWork",
    stars: 2,
    links: [
      { label: "Indeed", url: "https://fr.indeed.com/" },
      { label: "HelloWork", url: "https://www.hellowork.com/fr-fr/" },
    ],
    why: "Gros volume, mais beaucoup de doublons et d'annonces d'écoles : trier.",
    fill: "CV en PDF.",
    alerts: "Les mots-clés ci-dessous, à Lyon ; écarter les annonces publiées par des écoles.",
  },
  {
    name: "France Travail",
    stars: 1,
    links: [{ label: "Offres France Travail", url: "https://candidat.francetravail.fr/offres/recherche" }],
    why: "Peu d'offres banque, mais certaines n'existent que là.",
    fill: "Profil et CV en PDF.",
    alerts: "« alternance banque » et « alternance assurance » à Lyon.",
  },
  {
    name: "Plateforme emploi de l'ISG",
    stars: 2,
    links: [
      { label: "ISG", url: "https://www.isg.fr/" },
      { label: "JobTeaser", url: "https://www.jobteaser.com/fr" },
    ],
    why: "Les entreprises qui y publient connaissent l'école.",
    fill: "Vérifier quelle plateforme l'école utilise (JobTeaser ou autre), puis compléter le profil.",
    alerts: "Alternance banque et assurance, campus de Lyon.",
  },
];

// « Ce que tu remplis partout » : repris du profil de l'app (lib/profile.ts), rien d'ajouté.
export const PROFILE_KIT = {
  title: "Alternant chargé de projet — Banque & Assurance | MSc Management & gestion de projets (ISG)",
  availability:
    "Alternance de 12 mois, démarrage dès que possible (octobre 2026), rythme selon le calendrier ISG (4 jours en entreprise, 1 jour de cours), basé à Lyon.",
  pitch:
    "Étudiant en double diplôme ESME (ingénieur Big Data) et ISG Lyon (MSc Management & gestion de projet), je cherche une alternance dans la banque ou l'assurance. Deux stages en agence MMA m'ont fait travailler l'accueil client, les sinistres, les contrats et les devis, et l'accompagnement des conseillers en rendez-vous. J'ai aussi cofondé RISE, une plateforme étudiante dont j'ai piloté l'équipe de 4.",
  skills: [
    "Gestion de projet",
    "Relation client (accueil, rendez-vous)",
    "Produits d'assurance : sinistres, contrats, devis",
    "Analyse de données",
    "Automatisation et IA générative",
    "Anglais bilingue",
  ],
  documents: ["CV en PDF à jour", "Lettre type (onglet « Profil & fiche »)"],
};

export const KEYWORDS = [
  "alternance chargé de clientèle banque",
  "alternance conseiller bancaire",
  "alternance conseiller clientèle assurance",
  "alternance gestionnaire sinistres",
  "alternance assistant souscripteur",
  "alternance chargé de projet banque",
  "alternance chargé de projet assurance",
  "alternance assistant chef de projet",
  "alternance PMO banque",
  "alternance contrôle interne banque",
  "apprentissage banque Lyon",
  "apprentissage assurance Lyon",
];

export const LINKEDIN_QUERY = '("alternance" OR "apprentissage") AND ("banque" OR "assurance") AND ("projet" OR "PMO" OR "clientèle")';

export const ROUTINE = [
  "Ouvrir les alertes du jour (10 min).",
  "Coller chaque annonce intéressante dans « Analyser une offre ».",
  "Si le score est bon : copier le prompt pour Claude, envoyer la candidature, puis l'ajouter dans « Mes offres ».",
];
