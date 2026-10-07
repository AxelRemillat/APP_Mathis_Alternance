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
    "label": "Agences MMA autour de Lyon",
    "url": "https://www.google.com/maps/search/agence+MMA+Lyon"
   }
  ],
  "priority": true,
  "status": "sent",
  "sentAt": "2026-10-06T10:11:00.000Z",
  "note": "Candidature envoyée le 06/10 à l'inspectrice MMA (recommandation de l'agent général du stage). Relancer à J+7."
 },
 {
  "id": "axa-agences",
  "name": "Agences AXA (agents généraux)",
  "category": "Agence d'assurance",
  "location": "Lyon et métropole",
  "angle": "Petites structures (moins de 250 salariés : aide de 2 000 €), profil collaborateur + digital recherché",
  "links": [
   {
    "label": "Agences AXA autour de Lyon",
    "url": "https://www.google.com/maps/search/agence+AXA+Lyon"
   }
  ],
  "priority": true,
  "status": "todo",
  "note": ""
 },
 {
  "id": "allianz-agences",
  "name": "Agences Allianz (agents généraux)",
  "category": "Agence d'assurance",
  "location": "Lyon et métropole",
  "angle": "Candidature directe à l'agent général, décision rapide",
  "links": [
   {
    "label": "Agences Allianz autour de Lyon",
    "url": "https://www.google.com/maps/search/agence+Allianz+Lyon"
   }
  ],
  "priority": false,
  "status": "todo",
  "note": ""
 },
 {
  "id": "generali-agences",
  "name": "Agences Generali (agents généraux)",
  "category": "Agence d'assurance",
  "location": "Lyon et métropole",
  "angle": "Agences indépendantes : l'agent signe lui-même le contrat",
  "links": [
   {
    "label": "Agences Generali autour de Lyon",
    "url": "https://www.google.com/maps/search/agence+Generali+Lyon"
   }
  ],
  "priority": false,
  "status": "todo",
  "note": ""
 },
 {
  "id": "gan-agences",
  "name": "Agences GAN Assurances",
  "category": "Agence d'assurance",
  "location": "Lyon et métropole",
  "angle": "Réseau d'agents généraux du groupe Groupama",
  "links": [
   {
    "label": "Agences GAN autour de Lyon",
    "url": "https://www.google.com/maps/search/agence+GAN+assurances+Lyon"
   }
  ],
  "priority": false,
  "status": "todo",
  "note": ""
 },
 {
  "id": "cace",
  "name": "Crédit Agricole Centre-Est",
  "category": "Banque",
  "location": "Siège à Champagne-au-Mont-d'Or (métropole de Lyon)",
  "angle": "Siège régional : projets de transformation, data, risques, organisation",
  "links": [
   {
    "label": "Site carrières du groupe",
    "url": "https://groupecreditagricole.jobs/fr/"
   },
   {
    "label": "Offres LinkedIn à Lyon",
    "url": "https://www.linkedin.com/jobs/search/?keywords=alternance%20Cr%C3%A9dit%20Agricole%20Centre-Est&location=Lyon%2C%20Auvergne-Rh%C3%B4ne-Alpes%2C%20France"
   }
  ],
  "priority": true,
  "status": "todo",
  "note": ""
 },
 {
  "id": "lcl",
  "name": "LCL",
  "category": "Banque",
  "location": "Direction régionale à Lyon",
  "angle": "Filiale Crédit Agricole : candidatures via le même portail",
  "links": [
   {
    "label": "Site carrières du groupe",
    "url": "https://groupecreditagricole.jobs/fr/"
   },
   {
    "label": "Offres LinkedIn à Lyon",
    "url": "https://www.linkedin.com/jobs/search/?keywords=alternance%20LCL&location=Lyon%2C%20Auvergne-Rh%C3%B4ne-Alpes%2C%20France"
   }
  ],
  "priority": false,
  "status": "todo",
  "note": ""
 },
 {
  "id": "cera",
  "name": "Caisse d'Epargne Rhône Alpes",
  "category": "Banque",
  "location": "Siège à Lyon (Part-Dieu)",
  "angle": "Siège régional BPCE : nombreuses fonctions support et projets",
  "links": [
   {
    "label": "Portail BPCE",
    "url": "https://recrutement.bpce.fr/"
   },
   {
    "label": "La bonne alternance",
    "url": "https://labonnealternance.apprentissage.beta.gouv.fr/emploi/recruteurs_lba/38400602901785/caisse-d-epargne-et-de-prevoyance-de-rhone-alpes"
   },
   {
    "label": "Offres LinkedIn à Lyon",
    "url": "https://www.linkedin.com/jobs/search/?keywords=alternance%20Caisse%20d%27Epargne%20Rh%C3%B4ne%20Alpes&location=Lyon%2C%20Auvergne-Rh%C3%B4ne-Alpes%2C%20France"
   }
  ],
  "priority": true,
  "status": "todo",
  "note": ""
 },
 {
  "id": "bpaura",
  "name": "Banque Populaire Auvergne Rhône Alpes",
  "category": "Banque",
  "location": "Siège à Lyon",
  "angle": "Siège régional BPCE : candidature spontanée possible via La bonne alternance",
  "links": [
   {
    "label": "Portail BPCE",
    "url": "https://recrutement.bpce.fr/"
   },
   {
    "label": "La bonne alternance",
    "url": "https://labonnealternance.apprentissage.beta.gouv.fr/emploi/recruteurs_lba/60552007102996/banque-populaire-auvergne-rhone-alpes"
   },
   {
    "label": "Offres LinkedIn à Lyon",
    "url": "https://www.linkedin.com/jobs/search/?keywords=alternance%20Banque%20Populaire%20Auvergne%20Rh%C3%B4ne%20Alpes&location=Lyon%2C%20Auvergne-Rh%C3%B4ne-Alpes%2C%20France"
   }
  ],
  "priority": true,
  "status": "todo",
  "note": ""
 },
 {
  "id": "cic",
  "name": "CIC Lyonnaise de Banque",
  "category": "Banque",
  "location": "Siège à Lyon (presqu'île)",
  "angle": "Recrute des alternants bac+5 (conformité, chargé d'affaires) à Lyon",
  "links": [
   {
    "label": "Portail Crédit Mutuel / CIC",
    "url": "https://recrutement.creditmutuel.fr/"
   },
   {
    "label": "Offres LinkedIn à Lyon",
    "url": "https://www.linkedin.com/jobs/search/?keywords=alternance%20CIC%20Lyonnaise%20de%20Banque&location=Lyon%2C%20Auvergne-Rh%C3%B4ne-Alpes%2C%20France"
   }
  ],
  "priority": true,
  "status": "todo",
  "note": ""
 },
 {
  "id": "cmse",
  "name": "Crédit Mutuel du Sud-Est",
  "category": "Banque",
  "location": "Fédération régionale à Lyon",
  "angle": "Même portail que le CIC : viser les fonctions siège",
  "links": [
   {
    "label": "Portail Crédit Mutuel / CIC",
    "url": "https://recrutement.creditmutuel.fr/"
   },
   {
    "label": "Offres LinkedIn à Lyon",
    "url": "https://www.linkedin.com/jobs/search/?keywords=alternance%20Cr%C3%A9dit%20Mutuel%20du%20Sud-Est&location=Lyon%2C%20Auvergne-Rh%C3%B4ne-Alpes%2C%20France"
   }
  ],
  "priority": false,
  "status": "todo",
  "note": ""
 },
 {
  "id": "bnp",
  "name": "BNP Paribas",
  "category": "Banque",
  "location": "Direction régionale et plateformes à Lyon",
  "angle": "Grand groupe : beaucoup d'offres alternance projet / PMO",
  "links": [
   {
    "label": "Site carrières",
    "url": "https://group.bnpparibas/emploi-carriere"
   },
   {
    "label": "Offres LinkedIn à Lyon",
    "url": "https://www.linkedin.com/jobs/search/?keywords=alternance%20BNP%20Paribas&location=Lyon%2C%20Auvergne-Rh%C3%B4ne-Alpes%2C%20France"
   }
  ],
  "priority": true,
  "status": "todo",
  "note": ""
 },
 {
  "id": "sg",
  "name": "Société Générale",
  "category": "Banque",
  "location": "Direction régionale à Lyon",
  "angle": "Grand groupe : offres alternance projet, conformité, data",
  "links": [
   {
    "label": "Site carrières",
    "url": "https://careers.societegenerale.com/"
   },
   {
    "label": "Offres LinkedIn à Lyon",
    "url": "https://www.linkedin.com/jobs/search/?keywords=alternance%20Soci%C3%A9t%C3%A9%20G%C3%A9n%C3%A9rale&location=Lyon%2C%20Auvergne-Rh%C3%B4ne-Alpes%2C%20France"
   }
  ],
  "priority": true,
  "status": "todo",
  "note": ""
 },
 {
  "id": "lbp",
  "name": "La Banque Postale",
  "category": "Banque",
  "location": "Implantations régionales à Lyon",
  "angle": "Bancassureur : projets réglementaires et digitaux",
  "links": [
   {
    "label": "Offres LinkedIn à Lyon",
    "url": "https://www.linkedin.com/jobs/search/?keywords=alternance%20La%20Banque%20Postale&location=Lyon%2C%20Auvergne-Rh%C3%B4ne-Alpes%2C%20France"
   }
  ],
  "priority": false,
  "status": "todo",
  "note": ""
 },
 {
  "id": "bpi",
  "name": "Bpifrance",
  "category": "Banque publique",
  "location": "Direction régionale à Lyon",
  "angle": "Recrute plusieurs centaines d'alternants par an en France",
  "links": [
   {
    "label": "Page JobTeaser",
    "url": "https://www.jobteaser.com/fr/companies/bpifrance/newsfeed"
   },
   {
    "label": "Offres LinkedIn à Lyon",
    "url": "https://www.linkedin.com/jobs/search/?keywords=alternance%20Bpifrance&location=Lyon%2C%20Auvergne-Rh%C3%B4ne-Alpes%2C%20France"
   }
  ],
  "priority": false,
  "status": "todo",
  "note": ""
 },
 {
  "id": "bdf",
  "name": "Banque de France",
  "category": "Banque publique",
  "location": "Succursale régionale à Lyon",
  "angle": "Profil ingénieur + gestion de projet apprécié (risques, data)",
  "links": [
   {
    "label": "Offres LinkedIn à Lyon",
    "url": "https://www.linkedin.com/jobs/search/?keywords=alternance%20Banque%20de%20France&location=Lyon%2C%20Auvergne-Rh%C3%B4ne-Alpes%2C%20France"
   }
  ],
  "priority": false,
  "status": "todo",
  "note": ""
 },
 {
  "id": "april",
  "name": "APRIL",
  "category": "Assurance",
  "location": "Siège du groupe à Lyon",
  "angle": "Assureur-courtier lyonnais : IT, data, projets, relation client",
  "links": [
   {
    "label": "La bonne alternance",
    "url": "https://labonnealternance.apprentissage.beta.gouv.fr/emploi/recruteurs_lba/33839943900151/april-entreprise"
   },
   {
    "label": "Offres LinkedIn à Lyon",
    "url": "https://www.linkedin.com/jobs/search/?keywords=alternance%20APRIL&location=Lyon%2C%20Auvergne-Rh%C3%B4ne-Alpes%2C%20France"
   }
  ],
  "priority": true,
  "status": "todo",
  "note": ""
 },
 {
  "id": "apicil",
  "name": "APICIL",
  "category": "Assurance",
  "location": "Siège à Caluire-et-Cuire",
  "angle": "Groupe de protection sociale lyonnais : épargne, santé, retraite",
  "links": [
   {
    "label": "La bonne alternance",
    "url": "https://labonnealternance.apprentissage.beta.gouv.fr/emploi/recruteurs_lba/44083994200065/apicil-epargne"
   },
   {
    "label": "Offres LinkedIn à Lyon",
    "url": "https://www.linkedin.com/jobs/search/?keywords=alternance%20APICIL&location=Lyon%2C%20Auvergne-Rh%C3%B4ne-Alpes%2C%20France"
   }
  ],
  "priority": true,
  "status": "todo",
  "note": ""
 },
 {
  "id": "groupama",
  "name": "Groupama Rhône-Alpes Auvergne",
  "category": "Assurance",
  "location": "Siège régional à Lyon",
  "angle": "Caisse régionale : siège avec fonctions projet et pilotage",
  "links": [
   {
    "label": "La bonne alternance",
    "url": "https://labonnealternance.apprentissage.beta.gouv.fr/emploi/recruteurs_lba/77983836601109/groupama-rhone-alpes-auvergne"
   },
   {
    "label": "Offres LinkedIn à Lyon",
    "url": "https://www.linkedin.com/jobs/search/?keywords=alternance%20Groupama%20Rh%C3%B4ne-Alpes%20Auvergne&location=Lyon%2C%20Auvergne-Rh%C3%B4ne-Alpes%2C%20France"
   }
  ],
  "priority": true,
  "status": "todo",
  "note": ""
 },
 {
  "id": "covea",
  "name": "Covéa (MMA, MAAF, GMF)",
  "category": "Assurance",
  "location": "Agences et sites en région lyonnaise",
  "angle": "Son terrain : 3 stages chez MMA, à activer par ses tuteurs",
  "links": [
   {
    "label": "Offres alternance Covéa (DogFinance)",
    "url": "https://dogfinance.com/ent/groupe-covea/le-groupe-covea-recrute-des-alternants-dans-le-domaine-de-la-comptabilite-de-la-gestion-et-de-la-finance"
   },
   {
    "label": "Offres LinkedIn à Lyon",
    "url": "https://www.linkedin.com/jobs/search/?keywords=alternance%20Cov%C3%A9a&location=Lyon%2C%20Auvergne-Rh%C3%B4ne-Alpes%2C%20France"
   }
  ],
  "priority": true,
  "status": "todo",
  "note": ""
 },
 {
  "id": "axa",
  "name": "AXA France",
  "category": "Assurance",
  "location": "Direction régionale à Lyon",
  "angle": "Grand groupe : alternance projet, actuariat, data",
  "links": [
   {
    "label": "Site recrutement",
    "url": "https://recrutement.axa.fr/"
   },
   {
    "label": "Offres LinkedIn à Lyon",
    "url": "https://www.linkedin.com/jobs/search/?keywords=alternance%20AXA%20France&location=Lyon%2C%20Auvergne-Rh%C3%B4ne-Alpes%2C%20France"
   }
  ],
  "priority": true,
  "status": "todo",
  "note": ""
 },
 {
  "id": "allianz",
  "name": "Allianz France",
  "category": "Assurance",
  "location": "Implantation régionale à Lyon",
  "angle": "Grand groupe : projets, souscription, pilotage",
  "links": [
   {
    "label": "Offres LinkedIn à Lyon",
    "url": "https://www.linkedin.com/jobs/search/?keywords=alternance%20Allianz%20France&location=Lyon%2C%20Auvergne-Rh%C3%B4ne-Alpes%2C%20France"
   }
  ],
  "priority": false,
  "status": "todo",
  "note": ""
 },
 {
  "id": "generali",
  "name": "Generali France",
  "category": "Assurance",
  "location": "Implantation régionale à Lyon",
  "angle": "Publie ses offres sur Engagement Jeunes et JobTeaser",
  "links": [
   {
    "label": "Page Engagement Jeunes",
    "url": "https://www.engagement-jeunes.com/fr/company/79/generali-france.html"
   },
   {
    "label": "Offres LinkedIn à Lyon",
    "url": "https://www.linkedin.com/jobs/search/?keywords=alternance%20Generali%20France&location=Lyon%2C%20Auvergne-Rh%C3%B4ne-Alpes%2C%20France"
   }
  ],
  "priority": false,
  "status": "todo",
  "note": ""
 },
 {
  "id": "ag2r",
  "name": "AG2R La Mondiale",
  "category": "Assurance",
  "location": "Implantations à Lyon",
  "angle": "Plus de 300 alternants recrutés par an",
  "links": [
   {
    "label": "Offres en alternance",
    "url": "https://www.ag2rlamondiale.fr/recrutement/nos-offres-en-alternance"
   },
   {
    "label": "Offres LinkedIn à Lyon",
    "url": "https://www.linkedin.com/jobs/search/?keywords=alternance%20AG2R%20La%20Mondiale&location=Lyon%2C%20Auvergne-Rh%C3%B4ne-Alpes%2C%20France"
   }
  ],
  "priority": true,
  "status": "todo",
  "note": ""
 },
 {
  "id": "malakoff",
  "name": "Malakoff Humanis",
  "category": "Assurance",
  "location": "Implantations à Lyon",
  "angle": "Protection sociale : projets de transformation",
  "links": [
   {
    "label": "Offres LinkedIn à Lyon",
    "url": "https://www.linkedin.com/jobs/search/?keywords=alternance%20Malakoff%20Humanis&location=Lyon%2C%20Auvergne-Rh%C3%B4ne-Alpes%2C%20France"
   }
  ],
  "priority": false,
  "status": "todo",
  "note": ""
 },
 {
  "id": "macif",
  "name": "MACIF",
  "category": "Assurance",
  "location": "Implantation régionale",
  "angle": "Mutuelle : projets et relation sociétaires",
  "links": [
   {
    "label": "Offres LinkedIn à Lyon",
    "url": "https://www.linkedin.com/jobs/search/?keywords=alternance%20MACIF&location=Lyon%2C%20Auvergne-Rh%C3%B4ne-Alpes%2C%20France"
   }
  ],
  "priority": false,
  "status": "todo",
  "note": ""
 },
 {
  "id": "harmonie",
  "name": "Harmonie Mutuelle",
  "category": "Assurance",
  "location": "Implantations à Lyon",
  "angle": "Mutuelle santé : pilotage, data, projets",
  "links": [
   {
    "label": "Offres LinkedIn à Lyon",
    "url": "https://www.linkedin.com/jobs/search/?keywords=alternance%20Harmonie%20Mutuelle&location=Lyon%2C%20Auvergne-Rh%C3%B4ne-Alpes%2C%20France"
   }
  ],
  "priority": false,
  "status": "todo",
  "note": ""
 },
 {
  "id": "swisslife",
  "name": "Swiss Life France",
  "category": "Assurance",
  "location": "Implantation à Lyon",
  "angle": "Assurance vie et patrimoine",
  "links": [
   {
    "label": "Offres LinkedIn à Lyon",
    "url": "https://www.linkedin.com/jobs/search/?keywords=alternance%20Swiss%20Life%20France&location=Lyon%2C%20Auvergne-Rh%C3%B4ne-Alpes%2C%20France"
   }
  ],
  "priority": false,
  "status": "todo",
  "note": ""
 },
 {
  "id": "alptis",
  "name": "Alptis",
  "category": "Assurance",
  "location": "Siège à Lyon",
  "angle": "Acteur lyonnais santé-prévoyance, taille humaine",
  "links": [
   {
    "label": "Offres LinkedIn à Lyon",
    "url": "https://www.linkedin.com/jobs/search/?keywords=alternance%20Alptis&location=Lyon%2C%20Auvergne-Rh%C3%B4ne-Alpes%2C%20France"
   }
  ],
  "priority": false,
  "status": "todo",
  "note": ""
 },
 {
  "id": "wtw",
  "name": "WTW (Gras Savoye)",
  "category": "Courtier",
  "location": "Bureau à Lyon",
  "angle": "Courtage entreprises : gestion de projets clients",
  "links": [
   {
    "label": "Offres LinkedIn à Lyon",
    "url": "https://www.linkedin.com/jobs/search/?keywords=alternance%20WTW&location=Lyon%2C%20Auvergne-Rh%C3%B4ne-Alpes%2C%20France"
   }
  ],
  "priority": false,
  "status": "todo",
  "note": ""
 },
 {
  "id": "marsh",
  "name": "Marsh",
  "category": "Courtier",
  "location": "Bureau à Lyon",
  "angle": "Courtage entreprises et risques",
  "links": [
   {
    "label": "Offres LinkedIn à Lyon",
    "url": "https://www.linkedin.com/jobs/search/?keywords=alternance%20Marsh&location=Lyon%2C%20Auvergne-Rh%C3%B4ne-Alpes%2C%20France"
   }
  ],
  "priority": false,
  "status": "todo",
  "note": ""
 },
 {
  "id": "diot",
  "name": "Diot-Siaci",
  "category": "Courtier",
  "location": "Bureau à Lyon",
  "angle": "Courtage : projets et outils de gestion",
  "links": [
   {
    "label": "Offres LinkedIn à Lyon",
    "url": "https://www.linkedin.com/jobs/search/?keywords=alternance%20Diot-Siaci&location=Lyon%2C%20Auvergne-Rh%C3%B4ne-Alpes%2C%20France"
   }
  ],
  "priority": false,
  "status": "todo",
  "note": ""
 },
 {
  "id": "verspieren",
  "name": "Verspieren",
  "category": "Courtier",
  "location": "Bureau à Lyon",
  "angle": "Courtier familial, fonctions projet",
  "links": [
   {
    "label": "Offres LinkedIn à Lyon",
    "url": "https://www.linkedin.com/jobs/search/?keywords=alternance%20Verspieren&location=Lyon%2C%20Auvergne-Rh%C3%B4ne-Alpes%2C%20France"
   }
  ],
  "priority": false,
  "status": "todo",
  "note": ""
 },
 {
  "id": "aon",
  "name": "Aon",
  "category": "Courtier",
  "location": "Bureau à Lyon",
  "angle": "Courtage et conseil en risques",
  "links": [
   {
    "label": "Offres LinkedIn à Lyon",
    "url": "https://www.linkedin.com/jobs/search/?keywords=alternance%20Aon&location=Lyon%2C%20Auvergne-Rh%C3%B4ne-Alpes%2C%20France"
   }
  ],
  "priority": false,
  "status": "todo",
  "note": ""
 },
 {
  "id": "wavestone",
  "name": "Wavestone",
  "category": "Conseil banque-assurance",
  "location": "Bureau à Lyon",
  "angle": "Cabinet de conseil : missions banque-assurance, profil projet idéal",
  "links": [
   {
    "label": "Offres LinkedIn à Lyon",
    "url": "https://www.linkedin.com/jobs/search/?keywords=alternance%20Wavestone&location=Lyon%2C%20Auvergne-Rh%C3%B4ne-Alpes%2C%20France"
   }
  ],
  "priority": false,
  "status": "todo",
  "note": ""
 },
 {
  "id": "sopra",
  "name": "Sopra Steria",
  "category": "Conseil banque-assurance",
  "location": "Gros site à Lyon",
  "angle": "Projets IT pour banques et assureurs (MOA, PMO)",
  "links": [
   {
    "label": "Offres LinkedIn à Lyon",
    "url": "https://www.linkedin.com/jobs/search/?keywords=alternance%20Sopra%20Steria&location=Lyon%2C%20Auvergne-Rh%C3%B4ne-Alpes%2C%20France"
   }
  ],
  "priority": false,
  "status": "todo",
  "note": ""
 },
 {
  "id": "capgemini",
  "name": "Capgemini",
  "category": "Conseil banque-assurance",
  "location": "Gros site à Lyon",
  "angle": "Services financiers : PMO, data, transformation",
  "links": [
   {
    "label": "Offres LinkedIn à Lyon",
    "url": "https://www.linkedin.com/jobs/search/?keywords=alternance%20Capgemini&location=Lyon%2C%20Auvergne-Rh%C3%B4ne-Alpes%2C%20France"
   }
  ],
  "priority": false,
  "status": "todo",
  "note": ""
 },
 {
  "id": "cgi",
  "name": "CGI",
  "category": "Conseil banque-assurance",
  "location": "Site à Lyon",
  "angle": "Projets bancaires et assurance",
  "links": [
   {
    "label": "Offres LinkedIn à Lyon",
    "url": "https://www.linkedin.com/jobs/search/?keywords=alternance%20CGI&location=Lyon%2C%20Auvergne-Rh%C3%B4ne-Alpes%2C%20France"
   }
  ],
  "priority": false,
  "status": "todo",
  "note": ""
 },
 {
  "id": "indy",
  "name": "Indy",
  "category": "Fintech",
  "location": "Siège à Lyon",
  "angle": "Fintech lyonnaise (comptabilité des indépendants)",
  "links": [
   {
    "label": "Offres LinkedIn à Lyon",
    "url": "https://www.linkedin.com/jobs/search/?keywords=alternance%20Indy&location=Lyon%2C%20Auvergne-Rh%C3%B4ne-Alpes%2C%20France"
   }
  ],
  "priority": false,
  "status": "todo",
  "note": ""
 },
 {
  "id": "cegid",
  "name": "Cegid",
  "category": "Fintech",
  "location": "Siège à Lyon",
  "angle": "Éditeur de logiciels de gestion et finance",
  "links": [
   {
    "label": "Offres LinkedIn à Lyon",
    "url": "https://www.linkedin.com/jobs/search/?keywords=alternance%20Cegid&location=Lyon%2C%20Auvergne-Rh%C3%B4ne-Alpes%2C%20France"
   }
  ],
  "priority": false,
  "status": "todo",
  "note": ""
 }
];
