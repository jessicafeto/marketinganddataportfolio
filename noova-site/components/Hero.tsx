"use client";

import { motion } from "framer-motion";
import { hero } from "@/lib/content";
import { Monogram } from "./Wordmark";
import MagneticButton from "./MagneticButton";

const EXPO = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-paper pt-32">
      {/* Oversized monogram watermark, very quiet */}
      <motion.div
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 0.05, scale: 1 }}
        transition={{ duration: 2, ease: EXPO }}
        className="pointer-events-none absolute -right-[8%] top-[12%] w-[62vw] max-w-[900px] text-ink"
        aria-hidden
      >
        <Monogram className="h-auto w-full" />
      </motion.div>

      <div className="relative z-10 mx-auto w-full max-w-8xl px-6 md:px-12">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: EXPO }}
          className="mb-8 text-[0.72rem] uppercase tracking-eyebrow text-stone-600"
        >
          {hero.eyebrow}
        </motion.p>

        <h1 className="font-serif font-light leading-[0.92] tracking-[-0.02em] text-ink">
          {hero.headlineLines.map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, delay: 0.2 + i * 0.12, ease: EXPO }}
                className="block text-[clamp(3.2rem,10.5vw,9.5rem)]"
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.55, ease: EXPO }}
          className="mt-10 max-w-xl text-base leading-relaxed text-stone-600 md:text-lg"
        >
          {hero.paragraph}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.75, ease: EXPO }}
          className="mt-12 flex flex-wrap items-center gap-4"
        >
          <MagneticButton href={hero.primary.href} variant="solid">
            {hero.primary.label}
          </MagneticButton>
          <MagneticButton href={hero.secondary.href} variant="outline">
            {hero.secondary.label}
            <span aria-hidden className="transition-transform duration-500 ease-expo group-hover:translate-x-1">→</span>
          </MagneticButton>
        </motion.div>
      </div>

      {/* Ticker line at the base of the hero */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1, ease: EXPO }}
        className="relative z-10 mt-20 border-y border-ink/10 py-4"
      >
        <div className="flex overflow-hidden">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 28, ease: "linear", repeat: Infinity }}
            className="flex shrink-0 items-center gap-6 whitespace-nowrap text-[0.72rem] uppercase tracking-eyebrow text-stone-500"
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} className="flex items-center gap-6">
                {hero.ticker}
                <span className="text-cypress">✳</span>
              </span>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
