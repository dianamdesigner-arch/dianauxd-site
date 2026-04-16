import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const { name, email, source } = await req.json()
    const { error } = await supabase
      .from("leads")
      .upsert({ name, email, source: source || "onboarding-research" }, { onConflict: "email" })
    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Error al guardar" }, { status: 500 })
  }
}
