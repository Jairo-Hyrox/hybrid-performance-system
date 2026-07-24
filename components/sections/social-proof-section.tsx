import { FadeIn } from "@/components/fade-in"

// Frases de la experiencia (COPY VISIBLE). NO inventar testimonios ni nombres.
const VALUES = [
  "La atención personalizada.",
  "El seguimiento constante.",
  "La organización del proceso.",
  "La sensación de tener dirección.",
  "El compromiso del equipo.",
  "La calidad del acompañamiento.",
]

export function SocialProofSection() {
  return (
    <section className="border-t border-border bg-surface/40 py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <FadeIn>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Prueba social</p>
          <h2 className="mt-6 max-w-3xl text-balance font-display text-3xl font-bold uppercase leading-tight tracking-tight text-foreground break-words md:text-5xl">
            Más que resultados, una mejor experiencia de entrenamiento.
          </h2>
        </FadeIn>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((value, i) => (
            <FadeIn key={value} delay={i * 80}>
              <div className="flex h-full items-center rounded-xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-volt/50">
                <p className="text-pretty text-base text-body break-words md:text-lg">{value}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
