import Image from "next/image"
import { ShieldCheck } from "lucide-react"
import { CtaButton } from "@/components/cta-button"
import { VIDEOS, POSTERS, BADGE_HYROX, BADGE_MODE } from "@/lib/media"

function CertificationBadge() {
  if (BADGE_MODE === "imagen") {
    return (
      <Image
        src={BADGE_HYROX || "/placeholder.svg"}
        alt="Entrenador Oficial de Rendimiento HYROX"
        height={36}
        width={0}
        sizes="200px"
        style={{ width: "auto", height: 36 }}
        className="object-contain"
        priority
      />
    )
  }

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-border-strong px-4 py-1.5">
      <ShieldCheck className="h-4 w-4 text-volt" />
      <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
        Entrenador Oficial de Rendimiento HYROX
      </span>
    </div>
  )
}

export function HeroSection() {
  return (
    <section className="relative flex min-h-[100svh] w-full items-center overflow-hidden">
      {/* Video de fondo — único con autoplay */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={VIDEOS.hero}
        poster={POSTERS.hero}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      />
      {/* Overlay en degradado: limpio arriba, oscuro abajo donde va el texto */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-start gap-6 px-5 pb-24 pt-32 md:px-8 md:pb-32 md:pt-40">
        <CertificationBadge />

        <h1 className="max-w-4xl text-balance font-display text-[2rem] font-extrabold uppercase leading-[1.02] tracking-tight text-foreground break-words [overflow-wrap:anywhere] sm:text-5xl md:text-7xl md:leading-[0.95] lg:text-8xl">
          Entrena con intención. Progresa con un sistema.
        </h1>

        <p className="text-sm font-medium uppercase tracking-[0.2em] text-volt">Hybrid Performance System™</p>

        <p className="max-w-xl text-pretty text-lg text-body break-words md:text-xl">
          No necesitas otra rutina. Necesitas un sistema.
        </p>

        <CtaButton full className="mt-2" />
      </div>
    </section>
  )
}
