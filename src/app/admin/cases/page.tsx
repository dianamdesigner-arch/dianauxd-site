"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

type Case = {
  id: string;
  title: string;
  slug: string;
  status: string;
  created_at: string;
};

export default function AdminCases() {
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadCases(); }, []);

  async function loadCases() {
    const supabase = createClient();
    const { data } = await supabase.from("case_studies").select("id, title, slug, status, created_at").order("created_at", { ascending: false });
    setCases(data ?? []);
    setLoading(false);
  }

  async function deleteCase(id: string) {
    if (!confirm("¿Eliminar este case study?")) return;
    const supabase = createClient();
    await supabase.from("case_studies").delete().eq("id", id);
    loadCases();
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: 28, fontWeight: 700 }}>Case Studies</h1>
        <Link href="/admin/cases/new" className="btn btn-primary">+ Nuevo case study</Link>
      </div>
      <div style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: 16, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)", textAlign: "left" }}>
              <th style={{ padding: "14px 20px", fontWeight: 600 }}>Título</th>
              <th style={{ padding: "14px 20px", fontWeight: 600 }}>Status</th>
              <th style={{ padding: "14px 20px", fontWeight: 600 }}>Fecha</th>
              <th style={{ padding: "14px 20px", fontWeight: 600, width: 120 }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={4} style={{ padding: 40, textAlign: "center", color: "var(--text-muted)" }}>Cargando...</td></tr>
            ) : cases.length === 0 ? (
              <tr><td colSpan={4} style={{ padding: 40, textAlign: "center", color: "var(--text-muted)" }}>No hay case studies aún</td></tr>
            ) : cases.map((c) => (
              <tr key={c.id} style={{ borderBottom: "1px solid var(--border)" }}>
                <td style={{ padding: "12px 20px" }}>{c.title}</td>
                <td style={{ padding: "12px 20px" }}>
                  <span style={{ padding: "3px 10px", borderRadius: 12, fontSize: 12, fontWeight: 600, background: c.status === "published" ? "rgba(34,197,94,0.1)" : "var(--bg-alt)", color: c.status === "published" ? "#16a34a" : "var(--text-muted)" }}>{c.status}</span>
                </td>
                <td style={{ padding: "12px 20px", color: "var(--text-muted)" }}>{new Date(c.created_at).toLocaleDateString("es")}</td>
                <td style={{ padding: "12px 20px" }}>
                  <Link href={`/admin/cases/${c.id}`} style={{ color: "var(--orange)", fontWeight: 600, fontSize: 13, marginRight: 12 }}>Editar</Link>
                  <button onClick={() => deleteCase(c.id)} style={{ background: "none", border: "none", color: "#dc2626", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
