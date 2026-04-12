import type { Metadata } from "next";
import Image from "next/image"
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sobre Diana — Strategic Product Design Leader",
  description:
    "Más de 10 años diseñando plataformas fintech en entornos regulados a lo largo de LATAM, India, África y el Sudeste Asiático.",
};

const stats = [
  { number: "10+", label: "Años en diseño de producto fintech" },
  { number: "9", label: "Mercados (MX, GT, DO, PA, PE, IN, VN, PH, KE)" },
  { number: "~$15M", label: "Revenue mensual recuperado" },
  { number: "71%", label: "Engagement de usuarios previamente inalcanzables" },
];

const companies = [
  {
    name: "Mattilda",
    role: "Head of Product Design",
    desc: "Liderando la estrategia de diseño para plataformas fintech que escalan a través de múltiples mercados en LATAM.",
  },
  {
    name: "Tala",
    role: "Senior Product Designer",
    desc: "Diseñé sistemas de lending y recovery que operan bajo restricciones regulatorias en mercados emergentes globales.",
  },
  {
    name: "Scotiabank",
    role: "UX Designer",
    desc: "Trabajé en productos bancarios digitales para el mercado mexicano y centroamericano.",
  },
  {
    name: "Intuit",
    role: "Product Designer",
    desc: "Contribuí al diseño de herramientas financieras para pequeñas empresas.",
  },
  {
    name: "Nestlé",
    role: "UX Consultant",
    desc: "Consultoría en experiencia de usuario para plataformas internas y canales digitales B2B.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="hero" style={{ minHeight: "auto", paddingBottom: 40 }}>
        <div className="hero-content">
          <div className="hero-overline fade-in">Sobre mí</div>
          <h1 className="hero-title fade-in fade-in-d1">
            Diseño <span>sistemas</span>, no solo interfaces
          </h1>
          <p className="hero-desc fade-in fade-in-d2">
            Soy Diana, Strategic Product Design Leader con más de 10 años de
            experiencia construyendo plataformas fintech en entornos regulados y
            complejos a lo largo de LATAM, India, África y el Sudeste Asiático.
          </p>
          <p className="hero-desc fade-in fade-in-d3" style={{ marginBottom: 0 }}>
            Más allá de productos, me enfoco en escalar el diseño como práctica:
            mentoreo diseñadores, defino frameworks de crecimiento, y establezco
            operaciones de diseño que permiten a los equipos moverse con claridad
            y confianza.
          </p>
        </div>
        <div className="hero-visual fade-in fade-in-d2">
          <div className="hero-photo-frame">
            <div className="hero-photo-inner" style={{position:"relative",overflow:"hidden"}}>
              <Image src="/diana-perez.jpg" alt="Diana Perez" fill className="object-cover object-top" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="metrics-bar">
        <div className="metrics-inner" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
          {stats.map((s) => (
            <div className="metric-item" key={s.label}>
              <div className="metric-value" style={{ fontSize: 36 }}>
                {s.number}
              </div>
              <div className="metric-desc">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Companies */}
      <section className="about" style={{ gap: 48 }}>
        <div>
          <div className="about-overline">Trayectoria</div>
          <h2 className="about-title">
            Organizaciones con las que he colaborado
          </h2>
          <p className="about-text">
            He tenido el privilegio de trabajar con equipos en banca tradicional,
            fintech de alto crecimiento, y corporativos globales — siempre en la
            intersección de diseño, producto y negocio.
          </p>
          <Link href="/work" className="about-link">
            Ver mi trabajo seleccionado →
          </Link>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {companies.map((c) => (
            <div className="about-card" key={c.name}>
              <div className="about-card-number" style={{ fontSize: 20 }}>
                {c.name}
              </div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "var(--gold)",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  marginBottom: 6,
                }}
              >
                {c.role}
              </div>
              <div className="about-card-label">{c.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Approach */}
      <section className="work">
        <div className="work-inner">
          <div className="section-header">
            <div>
              <div className="section-overline">Mi enfoque</div>
              <h2 className="section-title">Cómo trabajo</h2>
            </div>
          </div>
          <div className="about-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
            <div className="about-card">
              <div className="about-card-number" style={{ fontSize: 22 }}>
                Sistemas
              </div>
              <div className="about-card-label">
                Diseño plataformas configurables que escalan a múltiples
                mercados sin builds separados por país.
              </div>
            </div>
            <div className="about-card">
              <div className="about-card-number" style={{ fontSize: 22 }}>
                Alineación
              </div>
              <div className="about-card-label">
                Traduzco decisiones de diseño a lenguaje de negocio que
                stakeholders entienden y aprueban.
              </div>
            </div>
            <div className="about-card">
              <div className="about-card-number" style={{ fontSize: 22 }}>
                Operaciones
              </div>
              <div className="about-card-label">
                Establezco DesignOps, frameworks de crecimiento y mentoreo que
                escalan la práctica de diseño.
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
