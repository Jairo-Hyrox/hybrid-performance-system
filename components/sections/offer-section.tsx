import { FadeIn } from "@/components/fade-in"
import { CtaButton } from "@/components/cta-button"

export function OfferSection() {
  return (
    <section className="border-t border-border py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <FadeIn>
          <div className="relative overflow-hidden rounded-2xl border border-border-strong bg-surface p-8 md:p-14">
            <span className="inline-flex items-center rounded-full bg-volt px-4 py-1.5 font-display text-xs font-bold uppercase tracking-widest text-volt-foreground">
              50% de descuento
            </span>

            <h2 className="mt-6 max-w-2xl text-balance font-display text-3xl font-bold uppercase leading-tight tracking-tight text-foreground break-words md:text-5xl">
              Empieza con una Evaluación Estratégica.
            </h2>

            <p className="mt-6 max-w-2xl text-pretty text-lg text-body break-words md:text-xl">
              Completa la experiencia y accede a tu Evaluación Estratégica con un 50% de descuento.
            </p>

            <p className="mt-6 max-w-2xl text-pretty text-lg text-foreground break-words md:text-xl">
              No es una sesión más. Es el primer paso para construir un sistema.
            </p>

            <div className="mt-10">
              <CtaButton full />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
