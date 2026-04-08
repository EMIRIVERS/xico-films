'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import type { ProjectWithCover } from '@/lib/projects'

interface FloatingProjectsProps {
  projects: ProjectWithCover[]
}

interface FloatState {
  x: number
  y: number
  rotation: number
  speed: number
  phase: number
}

export default function FloatingProjects({ projects }: FloatingProjectsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [positions, setPositions] = useState<FloatState[]>([])
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const [pulledIdx, setPulledIdx] = useState<number | null>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const router = useRouter()

  // Initialize positions in a grid pattern
  useEffect(() => {
    const cols = window.innerWidth > 768 ? 4 : 2
    const cardW = window.innerWidth > 768 ? 280 : 160
    const cardH = window.innerWidth > 768 ? 180 : 110
    const gapX = window.innerWidth > 768 ? 40 : 20
    const gapY = window.innerWidth > 768 ? 50 : 30
    const totalW = cols * (cardW + gapX)
    const startX = (window.innerWidth - totalW) / 2 + (window.innerWidth > 768 ? 25 : 0)

    const states: FloatState[] = projects.map((_, i) => {
      const col = i % cols
      const row = Math.floor(i / cols)
      return {
        x: startX + col * (cardW + gapX) + (Math.random() - 0.5) * 20,
        y: 160 + row * (cardH + gapY) + (Math.random() - 0.5) * 15,
        rotation: (Math.random() - 0.5) * 6,
        speed: 0.3 + Math.random() * 0.4,
        phase: Math.random() * Math.PI * 2,
      }
    })
    setPositions(states)
  }, [projects])

  // Track mouse
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  const handleClick = (idx: number) => {
    setPulledIdx(idx)
    // Animate "pulling from water" then navigate
    setTimeout(() => {
      router.push(`/project/${projects[idx].slug}`)
    }, 800)
  }

  if (positions.length === 0) return null

  const cardW = typeof window !== 'undefined' && window.innerWidth > 768 ? 280 : 160
  const cardH = typeof window !== 'undefined' && window.innerWidth > 768 ? 180 : 110

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        zIndex: 2,
      }}
    >
      {projects.map((project, i) => {
        const pos = positions[i]
        if (!pos) return null

        const isPulled = pulledIdx === i
        const isHovered = hoveredIdx === i

        return (
          <div
            key={project.slug}
            className="project-float-card"
            onClick={() => handleClick(i)}
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
            style={{
              position: 'absolute',
              left: pos.x,
              top: pos.y,
              width: cardW,
              height: cardH,
              cursor: 'none',
              // Float animation via CSS
              animation: `float ${2 + pos.speed}s ease-in-out ${pos.phase}s infinite alternate`,
              // Underwater look
              opacity: isPulled ? 1 : isHovered ? 0.9 : 0.45,
              filter: isPulled
                ? 'brightness(1.1) blur(0px)'
                : isHovered
                  ? 'brightness(0.9) blur(0px)'
                  : 'brightness(0.5) blur(1px)',
              transform: isPulled
                ? `rotate(0deg) scale(1.5) translateY(-100vh)`
                : isHovered
                  ? `rotate(${pos.rotation * 0.3}deg) scale(1.08)`
                  : `rotate(${pos.rotation}deg) scale(1)`,
              transition: isPulled
                ? 'all 0.8s cubic-bezier(.16, 1, .3, 1)'
                : 'opacity 0.5s ease, filter 0.5s ease, transform 0.5s cubic-bezier(.22, 1, .36, 1)',
              zIndex: isPulled ? 50 : isHovered ? 10 : 1,
              borderRadius: '6px',
              overflow: 'hidden',
              boxShadow: isHovered
                ? '0 8px 40px rgba(50,130,220,0.15), 0 0 60px rgba(50,130,220,0.08)'
                : '0 4px 20px rgba(0,0,0,0.3)',
            }}
          >
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              sizes="300px"
              style={{ objectFit: 'cover' }}
            />

            {/* Underwater overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: isPulled
                  ? 'transparent'
                  : isHovered
                    ? 'linear-gradient(to top, rgba(2,6,8,0.6) 0%, rgba(10,21,32,0.2) 100%)'
                    : 'linear-gradient(to top, rgba(2,6,8,0.7) 0%, rgba(10,21,32,0.4) 100%)',
                transition: 'background 0.5s',
              }}
            />

            {/* Title - visible on hover */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '1rem',
                opacity: isHovered ? 1 : 0,
                transform: isHovered ? 'translateY(0)' : 'translateY(10px)',
                transition: 'all 0.4s cubic-bezier(.22, 1, .36, 1)',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '0.7rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: '#fff',
                }}
              >
                {project.title}
              </p>
              <p
                style={{
                  fontSize: '0.55rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'rgba(100,180,255,0.7)',
                  marginTop: '0.2rem',
                }}
              >
                {project.category}
              </p>
            </div>

            {/* Ripple ring on hover */}
            {isHovered && (
              <div
                style={{
                  position: 'absolute',
                  inset: -10,
                  border: '1px solid rgba(100,180,255,0.2)',
                  borderRadius: '10px',
                  animation: 'rippleRing 1.5s ease-out infinite',
                }}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
