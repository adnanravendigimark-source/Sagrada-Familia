import { notFound } from "next/navigation";
import { getSafeUsers } from "@/lib/users";
import UserEditForm from "@/components/admin/UserEditForm";

export const dynamic = "force-dynamic";

export default function EditUserPage({ params }: { params: { id: string } }) {
  const user = getSafeUsers().find((u) => u.id === params.id);
  if (!user) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-stone-900">Edit User</h1>
      <p className="mt-1 text-sm text-stone-600">Editing {user.email}</p>
      <div className="mt-8 max-w-xl rounded-2xl border border-stone-200 bg-white p-6">
        <UserEditForm user={user} />
      </div>
    </div>
  );
}
