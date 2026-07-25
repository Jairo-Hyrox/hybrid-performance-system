import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"
import { FadeIn } from "@/components/fade-in"
import { ClickToPlayVideo } from "@/components/click-to-play-video"
import { VIDEOS } from "@/lib/media"

// Experiencia 4 — Página de Oferta (Hybrid Performance System™).
// Sin logo de Innovatraining. El CTA "EMPIEZO" lleva a /confirmacion.

const BENEFICIOS = [
  "Evaluación inicial.",
  "Diagnóstico personalizado.",
  "Plan individualizado.",
  "Seguimiento continuo.",
  "Evaluaciones periódicas.",
  "Comunidad.",
] as const

const OFERTA_CTA_HREF = "/confirmacion"

export function OfertaExperience() {
  return (
    <main className="min-h-dvh pb-28">
      {/* HERO */}
      <section className="border-b border-border px-5 pt-16 pb-12 md:px-8 md:pt-24 md:pb-16">
        <div className="mx-auto max-w-4xl text-center">
          <FadeIn>
            <h1 className="text-balance font-display text-4xl font-bold uppercase leading-[1.05] tracking-tight text-foreground break-words md:text-6xl">
              Hybrid Performance System&trade;
            </h1>
          </FadeIn>
          <FadeIn delay={100}>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-body break-words md:text-xl">
              Un sistema diseñado para que tu entrenamiento tenga dirección.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* VIDEO DEL MÉTODO — arriba de los beneficios */}
      <section className="px-5 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-4xl">
          <FadeIn>
            <ClickToPlayVideo
              src={VIDEOS.oferta}
              label="Hybrid Performance System™"
              className="aspect-[9/16] max-w-sm md:aspect-square md:max-w-xl"
            />
          </FadeIn>
        </div>
      </section>

      {/* BENEFICIOS */}
      <section className="px-5 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-4xl">
          <ul className="grid gap-4 sm:grid-cols-2">
            {BENEFICIOS.map((beneficio, i) => (
              <FadeIn as="li" key={beneficio} delay={i * 60}>
                <div className="flex items-center gap-4 rounded-xl border border-border bg-surface p-5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-volt text-volt-foreground">
                    <Check className="h-5 w-5" strokeWidth={3} />
                  </span>
                  <span className="text-pretty text-base font-medium text-foreground break-words md:text-lg">
                    {beneficio}
                  </span>
                </div>
              </FadeIn>
            ))}
          </ul>
        </div>
      </section>

      {/* OFERTA */}
      <section className="px-5 py-12 md:px-8 md:py-20">
        <div className="mx-auto max-w-4xl">
          <FadeIn>
            <div className="relative overflow-hidden rounded-2xl border border-border-strong bg-surface p-8 md:p-14">
              <span className="inline-flex items-center rounded-full bg-volt px-4 py-1.5 font-display text-xs font-bold uppercase tracking-widest text-volt-foreground">
                50% de descuento
              </span>

              <h2 className="mt-6 max-w-2xl text-balance font-display text-3xl font-bold uppercase leading-tight tracking-tight text-foreground break-words md:text-5xl">
                Empieza con tu Evaluación Estratégica
              </h2>

              <p className="mt-6 max-w-2xl text-pretty text-lg text-body break-words md:text-xl">
                Completa tu evaluación y accede con un 50% de descuento.
              </p>

              <div className="mt-10">
                <OfertaCta full />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA STICKY */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/90 px-5 py-4 backdrop-blur-md md:px-8">
        <div className="mx-auto max-w-4xl">
          <OfertaCta full />
        </div>
      </div>
    </main>
  )
}

function OfertaCta({ full = false }: { full?: boolean }) {
  return (
    <Link
      href={OFERTA_CTA_HREF}
      className={`group inline-flex items-center justify-center gap-2 rounded-lg bg-volt px-8 py-4 font-display text-base font-bold uppercase tracking-widest text-volt-foreground transition-all duration-300 hover:bg-volt-hover hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-volt focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
        full ? "w-full" : "w-auto"
      }`}
    >
      EMPIEZO
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  )
}
