"use client";

import { motion } from "framer-motion";
import { process } from "@/lib/content";
import FadeIn from "./FadeIn";

const EXPO = [0.16, 1, 0.3, 1] as const;

export default function Process() {
  return (
    <section id="process" className="border-t border-ink/10 bg-ink py-24 text-paper md:py-36">
      <div className="mx-auto max-w-8xl px-6 md:px-12">
        <div className="mb-16 max-w-2xl">
          <FadeIn>
            <p className="mb-6 text-[0.72rem] uppercase tracking-eyebrow text-paper/50">
              How we work
            </p>
            <h2 className="font-serif text-[clamp(2rem,5vw,3.6rem)] font-light leading-[1.05] tracking-[-0.02em]">
              Six steps, one continuous line.
            </h2>
          </FadeIn>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-0 top-[7px] h-px w-full bg-paper/15" />
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.6, ease: EXPO }}
            className="absolute left-0 top-[7px] h-px w-full origin-left bg-cypress"
          />

          <div className="grid grid-cols-2 gap-y-12 md:grid-cols-3 lg:grid-cols-6 lg:gap-y-0">
            {process.map((step, i) => (
              <FadeIn key={step.index} delay={i * 0.09}>
                <div className="relative pr-6 pt-8">
                  <span className="absolute top-0 h-[15px] w-[15px] -translate-y-[4px] rounded-full border border-cypress bg-ink" />
                  <span className="font-serif text-sm text-cypress">{step.index}</span>
                  <h3 className="mt-3 font-serif text-2xl font-light tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-[220px] text-sm leading-relaxed text-paper/55">
                    {step.body}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
