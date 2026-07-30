"use client";

import { useState } from "react";
import { contact, budgets, businessTypes, timelines } from "@/lib/content";
import FadeIn from "./FadeIn";
import { Monogram } from "./Wordmark";

function PillGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <p className="mb-4 text-[0.72rem] uppercase tracking-eyebrow text-stone-500">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={`rounded-full border px-4 py-2 text-[0.78rem] transition-colors duration-300 ${
              value === opt
                ? "border-ink bg-ink text-paper"
                : "border-ink/20 text-ink hover:border-ink/50"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

const inputBase =
  "w-full border-0 border-b border-ink/20 bg-transparent py-3 text-ink placeholder:text-stone-400 focus:border-cypress focus:outline-none focus:ring-0 transition-colors duration-300";

export default function Contact() {
  const [budget, setBudget] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [timeline, setTimeline] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Local-only demo — a real build would post to a form endpoint.
    setSent(true);
  }

  return (
    <section id="contact" className="border-t border-ink/10 bg-cypress py-24 text-paper md:py-36">
      <div className="mx-auto max-w-8xl px-6 md:px-12">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-4">
            <FadeIn>
              <p className="mb-8 text-[0.72rem] uppercase tracking-eyebrow text-paper/50">
                {contact.eyebrow}
              </p>
              <h2 className="font-serif text-[clamp(2.2rem,4.6vw,3.6rem)] font-light leading-[1.05] tracking-[-0.02em]">
                {contact.headline}
              </h2>
              <p className="mt-8 max-w-sm text-base leading-relaxed text-paper/70">
                {contact.body}
              </p>
              <div className="mt-12 text-paper/60">
                <Monogram className="h-4 w-auto" />
                <p className="mt-4 text-[0.72rem] uppercase tracking-wide2">London — hello@noova.studio</p>
              </div>
            </FadeIn>
          </div>

          <div className="md:col-span-7 md:col-start-6">
            {sent ? (
              <FadeIn>
                <div className="flex min-h-[420px] flex-col justify-center rounded-[3px] border border-paper/15 p-12 text-center">
                  <h3 className="font-serif text-3xl font-light">Thank you.</h3>
                  <p className="mx-auto mt-4 max-w-md text-paper/70">
                    Your brief has been noted. We reply to every serious enquiry within two working days.
                  </p>
                </div>
              </FadeIn>
            ) : (
              <FadeIn>
                <form onSubmit={handleSubmit} className="space-y-10">
                  <div className="grid gap-8 md:grid-cols-2">
                    <input required placeholder="Your name" className={inputBase} />
                    <input required type="email" placeholder="Email address" className={inputBase} />
                    <input placeholder="Company" className={inputBase} />
                    <input placeholder="Website (optional)" className={inputBase} />
                  </div>

                  <PillGroup label="Project budget" options={budgets} value={budget} onChange={setBudget} />
                  <PillGroup label="Business type" options={businessTypes} value={businessType} onChange={setBusinessType} />
                  <PillGroup label="Timeline" options={timelines} value={timeline} onChange={setTimeline} />

                  <div>
                    <p className="mb-4 text-[0.72rem] uppercase tracking-eyebrow text-stone-300/70">
                      What are you building?
                    </p>
                    <textarea
                      rows={3}
                      placeholder="A few sentences on the brand and where you are now."
                      className={`${inputBase} resize-none`}
                    />
                  </div>

                  <button
                    type="submit"
                    className="group inline-flex items-center gap-3 rounded-full bg-paper px-8 py-4 text-[0.78rem] uppercase tracking-wide2 text-ink transition-colors duration-500 hover:bg-ink hover:text-paper"
                  >
                    Send brief
                    <span className="transition-transform duration-500 ease-expo group-hover:translate-x-1">→</span>
                  </button>
                </form>
              </FadeIn>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
