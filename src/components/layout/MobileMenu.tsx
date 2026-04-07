'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/', label: 'Stories' },
  { href: '/comercial', label: 'Comercial' },
  { href: '/video-clip', label: 'Video Clip' },
  { href: '/fotografia', label: 'Fotografia' },
  { href: '/about', label: 'About' },
]

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname()

  return (
    <div
      style={{
        position: 'fixed',
        top: 'var(--header-h)',
        left: 0,
        right: 0,
        height: 'calc(100svh - var(--header-h))',
        background: 'var(--nav-bg)',
        zIndex: 99,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 1.25rem',
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? 'auto' : 'none',
        transition: 'opacity 0.4s var(--o3)',
      }}
      className="mobile-menu"
    >
      {navLinks.map((link, i) => (
        <div key={link.href} style={{ overflow: 'hidden' }}>
          <Link
            href={link.href}
            onClick={onClose}
            style={{
              display: 'block',
              fontSize: '2rem',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              padding: '0.75rem 0',
              color: pathname === link.href ? 'var(--text-primary)' : 'var(--text-secondary)',
              transform: isOpen ? 'translateY(0)' : 'translateY(110%)',
              transition: `transform 0.6s var(--o4) ${0.05 * i}s, color 0.3s`,
            }}
          >
            {link.label}
          </Link>
        </div>
      ))}

      <div
        style={{
          marginTop: 'auto',
          paddingBottom: '2rem',
          fontSize: '0.75rem',
          color: 'var(--text-secondary)',
          opacity: isOpen ? 1 : 0,
          transition: 'opacity 0.6s var(--o3) 0.3s',
        }}
      >
        <p>Mexico</p>
      </div>
    </div>
  )
}
