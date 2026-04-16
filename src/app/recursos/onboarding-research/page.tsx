'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function OnboardingResearchPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, source: 'onboarding-research' })
      })
      setSubmitted(true)
    } catch { setError('Algo salio mal. Intenta de nuevo.') }
    finally { setLoading(false) }
  }

  const layers = [
    { num: '01', title: 'Matriz Poder-Interes', desc: 'Ubica a cada persona segun su poder de decision e interes en diseno para saber donde invertir tu tiempo.' },
    { num: '02', title: 'Tipologia + Actitud', desc: 'Clasifica cada stakeholder: copiloto, fence-sitter, esceptico o desconocido. Con estrategia diferenciada para cada tipo.' },
    { num: '03', title: 'Red de Valor Informal', desc: 'La capa que ningun organigrama te da: conexiones reales, canales directos y memoria institucional invisible.' },
    { num: '04', title: 'Priorizacion por Semanas', desc: 'Con quien hablar en semana uno, dos y tres y el razonamiento detras del orden. Incluye guia de sesion.' }
  ]

  return (
    <main style={{ paddingTop: '68px' }}>
      <section style={{ background: 'linear-gradient(135deg,#faf9f7 0%,#fff8f0 100%)', borderBottom: '1px solid rgba(224,220,213,0.5)', padding: '80px 40px 72px' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', background: '#fff3e0', border: '1px solid #ffe0b2', borderRadius: '100px', padding: '6px 16px', fontSize: '13px', fontWeight: '600', color: '#E87008', marginBottom: '32px' }}>
            Descarga gratuita
          </div>
          <h1 style={{ fontFamily: 'Fraunces,serif', fontSize: 'clamp(36px,5vw,54px)', fontWeight: '700', lineHeight: '1.1', letterSpacing: '-0.03em', color: '#1a1a18', marginBottom: '24px' }}>
            Tu onboarding es, en realidad, tu primer proyecto{" "}<span style={{ color: '#E87008' }}>de research.</span>
          </h1>
          <p style={{ fontSize: '18px', lineHeight: '1.7', color: '#6b6b63', maxWidth: '580px', marginBottom: '40px' }}>
            El framework para mapear stakeholders y entender las dinamicas reales de tu nueva organizacion en las primeras dos semanas.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {['Para diseniadoras','Para PMs','Para lideres de UX'].map(t => (
              <span key={t} style={{ background: '#f0ede8', borderRadius: '100px', padding: '6px 14px', fontSize: '13px', color: '#6b6b63', fontWeight: '500' }}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 40px' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <p style={{ fontSize: '12px', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#E87008', marginBottom: '16px' }}>Que incluye</p>
          <h2 style={{ fontFamily: 'Fraunces,serif', fontSize: '32px', fontWeight: '700', letterSpacing: '-0.02em', color: '#1a1a18', marginBottom: '48px' }}>Las 4 capas del framework</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {layers.map(({ num, title, desc }) => (
              <div key={num} style={{ display: 'grid', gridTemplateColumns: '48px 1fr', gap: '20px', padding: '28px', borderRadius: '16px', background: '#faf9f7', border: '1px solid #eae7e0' }}>
                <span style={{ fontFamily: 'Fraunces,serif', fontSize: '20px', fontWeight: '700', color: '#E87008' }}>{num}</span>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1a1a18', marginBottom: '8px' }}>{title}</h3>
                  <p style={{ fontSize: '15px', lineHeight: '1.6', color: '#6b6b63' }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: '#1a1a18', padding: '80px 40px' }}>
        <div style={{ maxWidth: '480px', margin: '0 auto', textAlign: 'center' }}>
            <>
              <p style={{ fontSize: '12px', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#E87008', marginBottom: '16px' }}>Descarga gratuita</p>
              <h2 style={{ fontFamily: 'Fraunces,serif', fontSize: '32px', fontWeight: '700', color: '#fff', letterSpacing: '-0.02em', marginBottom: '12px' }}>Empieza tu siguiente onboarding diferente</h2>
              <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.55)', marginBottom: '40px', lineHeight: '1.6' }}>Deja tu nombre y email. Recibes el template al instante y mis proximos articulos cuando publique.</p>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <input type='text' placeholder='Tu nombre' required value={name} onChange={e => setName(e.target.value)} style={{ width: '100%', padding: '16px 20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.06)', color: '#fff', fontSize: '15px', outline: 'none', boxSizing: 'border-box' }} />
                <input type='email' placeholder='Tu email' required value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', padding: '16px 20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.06)', color: '#fff', fontSize: '15px', outline: 'none', boxSizing: 'border-box' }} />
                {error && <p style={{ color: '#ff6b6b', fontSize: '14px' }}>{error}</p>}
                <button type='submit' disabled={loading} style={{ width: '100%', padding: '18px', background: '#E87008', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: '700', cursor: loading ? 'wait' : 'pointer', opacity: loading ? 0.7 : 1, transition: 'opacity 0.2s', marginTop: '4px' }}>
                  {loading ? 'Procesando...' : 'Descargar template gratis →'}
                </button>
              </form>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', marginTop: '16px' }}>Sin spam. Te puedes dar de baja cuando quieras.</p>
            </>
          ) : (
            <div>
              <div style={{ fontSize: '48px', marginBottom: '24px' }}>🎉</div>
              <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.65)', marginBottom: '32px', lineHeight: '1.6' }}>Tu template esta aqui. Usalo bien.</p>
              <a href='/stakeholder_research_template.pdf' download style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#E87008', color: '#fff', padding: '18px 32px', borderRadius: '12px', fontSize: '15px', fontWeight: '700', textDecoration: 'none' }}>
                ↓ Descargar PDF
              </a>
            </div>
          )}
        </div>
      </section>

      <section style={{ padding: '48px 40px', textAlign: 'center' }}>
        <Link href='/blog' style={{ fontSize: '15px', color: '#E87008', fontWeight: '600', textDecoration: 'none' }}>
          ← Leer el articulo completo
        </Link>
      </section>
    </main>
  )
}
