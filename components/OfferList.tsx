"use client";
import { useState } from "react";
import type { AppData } from "@/lib/types";
import { daysSince } from "@/lib/store";
import AnalysisView from "./AnalysisView";
import { CopyButton, StatusSelect, withStatus, type Updater } from "./shared";
import { buildClaudePrompt } from "@/lib/claudePrompt";

export default function OfferList({ data, update }: { data: AppData; update: Updater }) {
  const [open, setOpen] = useState<string | null>(null);
  const [confirm, setConfirm] = useState<string | null>(null);

  if (!data.offers.length) {
    return <p className="panel muted">Aucune offre enregistrée. Analyse une annonce dans l&apos;onglet « Analyser une offre ».</p>;
  }

  const patch = (id: string, fn: (o: AppData["offers"][number]) => AppData["offers"][number]) =>
    update((d) => ({ ...d, offers: d.offers.map((o) => (o.id === id ? fn(o) : o)) }));
  const remove = (id: string) => update((d) => ({ ...d, offers: d.offers.filter((o) => o.id !== id) }));

  return (
    <section className="stack">
      {data.offers.map((o) => (
        <article key={o.id} className="panel item" data-s={o.status}>
          <div className="row" style={{ justifyContent: "space-between" }}>
            <div className="stack" style={{ gap: 2 }}>
              <h3>{o.company || "Entreprise"} · {o.title || "Offre"}</h3>
              <span className="muted">
                {o.analysis ? `${o.analysis.score}/10 · ` : ""}ajoutée le {new Date(o.createdAt).toLocaleDateString("fr-FR")}
                {o.sentAt ? ` · envoyée il y a ${daysSince(o.sentAt)} j` : ""}
              </span>
            </div>
            <div className="row">
              <StatusSelect id={`os-${o.id}`} value={o.status} onChange={(s) => patch(o.id, (x) => withStatus(x, s))} />
              {o.url && <a href={o.url} target="_blank" rel="noopener noreferrer">Annonce</a>}
              <button className="ghost" onClick={() => setOpen(open === o.id ? null : o.id)}>
                {open === o.id ? "Masquer" : "Voir l'analyse"}
              </button>
              <CopyButton
                text={buildClaudePrompt({ profile: data.profile, letter: data.letter, offer: o, analysis: o.analysis })}
                label="Prompt pour Claude"
              />
              {confirm === o.id ? (
                <button className="danger" onClick={() => remove(o.id)}>Confirmer la suppression</button>
              ) : (
                <button className="danger" onClick={() => setConfirm(o.id)}>Supprimer</button>
              )}
            </div>
          </div>
          {open === o.id && o.analysis && <AnalysisView a={o.analysis} />}
        </article>
      ))}
    </section>
  );
}
