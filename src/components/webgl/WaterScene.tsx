'use client'

import { useEffect, useRef, useCallback } from 'react'
import * as THREE from 'three'
import waterVertexShader from '@/shaders/water-vertex.glsl'
import waterFragmentShader from '@/shaders/water-fragment.glsl'

interface WaterSceneProps {
  onReady?: () => void
}

export default function WaterScene({ onReady }: WaterSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    mouseRef.current = {
      x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
      y: -((e.clientY - rect.top) / rect.height) * 2 + 1,
    }
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10)
    camera.position.z = 1

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Water plane
    const geometry = new THREE.PlaneGeometry(2, 2, 128, 128)
    const material = new THREE.ShaderMaterial({
      vertexShader: waterVertexShader,
      fragmentShader: waterFragmentShader,
      transparent: true,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uMouseRadius: { value: 0.3 },
        uDeepColor: { value: new THREE.Color(0x020608) },
        uSurfaceColor: { value: new THREE.Color(0x0a1520) },
        uCausticColor: { value: new THREE.Color(0x1a3050) },
      },
    })
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    // Animation
    const clock = new THREE.Clock()
    let frameId: number

    const animate = () => {
      frameId = requestAnimationFrame(animate)
      const elapsed = clock.getElapsedTime()

      material.uniforms.uTime.value = elapsed
      material.uniforms.uMouse.value.set(
        mouseRef.current.x,
        mouseRef.current.y
      )

      renderer.render(scene, camera)
    }

    animate()
    onReady?.()

    // Resize
    const onResize = () => {
      renderer.setSize(container.clientWidth, container.clientHeight)
    }
    window.addEventListener('resize', onResize)
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', handleMouseMove)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      rendererRef.current = null
    }
  }, [handleMouseMove, onReady])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  )
}
