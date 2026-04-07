import { notFound } from 'next/navigation'
import ProjectPageContent from '@/components/projects/ProjectPageContent'
import {
  getAllProjects,
  getProjectBySlug,
  getProjectPhotos,
  getProjectVideos,
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

  const photos = getProjectPhotos(project)
  const videos = getProjectVideos(project)
  const { prev, next } = getAdjacentProjects(slug)

  return (
    <ProjectPageContent
      project={project}
      photos={photos}
      videos={videos}
      prev={prev}
      next={next}
    />
  )
}
