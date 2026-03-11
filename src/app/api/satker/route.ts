import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export async function PATCH(request: NextRequest) {
  const body = await request.json();
  const { id, status, profil } = body;

  if (status !== undefined) {
    const { error } = await supabase.from("profiles_satker").update({ status }).eq("id", id);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  }

  if (profil !== undefined) {
    const { data: existing } = await supabase.from("profil_satker").select("id").eq("id", id).single();

    let error;
    if (existing) {
      ({ error } = await supabase
        .from("profil_satker")
        .update({ ...profil })
        .eq("id", id));
    } else {
      ({ error } = await supabase.from("profil_satker").insert({ id, ...profil }));
    }

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Tidak ada data yang diupdate" }, { status: 400 });
}
