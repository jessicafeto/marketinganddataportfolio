import { studio } from "@/lib/content";
import FadeIn from "./FadeIn";
import { Monogram } from "./Wordmark";

export default function Studio() {
  return (
    <section id="studio" className="relative overflow-hidden border-t border-ink/10 bg-paper py-24 md:py-36">
      <div className="mx-auto max-w-8xl px-6 md:px-12">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <FadeIn>
              <p className="mb-8 text-[0.72rem] uppercase tracking-eyebrow text-stone-600">
                {studio.eyebrow}
              </p>
              <h2 className="font-serif text-[clamp(2rem,4.4vw,3.4rem)] font-light leading-[1.08] tracking-[-0.02em] text-ink">
                {studio.headline}
              </h2>
            </FadeIn>
            <FadeIn delay={0.12}>
              <div className="mt-12 flex gap-10">
                {studio.stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="font-serif text-4xl font-light text-cypress">{stat.value}</div>
                    <div className="mt-2 max-w-[120px] text-[0.72rem] uppercase tracking-wide2 text-stone-500">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            {studio.body.map((para, i) => (
              <FadeIn key={i} delay={0.1 + i * 0.08}>
                <p className="mb-6 text-base leading-relaxed text-stone-600">{para}</p>
              </FadeIn>
            ))}

            <FadeIn delay={0.3}>
              <figure className="mt-12 border-l-2 border-cypress pl-8">
                <blockquote className="font-serif text-[clamp(1.4rem,2.4vw,2rem)] font-light italic leading-[1.25] tracking-[-0.01em] text-ink">
                  “{studio.quote}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 text-[0.72rem] uppercase tracking-wide2 text-stone-500">
                  <Monogram className="h-3 w-auto text-cypress" />
                  noova studio doctrine
                </figcaption>
              </figure>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
