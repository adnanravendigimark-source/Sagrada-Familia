import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { getUsers, updateUser, deleteUser, type UserRole } from "@/lib/users";
import { PAGE_KEYS, type PageKey } from "@/lib/pageAccess";

async function requireAdmin() {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Admins only." }, { status: 403 });
  }
  return null;
}

function parsePages(input: unknown): PageKey[] {
  if (!Array.isArray(input)) return [];
  return input.filter((p): p is PageKey => (PAGE_KEYS as readonly string[]).includes(p));
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const target = getUsers().find((u) => u.id === params.id);
  if (!target) {
    return NextResponse.json({ error: "User not found." }, { status: 404 });
  }

  const body = await req.json().catch(() => null);
  const email = (body?.email || "").trim();
  const role: UserRole = body?.role === "admin" ? "admin" : "editor";
  const pages = parsePages(body?.pages);
  const password = typeof body?.password === "string" && body.password ? body.password : undefined;

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
  }
  if (email.toLowerCase() === (process.env.ADMIN_EMAIL || "").toLowerCase()) {
    return NextResponse.json({ error: "That email is reserved for the owner account." }, { status: 400 });
  }
  if (role === "editor" && pages.length === 0) {
    return NextResponse.json(
      { error: "Select at least one page this editor can access." },
      { status: 400 }
    );
  }
  if (password && password.length < 8) {
    return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });
  }

  try {
    const updated = updateUser(params.id, { email, role, pages, password });
    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message || "Could not update user." }, { status: 400 });
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Admins only." }, { status: 403 });
  }

  const target = getUsers().find((u) => u.id === params.id);
  if (!target) {
    return NextResponse.json({ error: "User not found." }, { status: 404 });
  }
  if (target.email.toLowerCase() === session.email.toLowerCase()) {
    return NextResponse.json({ error: "You can't delete your own account while logged in as it." }, { status: 400 });
  }

  deleteUser(params.id);
  return NextResponse.json({ ok: true });
}
