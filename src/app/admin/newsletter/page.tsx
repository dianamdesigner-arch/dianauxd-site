"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Sub = { id: string; email: string; source: string; created_at: string };

export default function AdminNewsletter() {
  const [subs, setSubs] = useState<Sub[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { load(); }, []);
  async function load() {
    const supabase = createClient();
    const { data } = await supabase.from("newsletter_subscribers").select("*").order("created_at", { ascending: false });
    setSubs(data ?? []); setLoading(false);
  }

  function exportCSV() {
    const header = "email,source,fecha\n";
    const rows = subs.map((s) => `${s.email},${s.source},${new Date(s.created_at).toISOString()}`).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "newsletter-subscribers.csv"; a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: 28, fontWeight: 700 }}>Newsletter ({subs.length})</h1>
        {subs.length > 0 && (
          <button onClick={exportCSV} className="btn" style={{ background: "var(--bg-alt)", color: "var(--text-secondary)" }}>Exportar CSV</button>
        )}
      </div>
      <div style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: 16, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)", textAlign: "left" }}>
              <th style={{ padding: "14px 20px", fontWeight: 600 }}>Email</th>
              <th style={{ padding: "14px 20px", fontWeight: 600 }}>Fuente</th>
              <th style={{ padding: "14px 20px", fontWeight: 600 }}>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={3} style={{ padding: 40, textAlign: "center", color: "var(--text-muted)" }}>Cargando...</td></tr>
            ) : subs.length === 0 ? (
              <tr><td colSpan={3} style={{ padding: 40, textAlign: "center", color: "var(--text-muted)" }}>No hay suscriptores aún</td></tr>
            ) : subs.map((s) => (
              <tr key={s.id} style={{ borderBottom: "1px solid var(--border)" }}>
                <td style={{ padding: "12px 20px" }}>{s.email}</td>
                <td style={{ padding: "12px 20px", color: "var(--text-muted)" }}>{s.source}</td>
                <td style={{ padding: "12px 20px", color: "var(--text-muted)" }}>{new Date(s.created_at).toLocaleDateString("es")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
