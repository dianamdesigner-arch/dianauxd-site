import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link href="/" className="nav-logo">
          Diana Perez
        </Link>
        <div className="nav-links">
          <Link href="/" className="nav-link active">
            Home
          </Link>
          <Link href="/about" className="nav-link">
            About
          </Link>
          <Link href="/work" className="nav-link">
            Work
          </Link>
          <Link href="/blog" className="nav-link">
            Blog
          </Link>
          <Link href="/toolkit" className="nav-link">
            Toolkit
          </Link>
          <Link href="/contact" className="nav-link">
            Contacto
          </Link>
          <a href="#newsletter" className="nav-cta">
            Suscr&iacute;bete
          </a>
        </div>
        <button className="nav-mobile-toggle" aria-label="Menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}
