import { useState, useEffect, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

// ──────────────────────────────────────────────────
// CONSTANTS
// ──────────────────────────────────────────────────
const WA_BASE = 'https://wa.me/5531987577892'
const WA_SESSION = `${WA_BASE}?text=Ol%C3%A1%20Arthur%2C%20gostaria%20de%20agendar%20uma%20sess%C3%A3o%20de%20psicoterapia.`
const WA_SUPERVISAO = `${WA_BASE}?text=Ol%C3%A1%20Arthur%2C%20gostaria%20de%20saber%20mais%20sobre%20supervis%C3%A3o%20cl%C3%ADnica.`
const WA_GERAL = `${WA_BASE}?text=Ol%C3%A1%20Arthur%2C%20quero%20saber%20mais%20sobre%20seus%20servi%C3%A7os.`

// ──────────────────────────────────────────────────
// REUSABLE FADE-IN WRAPPER
// ──────────────────────────────────────────────────
function FadeIn({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ──────────────────────────────────────────────────
// LOADING SCREEN
// ──────────────────────────────────────────────────
function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-[999] flex items-center justify-center"
      style={{ background: 'var(--bg)' }}
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.6, delay: 1.2 }}
    >
      <motion.span
        style={{ fontFamily: 'Fraunces', color: 'var(--teal)', fontSize: '3rem' }}
        animate={{ opacity: [0.4, 1, 0.4], scale: [0.96, 1, 0.96] }}
        transition={{ duration: 1.2, repeat: 2 }}
      >
        AB
      </motion.span>
    </motion.div>
  )
}

// ──────────────────────────────────────────────────
// NAVBAR
// ──────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = ['Sobre', 'Psicoterapia', 'Supervisão', 'Projetos', 'Contato']
  const anchors = ['#sobre', '#psicoterapia', '#supervisao', '#projetos', '#contato']

  return (
    <>
      <nav
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: scrolled ? '12px 20px' : '18px 20px',
          background: 'rgba(10,10,15,0.8)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(46,158,143,0.1)',
          transition: 'padding 0.3s',
        }}
      >
        <a href="#hero" style={{ fontFamily: 'Fraunces', fontSize: '1.25rem', fontWeight: 500, letterSpacing: '-0.02em' }}>
          Arthur <span style={{ color: 'var(--teal)' }}>Bernardes</span>
        </a>

        {/* Desktop links */}
        <ul style={{ gap: 32, listStyle: 'none' }} className="hidden md:flex">
          {links.map((l, i) => (
            <li key={l}>
              <a href={anchors[i]} style={{ fontSize: '0.875rem', color: 'var(--text-sec)', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = 'var(--text)'}
                onMouseLeave={e => e.target.style.color = 'var(--text-sec)'}
              >{l}</a>
            </li>
          ))}
        </ul>

        {/* Desktop CTAs */}
        <div style={{ gap: 12 }} className="hidden md:flex">
          <a href={WA_SESSION} target="_blank" rel="noreferrer"
            style={{ padding: '9px 20px', background: 'var(--teal)', color: '#fff', borderRadius: 6, fontSize: '0.875rem', fontWeight: 500, border: '1.5px solid var(--teal)', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#37b8a7'; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--teal)'; e.currentTarget.style.transform = 'none' }}
          >Agendar Sessão</a>
          <a href="#contato"
            style={{ padding: '9px 20px', background: 'transparent', color: 'var(--teal)', borderRadius: 6, fontSize: '0.875rem', fontWeight: 500, border: '1.5px solid var(--teal)', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--teal-dim)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'none' }}
          >Parcerias</a>
        </div>

        {/* Hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden flex flex-col gap-1.5 cursor-pointer p-1">
          <span style={{ width: 22, height: 1.5, background: 'var(--text)', display: 'block', transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translateY(5px)' : 'none' }}></span>
          <span style={{ width: 22, height: 1.5, background: 'var(--text)', display: 'block', opacity: menuOpen ? 0 : 1 }}></span>
          <span style={{ width: 22, height: 1.5, background: 'var(--text)', display: 'block', transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translateY(-5px)' : 'none' }}></span>
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{
              position: 'fixed', top: 61, left: 0, right: 0, zIndex: 99,
              background: 'rgba(10,10,15,0.97)', backdropFilter: 'blur(20px)',
              padding: '24px 32px 32px',
              borderBottom: '1px solid var(--border)',
              display: 'flex', flexDirection: 'column', gap: 16,
            }}
          >
            {links.map((l, i) => (
              <a key={l} href={anchors[i]} onClick={() => setMenuOpen(false)}
                style={{ fontSize: '1.1rem', color: 'var(--text-sec)', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                {l}
              </a>
            ))}
            <a href={WA_SESSION} target="_blank" rel="noreferrer" style={{ padding: '12px', background: 'var(--teal)', color: '#fff', borderRadius: 8, textAlign: 'center', fontWeight: 500, marginTop: 8 }}>Agendar Sessão</a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// ──────────────────────────────────────────────────
// HERO
// ──────────────────────────────────────────────────
function Hero() {
  return (
    <section id="hero" className="hero-section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', position: 'relative', overflow: 'hidden', padding: '100px 24px 60px' }}>
      {/* Mesh gradient */}
      <motion.div
        style={{
          position: 'absolute', inset: 0, zIndex: 0,
          background: 'radial-gradient(ellipse 70% 60% at 20% 50%, rgba(46,158,143,0.18) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 80% 30%, rgba(196,154,60,0.12) 0%, transparent 60%), radial-gradient(ellipse 40% 50% at 60% 80%, rgba(46,158,143,0.08) 0%, transparent 60%)',
        }}
        animate={{ scale: [1, 1.05, 1], opacity: [1, 0.9, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Profile image – right side, behind content */}
      <motion.img
        src="/assets/profile2.png"
        alt=""
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.18 }}
        transition={{ delay: 0.4, duration: 1.2 }}
        style={{
          position: 'absolute',
          right: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          height: '85%',
          maxHeight: 700,
          objectFit: 'contain',
          zIndex: 0,
          pointerEvents: 'none',
          maskImage: 'linear-gradient(to left, rgba(0,0,0,1) 30%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1) 30%, transparent 100%)',
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 800 }}>
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', border: '1px solid var(--border)', borderRadius: 100, marginBottom: 28, fontSize: '0.8rem', color: 'var(--teal)', background: 'rgba(46,158,143,0.08)', letterSpacing: '0.08em', textTransform: 'uppercase' }}
        >
          <motion.span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--teal)', display: 'inline-block' }}
            animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 2, repeat: Infinity }} />
          CRP-04/83130 · Belo Horizonte, MG
        </motion.div>

        {/* Title */}
        <h1 style={{ fontFamily: 'Fraunces', fontSize: 'clamp(3rem, 7vw, 6rem)', fontWeight: 400, lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: 28 }}>
          {['Psicólogo', 'Clínico.'].map((word, i) => (
            <motion.span key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.12, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'inline-block', marginRight: '0.25em', color: i === 1 ? 'var(--teal)' : 'var(--text)', fontStyle: i === 1 ? 'italic' : 'normal' }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
          style={{ fontSize: 'clamp(1rem, 2vw, 1.15rem)', color: 'var(--text-sec)', lineHeight: 1.7, maxWidth: 560, margin: '0 auto 12px' }}>
          Atendimento clínico e supervisão individual com base na Psicologia Analítica de C.G. Jung.
          Gestão com ensino, tecnologia e cuidado humano integrados.
        </motion.p>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}
          style={{ fontSize: '0.8rem', color: 'var(--text-sec)', letterSpacing: '0.08em', marginBottom: 40 }}>
          CRP-04/83130
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}
          style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <HeroBtn href={WA_SESSION} primary>
            <WhatsAppIcon /> Agende sua Sessão
          </HeroBtn>
          <HeroBtn href="#contato" gold>
            <EmailIcon /> Parcerias Institucionais
          </HeroBtn>
        </motion.div>
      </div>

      {/* Scroll indicator - hidden on mobile */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
        className="hidden md:block"
        style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
        <p style={{ fontSize: '0.7rem', color: 'var(--text-sec)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>scroll</p>
        <motion.div style={{ width: 1, height: 50, background: 'linear-gradient(to bottom, var(--teal), transparent)', margin: '0 auto' }}
          animate={{ scaleY: [0, 1, 0], originY: [0, 0, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </section>
  )
}

function HeroBtn({ href, children, primary, gold }) {
  const style = {
    padding: '14px 32px', borderRadius: 8, fontSize: '1rem', fontWeight: 500,
    display: 'inline-flex', alignItems: 'center', gap: 10, transition: 'all 0.25s', cursor: 'pointer',
    background: primary ? 'var(--teal)' : 'transparent',
    color: primary ? '#fff' : gold ? 'var(--gold)' : 'var(--text)',
    border: primary ? 'none' : gold ? '1.5px solid rgba(196,154,60,0.5)' : '1.5px solid var(--border)',
  }
  return (
    <motion.a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
      style={style}
      whileHover={{ y: -2, boxShadow: primary ? '0 12px 32px rgba(46,158,143,0.35)' : gold ? '0 8px 24px rgba(196,154,60,0.2)' : 'none' }}
    >
      {children}
    </motion.a>
  )
}

// ──────────────────────────────────────────────────
// SOBRE
// ──────────────────────────────────────────────────
function Sobre() {
  const skills = ['Psicologia Analítica', 'Supervisão Clínica', 'Tecnologia Aplicada à Saúde', 'Divulgação Científica', 'Gestão de Projetos', 'Formação em Psicologia']
  return (
    <section id="sobre" style={{ padding: '100px 24px', background: 'var(--bg)', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: 1160, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 80, alignItems: 'start' }}>
        <div>
          <FadeIn><p style={{ fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: 16, fontWeight: 500 }}>Sobre mim</p></FadeIn>
          <FadeIn delay={0.1}>
            <h2 style={{ fontFamily: 'Fraunces', fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 32 }}>
              Da psique à inovação —<br /><em>uma trajetória integrada.</em>
            </h2>
          </FadeIn>
          <div style={{ width: 60, height: 1, background: 'var(--teal)', marginBottom: 32 }} />
          {[
            'Psicólogo clínico graduado pela PUC Minas (2020–2024) com sólida fundamentação em Psicologia Analítica (Junguiana). Com mais de 5 anos de experiência em coordenação de grupos de estudo, supervisões, treinamentos práticos, cursos e eventos.',
            'Como cofundador da Associação Allos e idealizador da Academia Junguiana, desenvolve comunidades de aprendizado contínuo e projetos sociais/institucionais. Sua experiência abrange desde a formação livre de profissionais da psicologia até a gestão de talentos e parcerias em redes públicas e privadas, visando transformar o ensino e a prática em saúde mental.',
            'Membro da Exyo (Venture focada em inovação na saúde) e pós-graduando no MBA em Inteligência Artificial, Gestão e Negócios (Gran Faculdade, 2025–2026). Integra o conhecimento da psicologia ao potencial da tecnologia para criar soluções éticas e escaláveis, otimizando processos de gestão e desenvolvendo novas ferramentas tecnológicas para a formação e atuação de profissionais da saúde.',
          ].map((p, i) => (
            <FadeIn key={i} delay={0.1 + i * 0.1}>
              <p style={{ color: 'var(--text-sec)', lineHeight: 1.85, marginBottom: 20, fontSize: '1rem' }}>{p}</p>
            </FadeIn>
          ))}
          <FadeIn delay={0.4}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, margin: '32px 0' }}>
              {skills.map(s => (
                <motion.span key={s}
                  style={{ padding: '6px 14px', border: '1px solid var(--border)', borderRadius: 100, fontSize: '0.8rem', color: 'var(--text-sec)', background: 'var(--surface)', cursor: 'default' }}
                  whileHover={{ borderColor: 'var(--teal)', color: 'var(--teal)', background: 'var(--teal-dim)' }}
                >{s}</motion.span>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={0.5}>
            <p style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--teal)', marginBottom: 20 }}>Formação Acadêmica</p>
            {[
              { year: '2020 – 2024', title: 'Bacharelado em Psicologia', inst: 'PUC Minas' },
              { year: '2025 – 2026', title: 'MBA em IA, Gestão e Negócios', inst: 'Gran Faculdade · Em andamento' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 20, marginBottom: 24, paddingLeft: 16, position: 'relative' }}>
                <div style={{ position: 'absolute', left: 0, top: 7, width: 6, height: 6, borderRadius: '50%', background: 'var(--teal)' }} />
                {i === 0 && <div style={{ position: 'absolute', left: 2.5, top: 16, width: 1, height: '100%', background: 'var(--border)' }} />}
                <span style={{ fontSize: '0.78rem', color: 'var(--teal)', whiteSpace: 'nowrap', fontWeight: 500, minWidth: 90, marginTop: 2 }}>{item.year}</span>
                <div>
                  <strong style={{ fontSize: '0.95rem', fontWeight: 500, display: 'block', marginBottom: 2 }}>{item.title}</strong>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-sec)' }}>{item.inst}</span>
                </div>
              </div>
            ))}
          </FadeIn>
        </div>
        <FadeIn delay={0.2}>
          {/* Profile image area */}
          <div style={{
            aspectRatio: '3/4', borderRadius: 16, overflow: 'hidden',
            background: 'var(--surface)', border: '1px solid var(--border)',
            position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 12,
          }}>
            <img src="/assets/profile.jpg" alt="Arthur Bernardes" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'relative', zIndex: 1 }} />
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

// ──────────────────────────────────────────────────
// PROJETOS
// ──────────────────────────────────────────────────
const PROJECTS = [
  {
    badge: 'Desde 2023', badgeStyle: 'teal',
    logoImg: '/assets/icon-allos.png', logoStyle: 'teal', cardStyle: 'teal',
    name: 'Associação Allos', role: 'Cofundador · Diretor de Tecnologia',
    desc: 'Clínica-escola sem fins lucrativos focada em transformar talentos em legado. Atendimentos acessíveis, formação de excelência e projetos sociais em psicologia.',
    link: 'https://allos.org.br', linkText: 'allos.org.br',
  },
  {
    badge: 'Desde 2025', badgeStyle: 'gold',
    logoImg: '/assets/icon-academia.png', logoStyle: 'gold', cardStyle: 'gold',
    name: 'Academia Junguiana', role: 'Diretor Fundador',
    desc: 'Plataforma de ensino e divulgação científica da Psicologia Analítica. Cursos, grupos de estudo e conteúdo crítico sobre C.G. Jung.',
    link: 'https://academiajunguiana.com/', linkText: 'academiajunguiana.com',
  },
  {
    badge: 'Desde 2025', badgeStyle: 'cyan',
    logoImg: '/assets/icon-exyo.png', logoStyle: 'cyan', cardStyle: 'cyan',
    name: 'Exyo', role: 'Gestão de Projetos em IA e Psicologia',
    desc: 'Venture de tecnologia em saúde. Aplicação de Inteligência Artificial na formação e atuação de profissionais da saúde mental.',
    link: 'https://www.exyo.com.br/', linkText: 'exyo.com.br',
  },
]

const colors = {
  teal: { badge: 'rgba(46,158,143,0.12)', badgeText: '#2E9E8F', badgeBorder: 'rgba(46,158,143,0.3)', glow: 'rgba(46,158,143,0.2)', border: '#2E9E8F', link: '#2E9E8F' },
  gold: { badge: 'rgba(196,154,60,0.12)', badgeText: '#C49A3C', badgeBorder: 'rgba(196,154,60,0.3)', glow: 'rgba(196,154,60,0.2)', border: '#C49A3C', link: '#C49A3C' },
  cyan: { badge: 'rgba(78,205,196,0.1)', badgeText: '#4ECDC4', badgeBorder: 'rgba(78,205,196,0.3)', glow: 'rgba(78,205,196,0.2)', border: '#4ECDC4', link: '#4ECDC4' },
}

function Projetos() {
  return (
    <section id="projetos" style={{ padding: '100px 24px', background: 'linear-gradient(to bottom, var(--bg), var(--surface) 50%, var(--bg))', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: 1160, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <FadeIn><p style={{ fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: 16, fontWeight: 500 }}>Iniciativas</p></FadeIn>
          <FadeIn delay={0.1}><h2 style={{ fontFamily: 'Fraunces', fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 16 }}>Projetos &amp; Iniciativas</h2></FadeIn>
          <FadeIn delay={0.2}><p style={{ fontSize: '1.05rem', color: 'var(--text-sec)' }}>Onde clínica, formação e tecnologia se encontram.</p></FadeIn>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          {PROJECTS.map((p, i) => {
            const c = colors[p.cardStyle]
            return (
              <FadeIn key={p.name} delay={i * 0.12}>
                <motion.div
                  style={{ background: 'var(--surface)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: 32, position: 'relative', overflow: 'hidden', cursor: 'default', height: '100%' }}
                  whileHover={{ y: -6, boxShadow: `0 0 0 1.5px ${c.border}, 0 20px 60px ${c.glow}` }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: 100, fontSize: '0.72rem', fontWeight: 500, marginBottom: 20, background: c.badge, color: c.badgeText, border: `1px solid ${c.badgeBorder}` }}>{p.badge}</span>
                  <div style={{ width: 56, height: 56, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, background: c.badge, border: `1px solid ${c.badgeBorder}`, overflow: 'hidden' }}>
                    {p.logoImg ? <img src={p.logoImg} alt={p.name} style={{ width: 36, height: 36, objectFit: 'contain' }} /> : <span style={{ fontFamily: 'Fraunces', fontSize: '1.4rem', color: c.badgeText }}>{p.logo}</span>}
                  </div>
                  <h3 style={{ fontFamily: 'Fraunces', fontSize: '1.4rem', fontWeight: 400, marginBottom: 4 }}>{p.name}</h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-sec)', marginBottom: 16 }}>{p.role}</p>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-sec)', lineHeight: 1.7, marginBottom: 24 }}>{p.desc}</p>
                  <motion.a href={p.link} target={p.link.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.82rem', fontWeight: 500, color: c.link }}
                    whileHover={{ gap: '10px' }}
                  >
                    {p.linkText} <ArrowIcon />
                  </motion.a>
                </motion.div>
              </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ──────────────────────────────────────────────────
// PSICOTERAPIA
// ──────────────────────────────────────────────────
function Psicoterapia() {
  return (
    <section id="psicoterapia" style={{ padding: '100px 24px', background: 'var(--bg)', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <FadeIn><p style={{ fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: 16, fontWeight: 500 }}>Para pacientes</p></FadeIn>
        <FadeIn delay={0.1}><h2 style={{ fontFamily: 'Fraunces', fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 24 }}>Psicoterapia<br /><em>Junguiana</em></h2></FadeIn>
        <div style={{ width: 60, height: 1, background: 'var(--teal)', marginBottom: 24 }} />
        <FadeIn delay={0.2}><p style={{ color: 'var(--text-sec)', lineHeight: 1.8, marginBottom: 40, fontSize: '1rem' }}>
          Arthur Bernardes oferece serviço de terapia individual, utilizando a abordagem junguiana. Com experiência prática em grupos de estudos e simulações de caso durante a faculdade na Liga Acadêmica, com participação e construção do ensino prático na Associação Allos e aprofundamento teórico da Academia Junguiana, e de inúmeras participações de eventos e congressos - como os Caminhos Junguianos, a psicoterapia integra aprofundamento teórico, prática, e desenvolvimento das competências clínicas, para fornecer o melhor serviço para o paciente.
        </p></FadeIn>
        <FadeIn delay={0.3}>
          <motion.a href={WA_SESSION} target="_blank" rel="noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '14px 32px', background: 'var(--teal)', color: '#fff', borderRadius: 8, fontSize: '1rem', fontWeight: 500 }}
            whileHover={{ y: -2, boxShadow: '0 12px 32px rgba(46,158,143,0.35)' }}
          >
            <WhatsAppIcon /> Agende sua Sessão
          </motion.a>
        </FadeIn>
      </div>
    </section>
  )
}

// ──────────────────────────────────────────────────
// SUPERVISÃO
// ──────────────────────────────────────────────────
const supervisaoItems = [
  'Supervisão individual online',
  'Grupos de supervisão e intervisão',
  'Foco em Psicologia Analítica (Jung)',
  'Para psicólogos em formação e pós-graduandos',
]

function Supervisao() {
  return (
    <section id="supervisao" style={{ padding: '100px 24px', background: 'var(--bg)', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <FadeIn><p style={{ fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: 16, fontWeight: 500 }}>Para psicólogos</p></FadeIn>
        <FadeIn delay={0.1}><h2 style={{ fontFamily: 'Fraunces', fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 24 }}>Supervisão<br /><em>Clínica</em></h2></FadeIn>
        <div style={{ width: 60, height: 1, background: 'var(--teal)', marginBottom: 24 }} />
        <FadeIn delay={0.2}><p style={{ color: 'var(--text-sec)', lineHeight: 1.8, marginBottom: 32, fontSize: '1rem' }}>
          Arthur Bernardes oferece supervisão clínica individual e em grupo, com foco em casos atendidos sob perspectiva junguiana. Com experiência consolidada na Associação Allos e na Academia Junguiana, a supervisão integra aprofundamento teórico, análise de caso e desenvolvimento da identidade clínica do terapeuta.
        </p></FadeIn>
        <FadeIn delay={0.3}>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 36 }}>
            {supervisaoItems.map((item, i) => (
              <motion.li key={i}
                style={{ display: 'flex', alignItems: 'flex-start', gap: 16, padding: '16px 20px', borderRadius: 10, background: 'var(--surface)', border: '1px solid var(--border)', fontSize: '0.95rem', cursor: 'default' }}
                whileHover={{ borderColor: 'var(--teal)', background: 'var(--teal-dim)' }}
              >
                <span style={{ color: 'var(--teal)' }}>✦</span> {item}
              </motion.li>
            ))}
          </ul>
        </FadeIn>
        <FadeIn delay={0.4}>
          <motion.a href={WA_SUPERVISAO} target="_blank" rel="noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', background: 'var(--teal)', color: '#fff', borderRadius: 8, fontWeight: 500, fontSize: '0.95rem' }}
            whileHover={{ y: -2, boxShadow: '0 12px 32px rgba(46,158,143,0.35)' }}
          >
            <WhatsAppIcon /> Solicitar Supervisão
          </motion.a>
        </FadeIn>
      </div>
    </section>
  )
}

// ──────────────────────────────────────────────────
// CONTATO
// ──────────────────────────────────────────────────
function Contato() {
  const contacts = [
    { icon: <WhatsAppIcon size={22} color="var(--teal)" />, label: 'WhatsApp', value: '(31) 98757-7892', href: WA_GERAL },
    { icon: <EmailIcon />, label: 'Email', value: 'arthurbpinho@hotmail.com', href: 'mailto:arthurbpinho@hotmail.com' },
    { icon: <LinkedInIcon size={22} color="var(--teal)" />, label: 'LinkedIn', value: 'arthurbernardespsi', href: 'https://linkedin.com/in/arthurbernardespsi' },
    { icon: <InstagramIcon size={22} color="var(--teal)" />, label: 'Instagram', value: '@arthurbernardespsi', href: 'https://instagram.com/arthurbernardespsi' },
  ]
  return (
    <section id="contato" style={{ padding: '100px 24px', background: 'var(--bg)', position: 'relative', overflow: 'hidden', zIndex: 1 }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(46,158,143,0.12) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 10% 80%, rgba(196,154,60,0.08) 0%, transparent 50%)' }} />
      <div style={{ maxWidth: 1160, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <FadeIn><p style={{ fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: 16, fontWeight: 500 }}>Entre em contato</p></FadeIn>
        <FadeIn delay={0.1}><h2 style={{ fontFamily: 'Fraunces', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 400, letterSpacing: '-0.03em', marginBottom: 16 }}>Vamos<br /><em>conversar?</em></h2></FadeIn>
        <FadeIn delay={0.2}><p style={{ fontSize: '1.05rem', color: 'var(--text-sec)', maxWidth: 480, margin: '0 auto 48px' }}>Para sessões de psicoterapia, supervisão, mentoria ou parcerias institucionais.</p></FadeIn>
        <FadeIn delay={0.3}>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 64 }}>
            <motion.a href={WA_SESSION} target="_blank" rel="noreferrer"
              style={{ padding: '15px 36px', background: 'var(--teal)', color: '#fff', borderRadius: 8, fontSize: '1rem', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: 10 }}
              whileHover={{ y: -2, boxShadow: '0 12px 32px rgba(46,158,143,0.35)' }}
            ><WhatsAppIcon /> Agendar Sessão (Pacientes)</motion.a>
            <motion.a href="mailto:arthurbpinho@hotmail.com"
              style={{ padding: '15px 36px', background: 'transparent', border: '1.5px solid var(--border)', color: 'var(--text)', borderRadius: 8, fontSize: '1rem', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: 10 }}
              whileHover={{ y: -2, borderColor: 'var(--text)' }}
            ><EmailIcon /> Entrar em Contato (Parcerias)</motion.a>
          </div>
        </FadeIn>
        <FadeIn delay={0.4}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16, maxWidth: 800, margin: '0 auto' }}>
            {contacts.map(c => (
              <motion.a key={c.label} href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, textAlign: 'center' }}
                whileHover={{ y: -3, borderColor: 'var(--teal)' }}
              >
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{c.icon}</span>
                <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-sec)' }}>{c.label}</span>
                <span style={{ fontSize: '0.82rem', color: 'var(--text)' }}>{c.value}</span>
              </motion.a>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

// ──────────────────────────────────────────────────
// FOOTER
// ──────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: '#06060A', borderTop: '1px solid rgba(255,255,255,0.05)', padding: '40px 24px', textAlign: 'center' }}>
      <p style={{ fontFamily: 'Fraunces', fontSize: '1.1rem', marginBottom: 8 }}>Arthur Bernardes · Psicólogo Clínico · CRP-04/83130</p>
      <div style={{ display: 'flex', gap: 24, justifyContent: 'center', margin: '16px 0', flexWrap: 'wrap' }}>
        {[
          { label: 'Associação Allos', href: 'https://allos.org.br' },
          { label: 'Academia Junguiana', href: 'https://academiajunguiana.com/' },
          { label: 'Exyo', href: 'https://www.exyo.com.br/' },
          { label: 'LinkedIn', href: 'https://linkedin.com/in/arthurbernardespsi' },
          { label: 'Instagram', href: 'https://instagram.com/arthurbernardespsi' },
        ].map(l => (
          <a key={l.label} href={l.href} target={l.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
            style={{ fontSize: '0.85rem', color: 'var(--text-sec)', transition: 'color 0.2s' }}
            onMouseEnter={e => e.target.style.color = 'var(--teal)'}
            onMouseLeave={e => e.target.style.color = 'var(--text-sec)'}
          >{l.label}</a>
        ))}
      </div>
      <p style={{ fontSize: '0.78rem', color: '#4A4845' }}>© 2026 Arthur Bernardes. Todos os direitos reservados.</p>
    </footer>
  )
}

// ──────────────────────────────────────────────────
// WHATSAPP FLOAT
// ──────────────────────────────────────────────────
function WhatsAppFloat() {
  return (
    <motion.a href={WA_GERAL} target="_blank" rel="noreferrer"
      style={{ position: 'fixed', bottom: 28, right: 28, zIndex: 200, width: 56, height: 56, borderRadius: '50%', background: 'var(--teal)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 32px rgba(46,158,143,0.4)' }}
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      whileHover={{ scale: 1.1, boxShadow: '0 12px 40px rgba(46,158,143,0.5)' }}
    >
      <WhatsAppIcon size={28} color="#fff" />
    </motion.a>
  )
}

// ──────────────────────────────────────────────────
// ICONS
// ──────────────────────────────────────────────────
function WhatsAppIcon({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  )
}

function EmailIcon() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path d="M21 8v8a5 5 0 01-5 5H8a5 5 0 01-5-5V8a5 5 0 015-5h8a5 5 0 015 5z"/>
      <path d="M3 8l9 6 9-6"/>
    </svg>
  )
}

function LinkedInIcon({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}

function InstagramIcon({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M7 17L17 7M17 7H7M17 7v10"/>
    </svg>
  )
}

// ──────────────────────────────────────────────────
// APP ROOT
// ──────────────────────────────────────────────────
export default function App() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 1400)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      <AnimatePresence>{!loaded && <LoadingScreen />}</AnimatePresence>
      <Navbar />
      <main>
        <Hero />
        <Sobre />
        <Psicoterapia />
        <Supervisao />
        <Projetos />
        <Contato />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
