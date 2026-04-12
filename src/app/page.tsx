import Link from "next/link";
import Image from "next/image"
import NewsletterForm from "@/components/NewsletterForm";

/* ═══════════════════════════════════
   HOME PAGE — all sections from index.html
   ═══════════════════════════════════ */

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-overline fade-in">
          Head of Product Design &middot; Mattilda
        </div>
        <h1 className="hero-title fade-in fade-in-d1">
          Dise&ntilde;o de <span>sistemas fintech</span> que escalan y generan
          revenue
        </h1>
        <p className="hero-desc fade-in fade-in-d2">
          Convierto ambig&uuml;edad en direcci&oacute;n de producto clara,
          alineando equipos cross-funcionales para entregar plataformas que
          escalan a trav&eacute;s de mercados, regulaci&oacute;n y
          restricciones reales.
        </p>
        <div className="hero-buttons fade-in fade-in-d3">
          <Link href="/work" className="btn btn-primary">
            Ver case studies
          </Link>
          <Link href="/blog" className="btn btn-outline">
            Leer el blog
          </Link>
        </div>
      </div>
      <div className="hero-visual fade-in fade-in-d2">
        <div className="hero-photo-frame">
          <div className="hero-photo-inner" style={{position:"relative",overflow:"hidden"}}>
            <Image src="/diana-perez.jpg" alt="Diana Perez" fill className="object-cover object-top" />
          </div>
        </div>
        <div className="metric-float mf-1">
          <div className="metric-float-value">~$15M</div>
          <div className="metric-float-label">revenue mensual recuperado</div>
        </div>
        <div className="metric-float mf-2">
          <div className="metric-float-value">9</div>
          <div className="metric-float-label">mercados globales</div>
        </div>
        <div className="metric-float mf-3">
          <div className="metric-float-value">~21%</div>
          <div className="metric-float-label">
            reducci&oacute;n en rework
          </div>
        </div>
      </div>
    </section>
  );
}

function MetricsBar() {
  return (
    <section className="metrics-bar">
      <div className="metrics-inner">
        <div className="metric-item">
          <div className="metric-value">$150K+</div>
          <div className="metric-desc">
            USD mensuales recuperados v&iacute;a sistemas self-service de
            confianza
          </div>
        </div>
        <div className="metric-item">
          <div className="metric-value">~21%</div>
          <div className="metric-desc">
            Reducci&oacute;n en rework de ingenier&iacute;a a trav&eacute;s de
            plataformas escalables
          </div>
        </div>
        <div className="metric-item">
          <div className="metric-value">77%</div>
          <div className="metric-desc">
            Incremento en originaci&oacute;n de cr&eacute;dito bajo
            restricciones de riesgo
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutPreview() {
  return (
    <section className="about">
      <div>
        <div className="about-overline">Sobre m&iacute;</div>
        <h2 className="about-title">
          Dise&ntilde;o sistemas, no solo interfaces
        </h2>
        <p className="about-text">
          Soy Diana, Strategic Product Design Leader con m&aacute;s de 10
          a&ntilde;os de experiencia construyendo plataformas fintech en
          entornos regulados y complejos a lo largo de LATAM, India,
          &Aacute;frica y el Sudeste Asi&aacute;tico.
        </p>
        <p className="about-text">
          M&aacute;s all&aacute; de productos, me enfoco en escalar el
          dise&ntilde;o como pr&aacute;ctica: mentoreo dise&ntilde;adores,
          defino frameworks de crecimiento, y establezco operaciones de
          dise&ntilde;o que permiten a los equipos moverse con claridad y
          confianza.
        </p>
        <Link href="/about" className="about-link">
          Conoce mi historia completa &rarr;
        </Link>
      </div>
      <div className="about-grid">
        <div className="about-card">
          <div className="about-card-number">10+</div>
          <div className="about-card-label">
            A&ntilde;os en dise&ntilde;o de producto fintech
          </div>
        </div>
        <div className="about-card">
          <div className="about-card-number">9</div>
          <div className="about-card-label">
            Mercados (MX, GT, DO, PA, PE, IN, VN, PH, KE)
          </div>
        </div>
        <div className="about-card">
          <div className="about-card-number">~$15M</div>
          <div className="about-card-label">Revenue mensual recuperado</div>
        </div>
        <div className="about-card">
          <div className="about-card-number">71%</div>
          <div className="about-card-label">
            Engagement de usuarios previamente inalcanzables
          </div>
        </div>
      </div>
    </section>
  );
}

function CaseStudyGrid() {
  const studies = [
    {
      slug: "installment-lending",
      img: "cs-img-1",
      tags: [
        { label: "Growth", cls: "tag-dark" },
        { label: "Lending", cls: "tag-gold" },
      ],
      title: "Designing Installment Lending Under Risk Constraints",
      desc: "Lider\u00e9 la estrategia UX de un producto global de installments que increment\u00f3 loan origination manteniendo lending responsable.",
      metrics: [
        { value: "77%", label: "\u2191 loan origination" },
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
      desc: "Dise\u00f1\u00e9 un sistema de recuperaci\u00f3n self-service que re-enganch\u00f3 usuarios inalcanzables y desbloque\u00f3 revenue mensual.",
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
      desc: "De builds por mercado a una plataforma global configurable, reduciendo rework y complejidad operativa.",
      metrics: [
        { value: "~21%", label: "\u2193 rework" },
        { value: "9", label: "mercados" },
      ],
    },
  ];

  return (
    <section className="work">
      <div className="work-inner">
        <div className="section-header">
          <div>
            <div className="section-overline">Case studies</div>
            <h2 className="section-title">Trabajo seleccionado</h2>
          </div>
          <Link href="/work" className="section-link">
            Ver todos &rarr;
          </Link>
        </div>
        <div className="cs-grid">
          {studies.map((s) => (
            <Link href={`/work/${s.slug}`} className="cs-card" key={s.title} style={{ textDecoration: "none" }}>
              <div className={`cs-card-img ${s.img}`}>
                <div className="cs-card-tags">
                  {s.tags.map((t) => (
                    <span className={`tag ${t.cls}`} key={t.label}>
                      {t.label}
                    </span>
                  ))}
                </div>
              </div>
              <div className="cs-card-body">
                <h3 className="cs-card-title">{s.title}</h3>
                <p className="cs-card-desc">{s.desc}</p>
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
  );
}

function BlogPreview() {
  const posts = [
    {
      slug: "triple-diamond-flujo-vivo",
      tag: { label: "IA + Dise\u00f1o", cls: "tag-orange" },
      date: "Mar 2026",
      title: "El Triple Diamond no es un proceso, es un flujo vivo",
      desc: "Repensar el framework m\u00e1s usado en dise\u00f1o desde la realidad de equipos con recursos limitados y presi\u00f3n constante.",
    },
    {
      slug: "ia-democratiza-capacidades",
      tag: { label: "LATAM", cls: "tag-gold" },
      date: "Mar 2026",
      title: "La IA democratiza capacidades, no reemplaza criterio",
      desc: "Para dise\u00f1adores en LATAM que operan con restricciones reales, la IA no es lujo: es infraestructura cognitiva.",
    },
    {
      slug: "niveles-influencia-madurez",
      tag: { label: "Liderazgo", cls: "tag-dark" },
      date: "Feb 2026",
      title:
        "Niveles de influencia del dise\u00f1ador y madurez organizacional",
      desc: "Cruc\u00e9 el modelo de madurez de NN/g con los niveles de influencia que he observado en la pr\u00e1ctica profesional.",
    },
  ];

  return (
    <section className="blog">
      <div className="section-header">
        <div>
          <div className="section-overline">Blog</div>
          <h2 className="section-title">&Uacute;ltimos art&iacute;culos</h2>
        </div>
        <Link href="/blog" className="section-link">
          Ver todos &rarr;
        </Link>
      </div>
      <div className="blog-grid">
        {posts.map((p) => (
          <Link href={`/blog/${p.slug}`} className="blog-card" key={p.title} style={{ textDecoration: "none" }}>
            <div className="blog-card-top">
              <span className={`tag ${p.tag.cls}`}>{p.tag.label}</span>
              <span className="blog-card-meta">{p.date}</span>
            </div>
            <h3 className="blog-card-title">{p.title}</h3>
            <p className="blog-card-desc">{p.desc}</p>
            <span className="blog-card-read">
              Leer art&iacute;culo &rarr;
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function ToolkitPreview() {
  return (
    <section className="toolkit">
      <div className="toolkit-inner">
        <div className="section-header">
          <div>
            <div className="section-overline">Toolkit</div>
            <h2 className="section-title">Herramientas que funcionan</h2>
            <p className="section-subtitle">
              Diagn&oacute;sticos, playbooks, templates y workshops. Creados
              desde la pr&aacute;ctica en fintech y mercados emergentes, no
              desde la teor&iacute;a.
            </p>
          </div>
          <Link href="/toolkit" className="section-link">
            Ver todo el toolkit &rarr;
          </Link>
        </div>

        {/* Featured: 2 Diagnostics */}
        <div className="toolkit-featured-label">
          Diagn&oacute;sticos interactivos
        </div>
        <div className="toolkit-featured">
          <Link
            href="/diagnostico-madurez-ux"
            className="toolkit-diag-card orange-theme"
          >
            <div className="toolkit-diag-badge orange">
              <span className="toolkit-diag-badge-dot orange"></span>
              Diagn&oacute;stico interactivo
            </div>
            <div className="toolkit-diag-for">
              Para dise&ntilde;adores y l&iacute;deres de dise&ntilde;o
            </div>
            <h3 className="toolkit-diag-title">
              Madurez UX &times; Niveles de Influencia
            </h3>
            <p className="toolkit-diag-desc">
              Eval&uacute;a la madurez de dise&ntilde;o de tu
              organizaci&oacute;n y descubre tu nivel de influencia real. 12
              preguntas, resultado personalizado con radar chart y roadmap de
              siguientes pasos.
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
                Hacer diagn&oacute;stico &rarr;
              </span>
            </div>
          </Link>

          <Link
            href="/diagnostico-empresarial"
            className="toolkit-diag-card gold-theme"
          >
            <div className="toolkit-diag-badge gold">
              <span className="toolkit-diag-badge-dot gold"></span>
              Diagn&oacute;stico para empresas
            </div>
            <div className="toolkit-diag-for">
              Para founders, CPOs, y VPs de producto
            </div>
            <h3 className="toolkit-diag-title">
              Design Readiness Assessment
            </h3>
            <p className="toolkit-diag-desc">
              &iquest;Qu&eacute; tan lista est&aacute; tu empresa para escalar
              dise&ntilde;o? Eval&uacute;a 6 dimensiones organizacionales con
              preguntas adaptadas a tu rol. Incluye gap analysis y
              recomendaciones de inversi&oacute;n.
            </p>
            <div className="toolkit-diag-features">
              <span className="toolkit-diag-feature gold">
                Adaptado por rol
              </span>
              <span className="toolkit-diag-feature gold">6 dimensiones</span>
              <span className="toolkit-diag-feature gold">Gap analysis</span>
              <span className="toolkit-diag-feature gold">Roadmap</span>
            </div>
            <div className="toolkit-diag-bottom">
              <span className="toolkit-diag-price gold">$45 USD</span>
              <span className="toolkit-diag-cta gold">
                Evaluar mi empresa &rarr;
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
              Integrar IA en tu flujo de dise&ntilde;o con criterio
            </h3>
            <p className="toolkit-card-desc">
              Framework de 4 capas (Absorb, Retain, Execute, Communicate) con
              implementaci&oacute;n paso a paso. 30+ p&aacute;ginas.
            </p>
            <div className="toolkit-card-bottom">
              <span className="toolkit-card-price">$55 USD</span>
              <span className="toolkit-card-cta">Ver m&aacute;s &rarr;</span>
            </div>
          </Link>

          <Link
            href="/toolkit/career-growth-framework"
            className="toolkit-card"
          >
            <div className="toolkit-card-icon tmpl">&#x2B21;</div>
            <div className="toolkit-card-type tmpl">
              Template &middot; Notion
            </div>
            <h3 className="toolkit-card-title">
              Career Growth Framework para dise&ntilde;adores
            </h3>
            <p className="toolkit-card-desc">
              Niveles, competencias, expectativas por rol, y gu&iacute;a de
              conversaciones de crecimiento. Listo para duplicar.
            </p>
            <div className="toolkit-card-bottom">
              <span className="toolkit-card-price">$25 USD</span>
              <span className="toolkit-card-cta">Ver m&aacute;s &rarr;</span>
            </div>
          </Link>

          <Link
            href="/toolkit/workshop-stakeholders"
            className="toolkit-card"
          >
            <div className="toolkit-card-icon wksp">&#x25B6;</div>
            <div className="toolkit-card-type wksp">
              Workshop &middot; 60 min
            </div>
            <h3 className="toolkit-card-title">
              Presentar dise&ntilde;o a stakeholders que hablan de revenue
            </h3>
            <p className="toolkit-card-desc">
              Sesi&oacute;n grabada con ejercicios. Aprende a traducir
              decisiones de dise&ntilde;o a lenguaje de negocio que convence.
            </p>
            <div className="toolkit-card-bottom">
              <span className="toolkit-card-price">$65 USD</span>
              <span className="toolkit-card-cta">Ver m&aacute;s &rarr;</span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  return (
    <section className="newsletter-wrap" id="newsletter">
      <div className="newsletter">
        <div className="newsletter-content">
          <h2>Dise&ntilde;o estrat&eacute;gico, sin filtros</h2>
          <p>
            Escribo sobre dise&ntilde;o de producto, IA aplicada con criterio,
            y la realidad de liderar en LATAM. Sin spam, sin frases bonitas.
          </p>
        </div>
        <NewsletterForm />
      </div>
    </section>
  );
}

function Companies() {
  const companies = ["Scotiabank", "Intuit", "Nestl\u00e9", "Tala", "Mattilda"];
  return (
    <section className="companies">
      <div className="companies-inner">
        <div className="companies-label">
          Organizaciones con las que he colaborado
        </div>
        <div className="companies-logos">
          {companies.map((name) => (
            <span className="company-name" key={name}>
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <MetricsBar />
      <AboutPreview />
      <CaseStudyGrid />
      <BlogPreview />
      <ToolkitPreview />
      <Newsletter />
      <Companies />
    </>
  );
}
