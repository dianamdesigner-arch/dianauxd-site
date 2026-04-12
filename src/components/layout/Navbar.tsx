'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()

  const navLink = (href: string) =>
    `nav-link${pathname === href ? ' active' : ''}`

  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link href="/" className="nav-logo">
          Diana Perez
        </Link>
        <div className="nav-links">
          <Link href="/" className={navLink('/')}>
            Home
          </Link>
          <Link href="/about" className={navLink('/about')}>
            About
          </Link>
          <Link href="/work" className={navLink('/work')}>
            Work
          </Link>
          <Link href="/blog" className={navLink('/blog')}>
            Blog
          </Link>
          <Link href="/toolkit" className={navLink('/toolkit')}>
            Toolkit
          </Link>
          <Link href="/contact" className={navLink('/contact')}>
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
