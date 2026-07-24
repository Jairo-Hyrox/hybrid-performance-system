"use client"

import { useEffect, useRef, useState } from "react"
import { Check } from "lucide-react"
import { FadeIn } from "@/components/fade-in"
import { VIDEOS } from "@/lib/media"

// Experiencia 5 — Confirmación (cierre del funnel). Sin logo de Innovatraining.
// No lleva CTA a otra página.

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
      </div>
    </main>
  )
}

/**
 * Video de comunidad: muted + loop + playsInline, autoplay al entrar en
 * viewport. object-contain para no deformar el reel vertical. Card centrada
 * con ancho máximo md. Respeta prefers-reduced-motion.
 */
function ComunidadVideo() {
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true)
      return
    }

    const wrapper = wrapperRef.current
    if (!wrapper) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = videoRef.current
          if (!video) return
          if (entry.isIntersecting) {
            video.play().catch(() => {})
          } else {
            video.pause()
          }
        })
      },
      { threshold: 0.4 },
    )

    observer.observe(wrapper)
    return () => observer.disconnect()
  }, [])

  return (
    <figure ref={wrapperRef} className="w-full max-w-md">
      <div className="overflow-hidden rounded-2xl border border-border bg-black">
        <video
          ref={videoRef}
          src={VIDEOS.comunidad}
          muted
          loop
          playsInline
          preload="metadata"
          autoPlay={!reduced}
          className="mx-auto max-h-[70vh] w-full object-contain"
        />
      </div>
      <figcaption className="mt-3 text-center font-display text-sm font-bold uppercase tracking-widest text-body">
        La comunidad HYROX
      </figcaption>
    </figure>
  )
}
