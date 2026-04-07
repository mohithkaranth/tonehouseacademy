"use client";

import { FormEvent, useState } from "react";

type FormState = {
  name: string;
  email: string;
  phone: string;
  instrument: string;
  otherInstrument: string;
  experience: string;
  about: string;
};

const initialForm: FormState = {
  name: "",
  email: "",
  phone: "",
  instrument: "",
  otherInstrument: "",
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
    <main className="bg-zinc-900 text-zinc-300">

      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/academy-bg.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 max-w-3xl px-6">
          <p className="text-sm uppercase tracking-[0.25em] text-amber-400 mb-4">
            TONEHOUSE STUDIOS PRESENTS
          </p>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            Tonehouse Academy
          </h1>

          <p className="text-lg md:text-xl text-zinc-300 mb-8">
            Learn Rock. Play Loud. Perform Live.
          </p>

          <a
            href="#form"
            className="inline-block bg-gradient-to-r from-amber-400 to-orange-500 px-6 py-3 rounded-xl font-semibold text-black hover:opacity-90 transition"
          >
            Apply Now
          </a>
        </div>
      </section>

      {/* CONTENT */}
      <div className="mx-auto max-w-5xl px-6 py-20">

        {/* ABOUT */}
        <section className="pb-16">
          <h2 className="mb-4 text-2xl font-semibold text-white">About</h2>
          <p className="max-w-3xl text-lg leading-relaxed">
            At Tonehouse Academy, musicians don’t just take lessons — they join bands.
          </p>
        </section>

        {/* PROGRAM */}
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

        {/* WHO */}
        <section className="pb-16">
          <h2 className="mb-4 text-2xl font-semibold text-white">Who it&apos;s for</h2>
          <p className="mb-4">Guitarists, Drummers, Vocalists, Bassists, Keyboardists</p>
          <p className="text-amber-300">All levels welcome — passion required</p>
        </section>

        {/* WHY */}
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

        {/* FORM */}
        <section id="form" className="scroll-mt-16 rounded-2xl border border-zinc-800 bg-zinc-950/40 p-6 md:p-8">
          <h2 className="mb-2 text-2xl font-semibold text-white">Apply to Tonehouse Academy</h2>
          <p className="mb-8 text-zinc-400">Tell us about your music journey and we&apos;ll be in touch.</p>

          <form onSubmit={onSubmit} className="grid gap-4">

            <input
              required
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white focus:ring-2 ring-amber-400 outline-none"
            />

            <input
              required
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white focus:ring-2 ring-amber-400 outline-none"
            />

            <input
              required
              type="tel"
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white focus:ring-2 ring-amber-400 outline-none"
            />

            {/* INSTRUMENT DROPDOWN */}
            <select
              required
              value={form.instrument}
              onChange={(e) =>
                setForm({ ...form, instrument: e.target.value, otherInstrument: "" })
              }
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white focus:ring-2 ring-amber-400 outline-none"
            >
              <option value="">Select Instrument</option>
              <option value="Guitar">Guitar</option>
              <option value="Drums">Drums</option>
              <option value="Vocals">Vocals</option>
              <option value="Bass">Bass</option>
              <option value="Keyboard">Keyboard</option>
              <option value="Other">Other</option>
            </select>

            {/* OTHER INSTRUMENT */}
            {form.instrument === "Other" && (
              <input
                required
                type="text"
                placeholder="Please specify your instrument"
                value={form.otherInstrument}
                onChange={(e) =>
                  setForm({ ...form, otherInstrument: e.target.value })
                }
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white focus:ring-2 ring-amber-400 outline-none"
              />
            )}

            <textarea
              required
              placeholder="Experience"
              rows={4}
              value={form.experience}
              onChange={(e) => setForm({ ...form, experience: e.target.value })}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white focus:ring-2 ring-amber-400 outline-none"
            />

            <textarea
              required
              placeholder="About you"
              rows={5}
              value={form.about}
              onChange={(e) => setForm({ ...form, about: e.target.value })}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white focus:ring-2 ring-amber-400 outline-none"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 px-5 py-3 font-semibold text-black hover:opacity-90 disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </button>

            {isSuccess && <p className="text-green-400">Submitted successfully.</p>}
            {error && <p className="text-red-400">{error}</p>}
          </form>
        </section>
      </div>
    </main>
  );
}