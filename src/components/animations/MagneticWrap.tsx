'use client'

import { useRef, type ReactNode } from 'react'

interface MagneticWrapProps {
  children: ReactNode
  strength?: number
}

export default function MagneticWrap({ children, strength = 0.3 }: MagneticWrapProps) {
  const ref = useRef<HTMLDivElement>(null)

  const onMouseMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) * strength
    const y = (e.clientY - rect.top - rect.height / 2) * strength
    el.style.transform = `translate(${x}px, ${y}px)`
  }

  const onMouseLeave = () => {
    if (ref.current) {
      ref.current.style.transform = 'translate(0, 0)'
    }
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        transition: 'transform 0.4s var(--o4)',
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  )
}
