import { FadeIn } from "@/components/fade-in"
import { ViewportVideo } from "@/components/viewport-video"
import { VIDEOS } from "@/lib/media"
import { ClipboardCheck, Stethoscope, UserCog, Activity, CalendarClock, Users } from "lucide-react"

const CARDS = [
  { icon: ClipboardCheck, title: "Evaluación inicial" },
  { icon: Stethoscope, title: "Diagnóstico personalizado" },
  { icon: UserCog, title: "Plan individualizado" },
  { icon: Activity, title: "Seguimiento continuo" },
  { icon: CalendarClock, title: "Evaluaciones periódicas" },
  { icon: Users, title: "Comunidad" },
]

export function SolutionSection() {
  return (
    <section className="border-t border-border bg-surface/40 py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <FadeIn>
          <p className="text-xs uppercase tracking-[0.2em] text-volt">La solución</p>
          <h2 className="mt-6 max-w-3xl text-balance font-display text-3xl font-bold uppercase leading-tight tracking-tight text-foreground break-words md:text-5xl">
            Presentamos Hybrid Performance System™
          </h2>
          <p className="mt-6 max-w-2xl text-pretty text-lg text-body break-words md:text-xl">
            Un sistema personalizado de entrenamiento híbrido diseñado para convertir tu esfuerzo en progreso medible.
          </p>
        </FadeIn>

        <FadeIn delay={120}>
          <div className="mt-12">
            <ViewportVideo src={VIDEOS.laSolucion} className="aspect-video max-w-4xl" />
          </div>
        </FadeIn>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((card, i) => {
            const Icon = card.icon
            return (
              <FadeIn key={card.title} delay={i * 80}>
                <div className="group flex h-full flex-col gap-4 rounded-xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-border-strong">
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-border-strong text-volt">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-xl font-semibold uppercase tracking-tight text-foreground break-words md:text-2xl">
                    {card.title}
                  </h3>
                </div>
              </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}
