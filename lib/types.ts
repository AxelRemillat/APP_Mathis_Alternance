export type Status = "todo" | "sent" | "relance" | "interview" | "offer" | "no";

export const STATUSES: { id: Status; label: string }[] = [
  { id: "todo", label: "À contacter" },
  { id: "sent", label: "Candidature envoyée" },
  { id: "relance", label: "Relancée" },
  { id: "interview", label: "Entretien" },
  { id: "offer", label: "Proposition" },
  { id: "no", label: "Refus" },
];

export type Company = {
  id: string;
  name: string;
  category: string;
  location: string;
  angle: string;
  links: { label: string; url: string }[];
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
  companies: Company[];
  offers: Offer[];
};
