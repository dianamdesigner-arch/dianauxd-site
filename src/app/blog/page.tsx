import type { Metadata } from "next";
import Link from "next/link";
import { getPublishedPosts } from "@/lib/supabase/queries";

export const metadata: Metadata = {
  title: "Blog — Diana Perez",
  description:
    "Artículos sobre diseño de producto, IA aplicada con criterio, y liderazgo en LATAM.",
};

const FALLBACK_POSTS = [
  {
    slug: "triple-diamond-flujo-vivo",
    tags: ["IA + Diseño"],
    published_at: "2026-03-15",
    title: "El Triple Diamond no es un proceso, es un flujo vivo",
    excerpt: "Repensar el framework más usado en diseño desde la realidad de equipos con recursos limitados y presión constante. ¿Qué pasa cuando el diamante se deforma por restricciones reales?",
  },
  {
    slug: "ia-democratiza-capacidades",
    tags: ["LATAM"],
    published_at: "2026-03-10",
    title: "La IA democratiza capacidades, no reemplaza criterio",
    excerpt: "Para diseñadores en LATAM que operan con restricciones reales, la IA no es lujo: es infraestructura cognitiva. Cómo integrarla sin perder lo que nos hace valiosos.",
  },
  {
    slug: "niveles-influencia-madurez",
    tags: ["Liderazgo"],
    published_at: "2026-02-20",
    title: "Niveles de influencia del diseñador y madurez organizacional",
    excerpt: "Crucé el modelo de madurez de NN/g con los niveles de influencia que he observado en la práctica profesional.",
  },
];

function tagClass(tag: string) {
  if (tag.includes("IA") || tag.includes("Diseño") || tag.includes("Recovery")) return "tag-orange";
  if (tag.includes("LATAM") || tag.includes("Lending") || tag.includes("Fintech")) return "tag-gold";
  return "tag-dark";
}

export default async function BlogPage() {
  const dbPosts = await getPublishedPosts();
  const posts = dbPosts ?? FALLBACK_POSTS;

  return (
    <>
      <section style={{ padding: "140px 40px 60px", maxWidth: 1120, margin: "0 auto" }}>
        <div className="hero-overline fade-in">Blog</div>
        <h1 className="hero-title fade-in fade-in-d1">Últimos <span>artículos</span></h1>
        <p className="hero-desc fade-in fade-in-d2">
          Escribo sobre diseño de producto, IA aplicada con criterio, y la realidad de liderar en LATAM. Sin spam, sin frases bonitas.
        </p>
      </section>

      <section className="blog" style={{ paddingTop: 0 }}>
        <div className="blog-grid">
          {posts.map((p) => (
            <Link href={`/blog/${p.slug}`} className="blog-card" key={p.slug} style={{ textDecoration: "none" }}>
              <div className="blog-card-top">
                <span className={`tag ${tagClass(p.tags?.[0] ?? "")}`}>{p.tags?.[0] ?? ""}</span>
                <span className="blog-card-meta">{p.published_at ? new Date(p.published_at).toLocaleDateString("es", { month: "short", year: "numeric" }) : ""}</span>
              </div>
              <h3 className="blog-card-title">{p.title}</h3>
              <p className="blog-card-desc">{p.excerpt}</p>
              <span className="blog-card-read">Leer artículo →</span>
            </Link>
          ))}
        </div>

        <div style={{ textAlign: "center", padding: "64px 0 0" }}>
          <p style={{ fontFamily: "var(--font-serif)", fontSize: 22, fontWeight: 600, color: "var(--orange)", marginBottom: 10 }}>Más artículos próximamente</p>
          <p style={{ fontSize: 15, color: "var(--text-muted)", maxWidth: 420, margin: "0 auto" }}>
            Estoy trabajando en nuevos artículos sobre diseño estratégico, operaciones de diseño y liderazgo en fintech.
          </p>
        </div>
      </section>
    </>
  );
}
