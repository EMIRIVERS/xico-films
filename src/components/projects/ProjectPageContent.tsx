'use client'

import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/layout/Footer'
import TextReveal from '@/components/animations/TextReveal'
import ParallaxHero from '@/components/animations/ParallaxHero'
import ScrollRevealImage from '@/components/animations/ScrollRevealImage'
import MagneticWrap from '@/components/animations/MagneticWrap'
import type { ProjectWithCover } from '@/lib/projects'
import type { PhotoEntry } from '@/types/media'

interface ProjectPageContentProps {
  project: ProjectWithCover
  media: PhotoEntry[]
  prev: ProjectWithCover | null
  next: ProjectWithCover | null
}

export default function ProjectPageContent({ project, media, prev, next }: ProjectPageContentProps) {
  return (
    <>
      {/* Hero with parallax */}
      <ParallaxHero>
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover', transform: 'scale(1.15)' }}
        />

        {project.category === 'Video' && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 2,
            }}
          >
            <div
              className="project-play-btn"
              data-cursor-hover
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(4px)',
                background: 'rgba(0,0,0,0.2)',
                transition: 'transform 0.5s var(--o4), border-color 0.3s',
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <polygon points="6,2 22,12 6,22" />
              </svg>
            </div>
          </div>
        )}

        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(8,8,8,0.4) 0%, transparent 40%)',
            zIndex: 1,
          }}
        />
      </ParallaxHero>

      {/* Metadata */}
      <section style={{ padding: '4rem 2rem' }}>
        <TextReveal>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            {project.title}
          </h1>
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
          {[
            { label: 'Cliente', value: project.client },
            { label: 'Categoria', value: project.category },
            { label: 'Ano', value: project.year },
            { label: 'Rol', value: project.role },
          ].map((item, i) => (
            <TextReveal key={item.label} delay={0.1 + i * 0.05}>
              <div>
                <p style={{ marginBottom: '0.25rem', color: 'var(--text-muted)' }}>{item.label}</p>
                <p style={{ color: 'var(--text-primary)' }}>{item.value}</p>
              </div>
            </TextReveal>
          ))}
        </div>
      </section>

      {/* Photo gallery with scroll reveals */}
      {media.length > 0 && (
        <section style={{ padding: '0 2rem 4rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {media.map((photo, i) => (
              <ScrollRevealImage key={photo.id} index={i}>
                <Image
                  src={photo.url}
                  alt={photo.alt}
                  width={1200}
                  height={800}
                  sizes="100vw"
                  style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: '2px' }}
                />
              </ScrollRevealImage>
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
          <MagneticWrap strength={0.15}>
            <Link
              href={`/project/${prev.slug}`}
              data-cursor-hover
              className="project-nav-link"
              style={{
                display: 'block',
                padding: '2rem',
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--text-secondary)',
                borderRight: '1px solid rgba(255,255,255,0.08)',
                transition: 'background 0.4s var(--o3)',
              }}
            >
              <span style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>
                Anterior
              </span>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--text-primary)' }}>
                {prev.title}
              </span>
            </Link>
          </MagneticWrap>
        ) : (
          <div />
        )}

        {next ? (
          <MagneticWrap strength={0.15}>
            <Link
              href={`/project/${next.slug}`}
              data-cursor-hover
              className="project-nav-link"
              style={{
                display: 'block',
                padding: '2rem',
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--text-secondary)',
                textAlign: 'right',
                transition: 'background 0.4s var(--o3)',
              }}
            >
              <span style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>
                Siguiente
              </span>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--text-primary)' }}>
                {next.title}
              </span>
            </Link>
          </MagneticWrap>
        ) : (
          <div />
        )}
      </nav>

      <Footer />
    </>
  )
}
