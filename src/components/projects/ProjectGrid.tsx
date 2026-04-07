'use client'

import ProjectCard from './ProjectCard'
import ScrollRevealCard from '@/components/animations/ScrollRevealCard'
import type { ProjectWithCover } from '@/lib/projects'

interface ProjectGridProps {
  projects: ProjectWithCover[]
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <div className="project-grid">
      {projects.map((project, i) => (
        <ScrollRevealCard key={project.slug} index={i % 4}>
          <ProjectCard project={project} />
        </ScrollRevealCard>
      ))}
    </div>
  )
}
