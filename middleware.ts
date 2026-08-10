import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken, ADMIN_COOKIE_NAME } from "@/lib/auth";
import type { PageKey } from "@/lib/pageAccess";

// Gate everything under /admin (except the login page itself) and every
// /api/admin/* route behind a valid signed session cookie. /admin/users and
// /api/admin/users are further restricted to the admin role — editors don't
// get to see that page even exists. Beyond that, each content section is
// gated by the session's `pages` list (set at login from the user's saved
// permissions) — an editor only granted "Blog Posts" access gets redirected
// away from /admin/tours, /admin/homepage, etc., and their matching API
// routes 403.
const PAGE_ROUTES: { key: PageKey; test: (p: string) => boolean }[] = [
  {
    key: "homepage",
    test: (p) =>
      p.startsWith("/admin/homepage") ||
      p.startsWith("/admin/recommended") ||
      p.startsWith("/api/admin/homepage"),
  },
  { key: "tours", test: (p) => p.startsWith("/admin/tours") || p.startsWith("/api/admin/tours") },
  { key: "posts", test: (p) => p.startsWith("/admin/posts") || p.startsWith("/api/admin/posts") },
  { key: "faqs", test: (p) => p.startsWith("/admin/faqs") || p.startsWith("/api/admin/faqs") },
];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isAdminPage = pathname.startsWith("/admin") && pathname !== "/admin/login";
  const isAdminApi = pathname.startsWith("/api/admin") && pathname !== "/api/admin/login";

  if (!isAdminPage && !isAdminApi) {
    return NextResponse.next();
  }

  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const session = await verifySessionToken(token);

  if (!session) {
    if (isAdminApi) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const loginUrl = new URL("/admin/login", req.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const isUsersArea = pathname.startsWith("/admin/users") || pathname.startsWith("/api/admin/users");
  if (isUsersArea && session.role !== "admin") {
    if (isAdminApi) {
      return NextResponse.json({ error: "Admins only." }, { status: 403 });
    }
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  if (session.role !== "admin") {
    const matched = PAGE_ROUTES.find((r) => r.test(pathname));
    if (matched && !session.pages.includes(matched.key)) {
      if (isAdminApi) {
        return NextResponse.json({ error: "You don't have access to this section." }, { status: 403 });
      }
      return NextResponse.redirect(new URL("/admin", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
