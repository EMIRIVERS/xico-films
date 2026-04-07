'use client'

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react'

interface TextRevealProps {
  children: ReactNode
  as?: 'div' | 'h1' | 'h2' | 'p' | 'span'
  delay?: number
  duration?: number
  className?: string
  style?: CSSProperties
}

export default function TextReveal({
  children,
  as = 'div',
  delay = 0,
  duration = 0.8,
  className,
  style,
}: TextRevealProps) {
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const outer = outerRef.current
    const inner = innerRef.current
    if (!outer || !inner) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          inner.style.transform = 'translateY(0)'
          inner.style.opacity = '1'
          observer.unobserve(outer)
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(outer)
    return () => observer.disconnect()
  }, [])

  const innerStyle: CSSProperties = {
    transform: 'translateY(110%)',
    opacity: 0,
    transition: `transform ${duration}s var(--o4) ${delay}s, opacity ${duration}s var(--o4) ${delay}s`,
    willChange: 'transform, opacity',
  }

  const inner = (
    <div
      ref={innerRef}
      style={innerStyle}
      role={as === 'h1' || as === 'h2' ? 'heading' : undefined}
      aria-level={as === 'h1' ? 1 : as === 'h2' ? 2 : undefined}
    >
      {children}
    </div>
  )

  return (
    <div
      ref={outerRef}
      style={{ overflow: 'hidden', ...style }}
      className={className}
    >
      {inner}
    </div>
  )
}
