import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST() {
  // Ambil semua user satker beserta username (kode satker)
  const { data: users, error } = await supabase
    .from("users")
    .select("id, username")
    .eq("role", "satker");

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Hash & update password satu per satu
  let updated = 0;
  for (const user of users || []) {
    const hashed = await bcrypt.hash(user.username, 6);
    const { error: updateError } = await supabase
      .from("users")
      .update({ password: hashed })
      .eq("id", user.id);

    if (!updateError) updated++;
  }

  return NextResponse.json({ success: true, updated });
}