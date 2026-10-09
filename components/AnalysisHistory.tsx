"use client";
import type { SavedAnalysis } from "@/lib/types";

/**
 * Les analyses déjà faites, la plus récente en tête. Un clic en réouvre une :
 * les champs saisis reviennent avec le résultat, donc le prompt à copier et
 * l'enregistrement dans le suivi redeviennent possibles.
 *
 * Tout vit dans le stockage du navigateur de Mathis : « Supprimer » retire
 * une ligne de chez lui, rien d'autre.
 */
export default function AnalysisHistory({
  items,
  openId,
  onOpen,
  onDelete,
}: {
  items: readonly SavedAnalysis[];
  openId: string | null;
  onOpen: (item: SavedAnalysis) => void;
  onDelete: (id: string) => void;
}) {
  if (!items.length) return null;

  return (
    <div className="panel">
      <h2>Analyses précédentes</h2>
      <p className="muted">
        {items.length} enregistrée{items.length === 1 ? "" : "s"} · les 50 plus récentes sont conservées.
      </p>
      <div className="stack" style={{ gap: 6 }}>
        {items.map((item) => (
          <article key={item.id} className="panel item" data-s={item.id === openId ? "sent" : undefined} style={{ gap: 4 }}>
            <div className="row" style={{ justifyContent: "space-between" }}>
              <div className="stack" style={{ gap: 2, minWidth: 0 }}>
                <b>
                  {item.offer.company || "Entreprise"} · {item.offer.title || "Offre"}
                </b>
                <span className="muted">
                  <span className="mono">{item.analysis.score}/10</span> ·{" "}
                  {new Date(item.createdAt).toLocaleString("fr-FR", { dateStyle: "short", timeStyle: "short" })}
                </span>
              </div>
              <div className="row">
                <button className="ghost" onClick={() => onOpen(item)}>
                  {item.id === openId ? "Ouverte" : "Réouvrir"}
                </button>
                <button className="danger" onClick={() => onDelete(item.id)} aria-label={`Supprimer l'analyse ${item.offer.company}`}>
                  Supprimer
                </button>
              </div>
            </div>
            {item.analysis.verdict && <p className="muted" style={{ margin: 0 }}>{item.analysis.verdict}</p>}
          </article>
        ))}
      </div>
    </div>
  );
}
