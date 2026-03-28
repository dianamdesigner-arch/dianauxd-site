"use client";

import { useState } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (res.ok) {
        setStatus("success");
        setName(""); setEmail(""); setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "16px 20px", borderRadius: 12,
    border: "1.5px solid var(--border)", background: "#fff",
    color: "var(--text)", fontFamily: "var(--font-sans)", fontSize: 15, outline: "none",
  };
  const labelStyle: React.CSSProperties = {
    display: "block", fontSize: 13, fontWeight: 600,
    color: "var(--text-secondary)", marginBottom: 8, letterSpacing: "0.02em",
  };

  if (status === "success") {
    return (
      <div style={{ background: "var(--orange-light)", borderRadius: 16, padding: 32, textAlign: "center" }}>
        <div style={{ fontFamily: "var(--font-serif)", fontSize: 22, fontWeight: 600, color: "var(--orange)", marginBottom: 8 }}>Mensaje enviado</div>
        <p style={{ fontSize: 15, color: "var(--text-secondary)" }}>Gracias por escribir. Te responderé pronto.</p>
        <button onClick={() => setStatus("idle")} className="btn btn-primary" style={{ marginTop: 16 }}>Enviar otro mensaje</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <label htmlFor="name" style={labelStyle}>Nombre</label>
        <input id="name" type="text" placeholder="Tu nombre" value={name} onChange={(e) => setName(e.target.value)} required style={inputStyle} />
      </div>
      <div>
        <label htmlFor="email" style={labelStyle}>Email</label>
        <input id="email" type="email" placeholder="tu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required style={inputStyle} />
      </div>
      <div>
        <label htmlFor="message" style={labelStyle}>Mensaje</label>
        <textarea id="message" placeholder="Cuéntame sobre tu proyecto o idea..." rows={6} value={message} onChange={(e) => setMessage(e.target.value)} required style={{ ...inputStyle, resize: "vertical" }} />
      </div>
      {status === "error" && (
        <p style={{ color: "#dc2626", fontSize: 14 }}>Error al enviar. Intenta de nuevo.</p>
      )}
      <button className="btn btn-primary" type="submit" disabled={status === "loading"} style={{ alignSelf: "flex-start" }}>
        {status === "loading" ? "Enviando..." : "Enviar mensaje"}
      </button>
    </form>
  );
}
