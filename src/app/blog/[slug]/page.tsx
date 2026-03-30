import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/supabase/queries";

const POSTS: Record<string, {
  title: string; tag: { label: string; cls: string }; date: string; readTime: string;
  intro: string; sections: { heading: string; content: string }[];
}> = {
  "triple-diamond-flujo-vivo": {
    title: "El Triple Diamond no es un proceso, es un flujo vivo",
    tag: { label: "IA + Diseño", cls: "tag-orange" },
    date: "Marzo 2026", readTime: "8 min",
    intro: "Repensar el framework más usado en diseño desde la realidad de equipos con recursos limitados y presión constante. ¿Qué pasa cuando el diamante se deforma por restricciones reales?",
    sections: [
      { heading: "El problema con el diamante perfecto", content: "Todos aprendimos el Double (o Triple) Diamond como una secuencia limpia: divergir, converger, repetir. Pero en la práctica real — especialmente en fintech, con regulación, plazos de compliance, y equipos distribuidos — los diamantes se deforman. Se solapan. A veces ni siquiera son diamantes." },
      { heading: "Lo que el framework no te dice", content: "El Triple Diamond asume recursos infinitos y tiempo ilimitado. Asume que puedes divergir antes de converger. Pero cuando tienes 2 semanas para un MVP regulado, la divergencia es un lujo que no te puedes dar de la manera tradicional. Lo que sí puedes hacer es comprimir: usar IA para acelerar el descubrimiento, prototipar en horas en vez de días, y validar con datos existentes antes de hablar con usuarios." },
      { heading: "Un flujo, no un proceso", content: "La propuesta es dejar de tratar el Triple Diamond como un proceso lineal y empezar a verlo como un flujo adaptativo. Cada proyecto tiene su propia forma. El valor del framework está en los principios (divergir/converger, separar problema de solución) no en la secuencia. Cuando internalizas los principios, puedes adaptarlos a cualquier restricción." },
      { heading: "Implicaciones para equipos en LATAM", content: "Para diseñadores en LATAM que operan con restricciones reales de presupuesto, tiempo, y madurez organizacional, entender el Triple Diamond como flujo y no como proceso es liberador. Te permite justificar decisiones de diseño sin necesidad de seguir un script, y te da la flexibilidad de adaptar tu proceso a la realidad de tu equipo." },
    ],
  },
  "ia-democratiza-capacidades": {
    title: "La IA democratiza capacidades, no reemplaza criterio",
    tag: { label: "LATAM", cls: "tag-gold" },
    date: "Marzo 2026", readTime: "6 min",
    intro: "Para diseñadores en LATAM que operan con restricciones reales, la IA no es lujo: es infraestructura cognitiva. Cómo integrarla sin perder lo que nos hace valiosos.",
    sections: [
      { heading: "La narrativa del reemplazo es lazy thinking", content: "La conversación dominante sobre IA y diseño se centra en si nos va a reemplazar. Esa pregunta es la equivocada. La pregunta correcta es: ¿qué capacidades me da que antes no tenía, y cómo las uso sin perder lo que me hace valioso?" },
      { heading: "IA como infraestructura cognitiva", content: "Para un diseñador en LATAM con presupuesto limitado para research, herramientas, y formación, la IA es infraestructura cognitiva. Te da acceso a capacidades de análisis, síntesis, y prototipado que antes requerían equipos dedicados. No reemplaza tu criterio — lo amplifica. Pero solo si sabes qué preguntar y cómo evaluar lo que recibes." },
      { heading: "El framework AREC", content: "Propongo un framework de 4 capas para integrar IA en el flujo de diseño: Absorb (consumir información a escala), Retain (filtrar y organizar con criterio), Execute (producir artefactos con velocidad), y Communicate (traducir decisiones a lenguaje que convence). En cada capa, la IA tiene un rol específico y limitado." },
      { heading: "Lo que la IA no puede hacer por ti", content: "La IA no puede tener contexto organizacional. No puede leer la política de la sala. No puede sentir la fricción de un flujo real en un teléfono con lag y datos limitados. No puede decidir qué es lo correcto para un usuario vulnerable. Eso es tu trabajo. Y eso es lo que te hace invaluable." },
    ],
  },
  "niveles-influencia-madurez": {
    title: "Niveles de influencia del diseñador y madurez organizacional",
    tag: { label: "Liderazgo", cls: "tag-dark" },
    date: "Febrero 2026", readTime: "10 min",
    intro: "Crucé el modelo de madurez de NN/g con los niveles de influencia que he observado en la práctica profesional. El resultado es un mapa que ayuda a entender dónde estás y hacia dónde puedes moverte.",
    sections: [
      { heading: "Dos ejes que se cruzan", content: "El modelo de madurez UX de NN/g te dice qué tan madura es la práctica de diseño en tu organización. Pero no te dice nada sobre tu influencia personal dentro de esa estructura. Puedes estar en una organización madura y tener cero influencia. O puedes estar en una organización inmadura y ser la persona que mueve las cosas." },
      { heading: "Los 5 niveles de influencia", content: "De mi experiencia liderando equipos de diseño en contextos muy diferentes, he identificado 5 niveles: Ejecutor (haces lo que te piden), Contribuidor (aportas pero no defines), Facilitador (facilitas decisiones), Estratega (co-defines dirección), y Líder sistémico (defines sistemas, no features). Cada nivel requiere habilidades diferentes y genera impacto diferente." },
      { heading: "La matriz completa", content: "Cuando cruzas los 5 niveles de madurez con los 5 niveles de influencia, obtienes 25 escenarios posibles. Algunos son naturales (organización madura + influencia alta), otros son tensiones productivas (organización inmadura + influencia alta = oportunidad de ser catalizador), y otros son trampas (organización madura + influencia baja = desperdicio de potencial)." },
      { heading: "Cómo usarlo", content: "El diagnóstico no es un juicio sino un mapa. Te ayuda a entender por qué te sientes frustrado (probablemente hay un desbalance entre tu nivel y el de tu org), a identificar el siguiente paso concreto (no \"ser más estratégico\" sino acciones específicas), y a comunicar tu valor en lenguaje que tu organización entiende." },
    ],
  },
};

const SLUGS = Object.keys(POSTS);

export async function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = POSTS[slug];
  if (!post) return { title: "Not Found" };
  return { title: `${post.title} — Diana Perez`, description: post.intro.slice(0, 160) };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Try Supabase first, fallback to hardcoded
  const dbPost = await getPostBySlug(slug);
  if (dbPost) {
    return (
      <>
        <section style={{ padding: "140px 40px 0", maxWidth: 760, margin: "0 auto" }}>
          <Link href="/blog" className="about-link" style={{ marginBottom: 24, display: "inline-flex" }}>← Volver al Blog</Link>
          <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 16 }}>
            {(dbPost.tags ?? []).map((t: string) => <span className="tag tag-orange" key={t}>{t}</span>)}
            <span style={{ fontSize: 13, color: "var(--text-muted)" }}>{dbPost.published_at ? new Date(dbPost.published_at).toLocaleDateString("es", { month: "long", year: "numeric" }) : ""}</span>
          </div>
          <h1 className="hero-title fade-in" style={{ fontSize: 40, marginBottom: 20 }}>{dbPost.title}</h1>
          {dbPost.excerpt && <p className="hero-desc fade-in fade-in-d1" style={{ fontSize: 18, lineHeight: 1.7, marginBottom: 48 }}>{dbPost.excerpt}</p>}
          <div style={{ borderBottom: "1px solid var(--border)", marginBottom: 48 }} />
        </section>
        <section style={{ padding: "0 40px 80px", maxWidth: 760, margin: "0 auto", fontSize: 16, color: "var(--text-secondary)", lineHeight: 1.75 }}>
          <style>{`
            .prose h1 { font-family: var(--font-serif); font-size: 28px; font-weight: 700; margin: 32px 0 12px; color: var(--text-primary); }
            .prose h2 { font-family: var(--font-serif); font-size: 24px; font-weight: 600; color: var(--orange); letter-spacing: -0.02em; margin: 28px 0 14px; }
            .prose h3 { font-family: var(--font-serif); font-size: 20px; font-weight: 600; margin: 24px 0 10px; color: var(--text-primary); }
            .prose p { margin: 0 0 16px; }
            .prose ul, .prose ol { padding-left: 24px; margin: 0 0 16px; }
            .prose li { margin-bottom: 6px; }
            .prose blockquote { border-left: 3px solid var(--orange); padding-left: 16px; margin: 20px 0; color: var(--text-muted); font-style: italic; }
            .prose a { color: var(--orange); text-decoration: underline; }
            .prose img { max-width: 100%; border-radius: 8px; margin: 20px 0; }
            .prose strong { font-weight: 600; color: var(--text-primary); }
          `}</style>
          <div className="prose" dangerouslySetInnerHTML={{ __html: dbPost.content ?? "" }} />
        </section>
      </>
    );
  }

  const post = POSTS[slug];
  if (!post) notFound();

  const otherSlugs = SLUGS.filter((s) => s !== slug);

  return (
    <>
      {/* Hero */}
      <section style={{ padding: "140px 40px 0", maxWidth: 760, margin: "0 auto" }}>
        <Link href="/blog" className="about-link" style={{ marginBottom: 24, display: "inline-flex" }}>← Volver al Blog</Link>
        <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 16 }}>
          <span className={`tag ${post.tag.cls}`}>{post.tag.label}</span>
          <span style={{ fontSize: 13, color: "var(--text-muted)" }}>{post.date}</span>
          <span style={{ fontSize: 13, color: "var(--text-muted)" }}>{post.readTime} lectura</span>
        </div>
        <h1 className="hero-title fade-in" style={{ fontSize: 40, marginBottom: 20 }}>{post.title}</h1>
        <p className="hero-desc fade-in fade-in-d1" style={{ fontSize: 18, lineHeight: 1.7, marginBottom: 48 }}>{post.intro}</p>
        <div style={{ borderBottom: "1px solid var(--border)", marginBottom: 48 }} />
      </section>

      {/* Content */}
      <section style={{ padding: "0 40px 80px", maxWidth: 760, margin: "0 auto" }}>
        {post.sections.map((sec, i) => (
          <div key={i} style={{ marginBottom: 40 }}>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: 24, fontWeight: 600, color: "var(--orange)", letterSpacing: "-0.02em", marginBottom: 14 }}>{sec.heading}</h2>
            <p style={{ fontSize: 16, color: "var(--text-secondary)", lineHeight: 1.75 }}>{sec.content}</p>
          </div>
        ))}
      </section>

      {/* Related posts */}
      <section className="blog" style={{ background: "var(--bg-alt)", padding: "64px 40px" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <div className="section-header">
            <div>
              <div className="section-overline">Más artículos</div>
              <h2 className="section-title">También te puede interesar</h2>
            </div>
          </div>
          <div className="blog-grid" style={{ gridTemplateColumns: `repeat(${otherSlugs.length}, 1fr)` }}>
            {otherSlugs.map((os) => {
              const other = POSTS[os];
              return (
                <Link href={`/blog/${os}`} className="blog-card" key={os} style={{ textDecoration: "none" }}>
                  <div className="blog-card-top">
                    <span className={`tag ${other.tag.cls}`}>{other.tag.label}</span>
                    <span className="blog-card-meta">{other.date}</span>
                  </div>
                  <h3 className="blog-card-title">{other.title}</h3>
                  <p className="blog-card-desc">{other.intro.slice(0, 120)}...</p>
                  <span className="blog-card-read">Leer artículo →</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
