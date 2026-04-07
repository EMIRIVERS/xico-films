import { notFound } from 'next/navigation'
import ProjectPageContent from '@/components/projects/ProjectPageContent'
import {
  getAllProjects,
  getProjectBySlug,
  getProjectMedia,
  getAdjacentProjects,
} from '@/lib/projects'

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }))
}

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  const media = getProjectMedia(project.title)
  const { prev, next } = getAdjacentProjects(slug)

  return (
    <ProjectPageContent
      project={project}
      media={media}
      prev={prev}
      next={next}
    />
  )
}
