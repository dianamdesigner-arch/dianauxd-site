"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: "◻" },
  { href: "/admin/blog", label: "Blog", icon: "✎" },
  { href: "/admin/cases", label: "Case Studies", icon: "◈" },
  { href: "/admin/toolkit", label: "Toolkit", icon: "▣" },
  { href: "/admin/contact", label: "Contacto", icon: "✉" },
  { href: "/admin/newsletter", label: "Newsletter", icon: "◉" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: 240,
          background: "var(--black)",
          padding: "24px 0",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            padding: "0 20px 24px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            marginBottom: 8,
          }}
        >
          <Link
            href="/admin"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: 20,
              fontWeight: 700,
              color: "var(--orange)",
              textDecoration: "none",
            }}
          >
            Diana Perez
          </Link>
          <div
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,0.35)",
              marginTop: 4,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              fontWeight: 600,
            }}
          >
            Admin Panel
          </div>
        </div>

        <nav style={{ flex: 1, padding: "0 8px" }}>
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 12px",
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? "#fff" : "rgba(255,255,255,0.5)",
                  background: isActive
                    ? "rgba(232,112,8,0.15)"
                    : "transparent",
                  textDecoration: "none",
                  marginBottom: 2,
                  transition: "all 0.2s",
                }}
              >
                <span style={{ fontSize: 16, opacity: isActive ? 1 : 0.5 }}>
                  {item.icon}
                </span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div style={{ padding: "16px 20px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <Link
            href="/"
            style={{
              fontSize: 13,
              color: "rgba(255,255,255,0.35)",
              textDecoration: "none",
              display: "block",
              marginBottom: 10,
            }}
          >
            ← Ver sitio
          </Link>
          <button
            onClick={handleLogout}
            style={{
              background: "none",
              border: "none",
              fontSize: 13,
              color: "rgba(255,255,255,0.35)",
              cursor: "pointer",
              padding: 0,
            }}
          >
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main
        style={{
          flex: 1,
          background: "var(--bg)",
          padding: 32,
          overflowY: "auto",
        }}
      >
        {children}
      </main>
    </div>
  );
}
