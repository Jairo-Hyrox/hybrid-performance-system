export const VIDEOS = {
  hero: "https://1pejw2ewpeqbv5cx.public.blob.vercel-storage.com/lv_7655512854933638420_20260712221508.mp4",
  outdoor: "https://s5ihgdgqdulzxrhj.public.blob.vercel-storage.com/_278196110.mp4",
  metodo: "https://j1rdckfjxurd6snm.public.blob.vercel-storage.com/lv_0_20260712232043.mp4",
} as const

export const POSTERS = {
  hero: "/hero-poster.png",
  outdoor: "/outdoor-poster.png",
  metodo: "/metodo-poster.png",
} as const

export const MARCA = {
  nombre: "Innovatraining",
  logo: "https://dlmlchg3lmnc9wbk.public.blob.vercel-storage.com/INNOVATRAINING.png",
  tagline: "Gym personalizado a domicilio",
} as const

export const BADGE_HYROX = "https://ffnh54mimbl4hhtk.public.blob.vercel-storage.com/Badge%20HYROX.png"

// Alterna el badge del hero entre imagen y texto sin reescribir el componente.
export const BADGE_MODE: "texto" | "imagen" = "imagen"

// Todos los CTA de la landing apuntan al Quiz Diagnóstico (Experiencia 2).
export const CTA_HREF = "/quiz"
export const CTA_LABEL = "EMPIEZO"
