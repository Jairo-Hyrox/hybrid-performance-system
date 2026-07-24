import { FadeIn } from "@/components/fade-in"

const STEPS = ["Evaluación inicial", "Diagnóstico", "Plan adaptado", "Seguimiento constante"]

export function RevelationSection() {
  return (
    <section className="border-t border-border py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <FadeIn>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">La revelación</p>
          <h2 className="mt-6 max-w-3xl text-balance font-display text-3xl font-bold uppercase leading-tight tracking-tight text-foreground break-words md:text-5xl">
            Todo progreso debe poder medirse. Debe existir un proceso.
          </h2>
        </FadeIn>

        {/* Timeline: vertical en mobile, horizontal en desktop */}
        <div className="mt-14 md:mt-20">
          <ol className="grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-4">
            {STEPS.map((step, i) => (
              <FadeIn as="li" key={step} delay={i * 100} className="relative">
                <div className="flex items-start gap-4 md:flex-col md:items-start md:gap-5">
                  <div className="relative flex items-center md:w-full">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-volt font-display text-base font-bold text-volt">
                      {i + 1}
                    </span>
                    {i < STEPS.length - 1 && (
                      <span className="ml-4 hidden h-px flex-1 bg-border-strong md:block" aria-hidden="true" />
                    )}
                  </div>
                  <p className="pt-1 font-display text-lg font-semibold uppercase tracking-tight text-foreground break-words md:pt-0 md:text-xl">
                    {step}
                  </p>
                </div>
              </FadeIn>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
