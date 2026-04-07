'use client'

import Link from 'next/link'
import TextReveal from '@/components/animations/TextReveal'

const navLinks = [
  { href: '/', label: 'Stories' },
  { href: '/comercial', label: 'Comercial' },
  { href: '/video-clip', label: 'Video Clip' },
  { href: '/fotografia', label: 'Fotografia' },
  { href: '/about', label: 'About' },
]

export default function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <TextReveal>
          <span className="footer-logo">
            Pescadora
          </span>
        </TextReveal>
        <TextReveal delay={0.1}>
          <p style={{ marginTop: '1rem' }}>Fotografia y video de campana.</p>
        </TextReveal>
        <TextReveal delay={0.15}>
          <p>Mexico.</p>
        </TextReveal>
      </div>

      <div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {navLinks.map((link, i) => (
            <TextReveal key={link.href} delay={0.05 * i}>
              <Link
                href={link.href}
                style={{
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  transition: 'color 0.3s',
                }}
              >
                {link.label}
              </Link>
            </TextReveal>
          ))}
        </nav>
      </div>
    </footer>
  )
}
