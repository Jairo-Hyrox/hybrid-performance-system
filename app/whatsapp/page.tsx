import type { Metadata } from "next"
import { WhatsAppExperience } from "@/components/whatsapp/whatsapp-experience"

export const metadata: Metadata = {
  title: "Tu seguimiento | Hybrid Performance System",
  description:
    "Así acompaña Innovatraining tu proceso: estructura, revisiones y medición real de tu progreso, día a día.",
}

export default function WhatsAppPage() {
  return <WhatsAppExperience />
}
