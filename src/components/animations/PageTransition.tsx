'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState, type ReactNode } from 'react'

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [displayChildren, setDisplayChildren] = useState(children)
  const [transitioning, setTransitioning] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    setTransitioning(true)

    const timeout = setTimeout(() => {
      setDisplayChildren(children)
      setTransitioning(false)
    }, 500)

    return () => clearTimeout(timeout)
  }, [pathname, children])

  return (
    <div
      ref={containerRef}
      style={{
        opacity: transitioning ? 0 : 1,
        transform: transitioning ? 'translateY(20px)' : 'translateY(0)',
        transition: 'opacity 0.5s var(--o4), transform 0.5s var(--o4)',
      }}
    >
      {displayChildren}
    </div>
  )
}
