import Footer from '@/components/layout/Footer'
import TextReveal from '@/components/animations/TextReveal'

export default function AboutPage() {
  return (
    <>
      <section
        style={{
          padding: '8rem 2rem 4rem',
          maxWidth: '800px',
        }}
      >
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
            About
          </span>
        </TextReveal>

        <div style={{ marginTop: '3rem' }}>
          <TextReveal delay={0.1}>
            <p
              style={{
                fontFamily: 'var(--font-accent)',
                fontStyle: 'italic',
                fontSize: 'clamp(1.25rem, 2.5vw, 2rem)',
                lineHeight: 1.5,
                color: 'var(--text-primary)',
              }}
            >
              Pescadora es una productora audiovisual basada en Mexico,
              especializada en fotografia y video de campana.
            </p>
          </TextReveal>

          <TextReveal delay={0.2}>
            <p
              style={{
                fontSize: 'clamp(0.875rem, 1.2vw, 1rem)',
                lineHeight: 1.7,
                color: 'var(--text-secondary)',
                marginTop: '2rem',
              }}
            >
              Creamos contenido visual que conecta marcas con su audiencia
              a traves de narrativas autenticas y produccion de alta calidad.
            </p>
          </TextReveal>
        </div>

        <div style={{ marginTop: '4rem' }}>
          <TextReveal delay={0.3}>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 'clamp(0.75rem, 1vw, 0.875rem)',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: 'var(--text-secondary)',
                marginBottom: '1rem',
              }}
            >
              Contacto
            </h2>
          </TextReveal>
          <TextReveal delay={0.35}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
              Mexico
            </p>
          </TextReveal>
        </div>
      </section>

      <Footer />
    </>
  )
}
