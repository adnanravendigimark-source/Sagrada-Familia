import { Suspense } from "react";
import LoginForm from "@/components/admin/LoginForm";

export const metadata = { title: "Admin Login | Sagrada Familia Guided Tours" };

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-stone-900 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl">
        <p className="text-center font-display text-lg font-bold text-stone-900">
          Sagrada Familia
        </p>
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-basilica-terracotta">
          Content Admin
        </p>
        <div className="mt-6">
          <Suspense fallback={null}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
