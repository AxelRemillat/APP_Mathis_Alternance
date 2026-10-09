import { NextResponse } from "next/server";
import { parseContacts } from "@/lib/contacts";

// Derrière le middleware : sans session valide, la réponse est un 401 avant
// d'arriver ici. Les adresses ne sortent jamais du serveur autrement.
export const dynamic = "force-dynamic";

export async function GET(): Promise<NextResponse> {
  return NextResponse.json({ contacts: parseContacts(process.env.TARGET_CONTACTS) });
}
