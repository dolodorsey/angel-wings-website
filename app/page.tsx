'use client'
import { useState, useEffect, useRef } from 'react'

/* ═══════════════════════════════════════════════════════════════════════
   ANGEL WINGS — EXTRAORDINARY V2
   Casper Group sub-brand. Crimson/Amber on deep black.
   Video intro → hero BG. Late-night heat. Premium wing culture.
   ═══════════════════════════════════════════════════════════════════════ */

const C = {
  base: '#0A0A0D', dark: '#060608', surface: '#111114', surface2: '#16161A',
  crimson: '#8B1A1A', crimsonGlow: 'rgba(139,26,26,0.10)',
  amber: '#D4A04A', amberLight: '#E8C374', amberDim: 'rgba(212,160,74,0.06)',
  cream: '#F5F0E8', muted: 'rgba(245,240,232,0.4)', dim: 'rgba(245,240,232,0.1)',
  border: 'rgba(245,240,232,0.05)',
}

function useInView(t=0.1){const ref=useRef<HTMLDivElement>(null);const[v,setV]=useState(false);useEffect(()=>{const el=ref.current;if(!el)return;const o=new IntersectionObserver(([e])=>{if(e.isIntersecting){setV(true);o.unobserve(el)}},{threshold:t});o.observe(el);return()=>o.disconnect()},[t]);return[ref,v] as const}
function Rev({children,d=0,y=48}:{children:React.ReactNode;d?:number;y?:number}){const[ref,v]=useInView();return<div ref={ref} style={{transform:v?'translateY(0)':`translateY(${y}px)`,opacity:v?1:0,transition:`all 1.1s cubic-bezier(0.16,1,0.3,1) ${d}s`}}>{children}</div>}

const drops = [
  { name: 'Halo Wings', hook: '10pc tossed in our signature glaze', bg: "linear-gradient(180deg,rgba(10,10,10,0.3),rgba(10,10,10,0.8)),url('/images/wings-halo-plate.jpg') center/cover" },
  { name: 'Lemon Pepper Ritual', hook: 'ATL-style. Wet. Properly executed.', bg: "linear-gradient(180deg,rgba(10,10,10,0.3),rgba(10,10,10,0.8)),url('/images/lemon-pepper.png') center/cover" },
  { name: 'The Sauce Vault', hook: 'Six proprietary sauces. Earn your heat level.', bg: "linear-gradient(180deg,rgba(10,10,10,0.3),rgba(10,10,10,0.8)),url('/images/sauce-vault.jpg') center/cover" },
  { name: 'Wings & Waffles', hook: 'Sweet and heat. The brunch crossover.', bg: "linear-gradient(180deg,rgba(10,10,10,0.3),rgba(10,10,10,0.8)),url('/images/wings-slate.png') center/cover" },
  { name: 'Loaded Fry Box', hook: 'Fries. Cheese. Sauce. Everything on top.', bg: "linear-gradient(180deg,rgba(10,10,10,0.3),rgba(10,10,10,0.8)),url('/images/halo-box-tray.jpg') center/cover" },
  { name: 'Late Night Box', hook: 'The 2AM survival kit. Wings + fries + drink.', bg: "linear-gradient(180deg,rgba(10,10,10,0.3),rgba(10,10,10,0.8)),url('/images/branded-cup.jpg') center/cover" },
]

const flavors = [
  { name: 'Halo Glaze', heat: '●○○○○' }, { name: 'Garlic Parm', heat: '●○○○○' },
  { name: 'Lemon Pepper Wet', heat: '●●○○○' }, { name: 'Honey Chipotle', heat: '●●●○○' },
  { name: 'Mango Habanero', heat: '●●●●○' }, { name: 'Reaper\'s Kiss', heat: '●●●●●' },
  { name: 'BBQ Classic', heat: '●●○○○' }, { name: 'Buffalo OG', heat: '●●●○○' },
  { name: 'Sweet Chili', heat: '●●○○○' }, { name: 'Jerk Season', heat: '●●●●○' },
]

const perks = [
  { title: 'Free Wings', desc: 'Earn points on every order. Free wings at every tier.' },
  { title: 'Early Drops', desc: 'First access to new flavors and limited-run sauces.' },
  { title: 'Birthday Box', desc: 'Free premium box on your birthday. Every year.' },
  { title: 'VIP Events', desc: 'Invite-only tasting events and sauce vault previews.' },
]

/* ─── VIDEO INTRO → HERO BG ─── */
function VideoIntroHero() {
  const [phase, setPhase] = useState(0)
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 })

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 2000)
    const t2 = setTimeout(() => setPhase(2), 3000)
    const t3 = setTimeout(() => setPhase(3), 3600)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  return (
    <>
      {/* INTRO OVERLAY */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: phase < 3 ? 10000 : -1,
        background: C.dark, display: 'flex', alignItems: 'center', justifyContent: 'center',
        opacity: phase >= 3 ? 0 : 1, transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1)',
        pointerEvents: phase >= 3 ? 'none' : 'all'
      }}>
        <div style={{
          width: '100vw',
          height: '100vh',
          overflow: 'hidden', transition: 'all 1s cubic-bezier(0.16,1,0.3,1)', position: 'relative'
        }}>
          <video autoPlay muted loop playsInline style={{
            width: '100%', height: '100%', objectFit: 'cover',
            filter: 'brightness(0.6) contrast(1.2) saturate(0.8)'
          }}><source src="/videos/hero.mp4" type="video/mp4" /></video>
          <div style={{
            position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
            opacity: phase >= 2 ? 0 : 1, transition: 'opacity 0.5s ease'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: "'DM Sans',system-ui", fontSize: '8px', fontWeight: 600, letterSpacing: '0.6em', textTransform: 'uppercase', color: C.amber, marginBottom: '14px' }}>A Casper Group Brand</div>
              <div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 'clamp(24px,4vw,40px)', fontWeight: 900, letterSpacing: '0.06em', color: C.cream }}>Angel <span style={{ color: C.amber }}>Wings</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* HERO — video becomes BG */}
      <section
        onMouseMove={e => setMouse({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight })}
        style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center' }}
      >
        <video autoPlay muted loop playsInline style={{
          position: 'absolute', inset: '-5%', width: '110%', height: '110%', objectFit: 'cover',
          filter: 'brightness(0.2) contrast(1.2) saturate(0.5)',
          transform: `scale(1.02) translate(${(mouse.x - 0.5) * -10}px,${(mouse.y - 0.5) * -10}px)`,
          transition: 'transform 0.3s ease'
        }}><source src="/videos/hero.mp4" type="video/mp4" /></video>

        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg,${C.dark}00 0%,${C.dark}99 60%,${C.dark} 100%)` }} />
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at ${mouse.x * 100}% ${mouse.y * 100}%,${C.crimsonGlow},transparent 50%)` }} />
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04, pointerEvents: 'none', mixBlendMode: 'overlay', backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

        <div style={{ position: 'relative', zIndex: 2, padding: '160px clamp(32px,8vw,100px) 120px', maxWidth: 1300, margin: '0 auto', width: '100%' }}>
          <div style={{ opacity: phase >= 3 ? 1 : 0, transform: phase >= 3 ? 'translateY(0)' : 'translateY(60px)', transition: 'all 1.4s cubic-bezier(0.16,1,0.3,1) 0.2s' }}>
            <div style={{ fontFamily: "'DM Sans',system-ui", fontSize: '9px', fontWeight: 600, letterSpacing: '0.6em', textTransform: 'uppercase', color: C.amber, marginBottom: 28, display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{ width: 32, height: 1, background: C.amber, display: 'inline-block' }} />
              Crisp Texture · Bold Sauce · Late-Night Obsession
            </div>
            <img src="/images/logo.png" alt="Angel Wings" style={{ height: 'clamp(80px,14vw,160px)', width: 'auto', marginBottom: 28, opacity: phase >= 3 ? 1 : 0, transform: phase >= 3 ? 'translateY(0)' : 'translateY(40px)', transition: 'all 1.2s cubic-bezier(0.16,1,0.3,1) 0.3s' }} />
            <h1 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 'clamp(60px,12vw,180px)', fontWeight: 900, lineHeight: 0.88, letterSpacing: '-0.03em', color: C.cream, margin: 0 }}>
              <span style={{ display: 'block', opacity: phase >= 3 ? 1 : 0, transform: phase >= 3 ? 'translateY(0)' : 'translateY(80px)', transition: 'all 1.2s cubic-bezier(0.16,1,0.3,1) 0.4s' }}>Heaven</span>
              <span style={{ display: 'block', fontStyle: 'italic', color: C.crimson, opacity: phase >= 3 ? 1 : 0, transform: phase >= 3 ? 'translateY(0)' : 'translateY(80px)', transition: 'all 1.2s cubic-bezier(0.16,1,0.3,1) 0.55s', textShadow: `0 0 100px ${C.crimson}20` }}>Sent.</span>
            </h1>
            <div style={{ marginTop: 'clamp(28px,4vw,52px)', marginLeft: 'clamp(0px,8vw,120px)', maxWidth: 480 }}>
              <p style={{ fontFamily: "'DM Sans',system-ui", fontSize: 'clamp(14px,1.2vw,17px)', fontWeight: 300, lineHeight: 1.85, color: C.muted, marginBottom: 40 }}>Angel Wings turns hunger into a full experience. Crisp texture. Bold sauce. Heat that hits different. This is the late-night altar for flavor.</p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <button style={{ fontFamily: "'DM Sans',system-ui", fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.dark, background: C.amber, border: 'none', padding: '16px 44px', cursor: 'pointer', transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)' }} onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 12px 40px ${C.amber}40` }} onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}>Order Now</button>
                <button style={{ fontFamily: "'DM Sans',system-ui", fontSize: 10, fontWeight: 400, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.cream, background: 'transparent', border: `1px solid ${C.dim}`, padding: '16px 36px', cursor: 'pointer', transition: 'all 0.3s' }} onMouseEnter={e => { e.currentTarget.style.borderColor = C.amber; e.currentTarget.style.color = C.amber }} onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(245,240,232,0.1)'; e.currentTarget.style.color = C.cream }}>Explore Menu</button>
                <button style={{ fontFamily: "'DM Sans',system-ui", fontSize: 10, fontWeight: 400, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.cream, background: 'transparent', border: `1px solid ${C.dim}`, padding: '16px 36px', cursor: 'pointer', transition: 'all 0.3s' }} onMouseEnter={e => { e.currentTarget.style.borderColor = C.amber; e.currentTarget.style.color = C.amber }} onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(245,240,232,0.1)'; e.currentTarget.style.color = C.cream }}>Book Catering</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function Nav() {
  const [s, setS] = useState(false)
  useEffect(() => { const fn = () => setS(window.scrollY > 80); window.addEventListener('scroll', fn, { passive: true }); return () => window.removeEventListener('scroll', fn) }, [])
  return (
    <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999, padding: s ? '10px clamp(24px,6vw,80px)' : '24px clamp(24px,6vw,80px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: s ? `${C.base}f0` : 'transparent', backdropFilter: s ? 'blur(32px) saturate(1.3)' : 'none', borderBottom: s ? `1px solid ${C.border}` : 'none', transition: 'all 0.5s cubic-bezier(0.16,1,0.3,1)' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}><img src="/images/logo.png" alt="Angel Wings" style={{ height: s ? 28 : 44, width: 'auto', transition: 'height 0.4s ease' }} /></div>
      <div style={{ display: 'flex', gap: 'clamp(14px,2.5vw,36px)', alignItems: 'center' }}>
        {['Menu', 'Flavors', 'Catering', 'Rewards'].map(n => (<a key={n} href={`#${n.toLowerCase()}`} className="nav-link-hide" style={{ fontFamily: "'DM Sans',system-ui", fontSize: 9, fontWeight: 500, letterSpacing: '0.25em', textTransform: 'uppercase', color: C.muted, textDecoration: 'none', transition: 'color 0.3s' }} onMouseEnter={e => (e.target as HTMLElement).style.color = C.cream} onMouseLeave={e => (e.target as HTMLElement).style.color = 'rgba(245,240,232,0.4)'}>{n}</a>))}
        <button style={{ fontFamily: "'DM Sans',system-ui", fontSize: 9, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: C.dark, background: C.amber, border: 'none', padding: '9px 24px', cursor: 'pointer' }}>Order Now</button>
      </div>
    </nav>
  )
}

/* ─── FEATURED DROPS (MENU) ─── */
function Drops() {
  return (
    <section id="menu" style={{ background: C.base, padding: '120px clamp(32px,8vw,100px)', borderTop: `1px solid ${C.amberDim}`, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.06, pointerEvents: 'none' }}><img src="/images/wings-halo-plate.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.25) saturate(0.4)' }} /></div>
      <Rev><div style={{ fontFamily: "'DM Sans',system-ui", fontSize: 9, fontWeight: 600, letterSpacing: '0.55em', textTransform: 'uppercase', color: C.amber, marginBottom: 20 }}>Featured Drops</div>
        <h2 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 'clamp(40px,6vw,80px)', fontWeight: 700, lineHeight: 0.95, letterSpacing: '-0.02em', color: C.cream, marginBottom: 64 }}>The Collection.</h2></Rev>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2 }}>
        {drops.map((item, i) => (
          <Rev key={i} d={0.06 * i}>
            <div style={{ position: 'relative', aspectRatio: '4/5', overflow: 'hidden', cursor: 'pointer', background: '#111' }}
              onMouseEnter={e => { const bg = e.currentTarget.querySelector('.drop-bg') as HTMLElement; if (bg) bg.style.transform = 'scale(1.08)' }}
              onMouseLeave={e => { const bg = e.currentTarget.querySelector('.drop-bg') as HTMLElement; if (bg) bg.style.transform = 'scale(1)' }}>
              <div className="drop-bg" style={{ position: 'absolute', inset: 0, background: item.bg, transition: 'transform 1.2s cubic-bezier(0.16,1,0.3,1)' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,transparent 40%,rgba(10,10,10,0.9) 100%)' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 32 }}>
                <div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 22, fontWeight: 700, color: C.cream, marginBottom: 6 }}>{item.name}</div>
                <div style={{ fontFamily: "'DM Sans',system-ui", fontSize: 12, color: C.muted, letterSpacing: '0.1em', marginBottom: 16 }}>{item.hook}</div>
                <div style={{ fontFamily: "'DM Sans',system-ui", fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: C.amber, opacity: 0 }}>Order →</div>
              </div>
            </div>
          </Rev>
        ))}
      </div>
    </section>
  )
}

/* ─── MANIFESTO ─── */
function Manifesto() {
  return (
    <section style={{ padding: '160px clamp(32px,8vw,100px)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center', background: C.base, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.05, pointerEvents: 'none' }}><img src="/images/brand-pattern.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.25) saturate(0.4)' }} /></div>
      <Rev><div>
        <div style={{ width: 60, height: 2, background: C.crimson, marginBottom: 40 }} />
        <h2 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 'clamp(40px,6vw,80px)', fontWeight: 400, fontStyle: 'italic', lineHeight: 1.05, color: C.cream }}>A late-night altar for flavor.</h2>
      </div></Rev>
      <div>
        <Rev d={0.1}><p style={{ fontFamily: "'DM Sans',system-ui", fontSize: 'clamp(15px,1.4vw,18px)', fontWeight: 300, lineHeight: 1.9, color: C.muted, marginBottom: 24 }}>Angel Wings is built for the people who do not crave average. It is crisp, heat, sauce, texture, and energy wrapped in a premium visual identity.</p></Rev>
        <Rev d={0.2}><p style={{ fontFamily: "'DM Sans',system-ui", fontSize: 'clamp(15px,1.4vw,18px)', fontWeight: 300, lineHeight: 1.9, color: C.muted, marginBottom: 24 }}>From solo runs to group orders, game nights to after-hours linkups — Angel Wings is designed to feel bigger than a meal.</p></Rev>
        <Rev d={0.3}><p style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 18, fontStyle: 'italic', color: C.amber }}>Wings Worth Worship.</p></Rev>
      </div>
    </section>
  )
}

/* ─── FLAVOR VAULT ─── */
function FlavorVault() {
  const [hover, setHover] = useState<number | null>(null)
  return (
    <section id="flavors" style={{ padding: '120px clamp(32px,8vw,100px)', background: C.dark, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.06, pointerEvents: 'none' }}><img src="/images/sauce-vault.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.2) saturate(0.3)' }} /></div>
      <Rev><div style={{ fontFamily: "'DM Sans',system-ui", fontSize: 9, fontWeight: 600, letterSpacing: '0.55em', textTransform: 'uppercase', color: C.amber, marginBottom: 20 }}>Flavor Universe</div>
        <h2 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 'clamp(36px,5vw,64px)', fontWeight: 700, lineHeight: 0.95, color: C.cream, marginBottom: 52 }}>Enter the vault.</h2></Rev>
      <div style={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        {flavors.map((f, i) => (
          <Rev key={i} d={0.03 * i}>
            <div onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}
              style={{ padding: '22px 36px', border: `1px solid ${hover === i ? C.amber : C.border}`, background: hover === i ? C.amberDim : 'transparent', fontFamily: "'Playfair Display',Georgia,serif", fontSize: 16, fontWeight: 700, letterSpacing: '0.05em', color: C.cream, cursor: 'pointer', transition: 'all 0.5s cubic-bezier(0.16,1,0.3,1)', whiteSpace: 'nowrap', position: 'relative' }}>
              {f.name} <span style={{ fontSize: 10, color: C.crimson, marginLeft: 12, letterSpacing: '0.1em' }}>{f.heat}</span>
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: C.amber, transform: hover === i ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left', transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1)' }} />
            </div>
          </Rev>
        ))}
      </div>
    </section>
  )
}

/* ─── LIFESTYLE ─── */
function Lifestyle() {
  const scenes = [
    { text: 'Built for nights that run late.', bg: "url('/images/takeout-car.jpg') center/cover" },
    { text: 'Built for the group chat pull-up.', bg: "url('/images/halo-box-tray.jpg') center/cover" },
    { text: 'Built for the after-hours crowd.', bg: "url('/images/hero-wings-neon.jpg') center/cover" },
    { text: 'Studio sessions. Game nights.', bg: "url('/images/branded-cup.jpg') center/cover" },
    { text: 'Branded. Premium. Unmatched.', bg: "url('/images/brand-pattern.jpg') center/cover" },
  ]
  return (
    <section style={{ padding: '120px clamp(32px,8vw,100px)', background: C.base, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.05, pointerEvents: 'none' }}><img src="/images/hero-wings-neon.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.2) saturate(0.3)' }} /></div>
      <Rev><div style={{ fontFamily: "'DM Sans',system-ui", fontSize: 9, fontWeight: 600, letterSpacing: '0.55em', textTransform: 'uppercase', color: C.amber, marginBottom: 20 }}>The Culture</div>
        <h2 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 'clamp(36px,5vw,64px)', fontWeight: 700, lineHeight: 0.95, color: C.cream, marginBottom: 52 }}>Built for the after-hours.</h2></Rev>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2 }}>
        {scenes.map((s, i) => (
          <Rev key={i} d={0.06 * i}>
            <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '4/3', cursor: 'pointer' }}
              onMouseEnter={e => { const bg = e.currentTarget.querySelector('.life-bg') as HTMLElement; if (bg) bg.style.transform = 'scale(1.05)' }}
              onMouseLeave={e => { const bg = e.currentTarget.querySelector('.life-bg') as HTMLElement; if (bg) bg.style.transform = 'scale(1)' }}>
              <div className="life-bg" style={{ position: 'absolute', inset: 0, background: s.bg, transition: 'transform 1.2s cubic-bezier(0.16,1,0.3,1)' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,transparent 50%,rgba(10,10,10,0.7) 100%)' }} />
              <div style={{ position: 'absolute', bottom: 24, left: 24, right: 24, fontFamily: "'Playfair Display',Georgia,serif", fontSize: 15, fontStyle: 'italic', color: 'rgba(245,240,232,0.7)' }}>{s.text}</div>
            </div>
          </Rev>
        ))}
      </div>
    </section>
  )
}

/* ─── CATERING ─── */
function Catering() {
  return (
    <section id="catering" style={{ padding: '160px clamp(32px,8vw,100px)', textAlign: 'center', background: C.dark, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.06, pointerEvents: 'none' }}><img src="/images/loudini-mascot.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.2) saturate(0.3)' }} /></div>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 80% 60% at 50% 50%,${C.crimsonGlow},transparent 70%)` }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Rev><div style={{ fontFamily: "'DM Sans',system-ui", fontSize: 9, fontWeight: 600, letterSpacing: '0.55em', textTransform: 'uppercase', color: C.amber, marginBottom: 20 }}>Catering & Group Orders</div>
          <h2 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 'clamp(40px,6vw,80px)', fontWeight: 700, lineHeight: 0.95, color: C.cream, margin: '0 auto 24px', maxWidth: 700 }}>Feed the whole table.</h2>
          <p style={{ fontFamily: "'DM Sans',system-ui", fontSize: 'clamp(15px,1.4vw,18px)', fontWeight: 300, color: C.muted, maxWidth: 560, margin: '0 auto 48px', lineHeight: 1.85 }}>From private events to office drops and large-format nights, Angel Wings catering is built for groups that want heat, speed, and branded presentation that feels elevated.</p>
          <button style={{ fontFamily: "'DM Sans',system-ui", fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.dark, background: C.amber, border: 'none', padding: '16px 48px', cursor: 'pointer', transition: 'all 0.4s' }} onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 12px 40px ${C.amber}40` }} onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}>Start Catering Order</button></Rev>
      </div>
    </section>
  )
}

/* ─── VIP / REWARDS ─── */
function VIP() {
  return (
    <section id="rewards" style={{ padding: '120px clamp(32px,8vw,100px)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center', background: C.base, borderTop: `1px solid ${C.border}`, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.05, pointerEvents: 'none' }}><img src="/images/sauce-pour.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.2) saturate(0.3)' }} /></div>
      <div>
        <Rev><div style={{ fontFamily: "'DM Sans',system-ui", fontSize: 9, fontWeight: 600, letterSpacing: '0.55em', textTransform: 'uppercase', color: C.amber, marginBottom: 20 }}>Rewards & VIP</div>
          <h2 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 'clamp(36px,5vw,64px)', fontWeight: 700, lineHeight: 0.95, color: C.cream, marginBottom: 36 }}>Unlock drops, deals, and first access.</h2></Rev>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
          {perks.map((p, i) => (<Rev key={i} d={0.06 * i}><div style={{ padding: 24, border: `1px solid ${C.border}`, background: C.amberDim }}>
            <div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 14, fontWeight: 700, color: C.amber, marginBottom: 6 }}>{p.title}</div>
            <div style={{ fontFamily: "'DM Sans',system-ui", fontSize: 12, fontWeight: 300, color: C.muted, lineHeight: 1.6 }}>{p.desc}</div>
          </div></Rev>))}
        </div>
      </div>
      <Rev d={0.1}><div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {['Your name', 'Email address', 'Phone (for SMS drops)'].map(ph => (
          <input key={ph} type="text" placeholder={ph} style={{ padding: '18px 24px', background: 'rgba(255,255,255,0.03)', border: `1px solid ${C.border}`, color: C.cream, fontFamily: "'DM Sans',system-ui", fontSize: 14, outline: 'none', transition: 'border-color 0.3s' }} onFocus={e => e.currentTarget.style.borderColor = C.amber} onBlur={e => e.currentTarget.style.borderColor = 'rgba(245,240,232,0.05)'} />
        ))}
        <button style={{ fontFamily: "'DM Sans',system-ui", fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.dark, background: C.amber, border: 'none', padding: '18px 44px', cursor: 'pointer', textAlign: 'center' }}>Join the VIP</button>
      </div></Rev>
    </section>
  )
}

/* ─── FOOTER ─── */
function Footer() {
  return (
    <>
      <footer style={{ background: C.dark, padding: '80px clamp(32px,8vw,100px) 40px', borderTop: `1px solid ${C.border}`, display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48 }}>
        <div>
          <div><img src="/images/logo.png" alt="Angel Wings" style={{ height: 44, width: 'auto', marginBottom: 16 }} />
          <p style={{ fontFamily: "'DM Sans',system-ui", fontSize: 13, fontWeight: 300, color: C.muted, fontStyle: 'italic', lineHeight: 1.6 }}>Heaven Sent. Sinfully Good.<br />A Casper Group brand.</p>
        </div>
        {[{ h: 'Order', l: ['Menu', 'Order Now', 'Catering', 'Group Orders'] }, { h: 'Discover', l: ['Flavors', 'Locations', 'Rewards', 'About'] }, { h: 'Connect', l: ['Instagram', 'TikTok', 'Twitter', 'Franchise'] }].map(col => (
          <div key={col.h}>
            <div style={{ fontFamily: "'DM Sans',system-ui", fontSize: 8, fontWeight: 700, letterSpacing: '0.45em', textTransform: 'uppercase', color: C.amber, marginBottom: 20 }}>{col.h}</div>
            {col.l.map(item => (<a key={item} href="#" style={{ display: 'block', color: C.muted, textDecoration: 'none', fontFamily: "'DM Sans',system-ui", fontSize: 13, fontWeight: 300, marginBottom: 12, transition: 'color 0.3s' }} onMouseEnter={e => (e.target as HTMLElement).style.color = C.cream} onMouseLeave={e => (e.target as HTMLElement).style.color = 'rgba(245,240,232,0.4)'}>{item}</a>))}
          </div>
        ))}
      </footer>
      <div style={{ background: C.dark, padding: '32px clamp(32px,8vw,100px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid ${C.border}`, fontFamily: "'DM Sans',system-ui", fontSize: 10, fontWeight: 300, color: 'rgba(245,240,232,0.15)' }}>
        <span>© 2026 Angel Wings. All rights reserved.</span>
        <span style={{ letterSpacing: '0.2em', textTransform: 'uppercase' }}>A Casper Group Brand</span>
      </div>
    </>
  )
}

export default function AngelWingsV2() {
  return (
    <div style={{ background: C.base, overflowX: 'hidden' }}>
      <style>{`@media(max-width:768px){.nav-link-hide{display:none}}`}</style>
      <Nav />
      <VideoIntroHero />
      <Drops />
      <Manifesto />
      <FlavorVault />
      <Lifestyle />
      <Catering />
      <VIP />
      <Footer />
    </div>
  )
}
