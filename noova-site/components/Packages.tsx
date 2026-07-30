import { packages } from "@/lib/content";
import FadeIn from "./FadeIn";

export default function Packages() {
  return (
    <section id="packages" className="border-t border-ink/10 bg-paper py-24 md:py-36">
      <div className="mx-auto max-w-8xl px-6 md:px-12">
        <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <FadeIn>
            <p className="mb-6 text-[0.72rem] uppercase tracking-eyebrow text-stone-600">
              Engagements
            </p>
            <h2 className="max-w-2xl font-serif text-[clamp(2rem,5vw,3.6rem)] font-light leading-[1.05] tracking-[-0.02em] text-ink">
              Three ways to build with us.
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="max-w-xs text-sm leading-relaxed text-stone-600">
              Each engagement builds the system to a different depth. Every one is scoped, never a retainer for daily posting.
            </p>
          </FadeIn>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {packages.map((pkg, i) => (
            <FadeIn key={pkg.name} delay={i * 0.1} y={40}>
              <article
                className={`flex h-full flex-col rounded-[3px] border p-8 transition-colors duration-500 md:p-10 ${
                  pkg.featured
                    ? "border-transparent bg-ink text-paper"
                    : "border-ink/12 bg-paper text-ink hover:border-ink/30"
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-3xl font-light tracking-tight">{pkg.name}</h3>
                  {pkg.featured && (
                    <span className="rounded-full border border-paper/30 px-3 py-1 text-[0.62rem] uppercase tracking-eyebrow text-paper/70">
                      Most chosen
                    </span>
                  )}
                </div>

                <p className={`mt-5 text-sm leading-relaxed ${pkg.featured ? "text-paper/70" : "text-stone-600"}`}>
                  {pkg.summary}
                </p>

                <p className={`mt-6 text-[0.72rem] uppercase tracking-wide2 ${pkg.featured ? "text-paper/50" : "text-stone-500"}`}>
                  Best for — {pkg.best}
                </p>

                <ul className={`mt-8 space-y-3 border-t pt-8 text-sm ${pkg.featured ? "border-paper/15" : "border-ink/10"}`}>
                  {pkg.includes.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className={pkg.featured ? "text-cypress" : "text-cypress"}>—</span>
                      <span className={pkg.featured ? "text-paper/85" : "text-ink/80"}>{item}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={`group mt-10 inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-wide2 ${
                    pkg.featured ? "text-paper" : "text-ink"
                  }`}
                >
                  Enquire
                  <span className="transition-transform duration-500 ease-expo group-hover:translate-x-1">→</span>
                </a>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
