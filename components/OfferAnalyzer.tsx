"use client";
import { useState } from "react";
import type { Analysis, AppData } from "@/lib/types";
import { uid } from "@/lib/store";
import AnalysisView from "./AnalysisView";
import type { Updater } from "./shared";

export default function OfferAnalyzer({ data, update, onSaved }: { data: AppData; update: Updater; onSaved: () => void }) {
  const [form, setForm] = useState({ company: "", title: "", url: "", text: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<Analysis | null>(null);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  async function analyse() {
    setLoading(true); setError(""); setResult(null);
    try {
      const res = await fetch("/api/analyse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ offer: form, profile: data.profile, letter: data.letter }),
      });
      const json = await res.json();
      if (res.status === 401) { window.location.href = "/login"; return; }
      if (!res.ok) throw new Error(json.error || "Analyse impossible.");
      setResult(json.analysis);
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
            {loading ? "Analyse en cours…" : "Analyser"}
          </button>
        </div>
        {error && <p className="error">{error}</p>}
      </div>
      {result && (
        <div className="panel">
          <AnalysisView a={result} />
          <div className="row"><button onClick={save}>Enregistrer dans mes offres</button></div>
        </div>
      )}
    </section>
  );
}
