import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

// Saves an uploaded image to /public/uploads and returns its public URL for
// use in a tour/post/homepage image field. Note: on serverless hosts (e.g.
// Vercel) the filesystem is ephemeral — uploads work but won't survive a
// redeploy. Fine for a traditional/VPS Node deployment (`next start`).
export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }
  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Only image files are allowed." }, { status: 400 });
  }
  if (file.size > 8 * 1024 * 1024) {
    return NextResponse.json({ error: "Image is larger than 8MB." }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const extMatch = file.name.match(/\.[a-zA-Z0-9]+$/);
  const rawExt = extMatch ? extMatch[0].toLowerCase() : ".jpg";
  const ext = /^\.(jpg|jpeg|png|webp|gif|svg)$/.test(rawExt) ? rawExt : ".jpg";
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`;

  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadsDir, { recursive: true });
  await writeFile(path.join(uploadsDir, filename), buffer);

  return NextResponse.json({ url: `/uploads/${filename}` });
}
