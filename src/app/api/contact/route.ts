import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, message } = body;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return Response.json(
      { error: "Todos los campos son obligatorios" },
      { status: 400 }
    );
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("contact_submissions")
    .insert({ name: name.trim(), email: email.trim(), message: message.trim() });

  if (error) {
    return Response.json({ error: "Error al enviar" }, { status: 500 });
  }

  return Response.json({ success: true });
}
