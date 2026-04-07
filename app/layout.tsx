import type { Metadata } from 'next'
import { Inter, Space_Grotesk, Playfair_Display } from 'next/font/google'
import LayoutShell from '@/components/layout/LayoutShell'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '700'],
  display: 'swap',
})

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-accent',
  style: ['normal', 'italic'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Pescadora',
  description: 'Fotografia y video de campana. Mexico.',
  openGraph: {
    title: 'Pescadora',
    description: 'Fotografia y video de campana. Mexico.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${inter.variable} ${spaceGrotesk.variable} ${playfairDisplay.variable}`}>
      <body style={{ fontFamily: 'var(--font-body), sans-serif' }}>
        <LayoutShell>
          {children}
        </LayoutShell>
      </body>
    </html>
  )
}
