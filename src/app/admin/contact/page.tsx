"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Msg = { id: string; name: string; email: string; message: string; created_at: string };

export default function AdminContact() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { load(); }, []);
  async function load() {
    const supabase = createClient();
    const { data } = await supabase.from("contact_submissions").select("*").order("created_at", { ascending: false });
    setMessages(data ?? []); setLoading(false);
  }

  return (
    <div>
      <h1 style={{ fontFamily: "var(--font-serif)", fontSize: 28, fontWeight: 700, marginBottom: 24 }}>Mensajes de contacto</h1>
      {loading ? (
        <p style={{ color: "var(--text-muted)" }}>Cargando...</p>
      ) : messages.length === 0 ? (
        <div style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: 16, padding: 40, textAlign: "center", color: "var(--text-muted)" }}>No hay mensajes aún</div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {messages.map((m) => (
            <div key={m.id} style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: 16, padding: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                <div>
                  <span style={{ fontWeight: 600, color: "var(--text)" }}>{m.name}</span>
                  <span style={{ color: "var(--text-muted)", fontSize: 13, marginLeft: 12 }}>{m.email}</span>
                </div>
                <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{new Date(m.created_at).toLocaleDateString("es", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}</span>
              </div>
              <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6, whiteSpace: "pre-wrap" }}>{m.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
