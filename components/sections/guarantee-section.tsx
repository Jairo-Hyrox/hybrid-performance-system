import { FadeIn } from "@/components/fade-in"
import { ShieldCheck } from "lucide-react"

export function GuaranteeSection() {
  return (
    <section className="border-t border-border bg-surface/40 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <FadeIn>
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-5 rounded-2xl border border-border-strong bg-surface p-8 text-center md:p-12">
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-volt text-volt">
              <ShieldCheck className="h-7 w-7" />
            </span>
            <h2 className="text-balance font-display text-2xl font-bold uppercase tracking-tight text-foreground break-words md:text-3xl">
              Garantía de Compromiso con el Proceso
            </h2>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
