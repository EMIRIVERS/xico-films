'use client'

import { useEffect, useRef, type ReactNode } from 'react'

interface ScrollRevealCardProps {
  children: ReactNode
  index: number
}

export default function ScrollRevealCard({ children, index }: ScrollRevealCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1'
          el.style.transform = 'translateY(0) scale(1)'
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{
        opacity: 0,
        transform: 'translateY(60px) scale(0.97)',
        transition: `opacity 0.8s var(--o4) ${index * 0.1}s, transform 0.8s var(--o4) ${index * 0.1}s`,
        willChange: 'transform, opacity',
      }}
    >
      {children}
    </div>
  )
}
