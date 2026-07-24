// Experiencia 3 — Simulación de WhatsApp (Innovatraining).
//
// Mensajes EXACTOS del coach (solo burbujas recibidas, sin respuestas del
// cliente). No modificar los textos.
//
// La variable [Nombre] se resuelve en tiempo de render con fallback "atleta".

export const NOMBRE_FALLBACK = "atleta"

// ---- Delays configurables (ms) ----
export const WHATSAPP_TIMING = {
  // Pausa inicial antes de que llegue el primer mensaje.
  inicioMs: 700,
  // Tiempo que se muestra el indicador "escribiendo…" antes de cada
  // mensaje recibido.
  typingMs: 1400,
  // Pausa después de mostrar un mensaje, antes de empezar a "escribir" el
  // siguiente bloque.
  entreMensajesMs: 650,
  // Pausa extra al cambiar de día en el bloque de seguimiento.
  cambioDeDiaMs: 900,
} as const

export const WHATSAPP_CONTACTO = {
  nombre: "Innovatraining",
  estado: "en línea",
} as const

export type WhatsAppItem =
  | {
      kind: "message"
      id: string
      from: "received" | "sent"
      // Usa [Nombre] para inyectar el nombre capturado (con fallback).
      text: string
    }
  | {
      kind: "day"
      id: string
      label: string
    }

// Secuencia de seguimiento (solo mensajes del coach) distribuida por días.
export const WHATSAPP_SCRIPT: WhatsAppItem[] = [
  { kind: "day", id: "d1", label: "Día 1" },
  {
    kind: "message",
    id: "m1",
    from: "received",
    text: "Hola, [Nombre].",
  },
  {
    kind: "message",
    id: "m2",
    from: "received",
    text: "Antes de cerrar tu proceso queríamos recordarte algo:",
  },

  { kind: "day", id: "d3", label: "Día 3" },
  {
    kind: "message",
    id: "m3",
    from: "received",
    text: "El problema nunca fue tu disciplina.",
  },
  {
    kind: "message",
    id: "m4",
    from: "received",
    text: "El problema era intentar avanzar sin un sistema diseñado para medir y ajustar tu evolución.",
  },

  { kind: "day", id: "d5", label: "Día 5" },
  {
    kind: "message",
    id: "m5",
    from: "received",
    text: "Si quieres conocer cómo sería entrenar con una estructura personalizada, este es el siguiente paso:",
  },
  {
    kind: "message",
    id: "m6",
    from: "received",
    text: "Tu Evaluación Estratégica.",
  },
]

export const WHATSAPP_CTA = {
  label: "EMPIEZO",
  href: "/oferta",
} as const
