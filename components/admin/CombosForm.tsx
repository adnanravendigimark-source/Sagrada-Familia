"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ComboOfferRecord } from "@/lib/data";

const inputClass =
  "w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:border-basilica-teal focus:outline-none focus:ring-1 focus:ring-basilica-teal";
const labelClass = "mb-1 block text-xs font-medium text-stone-600";

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function blankOffer(): ComboOfferRecord {
  return { id: "", title: "", description: "", hrefPath: "", hrefExtra: "" };
}

export default function CombosForm({ initial }: { initial: ComboOfferRecord[] }) {
  const router = useRouter();
  const [offers, setOffers] = useState<ComboOfferRecord[]>(initial);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  function update(i: number, field: keyof ComboOfferRecord, value: string) {
    const next = [...offers];
    next[i] = { ...next[i], [field]: value };
    if (field === "title" && !next[i].id) {
      next[i].id = slugify(value);
    }
    setOffers(next);
    setSaved(false);
  }

  function addOffer() {
    setOffers([...offers, blankOffer()]);
  }

  function removeOffer(i: number) {
    setOffers(offers.filter((_, idx) => idx !== i));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const cleaned = offers.filter((o) => o.title.trim() && o.hrefPath.trim());
    const res = await fetch("/api/admin/combos", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cleaned),
    });
    const data = await res.json().catch(() => ({}));
    setSaving(false);
    if (!res.ok) {
      setError(data.error || "Save failed. Please try again.");
      return;
    }
    setOffers(cleaned);
    setSaved(true);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
      {saved && (
        <p className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">
          Saved — live in the "Combine with Other Gaudí Sites" section on the homepage now.
        </p>
      )}

      {offers.map((offer, i) => (
        <div key={i} className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wide text-stone-500">
              Combo {i + 1} {offer.id && <span className="font-normal normal-case text-stone-400">· id: {offer.id}</span>}
            </span>
            <button
              type="button"
              onClick={() => removeOffer(i)}
              className="text-xs font-medium text-red-600 hover:text-red-700"
            >
              Remove
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <label className={labelClass}>Title</label>
              <input
                value={offer.title}
                onChange={(e) => update(i, "title", e.target.value)}
                placeholder="e.g. Sagrada Familia, Park Güell & Casa Batlló Guided Tour"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Description</label>
              <textarea
                rows={2}
                value={offer.description}
                onChange={(e) => update(i, "description", e.target.value)}
                placeholder="One sentence on what the combo covers"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>GetYourGuide URL path</label>
              <input
                value={offer.hrefPath}
                onChange={(e) => update(i, "hrefPath", e.target.value)}
                placeholder="barcelona-l45/example-tour-t12345"
                className={inputClass}
              />
              <p className="mt-1 text-xs text-stone-500">
                The part of the GetYourGuide URL after getyourguide.com/ — your partner ID and
                tracking params are added automatically.
              </p>
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addOffer}
        className="rounded-lg border border-dashed border-stone-300 px-4 py-2.5 text-sm font-medium text-stone-600 transition hover:bg-stone-50"
      >
        + Add Combo Offer
      </button>

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
