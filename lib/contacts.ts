/**
 * Lecture des contacts fournis par l'environnement serveur.
 *
 * LE DÉPÔT EST PUBLIC : aucune adresse n'est écrite dans le code. Elles vivent
 * dans `TARGET_CONTACTS`, une variable d'environnement serveur au format
 * `{ "<id d'entreprise>": [{ "email": "...", "role": "..." }] }`.
 *
 * Variable absente ou illisible : on rend un objet vide. L'app doit marcher
 * sans contacts — c'est un bonus, pas une dépendance.
 */
export interface TargetContact {
  email: string;
  role?: string;
  source?: string;
}

export function parseContacts(raw: string | undefined): Record<string, TargetContact[]> {
  if (!raw?.trim()) return {};
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};
    const out: Record<string, TargetContact[]> = {};
    for (const [id, value] of Object.entries(parsed as Record<string, unknown>)) {
      const list = (Array.isArray(value) ? value : [])
        .filter((item): item is Record<string, unknown> => Boolean(item) && typeof item === "object")
        .filter((item) => typeof item.email === "string" && (item.email as string).includes("@"))
        .map((item) => ({
          email: item.email as string,
          role: typeof item.role === "string" ? item.role : undefined,
          source: typeof item.source === "string" ? item.source : undefined,
        }));
      if (list.length) out[id] = list;
    }
    return out;
  } catch {
    return {};
  }
}
