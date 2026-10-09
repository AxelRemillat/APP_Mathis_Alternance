"use client";
import { useState } from "react";
import { useAppData } from "@/lib/store";
import Dashboard from "@/components/Dashboard";
import OfferAnalyzer from "@/components/OfferAnalyzer";
import OfferList from "@/components/OfferList";
import Companies from "@/components/Companies";
import Platforms from "@/components/Platforms";
import Profile from "@/components/Profile";

const TABS = [
  { id: "home", label: "Tableau de bord" },
  { id: "analyse", label: "Analyser une offre" },
  { id: "offers", label: "Mes offres" },
  { id: "companies", label: "Entreprises" },
  { id: "platforms", label: "Plateformes" },
  { id: "profile", label: "Profil & fiche" },
] as const;
type Tab = (typeof TABS)[number]["id"];

export default function Home() {
  const { data, update, ready } = useAppData();
  const [tab, setTab] = useState<Tab>("home");

  async function logout() {
    await fetch("/api/logout", { method: "POST" });
    window.location.href = "/login";
  }

  return (
    <main className="wrap">
      <header className="stack">
        <span className="eyebrow">Alternance banque &amp; assurance · Lyon · oct. 2026 → sept. 2027</span>
        <div className="row" style={{ justifyContent: "space-between" }}>
          <h1>Recherche d&apos;alternance de Mathis</h1>
          <button className="ghost" onClick={logout}>Se déconnecter</button>
        </div>
      </header>
      <nav className="tabs" aria-label="Sections">
        {TABS.map((t) => (
          <button key={t.id} aria-current={tab === t.id ? "page" : undefined} onClick={() => setTab(t.id)}>
            {t.label}
          </button>
        ))}
      </nav>
      {!ready ? (
        <p className="muted">Chargement…</p>
      ) : (
        <>
          {tab === "home" && <Dashboard data={data} go={(t) => setTab(t as Tab)} />}
          {tab === "analyse" && <OfferAnalyzer data={data} update={update} onSaved={() => setTab("offers")} />}
          {tab === "offers" && <OfferList data={data} update={update} />}
          {tab === "companies" && <Companies data={data} update={update} />}
          {tab === "platforms" && <Platforms />}
          {tab === "profile" && <Profile data={data} update={update} />}
        </>
      )}
    </main>
  );
}
