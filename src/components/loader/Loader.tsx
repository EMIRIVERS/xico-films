'use client'

import { useEffect, useState } from 'react'

export default function Loader() {
  const [visible, setVisible] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const shown = sessionStorage.getItem('loader-shown')
    if (shown) {
      setVisible(false)
      return
    }

    const fadeTimer = setTimeout(() => setFadeOut(true), 2200)
    const removeTimer = setTimeout(() => {
      setVisible(false)
      sessionStorage.setItem('loader-shown', '1')
    }, 2800)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(removeTimer)
    }
  }, [])

  if (!visible) return null

  const circleRadius = 200
  const circumference = 2 * Math.PI * circleRadius

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        background: 'var(--bg)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: fadeOut ? 0 : 1,
        transition: 'opacity 0.6s var(--o3)',
      }}
    >
      <svg
        width="460"
        height="460"
        viewBox="0 0 460 460"
        style={{ maxWidth: '80vw', maxHeight: '80vw' }}
      >
        <circle
          cx="230"
          cy="230"
          r={circleRadius}
          fill="none"
          stroke="var(--text-primary)"
          strokeWidth="0.5"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          style={{
            animation: 'drawCircle 2s var(--o4) forwards',
            transformOrigin: 'center',
            transform: 'rotate(-90deg)',
          }}
        />
      </svg>

      <div style={{ overflow: 'hidden', marginTop: '2rem' }}>
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'clamp(1rem, 2vw, 1.5rem)',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'var(--text-primary)',
            animation: 'revealUp 0.8s var(--o4) 0.5s both',
          }}
        >
          CARAJO studios
        </p>
      </div>

      <style jsx>{`
        @keyframes drawCircle {
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes revealUp {
          from {
            transform: translateY(110%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}
