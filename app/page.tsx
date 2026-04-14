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
  const [genres, setGenres] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [showFullBio, setShowFullBio] = useState(false);

  const toggleGenre = (genre: string) => {
    setGenres((prev) =>
      prev.includes(genre)
        ? prev.filter((g) => g !== genre)
        : [...prev, genre]
    );
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setIsSuccess(false);

    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          genre: genres.join(","),
        }),
      });

      const data = (await response.json()) as { success?: boolean; error?: string };

      if (!response.ok || !data.success) {
        throw new Error(data.error ?? "Could not submit your application.");
      }

      setIsSuccess(true);
      setForm(initialForm);
      setGenres([]);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="bg-zinc-900 text-zinc-300">

      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center text-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/academy-bg.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 max-w-2xl px-6">
          <p className="text-xs uppercase tracking-[0.3em] text-amber-400 mb-5">
            Tonehouse Studios
          </p>

          <h1 className="text-5xl md:text-6xl font-semibold text-white mb-5 leading-tight">
            Tonehouse Academy
          </h1>

          <p className="text-lg text-zinc-300 mb-2">
            Experiential Music School
          </p>

          <p className="text-zinc-500 mb-10 leading-relaxed">
            Learn in a band. Train with real musicians. Perform live.
          </p>

          <a
            href="#form"
            className="inline-block bg-gradient-to-r from-amber-400 to-orange-500 
            px-8 py-4 rounded-full text-base font-semibold text-black 
            hover:opacity-90 transition shadow-lg"
          >
            Apply Now
          </a>
        </div>
      </section>

      <div className="max-w-2xl mx-auto px-6 py-24 space-y-24 text-center">

        {/* ABOUT */}
        <section className="space-y-6">
          <h2 className="text-2xl text-white">About</h2>
          <p className="text-lg leading-relaxed text-zinc-300">
            At Tonehouse Academy, musicians don’t just take lessons — they learn by playing in real bands,
            guided by experienced instructors, and work towards a live performance.
          </p>
        </section>

        {/* PROGRAM */}
        <section className="space-y-10">
          <h2 className="text-2xl text-white">Program</h2>

          <div className="space-y-4 text-3xl md:text-4xl font-semibold leading-tight">
            <p className="text-zinc-300">8 weeks.</p>
            <p className="text-zinc-300">Real musicians.</p>
            <p className="text-zinc-300">Play in a band.</p>
            <p className="text-amber-400">Perform live.</p>
          </div>
        </section>

        {/* STATEMENT */}
        <section>
          <p className="text-3xl md:text-4xl text-white font-semibold leading-snug">
            You don’t learn music here.
            <br />
            <span className="text-amber-400">You play it.</span>
          </p>
        </section>

        {/* GENRES */}
        <section className="space-y-6">
          <h2 className="text-2xl text-white">Music Genres</h2>

          <p className="text-xl md:text-2xl tracking-wide text-zinc-300 leading-relaxed">
            Rock &nbsp;•&nbsp; Metal &nbsp;•&nbsp; Pop
            <br />
            Blues &nbsp;•&nbsp; Jazz
          </p>

          <p className="text-sm text-zinc-600">And more as we grow</p>
        </section>

        {/* WHO */}
        <section className="space-y-4">
          <h2 className="text-2xl text-white">Who it&apos;s for</h2>

          <p className="text-lg text-zinc-300 leading-relaxed">
            Guitarists • Drummers • Vocalists • Bassists • Keyboardists
          </p>

          <p className="text-amber-400 text-sm">
            All levels welcome — passion required
          </p>
        </section>

        {/* INSTRUCTOR */}
        <section className="space-y-6">
          <h2 className="text-2xl text-white">Meet Your Instructor</h2>

          <div className="flex flex-col items-center space-y-4">
            <img
              src="/instructor.jpeg"
              alt="Instructor"
              className="w-40 h-40 rounded-full object-cover"
            />

            <h3 className="text-xl text-amber-400">Oliver</h3>

            <p className="text-zinc-400 max-w-xl leading-relaxed">
              Oliver is a multi-instrumentalist and educator inspired by Blues, Funk, Electronic, Pop, and Rock. 
              Since 2010, he has taught drums, bass, guitar, and more to 250+ students worldwide.
            </p>

            {showFullBio && (
              <p className="text-zinc-500 max-w-xl leading-relaxed">
                Alongside teaching, Oliver performs regularly and co-founded Ann Siang Sounds, a jam community 
                bringing musicians together to collaborate, improvise, and build confidence in real band settings. 
                With experience spanning education, events, and music business, he is dedicated to nurturing 
                Singapore’s next generation of musicians.
              </p>
            )}

            <button
              onClick={() => setShowFullBio(!showFullBio)}
              className="text-amber-400 text-sm"
            >
              {showFullBio ? "Show less" : "Read more"}
            </button>
          </div>
        </section>

        {/* FORM */}
        <section id="form" className="pt-20">
          <div className="max-w-xl mx-auto bg-zinc-950/60 border border-zinc-800 rounded-2xl p-8 shadow-xl">

            <h2 className="text-2xl text-white mb-2 text-center">
              Apply
            </h2>

            <p className="text-zinc-400 mb-8 text-center">
              Tell us about your music journey and we’ll be in touch.
            </p>

            <form onSubmit={onSubmit} className="grid gap-4">

              <input required type="text" placeholder="Name" value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-zinc-800 bg-zinc-900 px-4 py-3 rounded-lg text-white focus:ring-2 ring-amber-400 outline-none"
              />

              <input required type="email" placeholder="Email" value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border border-zinc-800 bg-zinc-900 px-4 py-3 rounded-lg text-white focus:ring-2 ring-amber-400 outline-none"
              />

              <input required type="tel" placeholder="Phone" value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full border border-zinc-800 bg-zinc-900 px-4 py-3 rounded-lg text-white focus:ring-2 ring-amber-400 outline-none"
              />

              <select required value={form.instrument}
                onChange={(e) =>
                  setForm({ ...form, instrument: e.target.value, otherInstrument: "" })
                }
                className="w-full border border-zinc-800 bg-zinc-900 px-4 py-3 rounded-lg text-white focus:ring-2 ring-amber-400 outline-none"
              >
                <option value="">Select Instrument</option>
                <option value="Guitar">Guitar</option>
                <option value="Drums">Drums</option>
                <option value="Vocals">Vocals</option>
                <option value="Bass">Bass</option>
                <option value="Keyboard">Keyboard</option>
                <option value="Other">Other</option>
              </select>

              {form.instrument === "Other" && (
                <input required type="text" placeholder="Please specify your instrument"
                  value={form.otherInstrument}
                  onChange={(e) =>
                    setForm({ ...form, otherInstrument: e.target.value })
                  }
                  className="w-full border border-zinc-800 bg-zinc-900 px-4 py-3 rounded-lg text-white focus:ring-2 ring-amber-400 outline-none"
                />
              )}

              <div className="space-y-3 pt-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm text-zinc-400 tracking-wide">
                    Music Genre
                  </label>
                  <span className="text-xs text-zinc-600">Select one or more</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {["Rock", "Pop", "Jazz", "Blues", "Metal", "Hip Hop"].map((g) => {
                    const isSelected = genres.includes(g);

                    return (
                      <button
                        key={g}
                        type="button"
                        onClick={() => toggleGenre(g)}
                        className={`px-4 py-2 rounded-full text-sm font-medium border ${
                          isSelected
                            ? "bg-gradient-to-r from-amber-400 to-orange-500 text-black border-transparent"
                            : "bg-zinc-900 text-zinc-300 border-zinc-700"
                        }`}
                      >
                        {g}
                      </button>
                    );
                  })}
                </div>
              </div>

              <textarea required placeholder="Experience" rows={4}
                value={form.experience}
                onChange={(e) => setForm({ ...form, experience: e.target.value })}
                className="w-full border border-zinc-800 bg-zinc-900 px-4 py-3 rounded-lg text-white focus:ring-2 ring-amber-400 outline-none"
              />

              <textarea required placeholder="About you" rows={5}
                value={form.about}
                onChange={(e) => setForm({ ...form, about: e.target.value })}
                className="w-full border border-zinc-800 bg-zinc-900 px-4 py-3 rounded-lg text-white focus:ring-2 ring-amber-400 outline-none"
              />

              <button type="submit" disabled={isSubmitting}
                className="mt-4 bg-gradient-to-r from-amber-400 to-orange-500 px-6 py-4 rounded-full text-base font-semibold text-black"
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </button>

              {isSuccess && <p className="text-green-400">Submitted successfully.</p>}
              {error && <p className="text-red-400">{error}</p>}
            </form>

          </div>
        </section>

      </div>
    </main>
  );
}