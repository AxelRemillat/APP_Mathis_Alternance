"use client";
import { useState } from "react";
import type { AppData } from "@/lib/types";
import { CopyButton, type Updater } from "./shared";

const FICHE = `Formation : Master of Science Management et gestion de projets (ISG Lyon), bac+5, RNCP 38874, code diplôme 16031011.
Dates : 470 h sur 12 mois, du 12 octobre 2026 au 30 septembre 2027.
Rythme : 1 jour de cours / 4 jours en entreprise par semaine + 7 semaines complètes de cours (12–16 oct., 16–20 nov., 7–11 déc., 11–15 janv., 8–12 févr., 8–12 mars, 30 mars–2 avr.). 100 % en entreprise de mi-juin à fin septembre 2027.
Coût : 11 040 € par an, dont environ 9 700 € pris en charge par l'OPCO (reste ≈ 1 340 €).
Aide de l'État (bac+5, contrat signé avant le 31/12/2026) : 750 € (250 salariés et plus) ou 2 000 € (moins de 250).
Contact école : Cassandre Berrah, relations entreprises ISG Lyon, 04 84 34 02 55, cassandre.berrah@isg.fr.`;

export default function Profile({ data, update }: { data: AppData; update: Updater }) {
  const [msg, setMsg] = useState("");

  function exportData() {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `alternance-sauvegarde-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  async function importData(file?: File) {
    if (!file) return;
    try {
      const parsed = JSON.parse(await file.text());
      if (!Array.isArray(parsed.companies) || !Array.isArray(parsed.offers)) throw new Error();
      update(() => parsed);
      setMsg("Sauvegarde importée.");
    } catch {
      setMsg("Fichier invalide : choisis un export de cet outil.");
    }
  }

  return (
    <section className="grid">
      <div className="panel">
        <h2>Mon profil</h2>
        <p className="muted">L&apos;IA s&apos;appuie sur ce texte pour chaque analyse. Remplace les [à compléter] par tes vraies missions chez MMA, chiffrées si possible.</p>
        <textarea id="p-profile" value={data.profile} onChange={(e) => update((d) => ({ ...d, profile: e.target.value }))} style={{ minHeight: 280 }} />
      </div>
      <div className="panel">
        <div className="row"><h2>Fiche recruteur</h2><CopyButton text={FICHE} /></div>
        <pre className="text">{FICHE}</pre>
        <h3>Sauvegarde</h3>
        <p className="muted">Les données restent dans ce navigateur. Exporte-les de temps en temps pour ne rien perdre.</p>
        <div className="row">
          <button className="ghost" onClick={exportData}>Exporter</button>
          <label className="row" style={{ display: "flex" }}>
            Importer
            <input id="p-import" type="file" accept="application/json" onChange={(e) => importData(e.target.files?.[0])} style={{ maxWidth: 230 }} />
          </label>
        </div>
        {msg && <p className="muted">{msg}</p>}
      </div>
    </section>
  );
}
