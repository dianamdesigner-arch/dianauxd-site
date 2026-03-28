"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

function slugify(t: string) {
  return t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const TYPES = ["diagnostic", "playbook", "template", "workshop"] as const;

export default function ToolkitForm() {
  const params = useParams();
  const action = params.action as string;
  const isNew = action === "new";
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("0");
  const [type, setType] = useState<(typeof TYPES)[number]>("playbook");
  const [features, setFeatures] = useState("");
  const [lemonUrl, setLemonUrl] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isNew) {
      const supabase = createClient();
      supabase.from("toolkit_products").select("*").eq("id", action).single().then(({ data }) => {
        if (data) {
          setTitle(data.title); setSlug(data.slug); setDescription(data.description ?? "");
          setPrice(String(data.price)); setType(data.type); setFeatures((data.features ?? []).join(", "));
          setLemonUrl(data.lemon_squeezy_url ?? ""); setStatus(data.status);
        }
      });
    }
  }, [action, isNew]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setSaving(true);
    const supabase = createClient();
    const record = {
      title, slug, description, price: parseFloat(price) || 0, type,
      features: features.split(",").map((f) => f.trim()).filter(Boolean),
      lemon_squeezy_url: lemonUrl || null, status,
    };
    if (isNew) await supabase.from("toolkit_products").insert(record);
    else await supabase.from("toolkit_products").update(record).eq("id", action);
    setSaving(false); router.push("/admin/toolkit");
  }

  const labelStyle: React.CSSProperties = { display: "block", fontSize: 13, fontWeight: 600, color: "var(--text-secondary)", marginBottom: 6 };
  const inputStyle: React.CSSProperties = { width: "100%", padding: "12px 16px", borderRadius: 10, border: "1.5px solid var(--border)", fontSize: 15, fontFamily: "var(--font-sans)", outline: "none", background: "#fff" };

  return (
    <div>
      <h1 style={{ fontFamily: "var(--font-serif)", fontSize: 28, fontWeight: 700, marginBottom: 24 }}>{isNew ? "Nuevo Producto" : "Editar Producto"}</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
          <div><label style={labelStyle}>Título</label><input value={title} onChange={(e) => { setTitle(e.target.value); if (isNew) setSlug(slugify(e.target.value)); }} required style={inputStyle} /></div>
          <div><label style={labelStyle}>Slug</label><input value={slug} onChange={(e) => setSlug(e.target.value)} required style={inputStyle} /></div>
        </div>
        <div style={{ marginBottom: 16 }}><label style={labelStyle}>Descripción</label><textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} style={{ ...inputStyle, resize: "vertical" }} /></div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 16 }}>
          <div>
            <label style={labelStyle}>Tipo</label>
            <select value={type} onChange={(e) => setType(e.target.value as typeof type)} style={inputStyle}>
              {TYPES.map((t) => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
            </select>
          </div>
          <div><label style={labelStyle}>Precio (USD)</label><input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} style={inputStyle} /></div>
          <div><label style={labelStyle}>Lemon Squeezy URL</label><input value={lemonUrl} onChange={(e) => setLemonUrl(e.target.value)} placeholder="https://..." style={inputStyle} /></div>
        </div>
        <div style={{ marginBottom: 16 }}><label style={labelStyle}>Features (separados por coma)</label><input value={features} onChange={(e) => setFeatures(e.target.value)} placeholder="12 preguntas, 6 dimensiones, PDF" style={inputStyle} /></div>

        <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 24 }}>
          <label style={{ ...labelStyle, marginBottom: 0 }}>Status:</label>
          <button type="button" onClick={() => setStatus(status === "draft" ? "published" : "draft")} style={{ padding: "6px 16px", borderRadius: 8, fontSize: 13, fontWeight: 600, border: "none", cursor: "pointer", background: status === "published" ? "rgba(34,197,94,0.1)" : "var(--bg-alt)", color: status === "published" ? "#16a34a" : "var(--text-muted)" }}>{status === "published" ? "Published" : "Draft"}</button>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <button type="submit" disabled={saving} className="btn btn-primary">{saving ? "Guardando..." : "Guardar"}</button>
          <button type="button" className="btn" style={{ background: "var(--bg-alt)", color: "var(--text-secondary)" }} onClick={() => router.push("/admin/toolkit")}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}
