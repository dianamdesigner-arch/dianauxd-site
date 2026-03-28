import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const body = await request.json();
  const email = body.email?.trim();

  if (!email || !email.includes("@")) {
    return Response.json({ error: "Email inválido" }, { status: 400 });
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("newsletter_subscribers")
    .upsert({ email, source: "website" }, { onConflict: "email", ignoreDuplicates: true });

  if (error) {
    return Response.json({ error: "Error al suscribir" }, { status: 500 });
  }

  return Response.json({ success: true });
}
