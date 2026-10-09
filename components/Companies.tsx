"use client";
import { useEffect, useState } from "react";
import type { AppData, Company } from "@/lib/types";
import { uid } from "@/lib/store";
import { CopyButton, StatusSelect, withStatus, type Updater } from "./shared";
import { buildSpontaneousPrompt } from "@/lib/claudePrompt";

const FILTERS = ["Toutes", "Prioritaires", "Agence d'assurance", "Banque", "Assurance", "Courtier", "Conseil banque-assurance", "Fintech", "En cours"];
const OPEN = ["sent", "relance", "interview", "offer"];

function match(c: Company, f: string) {
  if (f === "Toutes") return true;
  if (f === "Prioritaires") return c.priority;
  if (f === "En cours") return OPEN.includes(c.status);
  if (f === "Banque") return c.category.startsWith("Banque");
  return c.category === f;
}

export default function Companies({ data, update }: { data: AppData; update: Updater }) {
  const [filter, setFilter] = useState("Toutes");
  /*
   * Contacts des petites structures : ils ne sont PAS dans le code (depot
   * public) mais dans TARGET_CONTACTS cote serveur, servis par une route que
   * le middleware protege. Absents, la liste marche pareil.
   */
  const [contacts, setContacts] = useState<Record<string, { email: string; role?: string }[]>>({});
  useEffect(() => {
    fetch("/api/contacts")
      .then((response) => (response.ok ? response.json() : { contacts: {} }))
      .then((json) => setContacts(json.contacts ?? {}))
      .catch(() => setContacts({}));
  }, []);
  const [name, setName] = useState("");
  const patch = (id: string, fn: (c: Company) => Company) =>
    update((d) => ({ ...d, companies: d.companies.map((c) => (c.id === id ? fn(c) : c)) }));

  function add() {
    if (!name.trim()) return;
    const c: Company = {
      id: uid(), name: name.trim(), category: "Autre", location: "Lyon", angle: "Ajoutée par Mathis",
      links: [{ label: "Offres LinkedIn à Lyon", url: `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent("alternance " + name.trim())}&location=Lyon` }],
      priority: false, status: "todo", note: "", custom: true,
    };
    update((d) => ({ ...d, companies: [c, ...d.companies] }));
    setName("");
  }

  const list = data.companies.filter((c) => match(c, filter)).sort((a, b) => Number(b.priority) - Number(a.priority));
  return (
    <section className="stack">
      <div className="row filters" role="group" aria-label="Filtrer">
        {FILTERS.map((f) => (
          <button key={f} aria-pressed={filter === f} onClick={() => setFilter(f)}>{f}</button>
        ))}
      </div>
      <div className="row">
        <input id="c-add" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ajouter une entreprise" style={{ maxWidth: 320 }} />
        <button onClick={add}>Ajouter</button>
      </div>
      {list.map((c) => (
        <article key={c.id} className="panel item" data-s={c.status}>
          <div className="row" style={{ justifyContent: "space-between" }}>
            <h3>
              {c.name} <span className="tag">{c.category}</span> {c.priority && <span className="tag gold">Prioritaire</span>}
            </h3>
            <StatusSelect id={`cs-${c.id}`} value={c.status} onChange={(s) => patch(c.id, (x) => withStatus(x, s))} />
          </div>
          <p className="muted">{c.location} · {c.angle}</p>
          <div className="row">
            {c.links.map((l) => (
              <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer">{l.label}</a>
            ))}
            {c.action && <span className="tag">{c.action}</span>}
            {(contacts[c.id] ?? []).map((contact) => (
              <a key={contact.email} href={`mailto:${contact.email}`}>
                {contact.role ? `Écrire — ${contact.role}` : "Écrire"}
              </a>
            ))}
            {/* Candidature spontanee : aucune annonce a analyser, donc un
                prompt qui ne s appuie que sur l entreprise et l angle repere. */}
            <CopyButton
              text={buildSpontaneousPrompt({ profile: data.profile, letter: data.letter, company: c })}
              label="Copier le prompt pour Claude"
            />
          </div>
          <input
            id={`cn-${c.id}`}
            value={c.note}
            onChange={(e) => patch(c.id, (x) => ({ ...x, note: e.target.value }))}
            placeholder="Note : contact, date d'envoi, prochaine action…"
            aria-label={`Note pour ${c.name}`}
          />
        </article>
      ))}
    </section>
  );
}
