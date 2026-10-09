import { NextResponse } from "next/server";

/**
 * Remarque de Mathis → fiche courte → notification ntfy chez Axel.
 *
 * Derrière le middleware : sans session valide, la réponse est un 401 avant
 * d'arriver ici. Le topic ntfy n'est JAMAIS dans le code — le dépôt est
 * public, et un topic ntfy connu se lit par n'importe qui.
 *
 * Si l'IA ne répond pas, la remarque part quand même, en « non classé ». Une
 * remarque perdue est pire qu'une remarque mal rangée.
 */
export const runtime = "nodejs";

const MAX_CHARS = 2_000;
const MAX_PER_DAY = 20;

/**
 * Compteur en mémoire du processus. Volontairement simple : il s'agit
 * d'éviter une boucle involontaire, pas de résister à une attaque — la route
 * est déjà derrière la connexion. Un redémarrage de la fonction le remet à
 * zéro, et c'est acceptable pour un outil à un seul utilisateur.
 */
const sent: number[] = [];

function overQuota(now = Date.now()): boolean {
  const since = now - 86_400_000;
  while (sent.length && sent[0] < since) sent.shift();
  return sent.length >= MAX_PER_DAY;
}

const TYPES = ["bug", "idée", "UX", "contenu"] as const;
const PRIORITIES = ["haute", "moyenne", "basse"] as const;

interface Card {
  type: string;
  page: string;
  priority: string;
  summary: string;
  action: string;
}

const pick = (value: unknown, allowed: readonly string[], fallback: string) =>
  typeof value === "string" && allowed.includes(value.trim().toLowerCase()) ? value.trim().toLowerCase() : fallback;

/** Fiche courte produite par le modèle, ou `null` s'il n'a rien donné d'utilisable. */
async function classify(note: string, page: string): Promise<Card | null> {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return null;
  const system = `Tu ranges les remarques d'un utilisateur sur son outil de recherche d'alternance, pour que son développeur sache quoi faire.

Réponds UNIQUEMENT en JSON :
{"type":"bug|idée|UX|contenu","page":"la page concernée","priority":"haute|moyenne|basse","summary":"une phrase, ce qui ne va pas ou ce qui est demandé","action":"ce que le développeur a à faire, une phrase à l'impératif"}

« haute » = l'outil est inutilisable ou perd des données. « moyenne » = ça gêne. « basse » = confort ou idée. N'invente rien que la remarque ne dise pas : si elle est vague, dis-le dans le résumé.`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: system },
          { role: "user", content: `Page : ${page || "non précisée"}\n\nRemarque :\n${note}` },
        ],
      }),
      signal: AbortSignal.timeout(20_000),
    });
    if (!response.ok) return null;
    const json = await response.json();
    const raw = JSON.parse(json.choices?.[0]?.message?.content ?? "{}") as Record<string, unknown>;
    return {
      type: pick(raw.type, TYPES.map((item) => item.toLowerCase()), "non classé"),
      page: typeof raw.page === "string" && raw.page.trim() ? raw.page.trim() : page || "non précisée",
      priority: pick(raw.priority, PRIORITIES, "moyenne"),
      summary: typeof raw.summary === "string" ? raw.summary.trim() : "",
      action: typeof raw.action === "string" ? raw.action.trim() : "",
    };
  } catch {
    return null;
  }
}

export async function POST(req: Request): Promise<NextResponse> {
  const topic = process.env.FEEDBACK_NTFY_TOPIC?.trim();
  if (!topic) {
    return NextResponse.json(
      { error: "Le canal de notification n'est pas configuré : ajoute FEEDBACK_NTFY_TOPIC côté serveur." },
      { status: 500 },
    );
  }
  if (overQuota()) {
    return NextResponse.json({ error: `Limite atteinte (${MAX_PER_DAY} envois par jour). Réessaie demain.` }, { status: 429 });
  }

  const body = (await req.json().catch(() => null)) as { note?: unknown; page?: unknown } | null;
  const note = typeof body?.note === "string" ? body.note.trim() : "";
  const page = typeof body?.page === "string" ? body.page.trim().slice(0, 80) : "";
  if (!note) return NextResponse.json({ error: "Écris ta remarque avant d'envoyer." }, { status: 400 });
  if (note.length > MAX_CHARS) {
    return NextResponse.json({ error: `Remarque trop longue (${note.length} caractères, maximum ${MAX_CHARS}).` }, { status: 400 });
  }

  const card = await classify(note, page);
  const type = card?.type ?? "non classé";
  const priority = card?.priority ?? "moyenne";
  // La fiche d abord, la remarque brute ensuite : Axel lit le resume, et garde
  // sous les yeux les mots exacts de Mathis.
  const head = [
    card?.summary ? `Résumé : ${card.summary}` : "",
    card?.action ? `Action : ${card.action}` : "",
    `Page : ${card?.page || page || "non précisée"}`,
  ].filter(Boolean);
  const lines = [...head, "", "Remarque de Mathis :", note];

  const push = await fetch(`https://ntfy.sh/${encodeURIComponent(topic)}`, {
    method: "POST",
    headers: {
      // En-têtes ntfy : ASCII seulement, d'où l'absence d'accents dans le titre.
      Title: `Feedback app Mathis - ${type}/${priority}`,
      Priority: priority === "haute" ? "4" : priority === "basse" ? "2" : "3",
      Tags: "triangular_flag_on_post",
    },
    body: lines.join("\n"),
    signal: AbortSignal.timeout(15_000),
  }).catch(() => null);

  if (!push?.ok) {
    return NextResponse.json({ error: "La notification n'est pas partie : réessaie dans un instant." }, { status: 502 });
  }
  sent.push(Date.now());
  return NextResponse.json({ ok: true, classified: Boolean(card) });
}
