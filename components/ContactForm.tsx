"use client";

// Presentational only — not wired to a backend or email service yet.
// Before going live, connect the onSubmit handler to a form service
// (Formspree, Resend, a serverless API route) or point the <form> at one
// directly via its `action` prop.
export default function ContactForm() {
  return (
    <form
      className="mt-10 space-y-5"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-stone-900">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="mt-1.5 w-full rounded-lg border border-stone-900/15 px-3.5 py-2.5 text-sm text-stone-900 outline-none transition focus:border-basilica-teal focus:ring-1 focus:ring-basilica-teal"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium text-stone-900">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1.5 w-full rounded-lg border border-stone-900/15 px-3.5 py-2.5 text-sm text-stone-900 outline-none transition focus:border-basilica-teal focus:ring-1 focus:ring-basilica-teal"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="text-sm font-medium text-stone-900">
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          className="mt-1.5 w-full rounded-lg border border-stone-900/15 px-3.5 py-2.5 text-sm text-stone-900 outline-none transition focus:border-basilica-teal focus:ring-1 focus:ring-basilica-teal"
          placeholder="What's this about?"
        />
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-medium text-stone-900">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="mt-1.5 w-full rounded-lg border border-stone-900/15 px-3.5 py-2.5 text-sm text-stone-900 outline-none transition focus:border-basilica-teal focus:ring-1 focus:ring-basilica-teal"
          placeholder="How can we help?"
        />
      </div>

      <button
        type="submit"
        className="rounded-full bg-basilica-terracotta px-6 py-3 text-sm font-semibold text-white transition hover:bg-basilica-terracotta/90"
      >
        Send Message
      </button>
    </form>
  );
}
