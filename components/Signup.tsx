"use client";
import type { AppData } from "@/lib/types";
import { SIGNUP_PLATFORMS } from "@/lib/steps";
import type { Updater } from "./shared";

/**
 * Étape 1 — les plateformes qui méritent un compte (★★★ et ★★). La case
 * « Inscrit » vit dans le même stockage navigateur que le reste : elle sert à
 * savoir où on en est, pas à prouver quoi que ce soit.
 */
export default function Signup({ data, update }: { data: AppData; update: Updater }) {
  const signups = data.signups ?? [];

  const toggle = (name: string) =>
    update((previous) => {
      const current = previous.signups ?? [];
      return {
        ...previous,
        signups: current.includes(name) ? current.filter((item) => item !== name) : [...current, name],
      };
    });

  const done = SIGNUP_PLATFORMS.filter((platform) => signups.includes(platform.name)).length;

  return (
    <section className="stack">
      <div className="panel">
        <h2>1. S&apos;inscrire</h2>
        <p className="muted">
          {done}/{SIGNUP_PLATFORMS.length} faites. Crée le compte, remplis le profil, puis pose l&apos;alerte — c&apos;est
          l&apos;alerte qui travaille pour toi ensuite.
        </p>
      </div>
      {SIGNUP_PLATFORMS.map((platform) => {
        const registered = signups.includes(platform.name);
        return (
          <article key={platform.name} className="panel item" data-s={registered ? "sent" : undefined}>
            <div className="row" style={{ justifyContent: "space-between" }}>
              <h3 style={{ margin: 0 }}>
                {platform.name}{" "}
                <span className="tag gold" aria-label={`Priorité ${platform.stars} sur 3`}>
                  {"★".repeat(platform.stars)}
                </span>
              </h3>
              <label className="row" style={{ gap: 6 }}>
                <input
                  type="checkbox"
                  checked={registered}
                  onChange={() => toggle(platform.name)}
                  aria-label={`Inscrit sur ${platform.name}`}
                />
                Inscrit
              </label>
            </div>
            <p style={{ margin: 0 }}>{platform.why}</p>
            <p className="muted" style={{ margin: 0 }}>
              <b>À remplir :</b> {platform.fill}
            </p>
            <p className="muted" style={{ margin: 0 }}>
              <b>Alerte à créer :</b> {platform.alerts}
            </p>
            <div className="row links">
              {platform.links.map((link) => (
                <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.label}
                </a>
              ))}
            </div>
          </article>
        );
      })}
    </section>
  );
}
