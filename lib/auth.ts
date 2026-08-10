// Minimal signed-session auth for the /admin CMS. Uses the Web Crypto API
// (globalThis.crypto.subtle) rather than Node's `crypto` module so the exact
// same code runs correctly in both the Edge middleware and Node API routes
// without any extra dependency.
const SECRET = process.env.ADMIN_SESSION_SECRET || "sagrada-admin-dev-secret-change-me";
export const ADMIN_COOKIE_NAME = "sf_admin_session";

async function getKey() {
  const enc = new TextEncoder();
  return crypto.subtle.importKey(
    "raw",
    enc.encode(SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
}

function toBase64Url(input: string | ArrayBuffer) {
  const bytes = typeof input === "string" ? new TextEncoder().encode(input) : new Uint8Array(input);
  let bin = "";
  bytes.forEach((b) => (bin += String.fromCharCode(b)));
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(input: string) {
  const bin = atob(input.replace(/-/g, "+").replace(/_/g, "/"));
  return bin;
}

async function sign(payload: string) {
  const key = await getKey();
  const sigBuf = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return toBase64Url(sigBuf);
}

export async function createSessionToken(email: string): Promise<string> {
  const payload = toBase64Url(email);
  const sig = await sign(payload);
  return `${payload}.${sig}`;
}

export async function verifySessionToken(token: string | undefined | null): Promise<string | null> {
  if (!token) return null;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;
  const expected = await sign(payload);
  if (expected !== sig) return null;
  try {
    return fromBase64Url(payload);
  } catch {
    return null;
  }
}
