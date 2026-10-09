"use client";
import { KEYWORDS, LINKEDIN_QUERY, PROFILE_KIT, ROUTINE, type Platform } from "@/lib/platforms";
import { SEARCH_PLATFORMS } from "@/lib/steps";
import { CopyButton } from "./shared";

const stars = (n: number) => "★".repeat(n) + "☆".repeat(3 - n);

function PlatformCard({ p }: { p: Platform }) {
  return (
    <article className="panel">
      <div className="row" style={{ justifyContent: "space-between", width: "100%" }}>
        <h3>{p.name}</h3>
        <span className="tag gold" aria-label={`Priorité ${p.stars} sur 3`}>{stars(p.stars)}</span>
      </div>
      <p>{p.why}</p>
      <p className="muted"><b>À remplir :</b> {p.fill}</p>
      <p className="muted"><b>Alertes :</b> {p.alerts}</p>
      <div className="row links">
        {p.links.map((l) => (
          <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer">{l.label}</a>
        ))}
      </div>
    </article>
  );
}

function ProfileKit() {
  const k = PROFILE_KIT;
  return (
    <div className="panel">
      <h2>Ce que tu remplis partout</h2>
      <div className="stack">
        <div className="row"><b>Titre</b><CopyButton text={k.title} /></div>
        <p className="muted">{k.title}</p>
      </div>
      <div className="stack">
        <div className="row"><b>Disponibilité</b><CopyButton text={k.availability} /></div>
        <p className="muted">{k.availability}</p>
      </div>
      <div className="stack">
        <div className="row"><b>Accroche</b><CopyButton text={k.pitch} /></div>
        <p className="muted">{k.pitch}</p>
      </div>
      <div className="stack">
        <b>Compétences clés</b>
        <div className="row">
          {k.skills.map((s) => <span key={s} className="tag">{s}</span>)}
        </div>
      </div>
      <div className="stack">
        <b>Documents</b>
        <ul className="clean">{k.documents.map((d) => <li key={d}>{d}</li>)}</ul>
      </div>
    </div>
  );
}

function Keywords() {
  return (
    <div className="panel">
      <h2>Mots-clés de recherche</h2>
      <ul className="clean keywords">
        {KEYWORDS.map((k) => (
          <li key={k} className="row" style={{ justifyContent: "space-between" }}>
            <span>{k}</span>
            <CopyButton text={k} />
          </li>
        ))}
      </ul>
      <b>Requête LinkedIn prête à copier</b>
      <pre className="text">{LINKEDIN_QUERY}</pre>
      <CopyButton text={LINKEDIN_QUERY} label="Copier la requête" />
    </div>
  );
}

function Routine() {
  return (
    <div className="panel">
      <h2>Ma routine</h2>
      <ol className="clean">
        {ROUTINE.map((step) => <li key={step}>{step}</li>)}
      </ol>
    </div>
  );
}

export default function Platforms() {
  return (
    <section className="stack">
      <Routine />
      <div className="grid">
        {/* Étape 3 : les sources secondaires. Celles qui méritent un compte
            sont à l étape 1, avec leur case « Inscrit ». */}
        {SEARCH_PLATFORMS.map((p) => <PlatformCard key={p.name} p={p} />)}
      </div>
      <div className="grid">
        <ProfileKit />
        <Keywords />
      </div>
    </section>
  );
}
