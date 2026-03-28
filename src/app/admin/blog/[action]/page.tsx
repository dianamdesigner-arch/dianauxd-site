"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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
  const [showPreview, setShowPreview] = useState(false);

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
            <label style={labelStyle}>Cover Image URL</label>
            <input
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              style={inputStyle}
            />
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 6,
            }}
          >
            <label style={{ ...labelStyle, marginBottom: 0 }}>
              Contenido (Markdown)
            </label>
            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              style={{
                background: "none",
                border: "none",
                fontSize: 13,
                fontWeight: 600,
                color: "var(--orange)",
                cursor: "pointer",
              }}
            >
              {showPreview ? "Editar" : "Preview"}
            </button>
          </div>
          {showPreview ? (
            <div
              style={{
                background: "#fff",
                border: "1.5px solid var(--border)",
                borderRadius: 12,
                padding: 20,
                minHeight: 300,
                fontSize: 15,
                lineHeight: 1.7,
                color: "var(--text-secondary)",
              }}
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content}
              </ReactMarkdown>
            </div>
          ) : (
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={16}
              style={{
                ...inputStyle,
                fontFamily: "var(--font-mono)",
                fontSize: 14,
                lineHeight: 1.6,
                resize: "vertical",
              }}
            />
          )}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginBottom: 24,
          }}
        >
          <label style={{ ...labelStyle, marginBottom: 0 }}>Status:</label>
          <button
            type="button"
            onClick={() =>
              setStatus(status === "draft" ? "published" : "draft")
            }
            style={{
              padding: "6px 16px",
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
              background:
                status === "published"
                  ? "rgba(34,197,94,0.1)"
                  : "var(--bg-alt)",
              color:
                status === "published" ? "#16a34a" : "var(--text-muted)",
            }}
          >
            {status === "published" ? "Published" : "Draft"}
          </button>
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
