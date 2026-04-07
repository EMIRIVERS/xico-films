'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRef } from 'react'
import type { ProjectWithCover } from '@/lib/projects'

interface ProjectCardProps {
  project: ProjectWithCover
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const imageRef = useRef<HTMLDivElement>(null)
  const hasVideo = project.videoKeys.length > 0

  const onMouseMove = (e: React.MouseEvent) => {
    const el = imageRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10
    el.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${-y}deg) scale(1.02)`
  }

  const onMouseLeave = () => {
    if (imageRef.current) {
      imageRef.current.style.transform = 'perspective(800px) rotateY(0) rotateX(0) scale(1)'
    }
  }

  return (
    <Link
      href={`/project/${project.slug}`}
      className="project-card"
      data-cursor-hover
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div
        ref={imageRef}
        className="project-card-image-wrap"
        style={{ transition: 'transform 0.4s var(--o4)' }}
      >
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ objectFit: 'cover' }}
          className="project-card-img"
        />

        {hasVideo && (
          <div className="project-card-play">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="23" stroke="white" strokeWidth="1" opacity="0.6" />
              <polygon points="20,14 36,24 20,34" fill="white" />
            </svg>
          </div>
        )}

        <div className="project-card-overlay" />
      </div>

      <div className="project-card-title-wrap">
        <p className="project-card-title">
          {project.title}
        </p>
      </div>

      <p className="project-card-category">
        {project.category}
      </p>
    </Link>
  )
}
