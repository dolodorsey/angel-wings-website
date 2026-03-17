'use client'
import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' })

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))

    const handleMouseMove = (e: MouseEvent) => {
      const halo = document.querySelector('.hero-halo') as HTMLElement
      if (!halo) return
      const x = (e.clientX / window.innerWidth - 0.5) * 20
      const y = (e.clientY / window.innerHeight - 0.5) * 20
      halo.style.transform = `translateX(calc(-50% + ${x}px)) translateY(${y}px)`
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      observer.disconnect()
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <>
      <style jsx global>{`
        :root {
          --black: #0A0A0A;
          --deep-black: #050505;
          --crimson: #8B1A1A;
          --crimson-glow: #C62828;
          --amber: #D4A04A;
          --amber-light: #E8C06A;
          --cream: #F5F0E8;
          --chrome: #C0C0C0;
          --font-display: 'Playfair Display', Georgia, serif;
          --font-body: 'DM Sans', system-ui, sans-serif;
          --ease-expo: cubic-bezier(0.16, 1, 0.3, 1);
          --ease-smooth: cubic-bezier(0.37, 0, 0.63, 1);
          --text-hero: clamp(56px, 11vw, 160px);
          --text-section: clamp(32px, 5.5vw, 72px);
          --text-body-lg: clamp(14px, 1.3vw, 18px);
          --text-body: clamp(13px, 1.1vw, 15px);
          --text-caption: clamp(9px, 0.85vw, 11px);
        }
        * { margin:0; padding:0; box-sizing:border-box; }
        html { scroll-behavior: smooth; }
        body { background:var(--deep-black); color:var(--cream); font-family:var(--font-body); font-weight:300; overflow-x:hidden; -webkit-font-smoothing:antialiased; }
        body::after { content:''; position:fixed; inset:0; background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E"); pointer-events:none; z-index:9999; }
        .reveal { opacity:0; transform:translateY(50px); transition:opacity 0.8s var(--ease-expo), transform 0.8s var(--ease-expo); }
        .reveal.visible { opacity:1; transform:translateY(0); }
        .reveal-delay-1{transition-delay:0.1s} .reveal-delay-2{transition-delay:0.2s} .reveal-delay-3{transition-delay:0.3s} .reveal-delay-4{transition-delay:0.4s} .reveal-delay-5{transition-delay:0.5s}
        @keyframes revealUp { to{opacity:1;transform:translateY(0)} }
        @keyframes beamPulse { 0%,100%{opacity:0.6} 50%{opacity:1} }
        @keyframes haloGlow { 0%,100%{opacity:0.4;box-shadow:0 0 60px rgba(212,160,74,0.05)} 50%{opacity:1;box-shadow:0 0 120px rgba(212,160,74,0.12)} }
        @keyframes particleRise { 0%{transform:translateY(0) scale(1);opacity:0} 10%{opacity:0.6} 90%{opacity:0} 100%{transform:translateY(-400px) scale(0.3);opacity:0} }
      `}</style>

      {/* NAV */}
      <nav style={{position:'fixed',top:0,left:0,right:0,zIndex:100,padding:'24px 48px',display:'flex',justifyContent:'space-between',alignItems:'center',mixBlendMode:'difference'}}>
        <div style={{fontFamily:'var(--font-display)',fontSize:'18px',fontWeight:700,letterSpacing:'0.15em',textTransform:'uppercase',color:'var(--cream)'}}>Angel <span style={{color:'var(--amber)'}}>Wings</span></div>
        <div style={{display:'flex',gap:'32px',alignItems:'center'}}>
          {['Menu','Flavors','Catering','Rewards'].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{color:'var(--cream)',textDecoration:'none',fontSize:'11px',letterSpacing:'0.3em',textTransform:'uppercase',fontWeight:400,opacity:0.7}}>{l}</a>
          ))}
          <a href="#" style={{display:'inline-flex',alignItems:'center',padding:'10px 24px',background:'var(--amber)',color:'var(--deep-black)',fontSize:'10px',fontWeight:600,letterSpacing:'0.15em',textTransform:'uppercase',textDecoration:'none'}}>Order Now</a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{position:'relative',height:'100vh',minHeight:'700px',display:'flex',flexDirection:'column',justifyContent:'flex-end',padding:'0 48px 80px',overflow:'hidden'}}>
        <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 60% 50% at 65% 40%, rgba(212,160,74,0.12) 0%, transparent 70%), radial-gradient(ellipse 40% 60% at 30% 70%, rgba(139,26,26,0.15) 0%, transparent 60%), radial-gradient(circle at 50% 0%, rgba(212,160,74,0.06) 0%, transparent 50%), linear-gradient(180deg, var(--deep-black) 0%, #0D0808 50%, var(--deep-black) 100%)'}} />
        <div style={{position:'absolute',top:'-20%',left:'55%',width:'200px',height:'140%',background:'linear-gradient(180deg, rgba(212,160,74,0.08) 0%, rgba(212,160,74,0.03) 40%, transparent 80%)',transform:'rotate(-8deg)',filter:'blur(40px)',animation:'beamPulse 6s var(--ease-smooth) infinite'}} />
        <div className="hero-halo" style={{position:'absolute',top:'18%',left:'50%',transform:'translateX(-50%)',width:'clamp(200px, 30vw, 400px)',height:'clamp(200px, 30vw, 400px)',border:'1px solid rgba(212,160,74,0.15)',borderRadius:'50%',animation:'haloGlow 4s var(--ease-smooth) infinite'}} />
        {[20,45,65,80,35,55,75].map((l,i) => (
          <div key={i} className="particle" style={{position:'absolute',left:`${l}%`,bottom:`${20+i*5}%`,width:'2px',height:'2px',background:'rgba(212,160,74,0.3)',borderRadius:'50%',animation:`particleRise 8s linear infinite ${i*1.2}s`}} />
        ))}
        <div style={{position:'relative',zIndex:2,maxWidth:'900px'}}>
          <div style={{fontSize:'var(--text-caption)',letterSpacing:'0.5em',textTransform:'uppercase',color:'var(--amber)',marginBottom:'24px',opacity:0,transform:'translateY(30px)',animation:'revealUp 0.8s var(--ease-expo) 0.3s forwards'}}>Crisp Texture · Bold Sauce · Late-Night Obsession</div>
          <h1 style={{fontFamily:'var(--font-display)',fontSize:'var(--text-hero)',fontWeight:900,lineHeight:0.9,letterSpacing:'-0.02em',marginBottom:'32px',opacity:0,transform:'translateY(60px)',animation:'revealUp 1s var(--ease-expo) 0.5s forwards'}}>Heaven Sent.<br/><em style={{fontStyle:'italic',color:'var(--crimson-glow)'}}>Sinfully Good.</em></h1>
          <p style={{fontSize:'var(--text-body-lg)',fontWeight:300,lineHeight:1.7,maxWidth:'520px',color:'rgba(245,240,232,0.6)',marginBottom:'48px',opacity:0,transform:'translateY(40px)',animation:'revealUp 0.8s var(--ease-expo) 0.8s forwards'}}>Angel Wings turns hunger into a full experience. Crisp texture. Bold sauce. Heat that hits different. This is the late-night altar for flavor.</p>
          <div style={{display:'flex',gap:'16px',flexWrap:'wrap',opacity:0,transform:'translateY(30px)',animation:'revealUp 0.8s var(--ease-expo) 1s forwards'}}>
            <a href="#" style={{display:'inline-flex',padding:'16px 40px',background:'var(--amber)',color:'var(--deep-black)',fontSize:'12px',fontWeight:600,letterSpacing:'0.2em',textTransform:'uppercase',textDecoration:'none'}}>Order Now</a>
            <a href="#menu" style={{display:'inline-flex',padding:'16px 40px',background:'transparent',color:'var(--cream)',fontSize:'12px',letterSpacing:'0.2em',textTransform:'uppercase',textDecoration:'none',border:'1px solid rgba(245,240,232,0.2)'}}>Explore the Menu</a>
            <a href="#catering" style={{display:'inline-flex',padding:'16px 40px',background:'transparent',color:'var(--cream)',fontSize:'12px',letterSpacing:'0.2em',textTransform:'uppercase',textDecoration:'none',border:'1px solid rgba(245,240,232,0.2)'}}>Book Catering</a>
          </div>
        </div>
      </section>

      {/* DROPS */}
      <section id="menu" style={{padding:'120px 48px',position:'relative',borderTop:'1px solid rgba(212,160,74,0.1)'}}>
        <div className="reveal" style={{fontSize:'var(--text-caption)',letterSpacing:'0.5em',textTransform:'uppercase',color:'var(--amber)',marginBottom:'16px'}}>Featured Drops</div>
        <h2 className="reveal reveal-delay-1" style={{fontFamily:'var(--font-display)',fontSize:'var(--text-section)',fontWeight:700,lineHeight:1.05,marginBottom:'64px'}}>The Collection.</h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3, 1fr)',gap:'2px'}}>
          {[{name:'The Halo Box',hook:'12 wings · 2 sauces · the full ritual',bg:'#1a0a0a'},{name:'The Heat Collection',hook:'For those who worship the burn',bg:'#1a0f00'},{name:'Tenders & Testimony',hook:'Crisp. Golden. Undeniable.',bg:'#0a0a1a'},{name:'Loaded Fry Ritual',hook:'Sauce. Cheese. No restraint.',bg:'#1a1000'},{name:'Signature Sauce Vault',hook:'7 worlds. One obsession.',bg:'#0d0a0a'},{name:'Family Feast Drops',hook:'Feed the whole crew. Own the night.',bg:'#0f0808'}].map((d,i) => (
            <div key={i} className={`reveal reveal-delay-${Math.min(i+1,5)}`} style={{position:'relative',aspectRatio:'4/5',overflow:'hidden',cursor:'pointer',background:d.bg}}>
              <div style={{position:'absolute',inset:0,background:`linear-gradient(180deg, transparent 40%, rgba(10,10,10,0.9) 100%)`}} />
              <div style={{position:'absolute',bottom:0,left:0,right:0,padding:'32px'}}>
                <div style={{fontFamily:'var(--font-display)',fontSize:'22px',fontWeight:700,marginBottom:'6px'}}>{d.name}</div>
                <div style={{fontSize:'12px',color:'rgba(245,240,232,0.5)',letterSpacing:'0.1em',marginBottom:'16px'}}>{d.hook}</div>
                <div style={{fontSize:'10px',letterSpacing:'0.3em',textTransform:'uppercase',color:'var(--amber)'}}>Order →</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MANIFESTO */}
      <section style={{padding:'160px 48px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'80px',alignItems:'center'}}>
        <div className="reveal">
          <div style={{width:'60px',height:'2px',background:'var(--crimson-glow)',marginBottom:'40px'}} />
          <div style={{fontFamily:'var(--font-display)',fontSize:'clamp(40px, 6vw, 80px)',fontWeight:400,fontStyle:'italic',lineHeight:1.1}}>A late-night altar for flavor.</div>
        </div>
        <div>
          <p className="reveal reveal-delay-1" style={{fontSize:'var(--text-body-lg)',lineHeight:1.9,color:'rgba(245,240,232,0.55)',marginBottom:'24px'}}>Angel Wings is built for the people who do not crave average. It is crisp, heat, sauce, texture, and energy wrapped in a premium visual identity.</p>
          <p className="reveal reveal-delay-2" style={{fontSize:'var(--text-body-lg)',lineHeight:1.9,color:'rgba(245,240,232,0.55)',marginBottom:'24px'}}>From solo runs to group orders, game nights to after-hours linkups — Angel Wings is designed to feel bigger than a meal.</p>
          <p className="reveal reveal-delay-3" style={{color:'var(--amber)',fontStyle:'italic',fontFamily:'var(--font-display)',fontSize:'18px'}}>Wings Worth Worship.</p>
        </div>
      </section>

      {/* FLAVORS */}
      <section id="flavors" style={{padding:'120px 48px'}}>
        <div className="reveal" style={{fontSize:'var(--text-caption)',letterSpacing:'0.5em',textTransform:'uppercase',color:'var(--amber)',marginBottom:'16px'}}>Flavor Universe</div>
        <h2 className="reveal reveal-delay-1" style={{fontFamily:'var(--font-display)',fontSize:'var(--text-section)',fontWeight:700,lineHeight:1.05,marginBottom:'48px'}}>Enter the vault.</h2>
        <div className="reveal reveal-delay-2" style={{display:'flex',gap:'16px',overflowX:'auto',paddingBottom:'16px'}}>
          {[{n:'Holy Heat',h:'🔥🔥🔥🔥'},{n:'Sweet Salvation',h:'🔥'},{n:'Garlic Glory',h:'🔥🔥'},{n:'Lemon Praise',h:'🔥'},{n:'BBQ Baptism',h:'🔥🔥'},{n:'Mild Mercy',h:'—'},{n:'Inferno Revival',h:'🔥🔥🔥🔥🔥'}].map((f,i) => (
            <div key={i} style={{flexShrink:0,padding:'20px 36px',border:'1px solid rgba(212,160,74,0.15)',background:'rgba(212,160,74,0.03)',fontFamily:'var(--font-display)',fontSize:'16px',fontWeight:700,cursor:'pointer',whiteSpace:'nowrap'}}>
              {f.n} <span style={{fontSize:'10px',color:'var(--crimson-glow)',marginLeft:'12px',letterSpacing:'0.15em'}}>{f.h}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CATERING */}
      <section id="catering" style={{padding:'160px 48px',textAlign:'center',position:'relative'}}>
        <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(139,26,26,0.08) 0%, transparent 70%)'}} />
        <div className="reveal" style={{fontSize:'var(--text-caption)',letterSpacing:'0.5em',textTransform:'uppercase',color:'var(--amber)',marginBottom:'16px',position:'relative'}}>Catering & Group Orders</div>
        <h2 className="reveal reveal-delay-1" style={{fontFamily:'var(--font-display)',fontSize:'var(--text-section)',fontWeight:700,lineHeight:1.05,marginBottom:'24px',maxWidth:'700px',margin:'0 auto 24px',position:'relative'}}>Feed the whole table.</h2>
        <p className="reveal reveal-delay-2" style={{fontSize:'var(--text-body-lg)',color:'rgba(245,240,232,0.5)',maxWidth:'560px',margin:'0 auto 48px',lineHeight:1.8,position:'relative'}}>From private events to office drops and large-format nights, Angel Wings catering is built for groups that want heat, speed, and branded presentation.</p>
        <a href="#" className="reveal reveal-delay-3" style={{display:'inline-flex',padding:'16px 40px',background:'var(--amber)',color:'var(--deep-black)',fontSize:'12px',fontWeight:600,letterSpacing:'0.2em',textTransform:'uppercase',textDecoration:'none',position:'relative'}}>Start Catering Order</a>
      </section>

      {/* VIP */}
      <section id="rewards" style={{padding:'120px 48px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'80px',alignItems:'center',borderTop:'1px solid rgba(212,160,74,0.08)'}}>
        <div>
          <div className="reveal" style={{fontSize:'var(--text-caption)',letterSpacing:'0.5em',textTransform:'uppercase',color:'var(--amber)',marginBottom:'16px'}}>Rewards & VIP</div>
          <h2 className="reveal reveal-delay-1" style={{fontFamily:'var(--font-display)',fontSize:'var(--text-section)',fontWeight:700,lineHeight:1.05,marginBottom:'32px'}}>Unlock drops, deals, and first access.</h2>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px'}}>
            {[{t:'First Order Reward',d:'Welcome bonus on your inaugural box.'},{t:'VIP Flavor Drops',d:'Early access to limited sauces.'},{t:'Surprise Add-Ons',d:'Random bonus items in qualifying orders.'},{t:'Birthday Perks',d:'Free box on your day. No catch.'}].map((p,i) => (
              <div key={i} className={`reveal reveal-delay-${i+2}`} style={{padding:'24px',border:'1px solid rgba(212,160,74,0.1)',background:'rgba(212,160,74,0.02)'}}>
                <div style={{fontFamily:'var(--font-display)',fontSize:'14px',fontWeight:700,color:'var(--amber)',marginBottom:'6px'}}>{p.t}</div>
                <div style={{fontSize:'12px',color:'rgba(245,240,232,0.4)',lineHeight:1.6}}>{p.d}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="reveal reveal-delay-2" style={{display:'flex',flexDirection:'column',gap:'16px'}}>
          <input style={{padding:'16px 24px',background:'rgba(255,255,255,0.03)',border:'1px solid rgba(245,240,232,0.1)',color:'var(--cream)',fontFamily:'var(--font-body)',fontSize:'14px',outline:'none'}} placeholder="Your name" />
          <input style={{padding:'16px 24px',background:'rgba(255,255,255,0.03)',border:'1px solid rgba(245,240,232,0.1)',color:'var(--cream)',fontFamily:'var(--font-body)',fontSize:'14px',outline:'none'}} placeholder="Email address" type="email" />
          <input style={{padding:'16px 24px',background:'rgba(255,255,255,0.03)',border:'1px solid rgba(245,240,232,0.1)',color:'var(--cream)',fontFamily:'var(--font-body)',fontSize:'14px',outline:'none'}} placeholder="Phone (for SMS drops)" type="tel" />
          <a href="#" style={{display:'inline-flex',justifyContent:'center',padding:'16px 40px',background:'var(--amber)',color:'var(--deep-black)',fontSize:'12px',fontWeight:600,letterSpacing:'0.2em',textTransform:'uppercase',textDecoration:'none'}}>Join the VIP</a>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{padding:'80px 48px 40px',borderTop:'1px solid rgba(245,240,232,0.06)',display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr',gap:'48px'}}>
        <div>
          <div style={{fontFamily:'var(--font-display)',fontSize:'24px',fontWeight:700,letterSpacing:'0.1em',marginBottom:'16px'}}>Angel <span style={{color:'var(--amber)'}}>Wings</span></div>
          <p style={{fontSize:'13px',color:'rgba(245,240,232,0.3)',fontStyle:'italic'}}>Heaven Sent. Sinfully Good.<br/>A Casper Group brand.</p>
        </div>
        {[
          {title:'Order',links:['Menu','Order Now','Catering','Group Orders']},
          {title:'Discover',links:['Flavors','Locations','Rewards','About']},
          {title:'Connect',links:['Instagram','TikTok','Twitter','Franchise']}
        ].map((col,i) => (
          <div key={i}>
            <div style={{fontSize:'10px',letterSpacing:'0.4em',textTransform:'uppercase',color:'var(--amber)',marginBottom:'20px'}}>{col.title}</div>
            {col.links.map(l => <a key={l} href="#" style={{display:'block',color:'rgba(245,240,232,0.4)',textDecoration:'none',fontSize:'13px',marginBottom:'12px'}}>{l}</a>)}
          </div>
        ))}
      </footer>
      <div style={{padding:'32px 48px',display:'flex',justifyContent:'space-between',alignItems:'center',borderTop:'1px solid rgba(245,240,232,0.04)',fontSize:'11px',color:'rgba(245,240,232,0.2)'}}>
        <span>© 2026 Angel Wings. All rights reserved.</span>
        <span style={{fontSize:'10px',letterSpacing:'0.2em',textTransform:'uppercase'}}>A Casper Group Brand</span>
      </div>
    </>
  )
}
