"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, CheckCheck } from "lucide-react"
import { cn } from "@/lib/utils"
import { MARCA } from "@/lib/media"
import {
  NOMBRE_FALLBACK,
  WHATSAPP_CONTACTO,
  WHATSAPP_CTA,
  WHATSAPP_SCRIPT,
  WHATSAPP_TIMING,
  type WhatsAppItem,
} from "@/lib/whatsapp-data"

// Estructura para lo que ya está visible en el chat.
type Rendered =
  | { kind: "day"; id: string; label: string }
  | { kind: "message"; id: string; from: "received" | "sent"; text: string }

export function WhatsAppExperience() {
  const [nombre, setNombre] = useState(NOMBRE_FALLBACK)
  const [rendered, setRendered] = useState<Rendered[]>([])
  const [typing, setTyping] = useState(false)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  const scrollRef = useRef<HTMLDivElement>(null)

  // Recupera el nombre capturado en experiencias previas (fallback "atleta").
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("hps_nombre")
      if (raw && raw.trim()) setNombre(raw.trim())
    } catch {
      // sessionStorage puede no estar disponible; se mantiene el fallback.
    }
  }, [])

  // Reproduce el guion de mensajes de forma progresiva.
  useEffect(() => {
    let cancelled = false
    const localTimers = timers.current

    function schedule(fn: () => void, ms: number): Promise<void> {
      return new Promise((resolve) => {
        const t = setTimeout(() => {
          if (!cancelled) fn()
          resolve()
        }, ms)
        localTimers.push(t)
      })
    }

    async function run() {
      await schedule(() => {}, WHATSAPP_TIMING.inicioMs)

      for (let i = 0; i < WHATSAPP_SCRIPT.length; i++) {
        if (cancelled) return
        const item = WHATSAPP_SCRIPT[i]

        if (item.kind === "day") {
          await schedule(() => {
            setRendered((prev) => [...prev, item])
          }, WHATSAPP_TIMING.cambioDeDiaMs)
          continue
        }

        // Los mensajes recibidos muestran el indicador "escribiendo…".
        if (item.from === "received") {
          await schedule(() => setTyping(true), WHATSAPP_TIMING.entreMensajesMs)
          await schedule(() => {
            setTyping(false)
            setRendered((prev) => [...prev, item])
          }, WHATSAPP_TIMING.typingMs)
        } else {
          await schedule(() => {
            setRendered((prev) => [...prev, item])
          }, WHATSAPP_TIMING.entreMensajesMs)
        }
      }
    }

    run()

    return () => {
      cancelled = true
      localTimers.forEach(clearTimeout)
    }
  }, [])

  // Autoscroll al último elemento / indicador de escritura.
  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [rendered, typing])

  function withName(text: string) {
    return text.replaceAll("[Nombre]", nombre)
  }

  return (
    <main className="flex min-h-[100svh] w-full justify-center bg-background">
      <div className="flex min-h-[100svh] w-full max-w-md flex-col border-x border-border bg-[#0b141a]">
        <ChatHeader />

        {/* Zona de mensajes */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-3 py-4"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "18px 18px",
          }}
        >
          <SecurityNotice />

          <div className="flex flex-col gap-1.5">
            {rendered.map((item) =>
              item.kind === "day" ? (
                <DaySeparator key={item.id} label={item.label} />
              ) : (
                <Bubble key={item.id} from={item.from} text={withName(item.text)} />
              ),
            )}

            {typing && <TypingBubble />}
          </div>
        </div>

        <StickyCta />
      </div>
    </main>
  )
}

/* ---------------- Header ---------------- */

function ChatHeader() {
  return (
    <header className="flex items-center gap-3 border-b border-border bg-[#1f2c34] px-4 py-3">
      {/* Único logo de toda la experiencia: avatar circular del contacto. */}
      <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-surface ring-1 ring-white/10">
        <Image
          src={MARCA.logo || "/placeholder.svg"}
          alt={`Logo de ${WHATSAPP_CONTACTO.nombre}`}
          width={40}
          height={40}
          className="h-full w-full object-cover"
          unoptimized
        />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate font-display text-sm font-bold text-foreground">
          {WHATSAPP_CONTACTO.nombre}
        </p>
        <p className="flex items-center gap-1.5 text-xs text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden />
          {WHATSAPP_CONTACTO.estado}
        </p>
      </div>
    </header>
  )
}

/* ---------------- Aviso de cifrado (decorativo, tipo WhatsApp) ---------------- */

function SecurityNotice() {
  return (
    <div className="mx-auto mb-4 max-w-[85%] rounded-lg bg-[#182a33] px-3 py-2 text-center">
      <p className="text-pretty text-[11px] leading-relaxed text-amber-200/80">
        Los mensajes están cifrados de extremo a extremo. Solo tú y{" "}
        {WHATSAPP_CONTACTO.nombre} pueden leerlos.
      </p>
    </div>
  )
}

/* ---------------- Separador de día ---------------- */

function DaySeparator({ label }: { label: string }) {
  return (
    <div className="my-2 flex justify-center animate-in fade-in duration-300">
      <span className="rounded-md bg-[#182a33] px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
    </div>
  )
}

/* ---------------- Burbuja de mensaje ---------------- */

function Bubble({ from, text }: { from: "received" | "sent"; text: string }) {
  const isSent = from === "sent"
  return (
    <div
      className={cn(
        "flex w-full animate-in fade-in slide-in-from-bottom-2 duration-300",
        isSent ? "justify-end" : "justify-start",
      )}
    >
      <div
        className={cn(
          "relative max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-relaxed shadow-sm",
          isSent
            ? "rounded-br-sm bg-[#005c4b] text-foreground"
            : "rounded-bl-sm bg-[#1f2c34] text-foreground",
        )}
      >
        <p className="text-pretty break-words">{text}</p>
        <span
          className={cn(
            "mt-0.5 flex items-center justify-end gap-1 text-[10px]",
            isSent ? "text-emerald-200/70" : "text-muted-foreground",
          )}
        >
          {formatNow()}
          {isSent && <CheckCheck className="h-3 w-3 text-sky-300" aria-hidden />}
        </span>
      </div>
    </div>
  )
}

/* ---------------- Indicador "escribiendo…" ---------------- */

function TypingBubble() {
  return (
    <div className="flex justify-start animate-in fade-in duration-200">
      <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-[#1f2c34] px-4 py-3">
        <span className="sr-only">Innovatraining está escribiendo</span>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground"
            style={{ animationDelay: `${i * 150}ms` }}
            aria-hidden
          />
        ))}
      </div>
    </div>
  )
}

/* ---------------- CTA fijo ---------------- */

function StickyCta() {
  return (
    <div className="sticky bottom-0 border-t border-border bg-[#1f2c34] px-3 py-3">
      <Link
        href={WHATSAPP_CTA.href}
        className="group flex w-full items-center justify-center gap-2 rounded-full bg-volt px-8 py-3.5 font-display text-base font-bold uppercase tracking-widest text-volt-foreground transition-all duration-300 hover:bg-volt-hover hover:scale-[1.01] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-volt focus-visible:ring-offset-2 focus-visible:ring-offset-[#1f2c34]"
      >
        {WHATSAPP_CTA.label}
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </div>
  )
}

/* ---------------- Utilidad de hora ---------------- */

function formatNow() {
  const d = new Date()
  const h = d.getHours().toString().padStart(2, "0")
  const m = d.getMinutes().toString().padStart(2, "0")
  return `${h}:${m}`
}
