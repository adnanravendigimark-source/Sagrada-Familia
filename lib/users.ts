import crypto from "crypto";
import { readJson, writeJson } from "./cms";
import { hashPassword, verifyPassword } from "./passwords";
import { PAGE_KEYS, type PageKey } from "./pageAccess";

export type UserRole = "admin" | "editor";

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  // Which admin sections this user can see/edit. Only meaningful when
  // role is "editor" — an "admin" user always has full access and this
  // field is kept in sync with the full PAGE_KEYS list for display only.
  pages: PageKey[];
  createdAt: string;
}

// Public shape (no password hash) — safe to send to the browser.
export interface SafeUser {
  id: string;
  email: string;
  role: UserRole;
  pages: PageKey[];
  createdAt: string;
}

function toSafe({ passwordHash, ...rest }: User): SafeUser {
  return rest;
}

function normalizePages(role: UserRole, pages: PageKey[]): PageKey[] {
  if (role === "admin") return [...PAGE_KEYS];
  const valid = pages.filter((p) => (PAGE_KEYS as readonly string[]).includes(p));
  return Array.from(new Set(valid));
}

export function getUsers(): User[] {
  // Older accounts created before per-page access existed won't have a
  // `pages` field in the JSON file — default them to admin-equivalent
  // full access rather than silently locking them out of everything.
  return readJson<User[]>("users.json").map((u) => ({
    ...u,
    pages: Array.isArray(u.pages) ? u.pages : [...PAGE_KEYS],
  }));
}

export function getSafeUsers(): SafeUser[] {
  return getUsers().map(toSafe);
}

export function saveUsers(users: User[]): void {
  writeJson("users.json", users);
}

export function findUserByEmail(email: string): User | undefined {
  return getUsers().find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export function findUserById(id: string): User | undefined {
  return getUsers().find((u) => u.id === id);
}

export function createUser(
  email: string,
  password: string,
  role: UserRole,
  pages: PageKey[]
): SafeUser {
  const users = getUsers();
  if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
    throw new Error("A user with this email already exists.");
  }
  const user: User = {
    id: crypto.randomUUID(),
    email,
    passwordHash: hashPassword(password),
    role,
    pages: normalizePages(role, pages),
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  saveUsers(users);
  return toSafe(user);
}

export function updateUser(
  id: string,
  updates: { email?: string; role?: UserRole; pages?: PageKey[]; password?: string }
): SafeUser {
  const users = getUsers();
  const idx = users.findIndex((u) => u.id === id);
  if (idx === -1) throw new Error("User not found.");

  const current = users[idx];
  const nextEmail = (updates.email || current.email).trim();
  if (nextEmail.toLowerCase() !== current.email.toLowerCase()) {
    if (users.some((u, i) => i !== idx && u.email.toLowerCase() === nextEmail.toLowerCase())) {
      throw new Error("A user with this email already exists.");
    }
  }
  const nextRole = updates.role || current.role;
  const nextPages = normalizePages(nextRole, updates.pages ?? current.pages);

  const updated: User = {
    ...current,
    email: nextEmail,
    role: nextRole,
    pages: nextPages,
    passwordHash: updates.password ? hashPassword(updates.password) : current.passwordHash,
  };
  users[idx] = updated;
  saveUsers(users);
  return toSafe(updated);
}

export function deleteUser(id: string): void {
  const users = getUsers().filter((u) => u.id !== id);
  saveUsers(users);
}

export function verifyUserCredentials(email: string, password: string): SafeUser | null {
  const user = findUserByEmail(email);
  if (!user) return null;
  if (!verifyPassword(password, user.passwordHash)) return null;
  return toSafe(user);
}
