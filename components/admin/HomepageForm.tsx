"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUploadField from "./ImageUploadField";
import SeoFieldsCard from "./SeoFieldsCard";
import type { HomepageContent } from "@/lib/homepage";

const inputClass =
  "w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:border-basilica-teal focus:outline-none focus:ring-1 focus:ring-basilica-teal";
const labelClass = "mb-1 block text-sm font-medium text-stone-700";

export default function HomepageForm({ initial }: { initial: HomepageContent }) {
  const router = useRouter();
  const [content, setContent] = useState<HomepageContent>(initial);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  function update<K extends keyof HomepageContent>(key: K, value: HomepageContent[K]) {
    setContent((c) => ({ ...c, [key]: value }));
    setSaved(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const res = await fetch("/api/admin/homepage", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });
    const data = await res.json().catch(() => ({}));
    setSaving(false);
    if (!res.ok) {
      setError(data.error || "Save failed. Please try again.");
      return;
    }
    setSaved(true);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
      {saved && <p className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">Saved — live on the homepage now.</p>}

      <div>
        <label className={labelClass}>Hero badge (small pill above the headline)</label>
        <input value={content.heroBadge} onChange={(e) => update("heroBadge", e.target.value)} className={inputClass} />
      </div>

      <div>
        <label className={labelClass}>Hero headline (H1)</label>
        <textarea
          rows={2}
          value={content.heroHeading}
          onChange={(e) => update("heroHeading", e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Hero subheading</label>
        <textarea
          rows={3}
          value={content.heroSubheading}
          onChange={(e) => update("heroSubheading", e.target.value)}
          className={inputClass}
        />
      </div>

      <ImageUploadField
        label="Hero background photo"
        value={content.heroImage}
        onChange={(url) => update("heroImage", url)}
      />
      <div>
        <label className={labelClass}>Hero photo alt text</label>
        <input
          value={content.heroImageAlt}
          onChange={(e) => update("heroImageAlt", e.target.value)}
          className={inputClass}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Rating value</label>
          <input value={content.ratingValue} onChange={(e) => update("ratingValue", e.target.value)} className={inputClass} placeholder="4.8 / 5" />
        </div>
        <div>
          <label className={labelClass}>Rating count label</label>
          <input value={content.ratingCount} onChange={(e) => update("ratingCount", e.target.value)} className={inputClass} placeholder="1,200+ reviews" />
        </div>
      </div>

      {/* Local state only, like every other field on this form — persisted
          together with everything else when "Save Changes" is clicked
          below. See lib/seo.ts for what each of these actually controls. */}
      <SeoFieldsCard
        pathHint="/"
        value={{
          canonicalUrl: content.canonicalUrl,
          noIndex: content.noIndex,
          noFollow: content.noFollow,
          ogTitle: content.ogTitle,
          ogDescription: content.ogDescription,
          ogImage: content.ogImage,
        }}
        onChange={(patch) => {
          setContent((c) => ({ ...c, ...patch }));
          setSaved(false);
        }}
      />

      <div className="border-t border-stone-200 pt-5">
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-basilica-terracotta px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-basilica-terracotta/90 disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
