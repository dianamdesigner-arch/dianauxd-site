"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--black)",
        padding: 24,
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          borderRadius: 20,
          padding: 40,
          width: "100%",
          maxWidth: 400,
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: 28,
            fontWeight: 700,
            color: "var(--orange)",
            marginBottom: 8,
          }}
        >
          Admin
        </div>
        <p
          style={{
            fontSize: 14,
            color: "var(--text-muted)",
            marginBottom: 28,
          }}
        >
          Diana Perez — Panel de administración
        </p>

        {error && (
          <div
            style={{
              background: "#FDF0E2",
              border: "1px solid var(--orange)",
              borderRadius: 10,
              padding: "12px 16px",
              fontSize: 14,
              color: "var(--orange)",
              marginBottom: 20,
            }}
          >
            {error}
          </div>
        )}

        <div style={{ marginBottom: 16 }}>
          <label
            style={{
              display: "block",
              fontSize: 13,
              fontWeight: 600,
              color: "var(--text-secondary)",
              marginBottom: 6,
            }}
          >
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "14px 16px",
              borderRadius: 10,
              border: "1.5px solid var(--border)",
              fontSize: 15,
              fontFamily: "var(--font-sans)",
              outline: "none",
            }}
          />
        </div>

        <div style={{ marginBottom: 24 }}>
          <label
            style={{
              display: "block",
              fontSize: 13,
              fontWeight: 600,
              color: "var(--text-secondary)",
              marginBottom: 6,
            }}
          >
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "14px 16px",
              borderRadius: 10,
              border: "1.5px solid var(--border)",
              fontSize: 15,
              fontFamily: "var(--font-sans)",
              outline: "none",
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary"
          style={{ width: "100%", justifyContent: "center" }}
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
