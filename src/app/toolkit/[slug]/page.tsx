import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/supabase/queries";

const PRODUCTS: Record<string, {
  title: string; type: string; price: string; desc: string;
  features: string[]; longDesc: string; linkToDiag?: string;
}> = {
  "diagnostico-madurez-ux": {
    title: "Madurez UX × Niveles de Influencia",
    type: "Diagnóstico interactivo",
    price: "$35 USD",
    desc: "Evalúa la madurez de diseño de tu organización y descubre tu nivel de influencia real. 12 preguntas, resultado personalizado con radar chart y roadmap de siguientes pasos.",
    features: ["12 preguntas", "6 dimensiones", "Radar chart", "Roadmap personalizado", "PDF descargable"],
    longDesc: "Este diagnóstico cruza el modelo de madurez UX de NN/g con los niveles de influencia observados en la práctica profesional. En ~5 minutos obtienes un mapa claro de dónde estás y hacia dónde puedes moverte, con recomendaciones concretas y un roadmap de 3 pasos basado en tus dimensiones más débiles.",
    linkToDiag: "/diagnostico-madurez-ux",
  },
  "diagnostico-empresarial": {
    title: "Design Readiness Assessment",
    type: "Diagnóstico para empresas",
    price: "$45 USD",
    desc: "¿Qué tan lista está tu empresa para escalar diseño? Evalúa 6 dimensiones organizacionales con preguntas adaptadas a tu rol.",
    features: ["Adaptado por rol (Founder/CPO)", "6 dimensiones", "Gap analysis", "Roadmap de acción", "Recomendación de inversión"],
    longDesc: "Creado para founders, CPOs y VPs de producto que necesitan evaluar si su organización está lista para escalar diseño. Las preguntas se adaptan a tu rol para darte insights relevantes. Incluye gap analysis, roadmap de acción, y recomendaciones específicas de inversión.",
    linkToDiag: "/diagnostico-empresarial",
  },
  "playbook-ia-diseno": {
    title: "Integrar IA en tu flujo de diseño con criterio",
    type: "Playbook",
    price: "$55 USD",
    desc: "Framework de 4 capas (Absorb, Retain, Execute, Communicate) con implementación paso a paso. 30+ páginas con casos reales y ejercicios.",
    features: ["Framework AREC de 4 capas", "30+ páginas", "Casos reales", "Ejercicios prácticos", "Templates descargables"],
    longDesc: "No es un tutorial de herramientas — es un framework para integrar IA en tu práctica de diseño sin perder lo que te hace valioso. Basado en el modelo AREC (Absorb, Retain, Execute, Communicate), con implementación paso a paso, casos reales de fintech, y ejercicios que puedes aplicar inmediatamente con tu equipo.",
  },
  "career-growth-framework": {
    title: "Career Growth Framework para diseñadores",
    type: "Template · Notion",
    price: "$25 USD",
    desc: "Niveles, competencias, expectativas por rol, y guía de conversaciones de crecimiento. Template listo para duplicar en Notion.",
    features: ["5 niveles de seniority", "Competencias por rol", "Expectativas claras", "Guía de 1:1s", "Listo para Notion"],
    longDesc: "Un framework completo para definir niveles de diseño en tu organización. Incluye competencias por rol, expectativas claras por nivel, y una guía para tener conversaciones de crecimiento efectivas. Creado desde la experiencia de establecer career paths en equipos de diseño de fintech desde 0.",
  },
  "workshop-stakeholders": {
    title: "Presentar diseño a stakeholders que hablan de revenue",
    type: "Workshop · 60 min",
    price: "$65 USD",
    desc: "Sesión grabada con ejercicios. Aprende a traducir decisiones de diseño a lenguaje de negocio que convence.",
    features: ["60 min de contenido", "Ejercicios prácticos", "Framework de presentación", "Templates de slides", "Ejemplos reales"],
    longDesc: "La mayoría de los diseñadores presentan su trabajo en lenguaje de diseño a una audiencia que habla lenguaje de negocio. Este workshop te enseña a traducir: cómo conectar decisiones de diseño con métricas que importan, cómo estructurar presentaciones que convencen, y cómo responder a objeciones de stakeholders sin perder la integridad del diseño.",
  },
};

const SLUGS = Object.keys(PRODUCTS);

export async function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS[slug];
  if (!product) return { title: "Not Found" };
  return { title: `${product.title} — Toolkit — Diana Perez`, description: product.desc };
}

export default async function ToolkitProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Try Supabase first
  const dbProduct = await getProductBySlug(slug);
  if (dbProduct) {
    const isDiag = dbProduct.type === "diagnostic";
    const diagUrl = slug.includes("madurez") ? "/diagnostico-madurez-ux" : "/diagnostico-empresarial";
    const buyUrl = dbProduct.lemon_squeezy_url;
    return (
      <>
        <section style={{ padding: "140px 40px 60px", maxWidth: 760, margin: "0 auto" }}>
          <Link href="/toolkit" className="about-link" style={{ marginBottom: 24, display: "inline-flex" }}>← Volver al Toolkit</Link>
          <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" as const, color: "var(--gold)", marginBottom: 12 }}>{dbProduct.type}</div>
          <h1 className="hero-title fade-in" style={{ fontSize: 38, marginBottom: 16 }}>{dbProduct.title}</h1>
          <p className="hero-desc fade-in fade-in-d1">{dbProduct.description}</p>
        </section>
        <section style={{ padding: "0 40px 80px", maxWidth: 760, margin: "0 auto", display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 48, alignItems: "start" }}>
          <div>
            <h3 style={{ fontFamily: "var(--font-serif)", fontSize: 18, fontWeight: 600, color: "var(--text)", marginBottom: 14 }}>Incluye</h3>
            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column" as const, gap: 10 }}>
              {(dbProduct.features ?? []).map((f: string) => (
                <li key={f} style={{ fontSize: 15, color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: 10 }}><span style={{ color: "var(--orange)", fontWeight: 700 }}>&#10003;</span> {f}</li>
              ))}
            </ul>
          </div>
          <div style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: 20, padding: 32, position: "sticky" as const, top: 100 }}>
            <div style={{ fontFamily: "var(--font-serif)", fontSize: 36, fontWeight: 700, color: "var(--orange)", marginBottom: 8 }}>${dbProduct.price} {dbProduct.currency}</div>
            <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 24 }}>Pago único. Acceso inmediato.</p>
            {isDiag ? (
              <Link href={diagUrl} className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>Hacer diagnóstico</Link>
            ) : buyUrl ? (
              <a href={buyUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ width: "100%", justifyContent: "center", textDecoration: "none" }}>Comprar ahora</a>
            ) : (
              <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>Comprar ahora</button>
            )}
          </div>
        </section>
      </>
    );
  }

  // Fallback to hardcoded
  const product = PRODUCTS[slug];
  if (!product) notFound();

  const isDiag = !!product.linkToDiag;
  const otherSlugs = SLUGS.filter((s) => s !== slug).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section style={{ padding: "140px 40px 60px", maxWidth: 760, margin: "0 auto" }}>
        <Link href="/toolkit" className="about-link" style={{ marginBottom: 24, display: "inline-flex" }}>← Volver al Toolkit</Link>
        <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" as const, color: isDiag ? "var(--gold)" : "var(--orange)", marginBottom: 12 }}>{product.type}</div>
        <h1 className="hero-title fade-in" style={{ fontSize: 38, marginBottom: 16 }}>{product.title}</h1>
        <p className="hero-desc fade-in fade-in-d1">{product.desc}</p>
      </section>

      {/* Details */}
      <section style={{ padding: "0 40px 80px", maxWidth: 760, margin: "0 auto", display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 48, alignItems: "start" }}>
        <div>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: 22, fontWeight: 600, color: "var(--orange)", marginBottom: 16 }}>Descripción</h2>
          <p style={{ fontSize: 16, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: 32 }}>{product.longDesc}</p>
          <h3 style={{ fontFamily: "var(--font-serif)", fontSize: 18, fontWeight: 600, color: "var(--text)", marginBottom: 14 }}>Incluye</h3>
          <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column" as const, gap: 10 }}>
            {product.features.map((f) => (
              <li key={f} style={{ fontSize: 15, color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color: "var(--orange)", fontWeight: 700 }}>✓</span> {f}
              </li>
            ))}
          </ul>
        </div>

        <div style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: 20, padding: 32, position: "sticky" as const, top: 100 }}>
          <div style={{ fontFamily: "var(--font-serif)", fontSize: 36, fontWeight: 700, color: "var(--orange)", marginBottom: 8 }}>{product.price}</div>
          <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 24 }}>Pago único. Acceso inmediato.</p>
          {isDiag ? (
            <Link href={product.linkToDiag!} className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>Hacer diagnóstico</Link>
          ) : (
            <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>Comprar ahora</button>
          )}
          <p style={{ fontSize: 12, color: "var(--text-muted)", textAlign: "center" as const, marginTop: 12 }}>Entrega digital inmediata</p>
        </div>
      </section>

      {/* Related */}
      <section className="work">
        <div className="work-inner">
          <div className="section-header">
            <div>
              <div className="section-overline">Más del toolkit</div>
              <h2 className="section-title">También te puede interesar</h2>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${otherSlugs.length}, 1fr)`, gap: 20 }}>
            {otherSlugs.map((os) => {
              const other = PRODUCTS[os];
              return (
                <Link href={`/toolkit/${os}`} key={os} className="about-card" style={{ textDecoration: "none" }}>
                  <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" as const, color: "var(--gold)", marginBottom: 8 }}>{other.type}</div>
                  <div className="about-card-number" style={{ fontSize: 17 }}>{other.title}</div>
                  <div className="about-card-label" style={{ marginTop: 8 }}>{other.desc.slice(0, 100)}...</div>
                  <div style={{ marginTop: 12, fontFamily: "var(--font-serif)", fontSize: 18, fontWeight: 700, color: "var(--orange)" }}>{other.price}</div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
