"use client";
import type { Analysis } from "@/lib/types";
import { CopyButton } from "./shared";

function List({ title, items }: { title: string; items: string[] }) {
  if (!items.length) return null;
  return (
    <div className="stack">
      <h3>{title}</h3>
      <ul className="clean">
        {items.map((x, i) => (
          <li key={i}>{x}</li>
        ))}
      </ul>
    </div>
  );
}

export default function AnalysisView({ a }: { a: Analysis }) {
  const tone = a.score >= 8 ? "high" : a.score <= 4 ? "low" : "";
  return (
    <div className="stack">
      <div className="row">
        <span className={`score ${tone}`}>{a.score}/10</span>
        <p>{a.verdict}</p>
      </div>
      {a.redFlags.length > 0 && <div className="error">{a.redFlags.join(" · ")}</div>}
      <div className="grid">
        <List title="À mettre en avant" items={a.strengths} />
        <List title="Écarts à compenser" items={a.gaps} />
        <List title="Mots-clés à reprendre" items={a.keywords} />
        <List title="Questions pour l'entretien" items={a.questions} />
      </div>
      <div className="stack">
        <div className="row"><h3>E-mail de candidature</h3><CopyButton text={a.coverEmail} /></div>
        <pre className="text">{a.coverEmail}</pre>
      </div>
      {a.coverLetter && (
        <div className="stack">
          <div className="row"><h3>Lettre de motivation adaptée</h3><CopyButton text={a.coverLetter} /></div>
          <pre className="text">{a.coverLetter}</pre>
        </div>
      )}
      <div className="stack">
        <div className="row">
          <h3>Note LinkedIn</h3>
          <span className="muted mono">{a.linkedinNote.length}/300</span>
          <CopyButton text={a.linkedinNote} />
        </div>
        <pre className="text">{a.linkedinNote}</pre>
      </div>
    </div>
  );
}
