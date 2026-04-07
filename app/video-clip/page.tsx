import ProjectGrid from '@/components/projects/ProjectGrid'
import Footer from '@/components/layout/Footer'
import TextReveal from '@/components/animations/TextReveal'
import { getProjectsByCategory } from '@/lib/projects'

export default function VideoClipPage() {
  const projects = getProjectsByCategory('Video Clip')

  return (
    <>
      <section style={{ padding: '6rem 2rem 2rem' }}>
        <TextReveal>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(2rem, 4vw, 4rem)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            Video Clip
          </h1>
        </TextReveal>
      </section>

      <ProjectGrid projects={projects} />
      <Footer />
    </>
  )
}
