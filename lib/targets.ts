import type { Company } from "./types";

// Liste de départ : agences d'assurance et entreprises banque-assurance à Lyon (implantations à vérifier avant d'écrire).
export const DEFAULT_COMPANIES: Company[] = [
 {
  "id": "mma-agences",
  "name": "Agences MMA de la région lyonnaise",
  "category": "Agence d'assurance",
  "location": "Agents généraux MMA, Lyon et alentours",
  "angle": "Candidature déjà transmise par l'inspectrice MMA sur recommandation de son ancien maître de stage : relancer et demander quelles agences sont intéressées",
  "links": [
   {
    "label": "Trouver une agence MMA près de Lyon",
    "url": "https://agence.mma.fr/"
   }
  ],
  "priority": true,
  "status": "sent",
  "sentAt": "2026-10-06T10:11:00.000Z",
  "note": "Candidature envoyée le 06/10 à l'inspectrice MMA (recommandation de l'agent général du stage). Relancer à J+7.",
  "action": "Trouver une agence"
 },
 {
  "id": "axa-agences",
  "name": "Agences AXA (agents généraux)",
  "category": "Agence d'assurance",
  "location": "Lyon et métropole",
  "angle": "Petites structures (moins de 250 salariés : aide de 2 000 €), profil collaborateur + digital recherché",
  "links": [
   {
    "label": "Trouver un agent AXA près de Lyon",
    "url": "https://agence.axa.fr/"
   }
  ],
  "priority": true,
  "status": "todo",
  "note": "",
  "action": "Trouver une agence"
 },
 {
  "id": "allianz-agences",
  "name": "Agences Allianz (agents généraux)",
  "category": "Agence d'assurance",
  "location": "Lyon et métropole",
  "angle": "Candidature directe à l'agent général, décision rapide",
  "links": [
   {
    "label": "Trouver un agent Allianz près de Lyon",
    "url": "https://agences.allianz.fr/"
   }
  ],
  "priority": false,
  "status": "todo",
  "note": "",
  "action": "Trouver une agence"
 },
 {
  "id": "generali-agences",
  "name": "Agences Generali (agents généraux)",
  "category": "Agence d'assurance",
  "location": "Lyon et métropole",
  "angle": "Agences indépendantes : l'agent signe lui-même le contrat",
  "links": [
   {
    "label": "Trouver un agent Generali près de Lyon",
    "url": "https://agences.generali.fr/fr"
   }
  ],
  "priority": false,
  "status": "todo",
  "note": "",
  "action": "Trouver une agence"
 },
 {
  "id": "gan-agences",
  "name": "Agences GAN Assurances",
  "category": "Agence d'assurance",
  "location": "Lyon et métropole",
  "angle": "Réseau d'agents généraux du groupe Groupama",
  "links": [
   {
    "label": "Gan Assurances — trouver une agence",
    "url": "https://www.gan.fr/"
   }
  ],
  "priority": false,
  "status": "todo",
  "note": "",
  "action": "Trouver une agence"
 },
 {
  "id": "cace",
  "name": "Crédit Agricole Centre-Est",
  "category": "Banque",
  "location": "Siège à Champagne-au-Mont-d'Or (métropole de Lyon)",
  "angle": "Siège régional : projets de transformation, data, risques, organisation",
  "links": [
   {
    "label": "Offres alternance Crédit Agricole · Lyon",
    "url": "https://groupecreditagricole.jobs/fr/nos-offres/?contrat=alternance&localisation=Lyon"
   }
  ],
  "priority": true,
  "status": "todo",
  "note": "",
  "action": "Postuler en ligne"
 },
 {
  "id": "lcl",
  "name": "LCL",
  "category": "Banque",
  "location": "Direction régionale à Lyon",
  "angle": "Filiale Crédit Agricole : candidatures via le même portail",
  "links": [
   {
    "label": "Offres du groupe Crédit Agricole (LCL)",
    "url": "https://groupecreditagricole.jobs/fr/nos-offres/"
   }
  ],
  "priority": false,
  "status": "todo",
  "note": "",
  "action": "Postuler en ligne"
 },
 {
  "id": "cera",
  "name": "Caisse d'Epargne Rhône Alpes",
  "category": "Banque",
  "location": "Siège à Lyon (Part-Dieu)",
  "angle": "Siège régional BPCE : nombreuses fonctions support et projets",
  "links": [
   {
    "label": "Offres BPCE filtrées alternance",
    "url": "https://recrutement.bpce.fr/nos-offres?contrat=Alternance"
   }
  ],
  "priority": true,
  "status": "todo",
  "note": "",
  "action": "Postuler en ligne"
 },
 {
  "id": "bpaura",
  "name": "Banque Populaire Auvergne Rhône Alpes",
  "category": "Banque",
  "location": "Siège à Lyon",
  "angle": "Siège régional BPCE : candidature spontanée possible via La bonne alternance",
  "links": [
   {
    "label": "Offres BPCE filtrées alternance",
    "url": "https://recrutement.bpce.fr/nos-offres?contrat=Alternance"
   }
  ],
  "priority": true,
  "status": "todo",
  "note": "",
  "action": "Postuler en ligne"
 },
 {
  "id": "cic",
  "name": "CIC Lyonnaise de Banque",
  "category": "Banque",
  "location": "Siège à Lyon (presqu'île)",
  "angle": "Recrute des alternants bac+5 (conformité, chargé d'affaires) à Lyon",
  "links": [
   {
    "label": "Recrutement Crédit Mutuel / CIC",
    "url": "https://recrutement.creditmutuel.fr/fr/index.html"
   }
  ],
  "priority": true,
  "status": "todo",
  "note": "",
  "action": "Postuler en ligne"
 },
 {
  "id": "cmse",
  "name": "Crédit Mutuel du Sud-Est",
  "category": "Banque",
  "location": "Fédération régionale à Lyon",
  "angle": "Même portail que le CIC : viser les fonctions siège",
  "links": [
   {
    "label": "Recrutement Crédit Mutuel Sud-Est",
    "url": "https://recrutement.creditmutuel.fr/fr/index.html"
   }
  ],
  "priority": false,
  "status": "todo",
  "note": "",
  "action": "Postuler en ligne"
 },
 {
  "id": "bnp",
  "name": "BNP Paribas",
  "category": "Banque",
  "location": "Direction régionale et plateformes à Lyon",
  "angle": "Grand groupe : beaucoup d'offres alternance projet / PMO",
  "links": [
   {
    "label": "Offres BNP Paribas",
    "url": "https://group.bnpparibas/emploi-carriere/nos-offres"
   }
  ],
  "priority": true,
  "status": "todo",
  "note": "",
  "action": "Postuler en ligne"
 },
 {
  "id": "sg",
  "name": "Société Générale",
  "category": "Banque",
  "location": "Direction régionale à Lyon",
  "angle": "Grand groupe : offres alternance projet, conformité, data",
  "links": [
   {
    "label": "Carrières Société Générale",
    "url": "https://careers.societegenerale.com/"
   }
  ],
  "priority": true,
  "status": "todo",
  "note": "",
  "action": "Postuler en ligne"
 },
 {
  "id": "lbp",
  "name": "La Banque Postale",
  "category": "Banque",
  "location": "Implantations régionales à Lyon",
  "angle": "Bancassureur : projets réglementaires et digitaux",
  "links": [
   {
    "label": "Alternances La Banque Postale · Lyon (LinkedIn)",
    "url": "https://www.linkedin.com/jobs/search/?keywords=alternance%20La%20Banque%20Postale&location=Lyon%2C%20Auvergne-Rh%C3%B4ne-Alpes%2C%20France"
   }
  ],
  "priority": false,
  "status": "todo",
  "note": "",
  "action": "Postuler en ligne"
 },
 {
  "id": "bpi",
  "name": "Bpifrance",
  "category": "Banque publique",
  "location": "Direction régionale à Lyon",
  "angle": "Recrute plusieurs centaines d'alternants par an en France",
  "links": [
   {
    "label": "Offres Bpifrance",
    "url": "https://www.welcometothejungle.com/fr/companies/bpifrance/jobs"
   }
  ],
  "priority": false,
  "status": "todo",
  "note": "",
  "action": "Postuler en ligne"
 },
 {
  "id": "bdf",
  "name": "Banque de France",
  "category": "Banque publique",
  "location": "Succursale régionale à Lyon",
  "angle": "Profil ingénieur + gestion de projet apprécié (risques, data)",
  "links": [
   {
    "label": "Nous rejoindre — Banque de France",
    "url": "https://www.banque-france.fr/fr/nous-rejoindre"
   }
  ],
  "priority": false,
  "status": "todo",
  "note": "",
  "action": "Postuler en ligne"
 },
 {
  "id": "april",
  "name": "APRIL",
  "category": "Assurance",
  "location": "Siège du groupe à Lyon",
  "angle": "Assureur-courtier lyonnais : IT, data, projets, relation client",
  "links": [
   {
    "label": "Alternances April (La Bonne Alternance)",
    "url": "https://labonnealternance.apprentissage.beta.gouv.fr/emploi/recruteurs_lba/33839943900151/april-entreprise"
   }
  ],
  "priority": true,
  "status": "todo",
  "note": "",
  "action": "Candidature spontanée"
 },
 {
  "id": "apicil",
  "name": "APICIL",
  "category": "Assurance",
  "location": "Siège à Caluire-et-Cuire",
  "angle": "Groupe de protection sociale lyonnais : épargne, santé, retraite",
  "links": [
   {
    "label": "Carrières Apicil",
    "url": "https://www.apicil.com/groupe/carrieres/"
   }
  ],
  "priority": true,
  "status": "todo",
  "note": "",
  "action": "Postuler en ligne"
 },
 {
  "id": "groupama",
  "name": "Groupama Rhône-Alpes Auvergne",
  "category": "Assurance",
  "location": "Siège régional à Lyon",
  "angle": "Caisse régionale : siège avec fonctions projet et pilotage",
  "links": [
   {
    "label": "Offres Groupama / Gan",
    "url": "https://www.groupama-gan-recrute.com/nos-offres/"
   }
  ],
  "priority": true,
  "status": "todo",
  "note": "",
  "action": "Postuler en ligne"
 },
 {
  "id": "covea",
  "name": "Covéa (MMA, MAAF, GMF)",
  "category": "Assurance",
  "location": "Agences et sites en région lyonnaise",
  "angle": "Son terrain : 3 stages chez MMA, à activer par ses tuteurs",
  "links": [
   {
    "label": "Covéa recrute (MMA, MAAF, GMF)",
    "url": "https://www.covea.com/fr/covea-recrute"
   }
  ],
  "priority": true,
  "status": "todo",
  "note": "",
  "action": "Postuler en ligne"
 },
 {
  "id": "axa",
  "name": "AXA France",
  "category": "Assurance",
  "location": "Direction régionale à Lyon",
  "angle": "Grand groupe : alternance projet, actuariat, data",
  "links": [
   {
    "label": "Offres AXA France",
    "url": "https://recrutement.axa.fr/nos-offres"
   }
  ],
  "priority": true,
  "status": "todo",
  "note": "",
  "action": "Postuler en ligne"
 },
 {
  "id": "allianz",
  "name": "Allianz France",
  "category": "Assurance",
  "location": "Implantation régionale à Lyon",
  "angle": "Grand groupe : projets, souscription, pilotage",
  "links": [
   {
    "label": "Carrières Allianz",
    "url": "https://careers.allianz.com/global/en"
   }
  ],
  "priority": false,
  "status": "todo",
  "note": "",
  "action": "Postuler en ligne"
 },
 {
  "id": "generali",
  "name": "Generali France",
  "category": "Assurance",
  "location": "Implantation régionale à Lyon",
  "angle": "Publie ses offres sur Engagement Jeunes et JobTeaser",
  "links": [
   {
    "label": "Nous rejoindre — Generali France",
    "url": "https://www.generali.fr/institutionnel/nous-rejoindre/"
   }
  ],
  "priority": false,
  "status": "todo",
  "note": "",
  "action": "Postuler en ligne"
 },
 {
  "id": "ag2r",
  "name": "AG2R La Mondiale",
  "category": "Assurance",
  "location": "Implantations à Lyon",
  "angle": "Plus de 300 alternants recrutés par an",
  "links": [
   {
    "label": "Offres en alternance AG2R La Mondiale",
    "url": "https://www.ag2rlamondiale.fr/recrutement/nos-offres-en-alternance"
   }
  ],
  "priority": true,
  "status": "todo",
  "note": "",
  "action": "Postuler en ligne"
 },
 {
  "id": "malakoff",
  "name": "Malakoff Humanis",
  "category": "Assurance",
  "location": "Implantations à Lyon",
  "angle": "Protection sociale : projets de transformation",
  "links": [
   {
    "label": "Malakoff Humanis",
    "url": "https://www.malakoffhumanis.com/"
   }
  ],
  "priority": false,
  "status": "todo",
  "note": "",
  "action": "Candidature spontanée"
 },
 {
  "id": "macif",
  "name": "MACIF",
  "category": "Assurance",
  "location": "Implantation régionale",
  "angle": "Mutuelle : projets et relation sociétaires",
  "links": [
   {
    "label": "Recrutement Macif",
    "url": "https://www.macif.fr/assurance/particuliers/a-propos/recrutement"
   }
  ],
  "priority": false,
  "status": "todo",
  "note": "",
  "action": "Postuler en ligne"
 },
 {
  "id": "harmonie",
  "name": "Harmonie Mutuelle",
  "category": "Assurance",
  "location": "Implantations à Lyon",
  "angle": "Mutuelle santé : pilotage, data, projets",
  "links": [
   {
    "label": "Annonces Harmonie Mutuelle",
    "url": "https://recrutement.harmonie-mutuelle.fr/fr/annonces"
   }
  ],
  "priority": false,
  "status": "todo",
  "note": "",
  "action": "Postuler en ligne"
 },
 {
  "id": "swisslife",
  "name": "Swiss Life France",
  "category": "Assurance",
  "location": "Implantation à Lyon",
  "angle": "Assurance vie et patrimoine",
  "links": [
   {
    "label": "Nous rejoindre — Swiss Life",
    "url": "https://www.swisslife.fr/Swisslife-et-moi/Nous-rejoindre"
   }
  ],
  "priority": false,
  "status": "todo",
  "note": "",
  "action": "Postuler en ligne"
 },
 {
  "id": "alptis",
  "name": "Alptis",
  "category": "Assurance",
  "location": "Siège à Lyon",
  "angle": "Acteur lyonnais santé-prévoyance, taille humaine",
  "links": [
   {
    "label": "Alptis (Lyon)",
    "url": "https://www.alptis.org/"
   }
  ],
  "priority": false,
  "status": "todo",
  "note": "",
  "action": "Candidature spontanée"
 },
 {
  "id": "wtw",
  "name": "WTW (Gras Savoye)",
  "category": "Courtier",
  "location": "Bureau à Lyon",
  "angle": "Courtage entreprises : gestion de projets clients",
  "links": [
   {
    "label": "Carrières WTW",
    "url": "https://careers.wtwco.com/"
   }
  ],
  "priority": false,
  "status": "todo",
  "note": "",
  "action": "Postuler en ligne"
 },
 {
  "id": "marsh",
  "name": "Marsh",
  "category": "Courtier",
  "location": "Bureau à Lyon",
  "angle": "Courtage entreprises et risques",
  "links": [
   {
    "label": "Carrières Marsh",
    "url": "https://careers.marsh.com/global/en"
   }
  ],
  "priority": false,
  "status": "todo",
  "note": "",
  "action": "Postuler en ligne"
 },
 {
  "id": "diot",
  "name": "Diot-Siaci",
  "category": "Courtier",
  "location": "Bureau à Lyon",
  "angle": "Courtage : projets et outils de gestion",
  "links": [
   {
    "label": "Carrières Diot-Siaci",
    "url": "https://diot-siaci.com/fr/carrieres/"
   }
  ],
  "priority": false,
  "status": "todo",
  "note": "",
  "action": "Postuler en ligne"
 },
 {
  "id": "verspieren",
  "name": "Verspieren",
  "category": "Courtier",
  "location": "Bureau à Lyon",
  "angle": "Courtier familial, fonctions projet",
  "links": [
   {
    "label": "Nous rejoindre — Verspieren",
    "url": "https://www.verspieren.com/fr/nous-rejoindre/"
   }
  ],
  "priority": false,
  "status": "todo",
  "note": "",
  "action": "Postuler en ligne"
 },
 {
  "id": "aon",
  "name": "Aon",
  "category": "Courtier",
  "location": "Bureau à Lyon",
  "angle": "Courtage et conseil en risques",
  "links": [
   {
    "label": "Offres Aon",
    "url": "https://jobs.aon.com/"
   }
  ],
  "priority": false,
  "status": "todo",
  "note": "",
  "action": "Postuler en ligne"
 },
 {
  "id": "wavestone",
  "name": "Wavestone",
  "category": "Conseil banque-assurance",
  "location": "Bureau à Lyon",
  "angle": "Cabinet de conseil : missions banque-assurance, profil projet idéal",
  "links": [
   {
    "label": "Offres Wavestone",
    "url": "https://www.wavestone.com/fr/carrieres/nos-offres/"
   }
  ],
  "priority": false,
  "status": "todo",
  "note": "",
  "action": "Postuler en ligne"
 },
 {
  "id": "sopra",
  "name": "Sopra Steria",
  "category": "Conseil banque-assurance",
  "location": "Gros site à Lyon",
  "angle": "Projets IT pour banques et assureurs (MOA, PMO)",
  "links": [
   {
    "label": "Offres Sopra Steria",
    "url": "https://www.soprasteria.fr/carriere/nos-offres-d-emploi"
   }
  ],
  "priority": false,
  "status": "todo",
  "note": "",
  "action": "Postuler en ligne"
 },
 {
  "id": "capgemini",
  "name": "Capgemini",
  "category": "Conseil banque-assurance",
  "location": "Gros site à Lyon",
  "angle": "Services financiers : PMO, data, transformation",
  "links": [
   {
    "label": "Offres Capgemini",
    "url": "https://www.capgemini.com/fr-fr/carrieres/rejoignez-nous/nos-offres-demploi/"
   }
  ],
  "priority": false,
  "status": "todo",
  "note": "",
  "action": "Postuler en ligne"
 },
 {
  "id": "cgi",
  "name": "CGI",
  "category": "Conseil banque-assurance",
  "location": "Site à Lyon",
  "angle": "Projets bancaires et assurance",
  "links": [
   {
    "label": "CGI France — carrières",
    "url": "https://www.cgi.com/france/fr-fr"
   }
  ],
  "priority": false,
  "status": "todo",
  "note": "",
  "action": "Postuler en ligne"
 },
 {
  "id": "indy",
  "name": "Indy",
  "category": "Fintech",
  "location": "Siège à Lyon",
  "angle": "Fintech lyonnaise (comptabilité des indépendants)",
  "links": [
   {
    "label": "Indy (Lyon) — recrutement",
    "url": "https://www.welcometothejungle.com/fr/companies/indy"
   }
  ],
  "priority": false,
  "status": "todo",
  "note": "",
  "action": "Candidature spontanée"
 },
 {
  "id": "cegid",
  "name": "Cegid",
  "category": "Fintech",
  "location": "Siège à Lyon",
  "angle": "Éditeur de logiciels de gestion et finance",
  "links": [
   {
    "label": "Alternances Cegid · Lyon (LinkedIn)",
    "url": "https://www.linkedin.com/jobs/search/?keywords=alternance%20Cegid&location=Lyon%2C%20Auvergne-Rh%C3%B4ne-Alpes%2C%20France"
   }
  ],
  "priority": false,
  "status": "todo",
  "note": "",
  "action": "Postuler en ligne"
 }
];
