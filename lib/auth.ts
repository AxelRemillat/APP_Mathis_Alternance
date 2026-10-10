// Session signée (HMAC SHA-256) : fonctionne dans le middleware (edge) et dans les routes (node).
export const COOKIE = "am_session";
const DAYS = 30;

/*
 * Secret de signature. `SESSION_SECRET` est en place sur Vercel ; le repli sur
 * l'identifiant seul n'existe que pour un environnement qui l'aurait oublié.
 * Conséquence assumée du changement : les sessions signées avec l'ancien
 * secret (identifiant + mot de passe) ne valident plus — chacun se reconnecte
 * une fois.
 */
function secret() {
  return process.env.SESSION_SECRET || `${process.env.APP_USER}`;
}

function b64url(buf: ArrayBuffer) {
  let s = "";
  new Uint8Array(buf).forEach((b) => (s += String.fromCharCode(b)));
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function hmac(data: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  return b64url(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(data)));
}

// Comparaison à temps constant pour éviter les fuites de timing.
export function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function createToken(user: string) {
  const exp = Date.now() + DAYS * 86400000;
  const payload = `${encodeURIComponent(user)}.${exp}`;
  return { token: `${payload}.${await hmac(payload)}`, maxAge: DAYS * 86400 };
}

export async function verifyToken(token?: string) {
  if (!token) return false;
  const i = token.lastIndexOf(".");
  if (i < 0) return false;
  const payload = token.slice(0, i);
  const exp = Number(payload.split(".")[1]);
  if (!exp || exp < Date.now()) return false;
  return safeEqual(token.slice(i + 1), await hmac(payload));
}

/**
 * L'identifiant suffit. Casse et espaces autour ignorés : « Mathis_Levrot »,
 * « mathis_levrot » et «  Mathis_Levrot  » ouvrent la même porte — c'est
 * exactement ce qui empêchait Mathis d'entrer.
 *
 * La comparaison reste à temps constant, sur les valeurs NORMALISÉES : elle ne
 * protège plus un mot de passe, mais elle évite de révéler l'identifiant
 * caractère par caractère à qui mesurerait les temps de réponse.
 */
const normalize = (value: string) => value.trim().toLowerCase();

export function credentialsOk(user: string) {
  const expected = normalize(process.env.APP_USER || "");
  if (!expected) return false;
  return safeEqual(normalize(user), expected);
}
