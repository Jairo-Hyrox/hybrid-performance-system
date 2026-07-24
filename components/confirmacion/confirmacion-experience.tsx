"use client"

import { useState } from "react"
import { ArrowRight, Check, Play } from "lucide-react"
import { FadeIn } from "@/components/fade-in"
import { VIDEOS } from "@/lib/media"

// Experiencia 5 — Confirmación (cierre del funnel). Sin logo de Innovatraining.
// No lleva CTA a otra página.

// Enlace real de WhatsApp (último paso de conversión del funnel).
const WHATSAPP_CTA_HREF =
  "https://wa.me/50763307958?text=Hola%2C%20complet%C3%A9%20mi%20Evaluaci%C3%B3n%20Estrat%C3%A9gica%20y%20quiero%20saber%20como%20agendar%20la%20evaluaci%C3%B3n%20de%20rendimiento."

const CHECKLIST = [
  "Tu situación actual.",
  "Tu objetivos.",
  "Tu necesidades.",
  "La estructura adecuada para tu proceso.",
] as const

export function ConfirmacionExperience() {
  return (
    <main className="flex min-h-dvh flex-col items-center px-5 py-16 md:px-8 md:py-24">
      <div className="w-full max-w-2xl">
        {/* SUCCESS ICON */}
        <FadeIn className="flex justify-center">
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-volt text-volt-foreground shadow-lg shadow-volt/20">
            <Check className="h-10 w-10" strokeWidth={3} />
          </span>
        </FadeIn>

        {/* CONFIRMATION CARD */}
        <FadeIn delay={100}>
          <div className="mt-8 rounded-2xl border border-border-strong bg-surface p-8 text-center md:p-12">
            <h1 className="text-balance font-display text-4xl font-bold uppercase leading-[1.05] tracking-tight text-foreground break-words md:text-5xl">
              Evaluación recibida.
            </h1>
            <p className="mt-4 text-pretty font-display text-xl font-semibold uppercase tracking-tight text-volt break-words md:text-2xl">
              Tu siguiente paso está confirmado.
            </p>
            <p className="mx-auto mt-6 max-w-xl text-pretty text-lg text-body break-words md:text-xl">
              Nuestro equipo revisará tu información para preparar tu Evaluación Estratégica.
            </p>
          </div>
        </FadeIn>

        {/* CHECKLIST */}
        <ul className="mt-6 grid gap-3">
          {CHECKLIST.map((item, i) => (
            <FadeIn as="li" key={item} delay={i * 80}>
              <div className="flex items-center gap-4 rounded-xl border border-border bg-surface p-4 md:p-5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-volt text-volt-foreground">
                  <Check className="h-4 w-4" strokeWidth={3} />
                </span>
                <span className="text-pretty text-base font-medium text-foreground break-words md:text-lg">
                  {item}
                </span>
              </div>
            </FadeIn>
          ))}
        </ul>

        {/* MENSAJE FINAL */}
        <FadeIn delay={120}>
          <div className="mt-10 text-center">
            <p className="text-pretty text-lg text-body break-words md:text-xl">
              No buscamos darte una rutina más.
            </p>
            <p className="mt-2 text-balance font-display text-2xl font-bold uppercase leading-tight tracking-tight text-foreground break-words md:text-3xl">
              Buscamos entender cómo construir un sistema para tu evolución.
            </p>
          </div>
        </FadeIn>

        {/* VIDEO DE COMUNIDAD */}
        <FadeIn delay={100} className="mt-12 flex justify-center">
          <ComunidadVideo />
        </FadeIn>

        {/* CTA FINAL — último paso de conversión */}
        <FadeIn delay={120} className="mt-10 flex justify-center">
          <a
            href={WHATSAPP_CTA_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 rounded-lg bg-volt px-8 py-4 font-display text-base font-bold uppercase tracking-widest text-volt-foreground transition-all duration-300 hover:bg-volt-hover hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-volt focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Agenda Hoy
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </FadeIn>
      </div>
    </main>
  )
}

/**
 * Video de comunidad: se reproduce CON audio. Los navegadores bloquean el
 * autoplay con sonido, así que arranca con un botón de play (gesto del
 * usuario). No lleva atributo muted. object-contain para no deformar el reel
 * vertical. Card centrada con ancho máximo md.
 */
function ComunidadVideo() {
  const [playing, setPlaying] = useState(false)

  return (
    <figure className="w-full max-w-md">
      <div className="relative aspect-[9/16] overflow-hidden rounded-2xl border border-border bg-black">
        {playing ? (
          <video
            src={VIDEOS.comunidad}
            controls
            loop
            playsInline
            autoPlay
            className="h-full w-full object-contain"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 flex h-full w-full items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-volt"
            aria-label="Reproducir video con audio: La comunidad HYROX"
          >
            <span className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/10 to-background/30" />
            <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-volt text-volt-foreground shadow-lg transition-transform duration-300 group-hover:scale-110">
              <Play className="ml-1 h-7 w-7 fill-current" />
            </span>
          </button>
        )}
      </div>
      <figcaption className="mt-3 text-center font-display text-sm font-bold uppercase tracking-widest text-body">
        La comunidad HYROX
      </figcaption>
    </figure>
  )
}
