import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// Endpoint khusus untuk sendBeacon saat tab/browser ditutup
export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  cookieStore.delete("kppn_token");
  cookieStore.delete("satker_token");
  return new NextResponse(null, { status: 204 });
}