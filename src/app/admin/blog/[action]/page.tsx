"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import RichTextEditor from "@/components/admin/RichTextEditor";

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function BlogForm() {
  const params = useParams();
  const action = params.action as string;
  const isNew = action === "new";
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [tags, setTags] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isNew) {
      const supabase = createClient();
      supabase
        .from("blog_posts")
        .select("*")
        .eq("id", action)
        .single()
        .then(({ data }) => {
          if (data) {
            setTitle(data.title);
            setSlug(data.slug);
            setContent(data.content ?? "");
            setExcerpt(data.excerpt ?? "");
            setCoverImage(data.cover_image ?? "");
            setTags((data.tags ?? []).join(", "));
            setStatus(data.status);
          }
        });
    }
  }, [action, isNew]);

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();

    if (!res.ok) {
      alert("Error uploading image: " + data.error);
      setUploading(false);
      return;
    }

    setCoverImage(data.url);
    setUploading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const supabase = createClient();

    const record = {
      title,
      slug,
      content,
      excerpt,
      cover_image: coverImage || null,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      status,
      published_at:
        status === "published" ? new Date().toISOString() : null,
    };

    if (isNew) {
      await supabase.from("blog_posts").insert(record);
    } else {
      await supabase.from("blog_posts").update(record).eq("id", action);
    }

    setSaving(false);
    router.push("/admin/blog");
  }

  return (
    <div>
      <h1
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: 28,
          fontWeight: 700,
          marginBottom: 24,
        }}
      >
        {isNew ? "Nuevo Post" : "Editar Post"}
      </h1>

      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
            marginBottom: 16,
          }}
        >
          <div>
            <label style={labelStyle}>Título</label>
            <input
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (isNew) setSlug(slugify(e.target.value));
              }}
              required
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Slug</label>
            <input
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
              style={inputStyle}
            />
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={labelStyle}>Excerpt</label>
          <input
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
            marginBottom: 16,
          }}
        >
          <div>
            <label style={labelStyle}>Tags (separados por coma)</label>
            <input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="IA, LATAM, Liderazgo"
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Cover Image</label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
            <div style={{ display: "flex", gap: 8 }}>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                style={{
                  ...inputStyle,
                  cursor: "pointer",
                  textAlign: "left",
                  color: uploading ? "var(--text-muted)" : coverImage ? "#16a34a" : "var(--text-secondary)",
                  flex: 1,
                }}
              >
                {uploading ? "Subiendo..." : coverImage ? "Imagen subida ✓" : "Seleccionar imagen..."}
              </button>
              {coverImage && (
                <button
                  type="button"
                  onClick={() => setCoverImage("")}
                  style={{
                    padding: "0 12px",
                    borderRadius: 10,
                    border: "1.5px solid var(--border)",
                    background: "#fff",
                    cursor: "pointer",
                    fontSize: 13,
                    color: "var(--text-muted)",
                  }}
                >
                  ✕
                </button>
              )}
            </div>
            {coverImage && (
              <img
                src={coverImage}
                alt="Cover preview"
                style={{
                  marginTop: 8,
                  maxHeight: 120,
                  borderRadius: 8,
                  objectFit: "cover",
                }}
              />
            )}
          </div>
        </div>

        {/* Rich Text Editor */}
        <div style={{ marginBottom: 16 }}>
          <label style={labelStyle}>Contenido</label>
          <RichTextEditor content={content} onChange={setContent} />
        </div>

        {/* Status Toggle */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 24,
            padding: "16px 20px",
            background: "var(--bg-alt)",
            borderRadius: 12,
          }}
        >
          <label style={{ ...labelStyle, marginBottom: 0, fontSize: 14 }}>Status:</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as "draft" | "published")}
            style={{
              padding: "8px 16px",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
              border: "1.5px solid var(--border)",
              cursor: "pointer",
              background: status === "published" ? "rgba(34,197,94,0.1)" : "#fff",
              color: status === "published" ? "#16a34a" : "var(--text-secondary)",
            }}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
          {status === "published" && (
            <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
              Se publicará con fecha de hoy
            </span>
          )}
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <button
            type="submit"
            disabled={saving}
            className="btn btn-primary"
          >
            {saving ? "Guardando..." : "Guardar"}
          </button>
          <button
            type="button"
            className="btn"
            style={{
              background: "var(--bg-alt)",
              color: "var(--text-secondary)",
            }}
            onClick={() => router.push("/admin/blog")}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 13,
  fontWeight: 600,
  color: "var(--text-secondary)",
  marginBottom: 6,
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 16px",
  borderRadius: 10,
  border: "1.5px solid var(--border)",
  fontSize: 15,
  fontFamily: "var(--font-sans)",
  outline: "none",
  background: "#fff",
};
