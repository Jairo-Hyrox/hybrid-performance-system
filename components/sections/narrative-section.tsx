import { FadeIn } from "@/components/fade-in"

export function NarrativeSection() {
  return (
    <section className="border-t border-border py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="mx-auto max-w-3xl">
          <FadeIn>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">La pregunta</p>
          </FadeIn>

          <FadeIn delay={80}>
            <h2 className="mt-6 text-balance font-display text-3xl font-bold uppercase leading-tight tracking-tight text-foreground break-words md:text-5xl">
              Estoy entrenando constantemente… ¿pero realmente estoy mejorando?
            </h2>
          </FadeIn>

          <FadeIn delay={160}>
            <div className="mt-8 border-l-2 border-volt pl-5">
              <p className="text-pretty text-lg text-body break-words md:text-xl">
                El problema es entrenar sin un sistema que mida, organice y acompañe tu evolución.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
