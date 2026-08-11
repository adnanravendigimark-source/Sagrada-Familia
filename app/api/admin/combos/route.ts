import { NextResponse } from "next/server";

// Combo Offers admin feature was removed per request. This route file
// can't be deleted from here, so both handlers are disabled rather than
// left functional.
export async function GET() {
  return NextResponse.json({ error: "Not found" }, { status: 404 });
}

export async function PUT() {
  return NextResponse.json({ error: "Not found" }, { status: 404 });
}
