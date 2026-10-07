"use client";
import { STATUSES, type AppData } from "@/lib/types";
import { daysSince } from "@/lib/store";

// Date limite de signature probable : 3 mois après le début de la formation (12/10/2026), à confirmer avec l'ISG.
const DEADLINE = new Date("2027-01-12");

export default function Dashboard({ data, go }: { data: AppData; go: (tab: string) => void }) {
  const all = [
    ...data.companies.map((c) => ({ name: c.name, status: c.status, sentAt: c.sentAt, kind: "Entreprise" })),
    ...data.offers.map((o) => ({ name: `${o.company} · ${o.title}`, status: o.status, sentAt: o.sentAt, kind: "Offre" })),
  ];
  const count = (s: string) => all.filter((x) => x.status === s).length;
  const relances = all.filter((x) => x.status === "sent" && (daysSince(x.sentAt) ?? 0) >= 7);
  const daysLeft = Math.ceil((DEADLINE.getTime() - Date.now()) / 86400000);
  const nextTargets = data.companies.filter((c) => c.priority && c.status === "todo").slice(0, 5);

  return (
    <section className="stack">
      <div className="row">
        {STATUSES.map((s) => (
          <div key={s.id} className="stat">
            <b>{count(s.id)}</b>
            <span className="muted">{s.label}</span>
          </div>
        ))}
      </div>
      <p className="alert">
        Signature du contrat : il reste environ <b className="mono">{daysLeft} jours</b> avant la mi-janvier 2027 (3 mois
        après le début de la formation, date à confirmer avec l&apos;ISG).
      </p>
      <div className="grid">
        <div className="panel">
          <h2>Relances à faire</h2>
          {relances.length === 0 ? (
            <p className="muted">Aucune candidature envoyée depuis plus de 7 jours sans réponse.</p>
          ) : (
            <ul className="clean">
              {relances.map((r) => (
                <li key={r.name}>
                  {r.name} <span className="muted">· envoyée il y a {daysSince(r.sentAt)} j</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="panel">
          <h2>Prochaines cibles prioritaires</h2>
          <ul className="clean">
            {nextTargets.map((c) => (
              <li key={c.id}>{c.name}</li>
            ))}
          </ul>
          <button className="ghost" onClick={() => go("companies")}>Voir toutes les entreprises</button>
        </div>
        <div className="panel">
          <h2>Une offre à analyser ?</h2>
          <p className="muted">Colle le texte d&apos;une annonce : l&apos;IA note l&apos;adéquation et rédige ton e-mail et ta note LinkedIn.</p>
          <button onClick={() => go("analyse")}>Analyser une offre</button>
        </div>
      </div>
    </section>
  );
}
