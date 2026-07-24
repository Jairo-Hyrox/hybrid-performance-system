import type { Metadata } from "next"
import { QuizExperience } from "@/components/quiz/quiz-experience"

export const metadata: Metadata = {
  title: "Diagnóstico | Hybrid Performance System",
  description:
    "Responde algunas preguntas para entender tu situación actual y descubrir qué estructura puede ayudarte a evolucionar tu entrenamiento.",
}

export default function QuizPage() {
  return <QuizExperience />
}
