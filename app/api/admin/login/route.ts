import { NextResponse } from "next/server";
import { createSessionToken, ADMIN_COOKIE_NAME, type Session } from "@/lib/auth";
import { verifyUserCredentials } from "@/lib/users";
import { PAGE_KEYS } from "@/lib/pageAccess";

export async function POST(req: Request) {
  let email = "";
  let password = "";
  try {
    const body = await req.json();
    email = (body.email || "").trim();
    password = body.password || "";
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const rootEmail = process.env.ADMIN_EMAIL;
  const rootPassword = process.env.ADMIN_PASSWORD;

  if (!rootEmail || !rootPassword) {
    return NextResponse.json(
      { error: "Admin credentials are not configured on the server (.env)." },
      { status: 500 }
    );
  }

  // The .env credentials are the always-valid "owner" account (role: admin)
  // — it can't be deleted and works even if users.json is empty. Everyone
  // else is a user created from /admin/users.
  let session: Session | null = null;

  if (email === rootEmail && password === rootPassword) {
    session = { email, role: "admin", pages: [...PAGE_KEYS] };
  } else {
    const user = verifyUserCredentials(email, password);
    if (user) session = { email: user.email, role: user.role, pages: user.pages };
  }

  if (!session) {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }

  const token = await createSessionToken(session);
  const res = NextResponse.json({ ok: true, role: session.role });
  res.cookies.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours
  });
  return res;
}
