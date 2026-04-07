import { projectStories, type ProjectStory } from '@/data/project-stories'
import registryData from '../../media_registry.json'
import type { PhotoEntry, VideoEntry } from '@/types/media'

const registry = registryData as { photos: PhotoEntry[]; videos: VideoEntry[] }

export interface ProjectWithCover extends ProjectStory {
  coverImage: string
}

function getCoverForProject(project: ProjectStory): string {
  // Photo projects: use first photo
  if (project.photoProject) {
    const photo = registry.photos.find((p) => p.project === project.photoProject)
    if (photo) return photo.url
  }

  // Video projects: use poster if available
  if (project.videoKeys.length > 0) {
    const video = registry.videos.find((v) => v.title === project.videoKeys[0])
    if (video?.poster) return video.poster
  }

  return `/media/posters/${project.slug}.webp`
}

function enrichProject(p: ProjectStory): ProjectWithCover {
  return { ...p, coverImage: getCoverForProject(p) }
}

export function getAllProjects(): ProjectWithCover[] {
  return projectStories.map(enrichProject)
}

export function getProjectsByCategory(category: string): ProjectWithCover[] {
  return projectStories
    .filter((p) => p.category.toLowerCase() === category.toLowerCase())
    .map(enrichProject)
}

export function getProjectBySlug(slug: string): ProjectWithCover | undefined {
  const p = projectStories.find((p) => p.slug === slug)
  return p ? enrichProject(p) : undefined
}

export function getProjectPhotos(project: ProjectStory): PhotoEntry[] {
  if (!project.photoProject) return []
  return registry.photos.filter((p) => p.project === project.photoProject)
}

export function getProjectVideos(project: ProjectStory): VideoEntry[] {
  return registry.videos.filter((v) => project.videoKeys.includes(v.title))
}

export function getAdjacentProjects(slug: string): {
  prev: ProjectWithCover | null
  next: ProjectWithCover | null
} {
  const all = getAllProjects()
  const idx = all.findIndex((p) => p.slug === slug)
  return {
    prev: idx > 0 ? all[idx - 1] : null,
    next: idx < all.length - 1 ? all[idx + 1] : null,
  }
}
