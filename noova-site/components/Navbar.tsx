"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import { nav } from "@/lib/content";
import { Wordmark } from "./Wordmark";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 48);
  });

  return (
    <>
      <motion.header
        initial={false}
        animate={{
          backgroundColor: scrolled ? "rgba(246,244,239,0.82)" : "rgba(246,244,239,0)",
          borderColor: scrolled ? "rgba(22,21,15,0.10)" : "rgba(22,21,15,0)",
        }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md"
      >
        <nav className="mx-auto flex max-w-8xl items-center justify-between px-6 py-5 md:px-12">
          <a href="#top" aria-label="noova — home" className="text-ink">
            <Wordmark className="h-[18px] w-auto" />
          </a>

          <div className="hidden items-center gap-9 text-[0.72rem] uppercase tracking-wide2 text-ink md:flex">
            {nav.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative py-1 transition-colors duration-500 hover:text-cypress after:absolute after:-bottom-0 after:left-0 after:h-px after:w-0 after:bg-cypress after:transition-all after:duration-500 after:ease-expo hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
          </div>

          <a
            href={nav.cta.href}
            className="hidden rounded-full bg-ink px-6 py-3 text-[0.72rem] uppercase tracking-wide2 text-paper transition-colors duration-500 hover:bg-cypress md:inline-block"
          >
            {nav.cta.label}
          </a>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="flex flex-col gap-[5px] p-1 text-ink md:hidden"
            aria-label="Toggle menu"
          >
            <span className={`h-px w-6 bg-current transition-transform duration-300 ${menuOpen ? "translate-y-[6px] rotate-45" : ""}`} />
            <span className={`h-px w-6 bg-current transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`h-px w-6 bg-current transition-transform duration-300 ${menuOpen ? "-translate-y-[6px] -rotate-45" : ""}`} />
          </button>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{ opacity: menuOpen ? 1 : 0, pointerEvents: menuOpen ? "auto" : "none" }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-40 flex flex-col justify-center gap-2 bg-paper px-8 md:hidden"
      >
        {nav.links.map((link, i) => (
          <motion.a
            key={link.label}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            initial={false}
            animate={{ y: menuOpen ? 0 : 12, opacity: menuOpen ? 1 : 0 }}
            transition={{ duration: 0.5, delay: menuOpen ? 0.06 * i : 0, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-4xl tracking-tight text-ink"
          >
            {link.label}
          </motion.a>
        ))}
        <a
          href={nav.cta.href}
          onClick={() => setMenuOpen(false)}
          className="mt-8 w-fit rounded-full bg-ink px-7 py-4 text-[0.72rem] uppercase tracking-wide2 text-paper"
        >
          {nav.cta.label}
        </a>
      </motion.div>
    </>
  );
}
