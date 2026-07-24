// Copy aprobado por Copywriter. NO modificar, NO añadir preguntas ni opciones.
// Fuente: copy/quiz-data.json

export interface QuizOption {
  id: string
  label: string
}

export interface QuizQuestion {
  id: string
  orden: number
  titulo: string
  opciones: QuizOption[]
}

export const QUIZ_META = {
  producto: "Hybrid Performance System™",
  totalPreguntas: 4,
  tiempoEstimado: "2 minutos",
  ctaLabel: "EMPIEZO",
  rutaSiguiente: "/whatsapp",
} as const

export const QUIZ_INTRO = {
  titulo: "Descubre qué necesita tu entrenamiento para evolucionar.",
  descripcion:
    "Responde algunas preguntas para entender tu situación actual y conocer qué tipo de estructura puede ayudarte a avanzar.",
  tiempoEstimado: "Tiempo estimado: 2 minutos.",
  boton: "EMPIEZO",
} as const

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "q1",
    orden: 1,
    titulo: "¿Cuánto tiempo llevas entrenando?",
    opciones: [
      { id: "q1a", label: "Menos de 1 año." },
      { id: "q1b", label: "Entre 1 y 3 años." },
      { id: "q1c", label: "Entre 3 y 5 años." },
      { id: "q1d", label: "Más de 5 años." },
    ],
  },
  {
    id: "q2",
    orden: 2,
    titulo: "¿Cuál describe mejor tu situación actual?",
    opciones: [
      { id: "q2a", label: "Entreno constantemente pero siento poco progreso." },
      { id: "q2b", label: "Me cuesta mantener una estructura." },
      { id: "q2c", label: "Quiero mejorar mi rendimiento." },
      { id: "q2d", label: "Quiero entrenar con más planificación." },
    ],
  },
  {
    id: "q3",
    orden: 3,
    titulo: "¿Qué sientes que falta actualmente?",
    opciones: [
      { id: "q3a", label: "Más claridad." },
      { id: "q3b", label: "Mejor planificación." },
      { id: "q3c", label: "Seguimiento profesional." },
      { id: "q3d", label: "Medición del progreso." },
    ],
  },
  {
    id: "q4",
    orden: 4,
    titulo: "¿Qué objetivo quieres trabajar?",
    opciones: [
      { id: "q4a", label: "Rendimiento." },
      { id: "q4b", label: "Composición corporal." },
      { id: "q4c", label: "Mejor condición física." },
      { id: "q4d", label: "Evolución general." },
    ],
  },
]

export const QUIZ_RESULT = {
  estados: [
    { id: "loading", texto: "Analizando tu información…", duracionMs: 1500 },
    { id: "preparando", texto: "Preparando tu diagnóstico…", duracionMs: 1500 },
  ],
  final: {
    lineas: [
      "Tu entrenamiento tiene una base.",
      "Pero necesita una estructura más clara.",
      "Hybrid Performance System™ está diseñado precisamente para eso.",
      "Transformar sesiones aisladas en un proceso con dirección.",
    ],
    cta: "EMPIEZO",
  },
} as const
