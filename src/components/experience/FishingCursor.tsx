'use client'

import { useEffect, useRef, useState } from 'react'

export default function FishingCursor() {
  const hookRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<SVGPathElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const mouse = useRef({ x: -100, y: -100 })
  const smoothMouse = useRef({ x: -100, y: -100 })
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    let frameId: number

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
    }

    const onEnter = () => setHovering(true)
    const onLeave = () => setHovering(false)

    const animate = () => {
      frameId = requestAnimationFrame(animate)

      // Smooth follow
      smoothMouse.current.x += (mouse.current.x - smoothMouse.current.x) * 0.12
      smoothMouse.current.y += (mouse.current.y - smoothMouse.current.y) * 0.12

      if (hookRef.current) {
        hookRef.current.style.transform = `translate(${smoothMouse.current.x}px, ${smoothMouse.current.y}px) translate(-50%, -50%)`
      }

      // Fishing line from top to cursor
      if (lineRef.current && svgRef.current) {
        const startX = smoothMouse.current.x
        const startY = 0
        const endX = smoothMouse.current.x
        const endY = smoothMouse.current.y

        // Curved line simulating a fishing rod
        const midX = startX + (Math.sin(Date.now() * 0.001) * 15)
        const midY = startY + (endY - startY) * 0.4

        lineRef.current.setAttribute('d',
          `M${startX},${startY} Q${midX},${midY} ${endX},${endY}`
        )
      }
    }

    const addListeners = () => {
      document.querySelectorAll('a, button, [data-cursor-hover], .project-float-card').forEach((el) => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }

    window.addEventListener('mousemove', onMove)
    frameId = requestAnimationFrame(animate)
    addListeners()

    const observer = new MutationObserver(addListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(frameId)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      {/* Fishing line */}
      <svg
        ref={svgRef}
        style={{
          position: 'fixed',
          inset: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 9998,
        }}
      >
        <path
          ref={lineRef}
          d="M0,0 Q0,0 0,0"
          fill="none"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="0.5"
        />
      </svg>

      {/* Hook cursor */}
      <div
        ref={hookRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 9999,
          pointerEvents: 'none',
          transition: 'width 0.3s, height 0.3s',
        }}
      >
        {/* Hook SVG */}
        <svg
          width={hovering ? '32' : '20'}
          height={hovering ? '40' : '28'}
          viewBox="0 0 20 28"
          fill="none"
          style={{
            transition: 'all 0.3s cubic-bezier(.22, 1, .36, 1)',
            filter: hovering ? 'drop-shadow(0 0 8px rgba(100,180,255,0.4))' : 'none',
          }}
        >
          {/* Line */}
          <line x1="10" y1="0" x2="10" y2="10" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
          {/* Hook body */}
          <path
            d="M10,10 L10,18 Q10,24 14,24 Q18,24 18,20 Q18,17 15,17"
            stroke={hovering ? 'rgba(100,180,255,0.9)' : 'rgba(255,255,255,0.6)'}
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
            style={{ transition: 'stroke 0.3s' }}
          />
          {/* Hook point */}
          <circle
            cx={hovering ? '14' : '15'}
            cy="17"
            r="1"
            fill={hovering ? 'rgba(100,180,255,0.9)' : 'rgba(255,255,255,0.6)'}
            style={{ transition: 'all 0.3s' }}
          />
        </svg>
      </div>
    </>
  )
}
