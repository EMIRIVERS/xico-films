'use client'

import { useEffect, useRef, type ReactNode } from 'react'

export default function ScrollRevealImage({ children, index }: { children: ReactNode; index: number }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1'
          el.style.transform = 'translateY(0) scale(1)'
          el.style.clipPath = 'inset(0 0 0% 0)'
          observer.unobserve(el)
        }
      },
      { threshold: 0.05 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{
        opacity: 0,
        transform: 'translateY(40px) scale(0.98)',
        clipPath: 'inset(0 0 15% 0)',
        transition: `opacity 1s var(--o4) ${index * 0.08}s, transform 1s var(--o4) ${index * 0.08}s, clip-path 1s var(--o4) ${index * 0.08}s`,
        willChange: 'transform, opacity, clip-path',
      }}
    >
      {children}
    </div>
  )
}
