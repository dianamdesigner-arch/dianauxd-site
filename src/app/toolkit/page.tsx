import type { Metadata } from "next";
import Link from "next/link";
import { getPublishedProducts } from "@/lib/supabase/queries";

export const metadata: Metadata = {
  title: "Toolkit — Diana Perez",
  description:
    "Diagnósticos, playbooks, templates y workshops creados desde la práctica en fintech y mercados emergentes.",
};

export default async function ToolkitPage() {
  // Try Supabase, fallback to hardcoded below
  const dbProducts = await getPublishedProducts();
  void dbProducts;
  return (
    <>
      {/* Hero */}
      <section
        style={{
          padding: "140px 40px 60px",
          maxWidth: 1120,
          margin: "0 auto",
        }}
      >
        <div className="hero-overline fade-in">Toolkit</div>
        <h1 className="hero-title fade-in fade-in-d1">
          Herramientas que <span>funcionan</span>
        </h1>
        <p className="hero-desc fade-in fade-in-d2">
          Diagnósticos, playbooks, templates y workshops. Creados desde la
          práctica en fintech y mercados emergentes, no desde la teoría.
        </p>
      </section>

      {/* Products */}
      <section className="toolkit">
        <div className="toolkit-inner">
          {/* Featured diagnostics */}
          <div className="toolkit-featured-label" style={{ marginTop: 0 }}>
            Diagnósticos interactivos
          </div>
          <div className="toolkit-featured">
            <Link
              href="/diagnostico-madurez-ux"
              className="toolkit-diag-card orange-theme"
            >
              <div className="toolkit-diag-badge orange">
                <span className="toolkit-diag-badge-dot orange"></span>
                Diagnóstico interactivo
              </div>
              <div className="toolkit-diag-for">
                Para diseñadores y líderes de diseño
              </div>
              <h3 className="toolkit-diag-title">
                Madurez UX × Niveles de Influencia
              </h3>
              <p className="toolkit-diag-desc">
                Evalúa la madurez de diseño de tu organización y descubre tu
                nivel de influencia real. 12 preguntas, resultado personalizado
                con radar chart y roadmap de siguientes pasos.
              </p>
              <div className="toolkit-diag-features">
                <span className="toolkit-diag-feature orange">12 preguntas</span>
                <span className="toolkit-diag-feature orange">6 dimensiones</span>
                <span className="toolkit-diag-feature orange">Roadmap</span>
                <span className="toolkit-diag-feature orange">PDF</span>
              </div>
              <div className="toolkit-diag-bottom">
                <span className="toolkit-diag-price orange">$35 USD</span>
                <span className="toolkit-diag-cta orange">
                  Hacer diagnóstico →
                </span>
              </div>
            </Link>

            <Link
              href="/diagnostico-empresarial"
              className="toolkit-diag-card gold-theme"
            >
              <div className="toolkit-diag-badge gold">
                <span className="toolkit-diag-badge-dot gold"></span>
                Diagnóstico para empresas
              </div>
              <div className="toolkit-diag-for">
                Para founders, CPOs, y VPs de producto
              </div>
              <h3 className="toolkit-diag-title">
                Design Readiness Assessment
              </h3>
              <p className="toolkit-diag-desc">
                ¿Qué tan lista está tu empresa para escalar diseño? Evalúa 6
                dimensiones organizacionales con preguntas adaptadas a tu rol.
                Incluye gap analysis y recomendaciones de inversión.
              </p>
              <div className="toolkit-diag-features">
                <span className="toolkit-diag-feature gold">Adaptado por rol</span>
                <span className="toolkit-diag-feature gold">6 dimensiones</span>
                <span className="toolkit-diag-feature gold">Gap analysis</span>
                <span className="toolkit-diag-feature gold">Roadmap</span>
              </div>
              <div className="toolkit-diag-bottom">
                <span className="toolkit-diag-price gold">$45 USD</span>
                <span className="toolkit-diag-cta gold">
                  Evaluar mi empresa →
                </span>
              </div>
            </Link>
          </div>

          {/* More products */}
          <div className="toolkit-more-label">
            Playbooks, templates y workshops
          </div>
          <div className="toolkit-grid">
            <Link href="/toolkit/playbook-ia-diseno" className="toolkit-card">
              <div className="toolkit-card-icon play">&#x25A3;</div>
              <div className="toolkit-card-type play">Playbook</div>
              <h3 className="toolkit-card-title">
                Integrar IA en tu flujo de diseño con criterio
              </h3>
              <p className="toolkit-card-desc">
                Framework de 4 capas (Absorb, Retain, Execute, Communicate) con
                implementación paso a paso. 30+ páginas con casos reales y
                ejercicios prácticos para equipos de diseño.
              </p>
              <div className="toolkit-card-bottom">
                <span className="toolkit-card-price">$55 USD</span>
                <span className="toolkit-card-cta">Ver más →</span>
              </div>
            </Link>

            <Link
              href="/toolkit/career-growth-framework"
              className="toolkit-card"
            >
              <div className="toolkit-card-icon tmpl">&#x2B21;</div>
              <div className="toolkit-card-type tmpl">Template · Notion</div>
              <h3 className="toolkit-card-title">
                Career Growth Framework para diseñadores
              </h3>
              <p className="toolkit-card-desc">
                Niveles, competencias, expectativas por rol, y guía de
                conversaciones de crecimiento. Template listo para duplicar en
                Notion con estructura adaptable a tu organización.
              </p>
              <div className="toolkit-card-bottom">
                <span className="toolkit-card-price">$25 USD</span>
                <span className="toolkit-card-cta">Ver más →</span>
              </div>
            </Link>

            <Link
              href="/toolkit/workshop-stakeholders"
              className="toolkit-card"
            >
              <div className="toolkit-card-icon wksp">&#x25B6;</div>
              <div className="toolkit-card-type wksp">Workshop · 60 min</div>
              <h3 className="toolkit-card-title">
                Presentar diseño a stakeholders que hablan de revenue
              </h3>
              <p className="toolkit-card-desc">
                Sesión grabada con ejercicios. Aprende a traducir decisiones de
                diseño a lenguaje de negocio que convence. Incluye frameworks y
                plantillas de presentación.
              </p>
              <div className="toolkit-card-bottom">
                <span className="toolkit-card-price">$65 USD</span>
                <span className="toolkit-card-cta">Ver más →</span>
              </div>
            </Link>
          </div>

          {/* Coming soon note */}
          <div style={{ textAlign: "center", padding: "56px 0 0" }}>
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: 22,
                fontWeight: 600,
                color: "var(--orange)",
                marginBottom: 10,
              }}
            >
              Más herramientas próximamente
            </p>
            <p
              style={{
                fontSize: 15,
                color: "rgba(255,255,255,0.4)",
                maxWidth: 420,
                margin: "0 auto",
              }}
            >
              Estoy desarrollando nuevos recursos basados en mi experiencia en
              fintech y mercados emergentes.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
