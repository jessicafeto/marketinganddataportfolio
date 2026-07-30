import { positioning, disciplines } from "@/lib/content";
import FadeIn from "./FadeIn";

export default function Positioning() {
  return (
    <section id="studio-intro" className="border-t border-ink/10 bg-paper py-24 md:py-36">
      <div className="mx-auto max-w-8xl px-6 md:px-12">
        {/* Discipline marquee */}
        <div className="mb-20 overflow-hidden">
          <div className="flex flex-wrap gap-x-3 gap-y-2 text-[0.72rem] uppercase tracking-eyebrow text-stone-500">
            {disciplines.map((d, i) => (
              <span key={d} className="flex items-center gap-3">
                {d}
                {i < disciplines.length - 1 && <span className="text-cypress/60">/</span>}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-3">
            <FadeIn>
              <p className="text-[0.72rem] uppercase tracking-eyebrow text-stone-600">
                {positioning.eyebrow}
              </p>
            </FadeIn>
          </div>
          <div className="md:col-span-9">
            <FadeIn>
              <p className="font-serif text-[clamp(1.7rem,3.4vw,2.9rem)] font-light leading-[1.18] tracking-[-0.01em] text-ink">
                {positioning.statement}{" "}
                <span className="text-cypress italic">{positioning.emphasis}</span>
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="mt-10 max-w-2xl text-base leading-relaxed text-stone-600">
                {positioning.body}
              </p>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
