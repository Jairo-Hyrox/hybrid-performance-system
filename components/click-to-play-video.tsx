"use client"

import { useRef, useState } from "react"
import { Play } from "lucide-react"
import { cn } from "@/lib/utils"

interface ClickToPlayVideoProps {
  src: string
  poster?: string
  label?: string
  className?: string
  /** Usa object-cover en vez de object-contain (para videos a todo el ancho). */
  cover?: boolean
}

/**
 * Video que NO hace autoplay. Muestra poster + botón de play.
 * Al hacer clic reproduce con controles y sonido (para videos con voz).
 * Lazy load: el <video> solo se monta al pulsar play.
 */
export function ClickToPlayVideo({ src, poster, label, className, cover }: ClickToPlayVideoProps) {
  const [playing, setPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  return (
    <div
      className={cn(
        "relative mx-auto aspect-[9/16] w-full max-w-md overflow-hidden rounded-xl border border-border bg-surface md:max-w-lg",
        className,
      )}
    >
      {playing ? (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          controls
          playsInline
          autoPlay
          className={cn("h-full w-full", cover ? "object-cover" : "object-contain")}
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 flex h-full w-full items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-volt"
          aria-label={label ? `Reproducir video: ${label}` : "Reproducir video"}
        >
          {poster ? (
            <img
              src={poster || "/placeholder.svg"}
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-70 transition-opacity duration-300 group-hover:opacity-90"
            />
          ) : null}
          <span className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-background/30" />
          <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-volt text-volt-foreground shadow-lg transition-transform duration-300 group-hover:scale-110">
            <Play className="ml-1 h-7 w-7 fill-current" />
          </span>
          {label ? (
            <span className="absolute bottom-4 left-4 right-4 text-left font-display text-sm font-semibold uppercase tracking-wider text-foreground break-words">
              {label}
            </span>
          ) : null}
        </button>
      )}
    </div>
  )
}
