"use client";

import { motion } from "framer-motion";
import { work, type Work as WorkItem } from "@/lib/content";
import FadeIn from "./FadeIn";

const EXPO = [0.16, 1, 0.3, 1] as const;

const tones: Record<WorkItem["tone"], { panel: string; text: string; sub: string; line: string }> = {
  ink: { panel: "bg-ink", text: "text-paper", sub: "text-paper/55", line: "bg-paper/20" },
  cypress: { panel: "bg-cypress", text: "text-paper", sub: "text-paper/55", line: "bg-paper/20" },
  stone: { panel: "bg-stone-200", text: "text-ink", sub: "text-stone-600", line: "bg-ink/15" },
};

export default function Work() {
  return (
    <section id="work" className="border-t border-ink/10 bg-paper py-24 md:py-36">
      <div className="mx-auto max-w-8xl px-6 md:px-12">
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <FadeIn>
            <p className="mb-6 text-[0.72rem] uppercase tracking-eyebrow text-stone-600">
              Selected work
            </p>
            <h2 className="max-w-2xl font-serif text-[clamp(2rem,5vw,3.6rem)] font-light leading-[1.05] tracking-[-0.02em] text-ink">
              Systems we have built, end to end.
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-wide2 text-ink"
            >
              All work
              <span className="transition-transform duration-500 ease-expo group-hover:translate-x-1">→</span>
            </a>
          </FadeIn>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {work.map((item, i) => {
            const t = tones[item.tone];
            return (
              <FadeIn key={item.index} delay={(i % 2) * 0.1} y={40}>
                <motion.a
                  href={item.href}
                  whileHover="hover"
                  className={`group relative flex aspect-[4/3] flex-col justify-between overflow-hidden rounded-[3px] p-8 md:p-10 ${t.panel} ${t.text}`}
                >
                  {/* Slow parallax numeral */}
                  <motion.span
                    variants={{ hover: { scale: 1.06, opacity: 0.14 } }}
                    initial={{ opacity: 0.09 }}
                    transition={{ duration: 1.2, ease: EXPO }}
                    className="pointer-events-none absolute -bottom-10 -right-4 font-serif text-[13rem] leading-none"
                    aria-hidden
                  >
                    {item.index}
                  </motion.span>

                  <div className="relative flex items-center justify-between">
                    <span className={`text-[0.72rem] uppercase tracking-eyebrow ${t.sub}`}>
                      {item.sector}
                    </span>
                    <span className={`text-[0.72rem] uppercase tracking-eyebrow ${t.sub}`}>
                      {item.index}
                    </span>
                  </div>

                  <div className="relative">
                    <p className={`mb-3 text-[0.72rem] uppercase tracking-wide2 ${t.sub}`}>
                      {item.client}
                    </p>
                    <h3 className="max-w-md font-serif text-[clamp(1.5rem,2.6vw,2.2rem)] font-light leading-[1.1] tracking-[-0.01em]">
                      {item.title}
                    </h3>
                    <div className={`mt-6 h-px w-full origin-left scale-x-0 transition-transform duration-700 ease-expo group-hover:scale-x-100 ${t.line}`} />
                    <ul className={`mt-5 flex flex-wrap gap-x-4 gap-y-1 text-[0.72rem] uppercase tracking-wide2 ${t.sub}`}>
                      {item.disciplines.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                  </div>
                </motion.a>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
