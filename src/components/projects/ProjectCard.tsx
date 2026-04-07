'use client'

import Link from 'next/link'
import Image from 'next/image'
import type { ProjectWithCover } from '@/lib/projects'

interface ProjectCardProps {
  project: ProjectWithCover
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/project/${project.slug}`}
      className="project-card"
    >
      <div className="project-card-image-wrap">
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ objectFit: 'cover' }}
          className="project-card-img"
        />

        {project.category === 'Video' && (
          <div className="project-card-play">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <polygon points="18,12 38,24 18,36" fill="white" />
            </svg>
          </div>
        )}
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
