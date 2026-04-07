'use client'

import { useEffect, useRef, type ReactNode } from 'react'

export default function ParallaxHero({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onScroll = () => {
      const rect = el.getBoundingClientRect()
      const progress = -rect.top / (rect.height + window.innerHeight)
      const img = el.querySelector('img') as HTMLElement | null
      if (img) {
        img.style.transform = `scale(1.15) translateY(${progress * 80}px)`
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div ref={ref} style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden', background: '#111' }}>
      {children}
    </div>
  )
}
