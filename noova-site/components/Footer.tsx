import { footer, nav } from "@/lib/content";
import { Wordmark } from "./Wordmark";

export default function Footer() {
  return (
    <footer className="bg-ink pt-20 text-paper">
      <div className="mx-auto max-w-8xl px-6 md:px-12">
        <div className="grid gap-12 border-b border-paper/10 pb-16 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="max-w-md font-serif text-[clamp(1.8rem,3.4vw,2.8rem)] font-light leading-[1.1] tracking-[-0.01em]">
              {footer.tagline}
            </p>
            <a
              href="#contact"
              className="group mt-8 inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-wide2 text-paper/80"
            >
              Start a project
              <span className="transition-transform duration-500 ease-expo group-hover:translate-x-1">→</span>
            </a>
          </div>

          <div className="grid grid-cols-2 gap-8 md:col-span-6 md:grid-cols-3">
            <nav className="flex flex-col gap-3">
              <p className="mb-2 text-[0.66rem] uppercase tracking-eyebrow text-paper/40">Studio</p>
              {nav.links.map((l) => (
                <a key={l.label} href={l.href} className="text-sm text-paper/70 transition-colors hover:text-paper">
                  {l.label}
                </a>
              ))}
            </nav>
            <nav className="flex flex-col gap-3">
              <p className="mb-2 text-[0.66rem] uppercase tracking-eyebrow text-paper/40">Connect</p>
              {footer.columns[1].links.map((l) => (
                <a key={l} href="#contact" className="text-sm text-paper/70 transition-colors hover:text-paper">
                  {l}
                </a>
              ))}
            </nav>
            <div className="flex flex-col gap-3">
              <p className="mb-2 text-[0.66rem] uppercase tracking-eyebrow text-paper/40">Studio</p>
              <p className="text-sm text-paper/70">{footer.location}</p>
              <p className="text-sm text-paper/70">hello@noova.studio</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-8 py-12 md:flex-row md:items-end">
          <Wordmark className="h-8 w-auto text-paper" />
          <div className="flex flex-col gap-1 text-[0.72rem] uppercase tracking-wide2 text-paper/40 md:text-right">
            <span>{footer.colophon}</span>
            <span>© {new Date().getFullYear()} — all rights reserved</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
