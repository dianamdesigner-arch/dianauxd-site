"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

type Product = { id: string; title: string; slug: string; type: string; price: number; status: string; created_at: string };

export default function AdminToolkit() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { load(); }, []);
  async function load() {
    const supabase = createClient();
    const { data } = await supabase.from("toolkit_products").select("id, title, slug, type, price, status, created_at").order("created_at", { ascending: false });
    setProducts(data ?? []); setLoading(false);
  }
  async function del(id: string) {
    if (!confirm("¿Eliminar este producto?")) return;
    const supabase = createClient();
    await supabase.from("toolkit_products").delete().eq("id", id); load();
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: 28, fontWeight: 700 }}>Toolkit</h1>
        <Link href="/admin/toolkit/new" className="btn btn-primary">+ Nuevo producto</Link>
      </div>
      <div style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: 16, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)", textAlign: "left" }}>
              <th style={{ padding: "14px 20px", fontWeight: 600 }}>Título</th>
              <th style={{ padding: "14px 20px", fontWeight: 600 }}>Tipo</th>
              <th style={{ padding: "14px 20px", fontWeight: 600 }}>Precio</th>
              <th style={{ padding: "14px 20px", fontWeight: 600 }}>Status</th>
              <th style={{ padding: "14px 20px", fontWeight: 600, width: 120 }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} style={{ padding: 40, textAlign: "center", color: "var(--text-muted)" }}>Cargando...</td></tr>
            ) : products.length === 0 ? (
              <tr><td colSpan={5} style={{ padding: 40, textAlign: "center", color: "var(--text-muted)" }}>No hay productos aún</td></tr>
            ) : products.map((p) => (
              <tr key={p.id} style={{ borderBottom: "1px solid var(--border)" }}>
                <td style={{ padding: "12px 20px" }}>{p.title}</td>
                <td style={{ padding: "12px 20px", color: "var(--gold)", fontWeight: 600, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.04em" }}>{p.type}</td>
                <td style={{ padding: "12px 20px", fontFamily: "var(--font-serif)", fontWeight: 700, color: "var(--orange)" }}>${p.price}</td>
                <td style={{ padding: "12px 20px" }}>
                  <span style={{ padding: "3px 10px", borderRadius: 12, fontSize: 12, fontWeight: 600, background: p.status === "published" ? "rgba(34,197,94,0.1)" : "var(--bg-alt)", color: p.status === "published" ? "#16a34a" : "var(--text-muted)" }}>{p.status}</span>
                </td>
                <td style={{ padding: "12px 20px" }}>
                  <Link href={`/admin/toolkit/${p.id}`} style={{ color: "var(--orange)", fontWeight: 600, fontSize: 13, marginRight: 12 }}>Editar</Link>
                  <button onClick={() => del(p.id)} style={{ background: "none", border: "none", color: "#dc2626", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
