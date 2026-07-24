import type { Metadata } from "next"
import { ConfirmacionExperience } from "@/components/confirmacion/confirmacion-experience"

export const metadata: Metadata = {
  title: "Confirmación | Hybrid Performance System",
  description:
    "Evaluación recibida. Nuestro equipo revisará tu información para preparar tu Evaluación Estratégica.",
}

export default function ConfirmacionPage() {
  return <ConfirmacionExperience />
}
