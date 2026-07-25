import { FadeIn } from "@/components/fade-in"
import { ViewportVideo } from "@/components/viewport-video"
import { VIDEOS, POSTERS } from "@/lib/media"

const STEPS = [
  { n: 1, text: "Realizas tu Evaluación Estratégica." },
  { n: 2, text: "Creamos una estructura personalizada." },
  { n: 3, text: "Entrenas con seguimiento." },
  { n: 4, text: "Continúas mejorando con un sistema." },
]

export function HowItWorksSection() {
  return (
    <section className="relative overflow-hidden border-t border-border py-20 md:py-32">
      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <FadeIn>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Cómo funciona</p>
        </FadeIn>

        <div className="mt-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <FadeIn>
            <ol className="flex flex-col gap-6">
              {STEPS.map((step, i) => (
                <li key={step.n} className="flex items-start gap-5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-volt font-display text-lg font-bold text-volt-foreground">
                    {step.n}
                  </span>
                  <p className="pt-2 text-pretty text-lg text-body break-words md:text-xl">
                    <span className="font-display font-semibold uppercase tracking-tight text-foreground">
                      {`Paso ${step.n}`}
                    </span>{" "}
                    — {step.text}
                  </p>
                </li>
              ))}
            </ol>
          </FadeIn>

          <FadeIn delay={120}>
            <ViewportVideo src={VIDEOS.comoFunciona} poster={POSTERS.comoFunciona} />
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
