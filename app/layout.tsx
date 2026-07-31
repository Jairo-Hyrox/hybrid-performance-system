import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Archivo, Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const META_PIXEL_ID = '1413038453969536'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['600', '700', '800', '900'],
  variable: '--font-archivo',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://hybrid-performance-system.vercel.app'),
  title: 'Hybrid Performance System™ | Innovatraining',
  description:
    'No necesitas otra rutina. Necesitas un sistema. Descubre tu diagnóstico de rendimiento HYROX.',
  openGraph: {
    title: 'Hybrid Performance System™ | Innovatraining',
    description:
      'No necesitas otra rutina. Necesitas un sistema. Descubre tu diagnóstico de rendimiento HYROX.',
    type: 'website',
    url: 'https://hybrid-performance-system.vercel.app',
    siteName: 'Hybrid Performance System',
    images: [
      {
        url: 'https://o3ah9pgynpmqhfi0.public.blob.vercel-storage.com/HYROX%20BANNER.png',
        width: 1200,
        height: 630,
        alt: 'Hybrid Performance System',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hybrid Performance System™ | Innovatraining',
    description:
      'No necesitas otra rutina. Necesitas un sistema. Descubre tu diagnóstico de rendimiento HYROX.',
    images: ['https://o3ah9pgynpmqhfi0.public.blob.vercel-storage.com/HYROX%20BANNER.png'],
  },
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0A0A0A',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${archivo.variable} bg-background`}>
      <body className="antialiased">
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');`}
        </Script>
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
