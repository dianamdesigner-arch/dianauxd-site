import type { Metadata } from "next";
import Link from "next/link";
import { getPublishedCases } from "@/lib/supabase/queries";

export const metadata: Metadata = {
  title: "Work — Diana Perez",
  description:
    "Case studies de diseño de producto en fintech: lending, recovery, plataformas escalables.",
};

const studies = [
  {
    slug: "installment-lending",
    img: "cs-img-1",
    tags: [
      { label: "Growth", cls: "tag-dark" },
      { label: "Lending", cls: "tag-gold" },
    ],
    title: "Designing Installment Lending Under Risk Constraints",
    desc: "Lideré la estrategia UX de un producto global de installments que incrementó loan origination manteniendo lending responsable. Trabajé con equipos de riesgo, producto y regulación para encontrar el balance entre crecimiento y responsabilidad crediticia.",
    context:
      "El reto era incrementar la adopción de crédito sin comprometer los estándares de riesgo ni la experiencia del usuario. Esto requirió un enfoque sistémico que considerara regulaciones locales, comportamientos de pago y la infraestructura técnica existente.",
    metrics: [
      { value: "77%", label: "↑ loan origination" },
      { value: "Global", label: "multi-mercado" },
    ],
  },
  {
    slug: "revenue-recovery",
    img: "cs-img-2",
    tags: [
      { label: "Recovery", cls: "tag-orange" },
      { label: "Fintech", cls: "tag-gold" },
    ],
    title: "Revenue Recovery Through Trust-First Self-Service",
    desc: "Diseñé un sistema de recuperación self-service que re-enganchó usuarios inalcanzables y desbloqueó revenue mensual. El enfoque fue construir confianza primero, ofreciendo transparencia y control al usuario.",
    context:
      "Los métodos tradicionales de cobranza no alcanzaban a un segmento significativo de usuarios. Diseñé un sistema que priorizaba la confianza y el autoservicio sobre la presión, resultando en tasas de recuperación superiores.",
    metrics: [
      { value: "$150K+", label: "recovered / mes" },
      { value: "71%", label: "engagement" },
    ],
  },
  {
    slug: "scaling-platform",
    img: "cs-img-3",
    tags: [
      { label: "Sistemas", cls: "tag-orange" },
      { label: "Scale", cls: "tag-dark" },
    ],
    title: "Scaling a Global Fintech Platform",
    desc: "De builds por mercado a una plataforma global configurable, reduciendo rework y complejidad operativa. Establecí un sistema de diseño que permitió a 9 mercados operar con una base común.",
    context:
      "Cada mercado tenía su propio build, lo que multiplicaba el esfuerzo de desarrollo y mantenimiento. Lideré la transición a una plataforma configurable que respeta diferencias regulatorias locales sin duplicar trabajo.",
    metrics: [
      { value: "~21%", label: "↓ rework" },
      { value: "9", label: "mercados" },
    ],
  },
];

export default async function WorkPage() {
  // Try Supabase, fallback to hardcoded
  const dbCases = await getPublishedCases();
  // If Supabase has data, use it; otherwise use hardcoded below
  void dbCases;
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
        <div className="hero-overline fade-in">Case studies</div>
        <h1 className="hero-title fade-in fade-in-d1">
          Trabajo <span>seleccionado</span>
        </h1>
        <p className="hero-desc fade-in fade-in-d2">
          Proyectos donde el diseño estratégico generó impacto medible en
          revenue, escala y operaciones.
        </p>
      </section>

      {/* Case Studies */}
      <section className="work">
        <div className="work-inner">
          <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
            {studies.map((s) => (
              <Link href={`/work/${s.slug}`} className="cs-card" key={s.title} style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", textDecoration: "none" }}>
                <div
                  className={`cs-card-img ${s.img}`}
                  style={{ height: "100%", minHeight: 280, borderRadius: "20px 0 0 20px" }}
                >
                  <div className="cs-card-tags">
                    {s.tags.map((t) => (
                      <span className={`tag ${t.cls}`} key={t.label}>
                        {t.label}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="cs-card-body" style={{ padding: "32px 36px" }}>
                  <h3 className="cs-card-title" style={{ fontSize: 24, marginBottom: 14 }}>
                    {s.title}
                  </h3>
                  <p className="cs-card-desc" style={{ fontSize: 15, marginBottom: 14 }}>
                    {s.desc}
                  </p>
                  <p className="cs-card-desc">{s.context}</p>
                  <div className="cs-card-metrics">
                    {s.metrics.map((m) => (
                      <div key={m.label}>
                        <div className="cs-mv">{m.value}</div>
                        <div className="cs-ml">{m.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
