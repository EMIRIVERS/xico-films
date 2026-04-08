'use client'

import { useEffect, useRef } from 'react'

export default function UnderwaterTitle() {
  const containerRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<number>(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const letters = container.querySelectorAll<HTMLSpanElement>('.title-letter')

    letters.forEach((letter, i) => {
      letter.style.transition = `transform 1.2s cubic-bezier(.05, .7, .1, 1) ${0.8 + i * 0.06}s, opacity 1s cubic-bezier(.22, 1, .36, 1) ${0.8 + i * 0.06}s, filter 1.5s ease ${0.8 + i * 0.06}s`

      setTimeout(() => {
        letter.style.transform = 'translateY(0) scaleY(1)'
        letter.style.opacity = '1'
        letter.style.filter = 'blur(0px)'
      }, 100)
    })

    // Subtle float after emerge
    let time = 0
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate)
      time += 0.01

      letters.forEach((letter, i) => {
        const offset = Math.sin(time * 0.8 + i * 0.3) * 2
        letter.style.transform = `translateY(${offset}px) scaleY(1)`
      })
    }

    const startFloat = setTimeout(() => {
      frameRef.current = requestAnimationFrame(animate)
    }, 2500)

    return () => {
      clearTimeout(startFloat)
      cancelAnimationFrame(frameRef.current)
    }
  }, [])

  const title = 'CARAJO'
  const subtitle = 'studios'

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        zIndex: 3,
        textAlign: 'center',
        paddingTop: 'clamp(4rem, 10vh, 8rem)',
        pointerEvents: 'none',
        userSelect: 'none',
      }}
    >
      <div style={{ overflow: 'hidden', display: 'inline-block' }}>
        {title.split('').map((char, i) => (
          <span
            key={i}
            className="title-letter"
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(3rem, 10vw, 8rem)',
              letterSpacing: '0.15em',
              color: 'rgba(255,255,255,0.9)',
              textShadow: '0 0 40px rgba(50,130,220,0.15), 0 0 80px rgba(50,130,220,0.05)',
              transform: 'translateY(120%) scaleY(1.4)',
              opacity: 0,
              filter: 'blur(6px)',
              willChange: 'transform, opacity, filter',
            }}
          >
            {char}
          </span>
        ))}
      </div>

      <div style={{ overflow: 'hidden', display: 'block', marginTop: '-0.5rem' }}>
        <span
          className="title-letter"
          style={{
            display: 'inline-block',
            fontFamily: 'var(--font-accent)',
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(1rem, 3vw, 2rem)',
            letterSpacing: '0.4em',
            color: 'rgba(100,180,255,0.5)',
            transform: 'translateY(120%) scaleY(1.4)',
            opacity: 0,
            filter: 'blur(4px)',
            willChange: 'transform, opacity, filter',
          }}
        >
          {subtitle}
        </span>
      </div>

      <div
        style={{ marginTop: 'clamp(2rem, 5vh, 4rem)' }}
        className="scroll-hint"
      >
        <p
          style={{
            fontSize: '0.6rem',
            textTransform: 'uppercase',
            letterSpacing: '0.3em',
            color: 'rgba(100,180,255,0.3)',
          }}
        >
          Explora
        </p>
        <svg width="20" height="20" viewBox="0 0 20 20" style={{ margin: '0.5rem auto', opacity: 0.3 }}>
          <path d="M4,7 L10,13 L16,7" stroke="rgba(100,180,255,0.5)" strokeWidth="1" fill="none" />
        </svg>
      </div>
    </div>
  )
}
