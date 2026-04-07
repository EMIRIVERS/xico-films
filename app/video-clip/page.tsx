import ProjectGrid from '@/components/projects/ProjectGrid'
import Footer from '@/components/layout/Footer'
import TextReveal from '@/components/animations/TextReveal'
import { getProjectsByCategory } from '@/lib/projects'

export default function VideoClipPage() {
  const projects = getProjectsByCategory('Video').filter(
    (p) => p.slug === 'video-clip' ||
    ['fuego lento', 'hipnotizado'].some(
      (name) => p.title.toLowerCase().includes(name)
    )
  )

  return (
    <>
      <section style={{ padding: '6rem 2rem 2rem' }}>
        <TextReveal as="h1">
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(2rem, 4vw, 4rem)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            Video Clip
          </span>
        </TextReveal>
      </section>

      <ProjectGrid projects={projects} />
      <Footer />
    </>
  )
}
