import { FadeIn } from "@/components/fade-in"
import { Shuffle, TrendingDown, Dice5, Gauge, LineChart } from "lucide-react"

const PROBLEMS = [
  { icon: Shuffle, text: "Rutinas genéricas." },
  { icon: TrendingDown, text: "Planificaciones que no evolucionan." },
  { icon: Dice5, text: "Entrenamientos improvisados." },
  { icon: Gauge, text: "Decisiones basadas únicamente en sensaciones." },
  { icon: LineChart, text: "Falta de medición del progreso." },
]

export function ProblemSection() {
  return (
    <section className="border-t border-border bg-surface/40 py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <FadeIn>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">El problema</p>
          <h2 className="mt-6 max-w-3xl text-balance font-display text-3xl font-bold uppercase leading-tight tracking-tight text-foreground break-words md:text-5xl">
            El problema no es entrenar. El problema es entrenar sin dirección.
          </h2>
        </FadeIn>

        <ul className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {PROBLEMS.map((item, i) => {
            const Icon = item.icon
            return (
              <FadeIn as="li" key={item.text} delay={i * 80}>
                <div className="group flex h-full items-start gap-4 rounded-xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-border-strong">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border-strong text-volt">
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="text-pretty text-base text-body break-words md:text-lg">{item.text}</p>
                </div>
              </FadeIn>
            )
          })}
        </ul>

        <FadeIn delay={120}>
          <div className="mt-12 rounded-xl border border-border-strong bg-surface-alt p-8 text-center md:p-12">
            <p className="font-display text-2xl font-bold uppercase tracking-tight text-foreground break-words md:text-4xl">
              Mucho esfuerzo.
            </p>
            <p className="mt-1 font-display text-2xl font-bold uppercase tracking-tight text-muted-foreground break-words md:text-4xl">
              Poca claridad.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
