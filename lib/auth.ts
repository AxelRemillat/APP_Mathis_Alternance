// Session signée (HMAC SHA-256) : fonctionne dans le middleware (edge) et dans les routes (node).
export const COOKIE = "am_session";
const DAYS = 30;

function secret() {
  return process.env.SESSION_SECRET || `${process.env.APP_USER}:${process.env.APP_PASSWORD}`;
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

export function credentialsOk(user: string, password: string) {
  const u = process.env.APP_USER || "";
  const p = process.env.APP_PASSWORD || "";
  if (!u || !p) return false;
  return safeEqual(user.trim(), u) && safeEqual(password, p);
}
