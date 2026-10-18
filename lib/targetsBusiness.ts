import type { Company } from "./types";

// Cible n°1 (demande de Mathis, 18/10/2026) : alternance d'ingénieur d'affaires
// (business developer, chargé d'affaires, account manager junior, ingénieur commercial).
// Entreprises qui recrutent couramment des alternants sur ces postes. Seul le lien est
// affirmé : la page carrières officielle, vérifiée le 18/10/2026 (réponse 200 ou
// redirection vers la page carrières). Aucune offre ni aucun contact supposé : la
// présence à Lyon et l'offre du moment se vérifient sur la page avant d'écrire.
const LYON = "Région lyonnaise : implantation à vérifier sur la page carrières";

const company = (id: string, name: string, category: string, angle: string, label: string, url: string, extra: Partial<Company> = {}): Company => ({
  id, name, category, location: LYON, angle, links: [{ label, url }],
  priority: false, status: "todo", note: "", action: "Postuler en ligne", ...extra,
});

const CAT = "Ingénieur d'affaires";

export const BUSINESS_COMPANIES: Company[] = [
  company("ia-schneider", "Schneider Electric", CAT, "Industrie et énergie (gestion de l'énergie, automatismes) : postes commerciaux techniques", "Carrières Schneider Electric", "https://careers.se.com/"),
  company("ia-siemens", "Siemens", CAT, "Industrie, automatisation, infrastructures : ingénieurs commerciaux et chargés d'affaires", "Carrières Siemens", "https://jobs.siemens.com/careers"),
  company("ia-legrand", "Legrand", CAT, "Industrie (matériel électrique) : force de vente technique", "Offres d'emploi Legrand", "https://www.legrand.com/fr/carrieres/rejoignez-nous/nos-offres-demploi"),
  company("ia-spie", "SPIE", CAT, "Services en énergie et numérique : métier de chargé d'affaires très répandu", "Rejoindre SPIE", "https://www.spie.com/fr/rejoindre-spie"),
  company("ia-vinci-energies", "VINCI Energies", CAT, "Énergie et numérique (réseau d'entreprises locales) : chargés d'affaires", "Carrières VINCI Energies", "https://www.vinci-energies.com/carrieres/"),
  company("ia-eiffage", "Eiffage (Énergie Systèmes)", CAT, "Énergie, BTP : chargés d'affaires en agence", "Carrières Eiffage", "https://www.eiffage.com/carrieres"),
  company("ia-equans", "Equans", CAT, "Services en énergie et génie climatique : page alternance dédiée", "L'alternance chez Equans France", "https://www.equans.fr/nous-rejoindre/lalternance-chez-equans-france"),
  company("ia-edf", "EDF", CAT, "Énergie : offres commerciales entreprises et collectivités", "EDF recrute", "https://www.edf.fr/edf-recrute"),
  company("ia-engie", "ENGIE", CAT, "Énergie : business developers et chargés d'affaires", "Carrières ENGIE", "https://jobs.engie.com/"),
  company("ia-dalkia", "Dalkia", CAT, "Énergie (services énergétiques, filiale d'EDF) : chargés d'affaires", "Recrutement Dalkia", "https://www.dalkia.fr/rh/recrutement-energie/"),
  company("ia-orange", "Orange (Orange Business)", CAT, "Télécoms : ingénieurs commerciaux et account managers", "Orange Jobs", "https://orange.jobs/"),
  company("ia-3ds", "Dassault Systèmes", CAT, "Éditeur de logiciels industriels : business developers", "Carrières Dassault Systèmes", "https://www.3ds.com/fr/careers"),
  company("ia-esker", "Esker", CAT, "Éditeur de logiciels, siège à Lyon : postes commerciaux", "Offres Esker", "https://careers-france.esker.com/jobs", { location: "Siège à Lyon" }),
  company("ia-accenture", "Accenture", CAT, "Conseil et services technologiques : développement commercial", "Carrières Accenture", "https://www.accenture.com/fr-fr/careers"),
  company("ia-alten", "ALTEN", CAT, "Ingénierie et conseil technologique (ESN) : ingénieurs d'affaires", "Offres d'emploi ALTEN", "https://www.alten.com/fr/carrieres/nos-offres-demploi/"),
  company("ia-akkodis", "Akkodis", CAT, "Ingénierie et conseil technologique (ESN) : business managers", "Emplois Akkodis", "https://www.akkodis.com/fr/emplois"),
  company("ia-inetum", "Inetum", CAT, "ESN : ingénieurs d'affaires et account managers", "Carrières Inetum", "https://www.inetum.com/global/en/careers/jobs.html"),
  company("ia-apave", "Apave", CAT, "Inspection et contrôle technique : chargés d'affaires", "Carrières Apave", "https://www.apave.com/fr/carrieres"),
  company("ia-bureau-veritas", "Bureau Veritas", CAT, "Inspection, certification : chargés d'affaires", "Recrutement Bureau Veritas", "https://group.bureauveritas.com/fr/carrieres/attirer-des-nouveaux-talents/recrutement-et-integration"),
  company("ia-socotec", "SOCOTEC", CAT, "Inspection et contrôle technique : chargés d'affaires", "Site SOCOTEC (lien à vérifier à la main)", "https://www.socotec.fr/", { toVerify: true }),
  company("ia-worldline", "Worldline", CAT, "Paiements (bancassurance, côté offres techniques) : account managers", "Carrières Worldline", "https://jobs.worldline.com/"),
];
