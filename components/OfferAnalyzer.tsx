"use client";
import { useState } from "react";
import type { Analysis, AppData, SavedAnalysis } from "@/lib/types";
import { uid } from "@/lib/store";
import AnalysisView from "./AnalysisView";
import AnalysisHistory from "./AnalysisHistory";
import { CopyButton, type Updater } from "./shared";
import { buildClaudePrompt } from "@/lib/claudePrompt";

const EMPTY = { company: "", title: "", url: "", text: "" };

/**
 * L'analyse ne s'évapore plus en changeant d'onglet.
 *
 * Elle est écrite dans le stockage local dès qu'elle revient du serveur : le
 * formulaire se réaffiche depuis la plus récente, et l'historique permet d'en
 * réouvrir une ancienne avec ses champs — sans eux, on perdrait le texte de
 * l'annonce et donc le prompt à copier.
 */
export default function OfferAnalyzer({ data, update, onSaved }: { data: AppData; update: Updater; onSaved: () => void }) {
  const history = data.analyses ?? [];
  const [openId, setOpenId] = useState<string | null>(history[0]?.id ?? null);
  const current = history.find((item) => item.id === openId) ?? null;
  const [draft, setDraft] = useState<typeof EMPTY | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Le formulaire montre le brouillon en cours, sinon l'analyse ouverte.
  const form = draft ?? current?.offer ?? EMPTY;
  const result: Analysis | null = draft ? null : current?.analysis ?? null;

  const set = (k: keyof typeof EMPTY) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setDraft({ ...form, [k]: e.target.value });

  async function analyse() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/analyse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ offer: form, profile: data.profile, letter: data.letter }),
      });
      const json = await res.json();
      if (res.status === 401) {
        window.location.href = "/login";
        return;
      }
      if (!res.ok) throw new Error(json.error || "Analyse impossible.");
      const saved: SavedAnalysis = { id: uid(), createdAt: new Date().toISOString(), offer: { ...form }, analysis: json.analysis };
      update((d) => ({ ...d, analyses: [saved, ...(d.analyses ?? [])].slice(0, 50) }));
      setOpenId(saved.id);
      setDraft(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Analyse impossible.");
    } finally {
      setLoading(false);
    }
  }

  function save() {
    if (!result) return;
    update((d) => ({
      ...d,
      offers: [{ id: uid(), ...form, createdAt: new Date().toISOString(), status: "todo", analysis: result }, ...d.offers],
    }));
    onSaved();
  }

  return (
    <section className="stack">
      <div className="panel">
        <h2>Analyser une offre</h2>
        <div className="grid">
          <label>Entreprise<input id="o-company" value={form.company} onChange={set("company")} /></label>
          <label>Intitulé du poste<input id="o-title" value={form.title} onChange={set("title")} /></label>
          <label>Lien de l&apos;annonce<input id="o-url" value={form.url} onChange={set("url")} placeholder="https://" /></label>
        </div>
        <label>Texte complet de l&apos;annonce
          <textarea id="o-text" value={form.text} onChange={set("text")} placeholder="Copie-colle toute l'annonce : missions, profil, lieu, rythme…" />
        </label>
        <div className="row">
          <button onClick={analyse} disabled={loading || !form.text.trim()}>
            {loading ? "Analyse en cours…" : result ? "Relancer l'analyse" : "Analyser"}
          </button>
          {/* Vide le formulaire SANS toucher à l'historique. */}
          {(form.text.trim() || result) && (
            <button
              className="ghost"
              onClick={() => {
                setDraft(EMPTY);
                setOpenId(null);
                setError("");
              }}
            >
              Nouvelle analyse
            </button>
          )}
          {form.text.trim() && (
            <CopyButton
              text={buildClaudePrompt({ profile: data.profile, letter: data.letter, offer: form, analysis: result ?? undefined })}
              label="Copier le prompt pour Claude"
            />
          )}
        </div>
        {form.text.trim() && <p className="muted">Colle-le dans Claude (claude.ai).</p>}
        {error && <p className="error">{error}</p>}
      </div>
      {result && (
        <div className="panel">
          <AnalysisView a={result} />
          <div className="row">
            <button onClick={save}>Ajouter à mon suivi</button>
          </div>
        </div>
      )}
      <AnalysisHistory
        items={history}
        openId={openId}
        onOpen={(item) => {
          setDraft(null);
          setOpenId(item.id);
          setError("");
        }}
        onDelete={(id) => {
          update((d) => ({ ...d, analyses: (d.analyses ?? []).filter((item) => item.id !== id) }));
          if (id === openId) setOpenId(null);
        }}
      />
    </section>
  );
}
