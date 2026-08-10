import { NextResponse } from "next/server";
import { getPosts, savePosts, type Post } from "@/lib/posts";

export async function GET() {
  return NextResponse.json(getPosts());
}

export async function POST(req: Request) {
  const body = (await req.json()) as Post;

  if (!body.slug || !body.title) {
    return NextResponse.json({ error: "Slug and title are required." }, { status: 400 });
  }
  const slugOk = /^[a-z0-9-]+$/.test(body.slug);
  if (!slugOk) {
    return NextResponse.json(
      { error: "Slug can only contain lowercase letters, numbers, and hyphens." },
      { status: 400 }
    );
  }

  const posts = getPosts();
  if (posts.some((p) => p.slug === body.slug)) {
    return NextResponse.json({ error: "A post with this slug already exists." }, { status: 400 });
  }

  posts.push({ ...body, content: body.content || [] });
  savePosts(posts);
  return NextResponse.json({ ok: true });
}
