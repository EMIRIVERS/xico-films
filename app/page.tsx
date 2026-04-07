import Loader from '@/components/loader/Loader'
import ProjectGrid from '@/components/projects/ProjectGrid'
import Footer from '@/components/layout/Footer'
import TextReveal from '@/components/animations/TextReveal'
import { getAllProjects } from '@/lib/projects'

export default function Home() {
  const projects = getAllProjects()

  return (
    <>
      <Loader />

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
            Stories
          </span>
        </TextReveal>
      </section>

      <ProjectGrid projects={projects} />
      <Footer />
    </>
  )
}
