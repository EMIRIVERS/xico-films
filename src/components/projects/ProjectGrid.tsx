'use client'

import ProjectCard from './ProjectCard'
import type { ProjectWithCover } from '@/lib/projects'

interface ProjectGridProps {
  projects: ProjectWithCover[]
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <div className="project-grid">
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  )
}
