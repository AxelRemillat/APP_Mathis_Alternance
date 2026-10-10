import { NextResponse } from "next/server";
import { COOKIE, createToken, credentialsOk } from "@/lib/auth";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  if (!process.env.APP_USER) {
    return NextResponse.json({ error: "Identifiant non configuré sur le serveur (APP_USER)." }, { status: 500 });
  }
  if (!credentialsOk(String(body.user ?? ""))) {
    await new Promise((r) => setTimeout(r, 600)); // ralentit les essais en série
    return NextResponse.json({ error: "Identifiant inconnu." }, { status: 401 });
  }
  const { token, maxAge } = await createToken(String(body.user).trim());
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE, token, { httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge });
  return res;
}
