"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { CTA_HREF, CTA_LABEL } from "@/lib/media"

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "border-b border-border bg-background/80 backdrop-blur-md" : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 md:px-8">
        <Link
          href="/"
          className="font-display text-sm font-extrabold uppercase tracking-[0.2em] text-foreground md:text-base"
          aria-label="Hybrid Performance System"
        >
          HPS<span className="text-volt">™</span>
        </Link>

        <Link
          href={CTA_HREF}
          className="rounded-lg bg-volt px-4 py-2 font-display text-xs font-bold uppercase tracking-widest text-volt-foreground transition-all duration-300 hover:bg-volt-hover hover:scale-[1.02] md:px-6 md:text-sm"
        >
          {CTA_LABEL}
        </Link>
      </div>
    </header>
  )
}
