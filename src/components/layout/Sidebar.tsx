'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import MagneticWrap from '@/components/animations/MagneticWrap'

const navLinks = [
  { href: '/', label: 'Stories' },
  { href: '/comercial', label: 'Comercial' },
  { href: '/video-clip', label: 'Video Clip' },
  { href: '/fotografia', label: 'Fotografia' },
  { href: '/about', label: 'About' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <nav
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: 'var(--sidebar-w)',
        height: '100vh',
        background: 'var(--nav-bg)',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1.5rem 0',
        mixBlendMode: 'difference',
      }}
      className="sidebar-desktop"
    >
      <MagneticWrap strength={0.4}>
        <Link
          href="/"
          data-cursor-hover
          style={{
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
            fontSize: '0.75rem',
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--text-primary)',
          }}
        >
          CARAJO studios
        </Link>
      </MagneticWrap>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.25rem',
        }}
      >
        {navLinks.map((link) => (
          <MagneticWrap key={link.href} strength={0.5}>
            <Link
              href={link.href}
              data-cursor-hover
              style={{
                writingMode: 'vertical-rl',
                transform: 'rotate(180deg)',
                fontSize: '0.6rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: pathname === link.href ? 'var(--text-primary)' : 'var(--text-secondary)',
                transition: 'color 0.3s var(--o2)',
              }}
            >
              {link.label}
            </Link>
          </MagneticWrap>
        ))}
      </div>
    </nav>
  )
}
