import type { Metadata } from "next"
import { OfertaExperience } from "@/components/oferta/oferta-experience"

export const metadata: Metadata = {
  title: "Oferta | Hybrid Performance System",
  description:
    "Empieza con tu Evaluación Estratégica y accede con un 50% de descuento a un sistema diseñado para que tu entrenamiento tenga dirección.",
}

export default function OfertaPage() {
  return <OfertaExperience />
}
