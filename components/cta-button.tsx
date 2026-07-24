import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { CTA_HREF, CTA_LABEL } from "@/lib/media"

interface CtaButtonProps {
  className?: string
  full?: boolean
}

export function CtaButton({ className, full = false }: CtaButtonProps) {
  return (
    <Link
      href={CTA_HREF}
      className={cn(
        "group inline-flex items-center justify-center gap-2 rounded-lg bg-volt px-8 py-4 font-display text-base font-bold uppercase tracking-widest text-volt-foreground transition-all duration-300 hover:bg-volt-hover hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-volt focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        full ? "w-full sm:w-auto" : "w-auto",
        className,
      )}
    >
      {CTA_LABEL}
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  )
}
