"use client"

import { useEffect } from "react"

// Guarda de qué anuncio llegó la persona (parámetros utm_* de la URL) para
// poder enviarlo junto con el lead al formulario. Se conserva en
// sessionStorage porque la persona navega de la landing a /quiz.
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content"] as const

export function UtmCapture() {
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search)
      const found: Record<string, string> = {}
      for (const key of UTM_KEYS) {
        const value = params.get(key)
        if (value) found[key] = value.slice(0, 100)
      }
      // Solo sobrescribe si la URL trae utm; así no se pierde al navegar.
      if (Object.keys(found).length > 0) {
        sessionStorage.setItem("hps_utm", JSON.stringify(found))
      }
    } catch {
      // sessionStorage puede no estar disponible; el flujo continúa igual.
    }
  }, [])

  return null
}
