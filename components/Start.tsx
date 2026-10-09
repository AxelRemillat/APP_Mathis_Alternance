"use client";
import type { AppData } from "@/lib/types";
import { currentStep, progressOf, STEPS } from "@/lib/steps";
import Dashboard from "./Dashboard";

/**
 * « Par où commencer » : les quatre étapes, leur avancement, et un bouton vers
 * celle en cours. Les compteurs d'avant restent dessous — ils servent au suivi,
 * pas à décider quoi faire maintenant.
 */
export default function Start({ data, go }: { data: AppData; go: (tab: string) => void }) {
  const next = currentStep(data);

  return (
    <section className="stack">
      <div className="panel">
        <h2>Par où commencer</h2>
        <p className="muted">Les quatre étapes, dans l&apos;ordre. Reprends là où tu t&apos;es arrêté.</p>
        <div className="stack" style={{ gap: 10 }}>
          {STEPS.map((step, index) => {
            const progress = progressOf(step.id, data);
            const share = progress.total ? Math.round((progress.done / progress.total) * 100) : 0;
            const here = step.id === next.id;
            return (
              <article key={step.id} className="panel item" data-s={here ? "sent" : undefined} style={{ gap: 6 }}>
                <div className="row" style={{ justifyContent: "space-between" }}>
                  <h3 style={{ margin: 0 }}>
                    {step.label} {here && <span className="tag gold">à faire maintenant</span>}
                  </h3>
                  <span className="mono muted">{progress.label}</span>
                </div>
                <p className="muted" style={{ margin: 0 }}>{step.what}</p>
                {/* Barre de progression : un div dans un div, aucune dépendance. */}
                <div
                  aria-label={`Avancement de l'étape ${index + 1}`}
                  style={{ height: 6, borderRadius: 999, background: "var(--line, #e5e7eb)", overflow: "hidden" }}
                >
                  <div style={{ width: `${share}%`, height: "100%", background: "var(--accent, #2563eb)" }} />
                </div>
                <div className="row">
                  <button className={here ? undefined : "ghost"} onClick={() => go(step.id)}>
                    {here ? `Continuer : ${step.title}` : "Ouvrir"}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
      <Dashboard data={data} go={go} />
    </section>
  );
}
