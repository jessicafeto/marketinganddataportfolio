import { services } from "@/lib/content";
import FadeIn from "./FadeIn";

export default function Services() {
  return (
    <section id="services" className="border-t border-ink/10 bg-paper py-24 md:py-36">
      <div className="mx-auto max-w-8xl px-6 md:px-12">
        <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <FadeIn>
            <p className="mb-6 text-[0.72rem] uppercase tracking-eyebrow text-stone-600">
              What we do
            </p>
            <h2 className="max-w-2xl font-serif text-[clamp(2rem,5vw,3.6rem)] font-light leading-[1.05] tracking-[-0.02em] text-ink">
              Six disciplines, one system.
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="max-w-xs text-sm leading-relaxed text-stone-600">
              Engaged together or in sequence — never as disconnected parts.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 border-t border-ink/10 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <FadeIn key={s.index} delay={(i % 3) * 0.08}>
              <article className="group flex h-full flex-col justify-between border-b border-ink/10 px-2 py-10 transition-colors duration-700 hover:bg-ink md:min-h-[340px] md:px-8 lg:[&:nth-child(3n+2)]:border-x lg:[&:nth-child(3n+2)]:border-x-ink/10">
                <div>
                  <div className="flex items-baseline justify-between">
                    <span className="font-serif text-sm text-cypress transition-colors duration-700 group-hover:text-paper/60">
                      {s.index}
                    </span>
                    <span className="text-[0.66rem] uppercase tracking-eyebrow text-stone-400 opacity-0 transition-opacity duration-700 group-hover:opacity-100 group-hover:text-paper/50">
                      noova
                    </span>
                  </div>
                  <h3 className="mt-6 font-serif text-[1.7rem] font-light leading-tight tracking-[-0.01em] text-ink transition-colors duration-700 group-hover:text-paper">
                    {s.title}
                  </h3>
                  <p className="mt-4 max-w-sm text-sm leading-relaxed text-stone-600 transition-colors duration-700 group-hover:text-paper/70">
                    {s.description}
                  </p>
                </div>
                <ul className="mt-8 flex flex-wrap gap-x-4 gap-y-2 text-[0.72rem] uppercase tracking-wide2 text-stone-500 transition-colors duration-700 group-hover:text-paper/60">
                  {s.detail.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
