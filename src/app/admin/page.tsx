"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Counts = {
  posts: number;
  cases: number;
  products: number;
  messages: number;
  subscribers: number;
};

export default function AdminDashboard() {
  const [counts, setCounts] = useState<Counts>({
    posts: 0,
    cases: 0,
    products: 0,
    messages: 0,
    subscribers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const [posts, cases, products, messages, subscribers] = await Promise.all(
        [
          supabase
            .from("blog_posts")
            .select("id", { count: "exact", head: true }),
          supabase
            .from("case_studies")
            .select("id", { count: "exact", head: true }),
          supabase
            .from("toolkit_products")
            .select("id", { count: "exact", head: true }),
          supabase
            .from("contact_submissions")
            .select("id", { count: "exact", head: true }),
          supabase
            .from("newsletter_subscribers")
            .select("id", { count: "exact", head: true }),
        ]
      );
      setCounts({
        posts: posts.count ?? 0,
        cases: cases.count ?? 0,
        products: products.count ?? 0,
        messages: messages.count ?? 0,
        subscribers: subscribers.count ?? 0,
      });
      setLoading(false);
    }
    load();
  }, []);

  const cards = [
    { label: "Blog Posts", value: counts.posts, color: "var(--orange)" },
    { label: "Case Studies", value: counts.cases, color: "var(--gold)" },
    { label: "Productos", value: counts.products, color: "var(--orange)" },
    { label: "Mensajes", value: counts.messages, color: "var(--gold)" },
    { label: "Suscriptores", value: counts.subscribers, color: "var(--orange)" },
  ];

  return (
    <div>
      <h1
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: 28,
          fontWeight: 700,
          color: "var(--text)",
          marginBottom: 32,
        }}
      >
        Dashboard
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: 20,
        }}
      >
        {cards.map((c) => (
          <div
            key={c.label}
            style={{
              background: "#fff",
              border: "1px solid var(--border)",
              borderRadius: 16,
              padding: 24,
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                marginBottom: 8,
              }}
            >
              {c.label}
            </div>
            <div
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: 36,
                fontWeight: 700,
                color: c.color,
              }}
            >
              {loading ? "..." : c.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
