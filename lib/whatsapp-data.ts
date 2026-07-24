// Experiencia 3 — Simulación de WhatsApp (Innovatraining).
//
// NOTA DE COPY: los archivos de referencia prompts/03-whatsapp.md y
// copy/copy-completo.md no están presentes en el repositorio. Los textos de
// abajo son PROVISIONALES y coherentes con la marca. Reemplázalos por los
// mensajes exactos de copy/copy-completo.md cuando estén disponibles, sin
// tocar la mecánica del componente.
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

// Secuencia completa: bienvenida + diagnóstico + seguimiento por días.
export const WHATSAPP_SCRIPT: WhatsAppItem[] = [
  {
    kind: "message",
    id: "m1",
    from: "received",
    text: "¡Hola [Nombre]! Soy del equipo de Innovatraining 👋",
  },
  {
    kind: "message",
    id: "m2",
    from: "received",
    text: "Vi que completaste tu diagnóstico. Ya tenemos claro por dónde empezar.",
  },
  {
    kind: "message",
    id: "m3",
    from: "received",
    text: "Tu entrenamiento tiene base, pero le falta estructura y seguimiento. Eso es exactamente lo que trabaja el Hybrid Performance System™.",
  },
  {
    kind: "message",
    id: "m4",
    from: "sent",
    text: "Suena bien, ¿cómo funciona?",
  },
  {
    kind: "message",
    id: "m5",
    from: "received",
    text: "Simple: un plan personalizado, revisiones cada semana y medición real de tu progreso. Nada de rutinas genéricas.",
  },

  { kind: "day", id: "d1", label: "Día 1" },
  {
    kind: "message",
    id: "m6",
    from: "received",
    text: "[Nombre], hoy arrancamos con tu evaluación inicial. Registramos tu punto de partida para poder medir cada avance.",
  },
  {
    kind: "message",
    id: "m7",
    from: "sent",
    text: "Perfecto, listo para empezar.",
  },

  { kind: "day", id: "d3", label: "Día 3" },
  {
    kind: "message",
    id: "m8",
    from: "received",
    text: "Primeras sesiones completadas ✅ Ya notamos mejor técnica y más constancia. Vas en la línea correcta.",
  },

  { kind: "day", id: "d5", label: "Día 5" },
  {
    kind: "message",
    id: "m9",
    from: "received",
    text: "[Nombre], en solo unos días ya hay estructura, dirección y datos que lo confirman. Imagina esto sostenido en el tiempo.",
  },
  {
    kind: "message",
    id: "m10",
    from: "received",
    text: "Este es el momento de dar el paso. Tu plan completo te está esperando 👇",
  },
]

export const WHATSAPP_CTA = {
  label: "EMPIEZO",
  href: "/oferta",
} as const
