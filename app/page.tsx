"use client";
import { useState } from "react";
import { useAppData } from "@/lib/store";
import { STEPS } from "@/lib/steps";
import Start from "@/components/Start";
import Signup from "@/components/Signup";
import OfferAnalyzer from "@/components/OfferAnalyzer";
import OfferList from "@/components/OfferList";
import Companies from "@/components/Companies";
import Platforms from "@/components/Platforms";
import Profile from "@/components/Profile";
import FeedbackFlag from "@/components/FeedbackFlag";

/*
 * La navigation suit le parcours, dans l'ordre et numérotée : avant, les six
 * onglets se ressemblaient et rien ne disait par quoi commencer. « Mon suivi »
 * et « Profil » viennent après, séparés : ils accompagnent le parcours, ils
 * n'en font pas partie.
 */
const TABS = [
  { id: "home", label: "Par où commencer" },
  ...STEPS.map((step) => ({ id: step.id, label: step.label })),
  { id: "offers", label: "Mon suivi" },
  { id: "profile", label: "Profil" },
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
      <nav className="tabs" aria-label="Parcours">
        {TABS.map((t) => (
          <button key={t.id} aria-current={tab === t.id ? "page" : undefined} onClick={() => setTab(t.id)}>
            {t.label}
          </button>
        ))}
        {/* Le drapeau est a droite de la navigation, donc present partout :
            une remarque se note au moment ou on la pense, pas apres l avoir
            cherchee. `marginLeft: auto` le pousse a droite quand la barre
            tient sur une ligne ; a 360 px il passe simplement a la ligne. */}
        <div style={{ marginLeft: "auto" }}>
          <FeedbackFlag page={TABS.find((t) => t.id === tab)?.label ?? tab} />
        </div>
      </nav>
      {!ready ? (
        <p className="muted">Chargement…</p>
      ) : (
        <>
          {tab === "home" && <Start data={data} go={(t) => setTab(t as Tab)} />}
          {tab === "signup" && <Signup data={data} update={update} />}
          {tab === "apply" && <Companies data={data} update={update} />}
          {tab === "find" && <Platforms />}
          {tab === "write" && <OfferAnalyzer data={data} update={update} onSaved={() => setTab("offers")} />}
          {tab === "offers" && <OfferList data={data} update={update} />}
          {tab === "profile" && <Profile data={data} update={update} />}
        </>
      )}
    </main>
  );
}
