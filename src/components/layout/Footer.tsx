import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <div className="footer-brand">Diana Perez</div>
          <p className="footer-brand-desc">
            Strategic Product Design Leader construyendo sistemas fintech
            escalables que generan impacto medible.
          </p>
        </div>
        <div>
          <div className="footer-col-title">Sitio</div>
          <Link href="/about" className="footer-link">
            About
          </Link>
          <Link href="/work" className="footer-link">
            Work
          </Link>
          <Link href="/blog" className="footer-link">
            Blog
          </Link>
          <Link href="/toolkit" className="footer-link">
            Toolkit
          </Link>
          <Link href="/contact" className="footer-link">
            Contacto
          </Link>
        </div>
        <div>
          <div className="footer-col-title">Contenido</div>
          <Link href="/blog" className="footer-link">
            Art&iacute;culos
          </Link>
          <a href="#newsletter" className="footer-link">
            Newsletter
          </a>
          <a
            href="https://dianaperez.substack.com"
            className="footer-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contenido premium en Substack
          </a>
          <a
            href="https://www.tiktok.com/@dianaperez.design"
            className="footer-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            TikTok
          </a>
          <a
            href="https://www.linkedin.com/in/diana-marina-perez/"
            className="footer-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
        <div>
          <div className="footer-col-title">Contacto</div>
          <a href="mailto:hello@dianaperez.design" className="footer-link">
            hello@dianaperez.design
          </a>
          <a
            href="https://www.linkedin.com/in/diana-marina-perez/"
            className="footer-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn DM
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <span className="footer-copy">
          &copy; 2026 Diana Perez. Todos los derechos reservados.
        </span>
        <div className="footer-social">
          <a
            href="https://www.linkedin.com/in/diana-marina-perez/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            href="https://www.tiktok.com/@dianaperez.design"
            target="_blank"
            rel="noopener noreferrer"
          >
            TikTok
          </a>
        </div>
      </div>
    </footer>
  );
}
