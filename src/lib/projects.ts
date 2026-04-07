import { projectStories, type ProjectStory } from '@/data/project-stories'
import registryData from '../../media_registry.json'
import type { PhotoEntry, VideoEntry } from '@/types/media'

const registry = registryData as { photos: PhotoEntry[]; videos: VideoEntry[] }

export interface ProjectWithCover extends ProjectStory {
  coverImage: string
}

function getCoverForProject(name: string, category: string): string {
  if (category === 'Fotografia') {
    const photo = registry.photos.find((p) => p.project === name)
    return photo?.url ?? '/media/posters/placeholder.webp'
  }

  const video = registry.videos.find((v) =>
    v.title.toLowerCase().includes(name.toLowerCase()) ||
    name.toLowerCase().includes(v.title.toLowerCase().split(' - ')[0].replace('h1', '').replace('h2', '').replace('h3', '').replace('h4', '').trim())
  )
  if (video?.poster) return video.poster
  return `/media/posters/${name.toLowerCase().replace(/\s+/g, '-')}.webp`
}

export function getAllProjects(): ProjectWithCover[] {
  return Object.values(projectStories).map((p) => ({
    ...p,
    coverImage: getCoverForProject(p.title, p.category),
  }))
}

export function getProjectsByCategory(category: string): ProjectWithCover[] {
  return getAllProjects().filter(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  )
}

export function getProjectBySlug(slug: string): ProjectWithCover | undefined {
  return getAllProjects().find((p) => p.slug === slug)
}

export function getProjectMedia(projectName: string): PhotoEntry[] {
  return registry.photos.filter((p) => p.project === projectName)
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
