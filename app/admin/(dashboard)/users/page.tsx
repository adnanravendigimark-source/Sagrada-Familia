import Link from "next/link";
import { getSafeUsers } from "@/lib/users";
import { getSession } from "@/lib/session";
import { PAGE_LABELS } from "@/lib/pageAccess";
import UserForm from "@/components/admin/UserForm";
import DeleteButton from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  const users = getSafeUsers();
  const session = await getSession();
  const rootEmail = process.env.ADMIN_EMAIL || "";

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-stone-900">Users</h1>
      <p className="mt-1 text-sm text-stone-600">
        Only admins can see this page. Editors can view and edit site content, but can't delete
        anything and can't manage other users.
      </p>

      <div className="mt-8 rounded-2xl border border-stone-200 bg-white p-6">
        <p className="font-semibold text-stone-900">Add a user</p>
        <p className="mt-0.5 text-xs text-stone-500">
          Give them the email and password directly — there's no invite email, so share it with
          them yourself.
        </p>
        <div className="mt-4">
          <UserForm />
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <div className="flex items-center gap-4 rounded-2xl border border-gold-500/30 bg-gold-500/5 p-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-500 text-sm font-bold text-white">
            {rootEmail.slice(0, 1).toUpperCase() || "A"}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate font-medium text-stone-900">{rootEmail || "(not set)"}</p>
            <p className="text-sm text-stone-500">Owner · full access · set in .env, can't be deleted here</p>
          </div>
        </div>

        {users.map((user) => (
          <div key={user.id} className="flex items-center gap-4 rounded-2xl border border-stone-200 bg-white p-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-stone-200 text-sm font-bold text-stone-600">
              {user.email.slice(0, 1).toUpperCase()}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-stone-900">{user.email}</p>
              <p className="text-sm text-stone-500">
                {user.role === "admin"
                  ? "Admin · full access"
                  : `Editor · ${
                      user.pages.length ? user.pages.map((p) => PAGE_LABELS[p]).join(", ") : "no pages yet"
                    }`}
                {" · added "}
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-4">
              <Link
                href={`/admin/users/${user.id}`}
                className="text-sm font-medium text-basilica-teal hover:underline"
              >
                Edit
              </Link>
              {session?.email.toLowerCase() === user.email.toLowerCase() ? (
                <span className="text-xs font-medium text-stone-400">This is you</span>
              ) : (
                <DeleteButton
                  url={`/api/admin/users/${user.id}`}
                  confirmMessage={`Remove ${user.email}? They'll immediately lose access.`}
                />
              )}
            </div>
          </div>
        ))}

        {users.length === 0 && (
          <p className="rounded-2xl border border-dashed border-stone-300 p-6 text-center text-sm text-stone-500">
            No additional users yet — add one above.
          </p>
        )}
      </div>
    </div>
  );
}
