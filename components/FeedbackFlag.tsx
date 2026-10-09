"use client";
import { useState } from "react";

/**
 * Drapeau rouge de la navigation : une remarque, un clic, et Axel la reçoit.
 *
 * La remarque reste dans la zone de texte tant qu'elle n'est pas partie : une
 * idée qu'on a pris la peine d'écrire ne doit pas disparaître parce que le
 * réseau a hoqueté.
 */
export default function FeedbackFlag({ page }: { page: string }) {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState("");

  async function send() {
    setState("sending");
    setError("");
    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ note, page }),
      });
      if (response.status === 401) {
        window.location.href = "/login";
        return;
      }
      const json = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(json.error || "Envoi impossible.");
      setState("sent");
      setNote("");
      setTimeout(() => {
        setOpen(false);
        setState("idle");
      }, 1800);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Envoi impossible.");
      setState("idle");
    }
  }

  return (
    <div style={{ position: "relative" }}>
      <button
        type="button"
        className="ghost"
        aria-label="Signaler un problème ou une idée"
        aria-expanded={open}
        title="Signaler un problème ou une idée"
        onClick={() => setOpen(!open)}
        style={{ color: "var(--bad, #b91c1c)", borderColor: "var(--bad, #b91c1c)" }}
      >
        <span aria-hidden="true">🚩</span> Signaler
      </button>
      {open && (
        <div
          role="dialog"
          aria-label="Signaler un problème ou une idée"
          className="panel"
          style={{
            position: "absolute",
            right: 0,
            top: "calc(100% + 6px)",
            zIndex: 20,
            width: "min(340px, calc(100vw - 36px))",
          }}
        >
          <label>
            Ta remarque sur l&apos;app
            <textarea
              id="fb-note"
              value={note}
              maxLength={2000}
              onChange={(event) => setNote(event.target.value)}
              placeholder="Ce qui ne marche pas, ou ce que tu aimerais…"
              style={{ minHeight: 110 }}
            />
          </label>
          <p className="muted" style={{ margin: 0 }}>
            Page : <b>{page}</b> · {note.length}/2000
          </p>
          {state === "sent" ? (
            <p style={{ margin: 0 }}>Merci, c&apos;est bien reçu — ta remarque est transmise pour amélioration.</p>
          ) : (
            <div className="row">
              <button onClick={send} disabled={state === "sending" || !note.trim()}>
                {state === "sending" ? "Envoi…" : "Envoyer"}
              </button>
              <button className="ghost" onClick={() => setOpen(false)}>
                Fermer
              </button>
            </div>
          )}
          {error && <p className="error" style={{ margin: 0 }}>{error}</p>}
        </div>
      )}
    </div>
  );
}
