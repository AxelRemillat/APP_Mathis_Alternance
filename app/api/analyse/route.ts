import { NextResponse } from "next/server";
import { buildPrompt } from "@/lib/prompt";
import type { Analysis } from "@/lib/types";

export const runtime = "nodejs";

const asList = (v: unknown) => (Array.isArray(v) ? v.map(String).slice(0, 8) : []);

function normalize(raw: Record<string, unknown>): Analysis {
  const score = Math.max(0, Math.min(10, Math.round(Number(raw.score) || 0)));
  return {
    score,
    verdict: String(raw.verdict ?? ""),
    strengths: asList(raw.strengths),
    gaps: asList(raw.gaps),
    keywords: asList(raw.keywords),
    redFlags: asList(raw.redFlags),
    coverEmail: String(raw.coverEmail ?? ""),
    linkedinNote: String(raw.linkedinNote ?? "").slice(0, 300),
    questions: asList(raw.questions),
  };
}

export async function POST(req: Request) {
  // L'accès est contrôlé par le middleware (session de connexion).
  const key = process.env.OPENAI_API_KEY;
  if (!key) return NextResponse.json({ error: "Clé OpenAI absente côté serveur." }, { status: 500 });

  const body = await req.json().catch(() => null);
  const offer = body?.offer;
  if (!offer?.text || String(offer.text).trim().length < 80) {
    return NextResponse.json({ error: "Colle le texte complet de l'offre (au moins quelques lignes)." }, { status: 400 });
  }

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [{ role: "user", content: buildPrompt(String(body.profile || ""), offer) }],
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    const quota = res.status === 429 && /quota|credit/i.test(detail);
    return NextResponse.json(
      { error: quota ? "Crédit OpenAI épuisé : recharge le compte." : `Erreur OpenAI (${res.status}).` },
      { status: 502 },
    );
  }
  const json = await res.json();
  try {
    const parsed = JSON.parse(json.choices?.[0]?.message?.content ?? "{}");
    return NextResponse.json({ analysis: normalize(parsed) });
  } catch {
    return NextResponse.json({ error: "Réponse illisible, relance l'analyse." }, { status: 502 });
  }
}
