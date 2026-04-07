"use client";

import { FormEvent, useState } from "react";

type FormState = {
  name: string;
  email: string;
  phone: string;
  instrument: string;
  experience: string;
  about: string;
};

const initialForm: FormState = {
  name: "",
  email: "",
  phone: "",
  instrument: "",
  experience: "",
  about: "",
};

export default function HomePage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setIsSuccess(false);

    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = (await response.json()) as { success?: boolean; error?: string };

      if (!response.ok || !data.success) {
        throw new Error(data.error ?? "Could not submit your application.");
      }

      setIsSuccess(true);
      setForm(initialForm);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-900 text-zinc-300">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <section className="space-y-6 pb-20 text-center">
          <p className="text-sm uppercase tracking-[0.25em] text-amber-400">Tonehouse Coach Presents</p>
          <h1 className="text-4xl font-semibold text-white md:text-6xl">Tonehouse Academy</h1>
          <p className="mx-auto max-w-2xl text-lg text-zinc-400 md:text-xl">
            Learn Rock. Play Loud. Perform Live.
          </p>
          <a
            href="#form"
            className="inline-flex rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-6 py-3 text-sm font-semibold text-zinc-950 transition hover:opacity-90"
          >
            Apply Now
          </a>
        </section>

        <section className="pb-16">
          <h2 className="mb-4 text-2xl font-semibold text-white">About</h2>
          <p className="max-w-3xl text-lg leading-relaxed">
            At Tonehouse Academy, musicians don’t just take lessons — they join bands.
          </p>
        </section>

        <section className="pb-16">
          <h2 className="mb-6 text-2xl font-semibold text-white">Program</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              "2.5 hours per session, fortnightly",
              "Small band groups",
              "Final live outdoor performance",
            ].map((item) => (
              <article key={item} className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-6">
                <p className="text-base text-zinc-200">{item}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="pb-16">
          <h2 className="mb-4 text-2xl font-semibold text-white">Who it&apos;s for</h2>
          <p className="mb-4">Guitarists, Drummers, Vocalists, Bassists, Keyboardists</p>
          <p className="text-amber-300">All levels welcome — passion required</p>
        </section>

        <section className="pb-16">
          <h2 className="mb-6 text-2xl font-semibold text-white">Why Tonehouse</h2>
          <ul className="grid gap-3 md:grid-cols-2">
            {[
              "Band-based learning",
              "Real stage experience",
              "Community",
              "Performance-focused",
            ].map((reason) => (
              <li key={reason} className="rounded-2xl border border-zinc-800 bg-zinc-950/40 px-5 py-4 text-zinc-200">
                {reason}
              </li>
            ))}
          </ul>
        </section>

        <section id="form" className="scroll-mt-16 rounded-2xl border border-zinc-800 bg-zinc-950/40 p-6 md:p-8">
          <h2 className="mb-2 text-2xl font-semibold text-white">Apply to Tonehouse Academy</h2>
          <p className="mb-8 text-zinc-400">Tell us about your music journey and we&apos;ll be in touch.</p>

          <form onSubmit={onSubmit} className="grid gap-4">
            <input
              required
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white outline-none ring-amber-400 transition focus:ring-2"
            />
            <input
              required
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white outline-none ring-amber-400 transition focus:ring-2"
            />
            <input
              required
              type="tel"
              placeholder="Phone"
              value={form.phone}
              onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white outline-none ring-amber-400 transition focus:ring-2"
            />
            <input
              required
              type="text"
              placeholder="Instrument"
              value={form.instrument}
              onChange={(event) => setForm((prev) => ({ ...prev, instrument: event.target.value }))}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white outline-none ring-amber-400 transition focus:ring-2"
            />
            <textarea
              required
              placeholder="Experience"
              rows={4}
              value={form.experience}
              onChange={(event) => setForm((prev) => ({ ...prev, experience: event.target.value }))}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white outline-none ring-amber-400 transition focus:ring-2"
            />
            <textarea
              required
              placeholder="About"
              rows={5}
              value={form.about}
              onChange={(event) => setForm((prev) => ({ ...prev, about: event.target.value }))}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white outline-none ring-amber-400 transition focus:ring-2"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 px-5 py-3 font-semibold text-zinc-950 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </button>

            {isSuccess ? <p className="text-sm text-emerald-400">Thanks! Your application was submitted.</p> : null}
            {error ? <p className="text-sm text-red-400">{error}</p> : null}
          </form>
        </section>
      </div>
    </main>
  );
}
