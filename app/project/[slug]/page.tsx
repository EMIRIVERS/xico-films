import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Footer from '@/components/layout/Footer'
import TextReveal from '@/components/animations/TextReveal'
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
    <>
      {/* Hero */}
      <section
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16/9',
          background: '#111',
          overflow: 'hidden',
        }}
      >
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover' }}
        />

        {project.category === 'Video' && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="72" height="72" viewBox="0 0 72 72" fill="none" style={{ opacity: 0.8 }}>
              <circle cx="36" cy="36" r="35" stroke="white" strokeWidth="1" />
              <polygon points="28,18 56,36 28,54" fill="white" />
            </svg>
          </div>
        )}
      </section>

      {/* Metadata */}
      <section style={{ padding: '4rem 2rem' }}>
        <TextReveal as="h1">
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            {project.title}
          </span>
        </TextReveal>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: '2rem',
            marginTop: '2rem',
            fontSize: '0.75rem',
            color: 'var(--text-secondary)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}
        >
          <TextReveal delay={0.1}>
            <div>
              <p style={{ marginBottom: '0.25rem', color: 'var(--text-muted)' }}>Cliente</p>
              <p style={{ color: 'var(--text-primary)' }}>{project.client}</p>
            </div>
          </TextReveal>
          <TextReveal delay={0.15}>
            <div>
              <p style={{ marginBottom: '0.25rem', color: 'var(--text-muted)' }}>Categoria</p>
              <p style={{ color: 'var(--text-primary)' }}>{project.category}</p>
            </div>
          </TextReveal>
          <TextReveal delay={0.2}>
            <div>
              <p style={{ marginBottom: '0.25rem', color: 'var(--text-muted)' }}>Ano</p>
              <p style={{ color: 'var(--text-primary)' }}>{project.year}</p>
            </div>
          </TextReveal>
          <TextReveal delay={0.25}>
            <div>
              <p style={{ marginBottom: '0.25rem', color: 'var(--text-muted)' }}>Rol</p>
              <p style={{ color: 'var(--text-primary)' }}>{project.role}</p>
            </div>
          </TextReveal>
        </div>
      </section>

      {/* Photo gallery */}
      {media.length > 0 && (
        <section style={{ padding: '0 2rem 4rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {media.map((photo) => (
              <div key={photo.id} style={{ position: 'relative', width: '100%' }}>
                <Image
                  src={photo.url}
                  alt={photo.alt}
                  width={1200}
                  height={800}
                  sizes="100vw"
                  style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Prev/Next navigation */}
      <nav
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          borderTop: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        {prev ? (
          <Link
            href={`/project/${prev.slug}`}
            style={{
              padding: '2rem',
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'var(--text-secondary)',
              transition: 'color 0.3s',
              borderRight: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <span style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>
              Anterior
            </span>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--text-primary)' }}>
              {prev.title}
            </span>
          </Link>
        ) : (
          <div />
        )}

        {next ? (
          <Link
            href={`/project/${next.slug}`}
            style={{
              padding: '2rem',
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'var(--text-secondary)',
              transition: 'color 0.3s',
              textAlign: 'right',
            }}
          >
            <span style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>
              Siguiente
            </span>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--text-primary)' }}>
              {next.title}
            </span>
          </Link>
        ) : (
          <div />
        )}
      </nav>

      <Footer />
    </>
  )
}
