import { journal } from "@/lib/content";
import FadeIn from "./FadeIn";

export default function Journal() {
  return (
    <section id="journal" className="border-t border-ink/10 bg-paper py-24 md:py-36">
      <div className="mx-auto max-w-8xl px-6 md:px-12">
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <FadeIn>
            <p className="mb-6 text-[0.72rem] uppercase tracking-eyebrow text-stone-600">
              Journal
            </p>
            <h2 className="max-w-2xl font-serif text-[clamp(2rem,5vw,3.6rem)] font-light leading-[1.05] tracking-[-0.02em] text-ink">
              Thinking from the studio.
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <a href="#contact" className="group inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-wide2 text-ink">
              All writing
              <span className="transition-transform duration-500 ease-expo group-hover:translate-x-1">→</span>
            </a>
          </FadeIn>
        </div>

        <div className="grid gap-px border-t border-ink/10 md:grid-cols-3">
          {journal.map((article, i) => (
            <FadeIn key={article.title} delay={i * 0.09}>
              <a
                href="#contact"
                className="group flex h-full flex-col justify-between border-b border-ink/10 py-10 pr-6 md:min-h-[300px] md:[&:not(:first-child)]:border-l md:[&:not(:first-child)]:border-l-ink/10 md:[&:not(:first-child)]:pl-8"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[0.72rem] uppercase tracking-eyebrow text-cypress">
                    {article.category}
                  </span>
                  <span className="text-[0.72rem] uppercase tracking-wide2 text-stone-400">
                    {article.readingTime}
                  </span>
                </div>
                <h3 className="mt-10 font-serif text-[1.6rem] font-light leading-[1.15] tracking-[-0.01em] text-ink transition-colors duration-500 group-hover:text-cypress">
                  {article.title}
                </h3>
                <span className="mt-8 inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-wide2 text-ink">
                  Read
                  <span className="transition-transform duration-500 ease-expo group-hover:translate-x-1">→</span>
                </span>
              </a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
