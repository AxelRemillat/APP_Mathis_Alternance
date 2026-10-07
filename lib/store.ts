"use client";
import { useCallback, useEffect, useState } from "react";
import type { AppData } from "./types";
import { DEFAULT_COMPANIES } from "./targets";
import { DEFAULT_PROFILE } from "./profile";

const KEY = "alternance-mathis-v1";

const initial = (): AppData => ({
  profile: DEFAULT_PROFILE,
  companies: DEFAULT_COMPANIES,
  offers: [],
});

// Données stockées dans le navigateur (un seul utilisateur). Export/import JSON pour sauvegarder.
export function useAppData() {
  const [data, setData] = useState<AppData>(initial);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setData({ ...initial(), ...JSON.parse(raw) });
    } catch {
      /* stockage indisponible : on garde les données par défaut */
    }
    setReady(true);
  }, []);

  const update = useCallback((fn: (d: AppData) => AppData) => {
    setData((prev) => {
      const next = fn(prev);
      try {
        localStorage.setItem(KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  return { data, update, ready };
}

export const uid = () => Math.random().toString(36).slice(2, 10);

export function daysSince(iso?: string) {
  if (!iso) return null;
  return Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
}
