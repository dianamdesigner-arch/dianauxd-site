"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

type Post = {
  id: string;
  title: string;
  slug: string;
  status: string;
  published_at: string | null;
  created_at: string;
};

export default function AdminBlog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    const supabase = createClient();
    const { data } = await supabase
      .from("blog_posts")
      .select("id, title, slug, status, published_at, created_at")
      .order("created_at", { ascending: false });
    setPosts(data ?? []);
    setLoading(false);
  }

  async function deletePost(id: string) {
    if (!confirm("¿Eliminar este post?")) return;
    const supabase = createClient();
    await supabase.from("blog_posts").delete().eq("id", id);
    loadPosts();
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: 28,
            fontWeight: 700,
          }}
        >
          Blog Posts
        </h1>
        <Link href="/admin/blog/new" className="btn btn-primary">
          + Nuevo post
        </Link>
      </div>

      <div
        style={{
          background: "#fff",
          border: "1px solid var(--border)",
          borderRadius: 16,
          overflow: "hidden",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: 14,
          }}
        >
          <thead>
            <tr
              style={{
                borderBottom: "1px solid var(--border)",
                textAlign: "left",
              }}
            >
              <th style={{ padding: "14px 20px", fontWeight: 600 }}>Título</th>
              <th style={{ padding: "14px 20px", fontWeight: 600 }}>Status</th>
              <th style={{ padding: "14px 20px", fontWeight: 600 }}>Fecha</th>
              <th style={{ padding: "14px 20px", fontWeight: 600, width: 120 }}>
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} style={{ padding: 40, textAlign: "center", color: "var(--text-muted)" }}>
                  Cargando...
                </td>
              </tr>
            ) : posts.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ padding: 40, textAlign: "center", color: "var(--text-muted)" }}>
                  No hay posts aún
                </td>
              </tr>
            ) : (
              posts.map((p) => (
                <tr
                  key={p.id}
                  style={{ borderBottom: "1px solid var(--border)" }}
                >
                  <td style={{ padding: "12px 20px" }}>{p.title}</td>
                  <td style={{ padding: "12px 20px" }}>
                    <span
                      style={{
                        padding: "3px 10px",
                        borderRadius: 12,
                        fontSize: 12,
                        fontWeight: 600,
                        background:
                          p.status === "published"
                            ? "rgba(34,197,94,0.1)"
                            : "var(--bg-alt)",
                        color:
                          p.status === "published"
                            ? "#16a34a"
                            : "var(--text-muted)",
                      }}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td
                    style={{
                      padding: "12px 20px",
                      color: "var(--text-muted)",
                    }}
                  >
                    {new Date(p.created_at).toLocaleDateString("es")}
                  </td>
                  <td style={{ padding: "12px 20px" }}>
                    <Link
                      href={`/admin/blog/${p.id}`}
                      style={{
                        color: "var(--orange)",
                        fontWeight: 600,
                        fontSize: 13,
                        marginRight: 12,
                      }}
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => deletePost(p.id)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#dc2626",
                        fontWeight: 600,
                        fontSize: 13,
                        cursor: "pointer",
                      }}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
