"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className="newsletter-form" onSubmit={handleSubmit}>
      <input
        type="email"
        className="nl-input"
        placeholder="tu@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button className="nl-btn" type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Suscribiendo..." : "Suscribirme al newsletter"}
      </button>
      {status === "success" && (
        <span className="nl-note" style={{ color: "rgba(34,197,94,0.8)" }}>
          &#10003; Suscrito exitosamente
        </span>
      )}
      {status === "error" && (
        <span className="nl-note" style={{ color: "rgba(239,68,68,0.8)" }}>
          Error al suscribir. Intenta de nuevo.
        </span>
      )}
      {status === "idle" && (
        <span className="nl-note">Solo art&iacute;culos nuevos. Nada m&aacute;s.</span>
      )}
    </form>
  );
}
