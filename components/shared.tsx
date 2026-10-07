"use client";
import { useState } from "react";
import { STATUSES, type AppData, type Status } from "@/lib/types";

export type Updater = (fn: (d: AppData) => AppData) => void;

export function CopyButton({ text, label = "Copier" }: { text: string; label?: string }) {
  const [done, setDone] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setDone(true);
      setTimeout(() => setDone(false), 1500);
    } catch {
      /* presse-papiers refusé : l'utilisateur peut sélectionner le texte */
    }
  };
  return (
    <button type="button" className="ghost" onClick={copy}>
      {done ? "Copié" : label}
    </button>
  );
}

export function StatusSelect({ id, value, onChange }: { id: string; value: Status; onChange: (s: Status) => void }) {
  return (
    <select id={id} value={value} onChange={(e) => onChange(e.target.value as Status)} aria-label="Statut">
      {STATUSES.map((s) => (
        <option key={s.id} value={s.id}>
          {s.label}
        </option>
      ))}
    </select>
  );
}

// Passe à « envoyée » : on mémorise la date pour calculer les relances.
export function withStatus<T extends { status: Status; sentAt?: string }>(item: T, s: Status): T {
  const sentAt = s === "sent" && !item.sentAt ? new Date().toISOString() : item.sentAt;
  return { ...item, status: s, sentAt };
}
