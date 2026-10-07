"use client";
import { useState } from "react";

export default function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user, password }),
    });
    const json = await res.json().catch(() => ({}));
    setLoading(false);
    if (!res.ok) return setError(json.error || "Connexion impossible.");
    window.location.href = "/";
  }

  return (
    <main className="wrap" style={{ maxWidth: 420, paddingBlock: "12vh 40px" }}>
      <span className="eyebrow">Alternance banque &amp; assurance · Lyon</span>
      <h1>Connexion</h1>
      <form className="panel" onSubmit={submit}>
        <label>Identifiant
          <input id="l-user" autoComplete="username" value={user} onChange={(e) => setUser(e.target.value)} required />
        </label>
        <label>Mot de passe
          <input id="l-pwd" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <button type="submit" disabled={loading}>{loading ? "Connexion…" : "Se connecter"}</button>
        {error && <p className="error">{error}</p>}
      </form>
    </main>
  );
}
