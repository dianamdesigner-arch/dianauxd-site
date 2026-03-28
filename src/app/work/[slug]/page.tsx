import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCaseBySlug } from "@/lib/supabase/queries";

const STUDIES: Record<string, {
  title: string; client: string; tags: { label: string; cls: string }[];
  img: string; metrics: { value: string; label: string }[];
  challenge: string; approach: string; results: string;
}> = {
  "installment-lending": {
    title: "Designing Installment Lending Under Risk Constraints",
    client: "Fintech Global — Lending Product",
    tags: [{ label: "Growth", cls: "tag-dark" }, { label: "Lending", cls: "tag-gold" }],
    img: "cs-img-1",
    metrics: [{ value: "77%", label: "↑ loan origination" }, { value: "Global", label: "multi-mercado" }],
    challenge: "El producto de lending necesitaba crecer agresivamente en originación de préstamos sin comprometer los estándares de riesgo crediticio. Cada mercado tenía regulaciones diferentes, comportamientos de pago distintos, y la infraestructura técnica existente no estaba diseñada para soportar variaciones por país. Los equipos de riesgo y producto tenían objetivos que parecían contradictorios: más préstamos vs. menos defaults.",
    approach: "Lideré un proceso de discovery cross-funcional que involucró a equipos de riesgo, data science, producto y engineering desde el día uno. Mapeamos los flujos de decisión de cada mercado e identificamos los puntos de fricción donde los usuarios abandonaban sin completar su aplicación. Diseñé un sistema de UX adaptativo que presentaba opciones de crédito contextualizadas según el perfil de riesgo del usuario, con transparencia total sobre términos y consecuencias. Implementamos prototipos en 3 mercados piloto antes del rollout global.",
    results: "La originación de crédito se incrementó 77% manteniendo las tasas de default dentro de los parámetros aceptables. El sistema se expandió exitosamente a 9 mercados con configuraciones locales que respetan regulaciones específicas. El rework de engineering se redujo significativamente gracias al enfoque de plataforma configurable vs. builds por país.",
  },
  "revenue-recovery": {
    title: "Revenue Recovery Through Trust-First Self-Service",
    client: "Fintech LATAM — Recovery System",
    tags: [{ label: "Recovery", cls: "tag-orange" }, { label: "Fintech", cls: "tag-gold" }],
    img: "cs-img-2",
    metrics: [{ value: "$150K+", label: "recovered / mes" }, { value: "71%", label: "engagement" }],
    challenge: "Un segmento significativo de usuarios con deuda activa era completamente inalcanzable a través de los canales tradicionales de cobranza (llamadas, emails, SMS). Estos usuarios representaban millones en revenue no recuperado mensualmente. Los métodos existentes de contacto generaban rechazo y reforzaban un ciclo de evasión. No había un canal digital donde estos usuarios pudieran resolver su situación de manera autónoma.",
    approach: "Investigué los patrones de comportamiento de usuarios en morosidad y descubrí que la mayoría no eran evasores intencionales sino personas que habían perdido confianza en el sistema. Diseñé una experiencia de self-service centrada en reconstruir confianza: transparencia total sobre la deuda, opciones de pago flexibles sin penalizaciones ocultas, y un tono de comunicación que trataba al usuario como adulto. El sistema incluía simuladores de plan de pago, confirmaciones claras, y seguimiento proactivo no invasivo.",
    results: "El sistema recuperó más de $150K USD mensuales de usuarios que eran previamente inalcanzables. El 71% de los usuarios que ingresaron al flujo completaron alguna acción de resolución. El enfoque trust-first se adoptó como estándar para toda la comunicación de recovery en la organización, impactando la estrategia más allá del producto digital.",
  },
  "scaling-platform": {
    title: "Scaling a Global Fintech Platform",
    client: "Fintech Global — Platform Architecture",
    tags: [{ label: "Sistemas", cls: "tag-orange" }, { label: "Scale", cls: "tag-dark" }],
    img: "cs-img-3",
    metrics: [{ value: "~21%", label: "↓ rework" }, { value: "9", label: "mercados" }],
    challenge: "La empresa operaba con builds separados por mercado, lo que multiplicaba el esfuerzo de desarrollo y mantenimiento. Cada feature nuevo requería implementación y QA independiente en cada país. Los equipos de diseño, producto e ingeniería trabajaban en silos geográficos sin una visión unificada de la experiencia del usuario. La complejidad operativa crecía linealmente con cada nuevo mercado.",
    approach: "Lideré la visión de diseño para la transición de builds por mercado a una plataforma global configurable. Esto implicó: mapear las variaciones reales vs. las percibidas entre mercados, diseñar un sistema de componentes que soportara configuración por país sin bifurcaciones de código, establecer un design system compartido con governance que permitiera autonomía local dentro de guardrails globales, y definir rituales cross-mercado que mantuvieran coherencia sin burocratizar.",
    results: "El rework de ingeniería se redujo ~21%. La plataforma opera en 9 mercados con una base de código compartida y configuraciones locales. El time-to-market para features nuevos se redujo significativamente al eliminar la necesidad de implementaciones paralelas. El design system se convirtió en la fuente de verdad para todos los equipos.",
  },
};

const SLUGS = Object.keys(STUDIES);

export async function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const study = STUDIES[slug];
  if (!study) return { title: "Not Found" };
  return { title: `${study.title} — Diana Perez`, description: study.challenge.slice(0, 160) };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Try Supabase first
  const dbCase = await getCaseBySlug(slug);
  if (dbCase) {
    const metrics = Array.isArray(dbCase.metrics) ? dbCase.metrics as { key: string; value: string }[] : [];
    return (
      <>
        <section style={{ padding: "140px 40px 0", maxWidth: 1120, margin: "0 auto" }}>
          <Link href="/work" className="about-link" style={{ marginBottom: 24, display: "inline-flex" }}>← Volver a Work</Link>
          <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
            {(dbCase.tags ?? []).map((t: string) => <span className="tag tag-orange" key={t}>{t}</span>)}
          </div>
          <h1 className="hero-title fade-in" style={{ marginBottom: 14 }}>{dbCase.title}</h1>
          {dbCase.client && <p style={{ fontSize: 15, color: "var(--gold)", fontWeight: 600, letterSpacing: "0.04em", marginBottom: 32 }}>{dbCase.client}</p>}
        </section>
        {metrics.length > 0 && (
          <section className="metrics-bar">
            <div className="metrics-inner" style={{ gridTemplateColumns: `repeat(${metrics.length}, 1fr)` }}>
              {metrics.map((m) => (
                <div className="metric-item" key={m.key}><div className="metric-value" style={{ fontSize: 40 }}>{m.value}</div><div className="metric-desc">{m.key}</div></div>
              ))}
            </div>
          </section>
        )}
        <section style={{ padding: "80px 40px", maxWidth: 760, margin: "0 auto", fontSize: 16, color: "var(--text-secondary)", lineHeight: 1.75 }}>
          <div dangerouslySetInnerHTML={{ __html: dbCase.content ?? "" }} />
        </section>
      </>
    );
  }

  // Fallback to hardcoded
  const study = STUDIES[slug];
  if (!study) notFound();

  const otherSlugs = SLUGS.filter((s) => s !== slug);

  return (
    <>
      {/* Hero */}
      <section style={{ padding: "140px 40px 0", maxWidth: 1120, margin: "0 auto" }}>
        <Link href="/work" className="about-link" style={{ marginBottom: 24, display: "inline-flex" }}>← Volver a Work</Link>
        <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
          {study.tags.map((t) => <span className={`tag ${t.cls}`} key={t.label}>{t.label}</span>)}
        </div>
        <h1 className="hero-title fade-in" style={{ marginBottom: 14 }}>{study.title}</h1>
        <p style={{ fontSize: 15, color: "var(--gold)", fontWeight: 600, letterSpacing: "0.04em", marginBottom: 32 }}>{study.client}</p>
      </section>

      {/* Image */}
      <section style={{ padding: "0 40px 48px", maxWidth: 1120, margin: "0 auto" }}>
        <div className={`cs-card-img ${study.img}`} style={{ height: 320, borderRadius: 20 }} />
      </section>

      {/* Metrics */}
      <section className="metrics-bar">
        <div className="metrics-inner" style={{ gridTemplateColumns: `repeat(${study.metrics.length}, 1fr)` }}>
          {study.metrics.map((m) => (
            <div className="metric-item" key={m.label}>
              <div className="metric-value" style={{ fontSize: 40 }}>{m.value}</div>
              <div className="metric-desc">{m.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: "80px 40px", maxWidth: 760, margin: "0 auto" }}>
        <div style={{ marginBottom: 48 }}>
          <div className="section-overline">El reto</div>
          <h2 className="about-title">Challenge</h2>
          <p className="about-text">{study.challenge}</p>
        </div>
        <div style={{ marginBottom: 48 }}>
          <div className="section-overline">El enfoque</div>
          <h2 className="about-title">Approach</h2>
          <p className="about-text">{study.approach}</p>
        </div>
        <div>
          <div className="section-overline">El impacto</div>
          <h2 className="about-title">Results</h2>
          <p className="about-text">{study.results}</p>
        </div>
      </section>

      {/* Related */}
      <section className="work">
        <div className="work-inner">
          <div className="section-header">
            <div>
              <div className="section-overline">Más trabajo</div>
              <h2 className="section-title">Otros case studies</h2>
            </div>
          </div>
          <div className="cs-grid" style={{ gridTemplateColumns: `repeat(${otherSlugs.length}, 1fr)` }}>
            {otherSlugs.map((os) => {
              const other = STUDIES[os];
              return (
                <Link href={`/work/${os}`} className="cs-card" key={os} style={{ textDecoration: "none" }}>
                  <div className={`cs-card-img ${other.img}`}>
                    <div className="cs-card-tags">
                      {other.tags.map((t) => <span className={`tag ${t.cls}`} key={t.label}>{t.label}</span>)}
                    </div>
                  </div>
                  <div className="cs-card-body">
                    <h3 className="cs-card-title">{other.title}</h3>
                    <div className="cs-card-metrics">
                      {other.metrics.map((m) => (
                        <div key={m.label}><div className="cs-mv">{m.value}</div><div className="cs-ml">{m.label}</div></div>
                      ))}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
