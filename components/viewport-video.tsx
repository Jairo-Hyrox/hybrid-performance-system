"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface ViewportVideoProps {
  src: string
  poster: string
  className?: string
}

/**
 * Video muted + loop que solo hace autoplay al entrar en viewport.
 * Respeta prefers-reduced-motion (muestra solo el poster estático).
 */
export function ViewportVideo({ src, poster, className }: ViewportVideoProps) {
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
    <div
      ref={wrapperRef}
      className={cn(
        "relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-surface",
        className,
      )}
    >
      {reduced ? (
        <img src={poster || "/placeholder.svg"} alt="" className="h-full w-full object-cover" />
      ) : (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          preload="none"
          className="h-full w-full object-cover"
        />
      )}
    </div>
  )
}
