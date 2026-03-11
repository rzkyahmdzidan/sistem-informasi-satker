import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET() {
  const { data, error } = await supabase
    .from('profiles_satker')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Ambil updated_at dari profil_satker untuk setiap satker
  const { data: profilData } = await supabase
    .from('profil_satker')
    .select('id, updated_at')

  const profilMap = Object.fromEntries(
    (profilData || []).map((p: any) => [p.id, p.updated_at])
  )

  const list = (data || []).map((s: any) => ({
    ...s,
    updated_at: profilMap[s.id] ?? null,
  }))

  return NextResponse.json({ list })
}