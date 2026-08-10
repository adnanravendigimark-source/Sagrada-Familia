import { NextResponse } from "next/server";
import { getHomepageContent, saveHomepageContent, type HomepageContent } from "@/lib/homepage";

export async function GET() {
  return NextResponse.json(getHomepageContent());
}

export async function PUT(req: Request) {
  const body = (await req.json()) as HomepageContent;
  saveHomepageContent(body);
  return NextResponse.json({ ok: true });
}
