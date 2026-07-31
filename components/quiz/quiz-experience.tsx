"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Activity, Check, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { ClickToPlayVideo } from "@/components/click-to-play-video"
import { VIDEOS } from "@/lib/media"
import { QuizProgress } from "@/components/quiz/quiz-progress"
import {
  QUIZ_INTRO,
  QUIZ_META,
  QUIZ_QUESTIONS,
  QUIZ_RESULT,
  type QuizOption,
} from "@/lib/quiz-data"

type Phase = "intro" | "question" | "form" | "loading" | "result"

type LeadData = {
  nombre: string
  apellido: string
  email: string
  whatsapp: string
}

const AUTO_ADVANCE_MS = 400

// Google Apps Script Web App que recibe los leads del formulario.
const SHEETS_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbw-GLtldEzJFtCuUXMsEXt0aeYmtxVl4YnBhp1222nKNlY2unTqoNr4x_sY31QxFBhc/exec"

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

export function QuizExperience() {
  const [phase, setPhase] = useState<Phase>("intro")
  const [step, setStep] = useState(0) // índice de pregunta activa
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [lead, setLead] = useState<LeadData | null>(null) // datos capturados en el formulario
  const [pending, setPending] = useState<string | null>(null) // opción recién seleccionada
  const [loadingStage, setLoadingStage] = useState(0)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  // Limpia timers pendientes al desmontar.
  useEffect(() => {
    return () => {
      timers.current.forEach(clearTimeout)
    }
  }, [])

  function schedule(fn: () => void, ms: number) {
    const t = setTimeout(fn, ms)
    timers.current.push(t)
  }

  function start() {
    setPhase("question")
    setStep(0)
  }

  function selectOption(option: QuizOption) {
    const question = QUIZ_QUESTIONS[step]
    setPending(option.id)
    setAnswers((prev) => ({ ...prev, [question.id]: option.id }))

    schedule(() => {
      setPending(null)
      if (step < QUIZ_QUESTIONS.length - 1) {
        setStep((s) => s + 1)
      } else {
        // Tras la última pregunta, capturamos los datos antes del resultado.
        setPhase("form")
      }
    }, AUTO_ADVANCE_MS)
  }

  async function submitLead(data: LeadData) {
    setLead(data)
    try {
      // El primer nombre alimenta [Nombre] en la simulación de WhatsApp.
      sessionStorage.setItem("hps_nombre", data.nombre)
      sessionStorage.setItem("hps_lead", JSON.stringify(data))
    } catch {
      // sessionStorage puede no estar disponible; el flujo continúa igual.
    }

    // Envío a Google Sheets. Nunca bloquea: si falla, igual continuamos.
    try {
      await fetch(SHEETS_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
    } catch {
      // Fallo de red: ignoramos y seguimos al resultado.
    }

    // Meta Pixel: lead capturado con éxito.
    try {
      window.fbq?.("track", "Lead")
    } catch {
      // El píxel puede no haber cargado; no afecta el flujo.
    }

    beginLoading()
  }

  function goBack() {
    if (step === 0) {
      setPhase("intro")
      return
    }
    setPending(null)
    setStep((s) => s - 1)
  }

  function beginLoading() {
    setPhase("loading")
    setLoadingStage(0)
    const [first, second] = QUIZ_RESULT.estados
    schedule(() => setLoadingStage(1), first.duracionMs)
    schedule(() => setPhase("result"), first.duracionMs + second.duracionMs)
  }

  // Persistir respuestas para la siguiente experiencia (WhatsApp).
  useEffect(() => {
    if (phase === "result") {
      try {
        sessionStorage.setItem("hps_quiz_answers", JSON.stringify(answers))
      } catch {
        // sessionStorage puede no estar disponible; el flujo continúa igual.
      }
    }
  }, [phase, answers])

  return (
    <main className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-x-hidden px-5 py-10">
      <div className="w-full max-w-xl">
        {phase === "intro" && <IntroView onStart={start} />}

        {phase === "question" && (
          <QuestionView
            step={step}
            pending={pending}
            selectedId={answers[QUIZ_QUESTIONS[step].id]}
            onSelect={selectOption}
            onBack={goBack}
          />
        )}

        {phase === "form" && <LeadFormView onSubmit={submitLead} />}

        {phase === "loading" && <LoadingView stage={loadingStage} />}

        {phase === "result" && <ResultView />}
      </div>
    </main>
  )
}

/* ---------------- Intro ---------------- */

function IntroView({ onStart }: { onStart: () => void }) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="rounded-2xl border border-border bg-surface/60 p-7 text-center backdrop-blur-sm sm:p-10">
        <span className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-volt/10 text-volt">
          <Activity className="h-7 w-7" />
        </span>
        <h1 className="text-balance font-display text-2xl font-extrabold uppercase leading-tight tracking-tight text-foreground break-words sm:text-3xl">
          {QUIZ_INTRO.titulo}
        </h1>
        <p className="mx-auto mt-4 max-w-md text-pretty leading-relaxed text-muted-foreground break-words">
          {QUIZ_INTRO.descripcion}
        </p>
        <p className="mt-4 font-mono text-xs uppercase tracking-widest text-volt">
          {QUIZ_INTRO.tiempoEstimado}
        </p>
        <button
          type="button"
          onClick={onStart}
          className="group mt-8 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-volt px-8 py-4 font-display text-base font-bold uppercase tracking-widest text-volt-foreground transition-all duration-300 hover:bg-volt-hover hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-volt focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:w-auto"
        >
          {QUIZ_INTRO.boton}
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  )
}

/* ---------------- Pregunta ---------------- */

function QuestionView({
  step,
  pending,
  selectedId,
  onSelect,
  onBack,
}: {
  step: number
  pending: string | null
  selectedId?: string
  onSelect: (option: QuizOption) => void
  onBack: () => void
}) {
  const question = QUIZ_QUESTIONS[step]

  return (
    <div>
      <QuizProgress current={step + 1} total={QUIZ_META.totalPreguntas} />

      <button
        type="button"
        onClick={onBack}
        className="mt-6 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-volt"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Atrás
      </button>

      {/* key fuerza la animación de entrada en cada cambio de pregunta */}
      <div
        key={question.id}
        className="mt-4 animate-in fade-in slide-in-from-right-6 duration-300"
      >
        <h2 className="text-balance font-display text-2xl font-extrabold uppercase leading-tight tracking-tight text-foreground break-words sm:text-3xl">
          {question.titulo}
        </h2>

        <div className="mt-6 flex flex-col gap-3">
          {question.opciones.map((option) => {
            const isPending = pending === option.id
            const isSelected = selectedId === option.id
            const active = isPending || (pending === null && isSelected)
            return (
              <button
                key={option.id}
                type="button"
                disabled={pending !== null}
                onClick={() => onSelect(option)}
                className={cn(
                  "group flex w-full items-center justify-between gap-3 rounded-xl border p-4 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-volt disabled:cursor-not-allowed",
                  active
                    ? "border-volt bg-volt/10"
                    : "border-border bg-surface/60 hover:border-volt/50 hover:bg-surface",
                )}
              >
                <span className="text-pretty font-medium leading-snug text-foreground break-words">
                  {option.label}
                </span>
                <span
                  className={cn(
                    "flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border transition-all duration-200",
                    active
                      ? "border-volt bg-volt text-volt-foreground"
                      : "border-border text-transparent group-hover:border-volt/50",
                  )}
                >
                  <Check className="h-3.5 w-3.5" />
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

/* ---------------- Formulario de captura ---------------- */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function LeadFormView({ onSubmit }: { onSubmit: (data: LeadData) => void | Promise<void> }) {
  const [values, setValues] = useState<LeadData>({
    nombre: "",
    apellido: "",
    email: "",
    whatsapp: "",
  })
  const [errors, setErrors] = useState<Partial<Record<keyof LeadData, string>>>({})
  const [submitting, setSubmitting] = useState(false)

  function update(field: keyof LeadData, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev))
  }

  function validate(data: LeadData) {
    const next: Partial<Record<keyof LeadData, string>> = {}
    if (!data.nombre.trim()) next.nombre = "Ingresa tu nombre."
    if (!data.apellido.trim()) next.apellido = "Ingresa tu apellido."
    if (!data.email.trim()) next.email = "Ingresa tu email."
    else if (!EMAIL_RE.test(data.email.trim())) next.email = "Ingresa un email válido."
    if (!data.whatsapp.trim()) next.whatsapp = "Ingresa tu WhatsApp."
    return next
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (submitting) return
    const trimmed: LeadData = {
      nombre: values.nombre.trim(),
      apellido: values.apellido.trim(),
      email: values.email.trim(),
      whatsapp: values.whatsapp.trim(),
    }
    const found = validate(trimmed)
    if (Object.keys(found).length > 0) {
      setErrors(found)
      return
    }
    setSubmitting(true)
    await onSubmit(trimmed)
  }

  const fields: {
    id: keyof LeadData
    label: string
    type: string
    inputMode?: "email" | "numeric"
    autoComplete?: string
  }[] = [
    { id: "nombre", label: "Nombre", type: "text", autoComplete: "given-name" },
    { id: "apellido", label: "Apellido", type: "text", autoComplete: "family-name" },
    { id: "email", label: "Email", type: "email", inputMode: "email", autoComplete: "email" },
    { id: "whatsapp", label: "WhatsApp", type: "tel", inputMode: "numeric", autoComplete: "tel" },
  ]

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="rounded-2xl border border-border bg-surface/60 p-7 backdrop-blur-sm sm:p-10">
        <p className="text-center font-mono text-xs uppercase tracking-[0.3em] text-volt">Último paso</p>
        <h2 className="mt-4 text-balance text-center font-display text-2xl font-extrabold uppercase leading-tight tracking-tight text-foreground break-words sm:text-3xl">
          Tu diagnóstico está listo. ¿A dónde te lo enviamos?
        </h2>

        <form onSubmit={handleSubmit} noValidate className="mt-8 flex flex-col gap-4">
          {fields.map((field) => (
            <div key={field.id} className="flex flex-col gap-1.5">
              <label
                htmlFor={`lead-${field.id}`}
                className="font-mono text-xs uppercase tracking-widest text-muted-foreground"
              >
                {field.label}
              </label>
              <input
                id={`lead-${field.id}`}
                name={field.id}
                type={field.type}
                inputMode={field.inputMode}
                autoComplete={field.autoComplete}
                value={values[field.id]}
                onChange={(e) => {
                  const raw = e.target.value
                  // WhatsApp: solo dígitos.
                  update(field.id, field.id === "whatsapp" ? raw.replace(/[^\d]/g, "") : raw)
                }}
                aria-invalid={errors[field.id] ? true : undefined}
                aria-describedby={errors[field.id] ? `lead-${field.id}-error` : undefined}
                className={cn(
                  "w-full rounded-lg border bg-background/60 px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus-visible:border-volt focus-visible:ring-2 focus-visible:ring-volt/40",
                  errors[field.id] ? "border-destructive" : "border-border",
                )}
              />
              {errors[field.id] && (
                <span id={`lead-${field.id}-error`} className="font-mono text-xs text-destructive">
                  {errors[field.id]}
                </span>
              )}
            </div>
          ))}

          <button
            type="submit"
            disabled={submitting}
            aria-busy={submitting}
            className="group mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-volt px-8 py-4 font-display text-base font-bold uppercase tracking-widest text-volt-foreground transition-all duration-300 hover:bg-volt-hover hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-volt focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-80 disabled:hover:scale-100"
          >
            {submitting ? (
              <>
                Enviando&hellip;
                <Loader2 className="h-4 w-4 animate-spin" />
              </>
            ) : (
              <>
                Ver mi diagnóstico
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

/* ---------------- Loading ---------------- */

function LoadingView({ stage }: { stage: number }) {
  const texto = QUIZ_RESULT.estados[stage]?.texto ?? QUIZ_RESULT.estados[0].texto

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center animate-in fade-in duration-500">
      <Loader2 className="h-10 w-10 animate-spin text-volt" />
      <p
        key={stage}
        className="mt-6 font-display text-lg font-semibold uppercase tracking-wide text-foreground break-words animate-in fade-in duration-500"
      >
        {texto}
      </p>
    </div>
  )
}

/* ---------------- Resultado ---------------- */

function ResultView() {
  const { lineas, cta } = QUIZ_RESULT.final

  return (
    <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-volt">Tu diagnóstico</p>

      <div className="mt-5 space-y-3">
        <p className="text-balance font-display text-2xl font-extrabold uppercase leading-tight tracking-tight text-foreground break-words sm:text-3xl">
          {lineas[0]}
          <br />
          {lineas[1]}
        </p>
        <p className="mx-auto max-w-md text-pretty leading-relaxed text-muted-foreground break-words">
          {lineas[2]} {lineas[3]}
        </p>
      </div>

      <div className="mt-8">
        <ClickToPlayVideo
          src={VIDEOS.coach}
          label="El método en 60 segundos"
        />
      </div>

      <div className="mt-8">
        <Link
          href={QUIZ_META.rutaSiguiente}
          className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-volt px-8 py-4 font-display text-base font-bold uppercase tracking-widest text-volt-foreground transition-all duration-300 hover:bg-volt-hover hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-volt focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:w-auto"
        >
          {cta}
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  )
}
