import { FadeIn } from "@/components/fade-in"
import { CtaButton } from "@/components/cta-button"

export function FinalCtaSection() {
  return (
    <section className="border-t border-border py-24 md:py-36">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <FadeIn>
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
            <h2 className="text-balance font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-foreground break-words md:text-6xl">
              Tu esfuerzo merece una dirección.
            </h2>

            <p className="text-pretty text-lg text-body break-words md:text-xl">
              No necesitas entrenar más. Necesitas entrenar con un sistema.
            </p>

            <p className="max-w-2xl text-pretty text-base text-muted-foreground break-words md:text-lg">
              Descubre cómo Hybrid Performance System™ puede ayudarte a convertir tu esfuerzo en progreso medible.
            </p>

            <CtaButton full className="mt-2" />
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
