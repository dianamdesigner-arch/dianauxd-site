import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contacto — Diana Perez",
  description:
    "Escríbeme para colaboraciones, consultoría o simplemente para conectar.",
};

export default function ContactPage() {
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
        <div className="hero-overline fade-in">Contacto</div>
        <h1 className="hero-title fade-in fade-in-d1">
          Hablemos de <span>diseño</span>
        </h1>
        <p className="hero-desc fade-in fade-in-d2">
          Si tienes un proyecto, una idea o simplemente quieres conectar,
          escríbeme. Respondo todos los mensajes.
        </p>
      </section>

      {/* Contact Form */}
      <section
        style={{
          padding: "0 40px 100px",
          maxWidth: 1120,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          gap: 64,
          alignItems: "start",
        }}
      >
        <ContactForm />

        {/* Sidebar info */}
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          <div className="about-card">
            <div
              className="about-card-number"
              style={{ fontSize: 18 }}
            >
              Email
            </div>
            <div className="about-card-label">
              <a
                href="mailto:hello@dianaperez.design"
                style={{ color: "var(--orange)", textDecoration: "underline", textUnderlineOffset: 3 }}
              >
                hello@dianaperez.design
              </a>
            </div>
          </div>
          <div className="about-card">
            <div
              className="about-card-number"
              style={{ fontSize: 18 }}
            >
              LinkedIn
            </div>
            <div className="about-card-label">
              <a
                href="https://www.linkedin.com/in/diana-marina-perez/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--orange)", textDecoration: "underline", textUnderlineOffset: 3 }}
              >
                linkedin.com/in/diana-marina-perez
              </a>
            </div>
          </div>
          <div className="about-card">
            <div
              className="about-card-number"
              style={{ fontSize: 18 }}
            >
              TikTok
            </div>
            <div className="about-card-label">
              <a
                href="https://www.tiktok.com/@dianaperez.design"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--orange)", textDecoration: "underline", textUnderlineOffset: 3 }}
              >
                @dianaperez.design
              </a>
            </div>
          </div>
          <div
            style={{
              padding: 24,
              borderRadius: 18,
              background: "var(--orange-light)",
              border: "1px solid rgba(232,112,8,0.15)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: 17,
                fontWeight: 600,
                color: "var(--orange)",
                marginBottom: 8,
              }}
            >
              Consultoría disponible
            </p>
            <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6 }}>
              Ofrezco sesiones de consultoría para equipos de diseño, producto y
              liderazgo en fintech y startups en LATAM.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
