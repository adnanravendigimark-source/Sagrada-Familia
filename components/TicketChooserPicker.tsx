"use client";

import { useState, type ReactNode } from "react";

// Radio-style "What matters most to you?" picker. Desktop shows all three
// cards and rings the match; phones show the matched card only, so the
// section stays short. With JavaScript off, the default (recommended) tour
// is the match and every card still renders on desktop.
export default function TicketChooserPicker({
  options,
  cards,
  defaultId,
  question,
  matchLabel,
}: {
  options: { id: string; label: string }[];
  cards: Record<string, ReactNode>;
  defaultId: string;
  question: string;
  matchLabel: string;
}) {
  const [selected, setSelected] = useState(defaultId);

  return (
    <div className="mt-8">
      <fieldset>
        <legend className="text-sm font-medium text-stone-900/75">{question}</legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {options.map((o) => {
            const active = o.id === selected;
            return (
              <label
                key={o.id}
                className={`flex min-h-[44px] cursor-pointer items-center gap-3 rounded-2xl border px-4 py-2.5 text-sm transition-colors duration-150 focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-basilica-teal ${
                  active
                    ? "border-basilica-terracotta bg-basilica-terracotta/5 text-stone-900"
                    : "border-stone-900/10 bg-white text-stone-900/75 hover:border-stone-900/25"
                }`}
              >
                <input
                  type="radio"
                  name="ticket-match"
                  value={o.id}
                  checked={active}
                  onChange={() => setSelected(o.id)}
                  className="h-4 w-4 shrink-0 accent-basilica-terracotta"
                />
                <span>{o.label}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {options.map((o) => {
          const active = o.id === selected;
          return (
            <div
              key={o.id}
              className={`relative rounded-[1.65rem] ${active ? "p-1 ring-2 ring-basilica-terracotta" : "hidden p-1 sm:block"}`}
            >
              {active && (
                <span className="absolute -top-3 right-4 z-10 rounded-full bg-basilica-terracotta px-3 py-1 text-xs font-semibold text-white shadow-sm">
                  {matchLabel}
                </span>
              )}
              {cards[o.id]}
            </div>
          );
        })}
      </div>
      <p className="mt-3 text-xs text-stone-900/65 sm:hidden">
        Pick another option above to see that tour, or compare all three in the table below.
      </p>
    </div>
  );
}
