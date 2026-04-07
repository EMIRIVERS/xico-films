'use client'

interface MobileHeaderProps {
  isOpen: boolean
  onToggle: () => void
}

export default function MobileHeader({ isOpen, onToggle }: MobileHeaderProps) {
  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 'var(--header-h)',
        background: 'var(--nav-bg)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1.25rem',
      }}
      className="mobile-header"
    >
      <span
        style={{
          fontSize: '0.875rem',
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'var(--text-primary)',
        }}
      >
        CARAJO studios
      </span>

      <button
        onClick={onToggle}
        aria-label={isOpen ? 'Cerrar menu' : 'Abrir menu'}
        style={{
          background: 'none',
          border: 'none',
          padding: '0.5rem',
          cursor: 'pointer',
        }}
      >
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <line
            x1="4" y1="8" x2="24" y2="8"
            stroke="white" strokeWidth="1.5"
            style={{
              transform: isOpen ? 'rotate(45deg) translate(4px, -4px)' : 'none',
              transformOrigin: 'center',
              transition: 'transform 0.3s var(--o3)',
            }}
          />
          <line
            x1="4" y1="14" x2="24" y2="14"
            stroke="white" strokeWidth="1.5"
            style={{
              opacity: isOpen ? 0 : 1,
              transition: 'opacity 0.2s',
            }}
          />
          <line
            x1="4" y1="20" x2="24" y2="20"
            stroke="white" strokeWidth="1.5"
            style={{
              transform: isOpen ? 'rotate(-45deg) translate(4px, 4px)' : 'none',
              transformOrigin: 'center',
              transition: 'transform 0.3s var(--o3)',
            }}
          />
        </svg>
      </button>
    </header>
  )
}
