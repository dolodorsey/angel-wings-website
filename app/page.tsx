'use client'

import { useEffect, useMemo, useState } from 'react'
import type { FormEvent, ReactNode } from 'react'

const API_URL = 'https://qhgmukwoennurwuvmbhy.supabase.co/functions/v1/angel-wings-intake'

const flavors = [
  'Halo Glaze',
  'Garlic Parm',
  'Lemon Pepper Wet',
  'Honey Chipotle',
  'Mango Habanero',
  "Reaper's Kiss",
  'BBQ Classic',
  'Buffalo OG',
  'Sweet Chili',
  'Jerk Season',
]

const fallbackMenu: MenuItem[] = [
  { id: '1', slug: 'halo-6', name: '6-Piece Halo Wings', description: 'Crisp wings tossed in one signature flavor.', category: 'wings', price: 10, image_path: '/images/wings-halo-plate.jpg', heat: 1, featured: false, sort_order: 10 },
  { id: '2', slug: 'halo-10', name: '10-Piece Halo Wings', description: 'The signature basket. Choose up to two flavors.', category: 'wings', price: 16, image_path: '/images/wings-halo-plate.jpg', heat: 2, featured: true, sort_order: 20 },
  { id: '3', slug: 'halo-20', name: '20-Piece Group Wings', description: 'Built for the group chat pull-up. Up to four flavors.', category: 'wings', price: 30, image_path: '/images/sauce-pour-wings.jpg', heat: 3, featured: true, sort_order: 30 },
  { id: '4', slug: 'lemon-pepper-10', name: 'Lemon Pepper Wet 10', description: 'ATL-style. Wet. Properly executed.', category: 'wings', price: 17, image_path: '/images/lemon-pepper.png', heat: 2, featured: true, sort_order: 40 },
  { id: '5', slug: 'shrimp-basket', name: 'Sauced Shrimp Basket', description: 'Seasoned shrimp, fries, house dip, and a drink.', category: 'shrimp', price: 18, image_path: '/images/halo-box-tray.jpg', heat: 2, featured: true, sort_order: 50 },
  { id: '6', slug: 'wing-shrimp-combo', name: 'Wings + Shrimp Combo', description: 'Six wings, sauced shrimp, fries, and a drink.', category: 'combos', price: 24, image_path: '/images/wings-slate.png', heat: 3, featured: true, sort_order: 60 },
  { id: '7', slug: 'late-night-box', name: 'Late Night Box', description: 'Ten wings, loaded fries, dipping sauce, and a drink.', category: 'combos', price: 22, image_path: '/images/branded-cup.jpg', heat: 3, featured: true, sort_order: 70 },
  { id: '8', slug: 'loaded-fries', name: 'Loaded Angel Fries', description: 'Crisp fries layered with cheese, sauce, and seasoning.', category: 'fries', price: 9, image_path: '/images/halo-box-tray.jpg', heat: 1, featured: false, sort_order: 80 },
]

type MenuItem = {
  id: string
  slug: string
  name: string
  description: string
  category: string
  price: number
  image_path: string | null
  heat: number
  featured: boolean
  sort_order: number
}

type CartItem = {
  slug: string
  name: string
  price: number
  quantity: number
  flavor: string
  image: string | null
}

type ModalName = 'order' | 'catering' | 'vip' | null

type ApiResponse = {
  ok: boolean
  error?: string
  message?: string
  confirmationCode?: string
  estimatedSubtotal?: number
  menu?: MenuItem[]
}

type ResultState = {
  title: string
  body: string
  code?: string
} | null

function money(value: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
}

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function Modal({ title, eyebrow, onClose, children }: { title: string; eyebrow: string; onClose: () => void; children: ReactNode }) {
  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === 'Escape' && onClose()
    document.addEventListener('keydown', close)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', close)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="modal-shell" role="dialog" aria-modal="true" aria-label={title}>
      <button className="modal-backdrop" aria-label="Close dialog" onClick={onClose} />
      <div className="modal-card">
        <div className="modal-head">
          <div>
            <span className="eyebrow">{eyebrow}</span>
            <h2>{title}</h2>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="Close">×</button>
        </div>
        {children}
      </div>
    </div>
  )
}

function ResultPanel({ result, onDone }: { result: ResultState; onDone: () => void }) {
  if (!result) return null
  return (
    <div className="result-panel" role="status">
      <span className="result-mark">✓</span>
      <span className="eyebrow">Request received</span>
      <h3>{result.title}</h3>
      <p>{result.body}</p>
      {result.code && <div className="confirmation-code">{result.code}</div>}
      <button className="button button-primary" type="button" onClick={onDone}>Done</button>
    </div>
  )
}

export default function AngelWingsPage() {
  const [menu, setMenu] = useState<MenuItem[]>(fallbackMenu)
  const [menuStatus, setMenuStatus] = useState<'loading' | 'live' | 'fallback'>('loading')
  const [category, setCategory] = useState('all')
  const [cart, setCart] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [modal, setModal] = useState<ModalName>(null)
  const [busy, setBusy] = useState(false)
  const [formError, setFormError] = useState('')
  const [result, setResult] = useState<ResultState>(null)
  const [toast, setToast] = useState('')

  useEffect(() => {
    let active = true
    fetch(`${API_URL}?resource=menu`)
      .then(async (response) => {
        if (!response.ok) throw new Error('Menu unavailable')
        return response.json() as Promise<ApiResponse>
      })
      .then((data) => {
        if (!active || !data.ok || !Array.isArray(data.menu)) return
        const normalized = data.menu.map((item) => ({ ...item, price: Number(item.price), heat: Number(item.heat || 0) }))
        if (normalized.length) {
          setMenu(normalized)
          setMenuStatus('live')
        }
      })
      .catch(() => active && setMenuStatus('fallback'))
      .finally(() => active && setMenuStatus((current) => current === 'loading' ? 'fallback' : current))
    return () => { active = false }
  }, [])

  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(() => setToast(''), 2800)
    return () => window.clearTimeout(timer)
  }, [toast])

  const categories = useMemo(() => ['all', ...Array.from(new Set(menu.map((item) => item.category)))], [menu])
  const visibleMenu = useMemo(() => category === 'all' ? menu : menu.filter((item) => item.category === category), [category, menu])
  const featured = useMemo(() => menu.filter((item) => item.featured).slice(0, 4), [menu])
  const cartCount = useMemo(() => cart.reduce((total, item) => total + item.quantity, 0), [cart])
  const subtotal = useMemo(() => cart.reduce((total, item) => total + item.price * item.quantity, 0), [cart])

  function showToast(message: string) {
    setToast(message)
  }

  function addToCart(item: MenuItem, flavor = flavors[0]) {
    setCart((current) => {
      const existing = current.find((cartItem) => cartItem.slug === item.slug && cartItem.flavor === flavor)
      if (existing) return current.map((cartItem) => cartItem === existing ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem)
      return [...current, { slug: item.slug, name: item.name, price: item.price, quantity: 1, flavor, image: item.image_path }]
    })
    showToast(`${item.name} added to your basket.`)
  }

  function updateQuantity(index: number, next: number) {
    setCart((current) => current.flatMap((item, itemIndex) => itemIndex === index ? (next > 0 ? [{ ...item, quantity: next }] : []) : [item]))
  }

  function openOrder() {
    if (!cart.length) {
      setCartOpen(false)
      showToast('Add at least one item before starting an order request.')
      scrollToId('menu')
      return
    }
    setCartOpen(false)
    setFormError('')
    setResult(null)
    setModal('order')
  }

  async function callApi(type: 'order' | 'catering' | 'vip', payload: Record<string, unknown>) {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, payload }),
    })
    const data = await response.json() as ApiResponse
    if (!response.ok || !data.ok) throw new Error(data.error || 'Something went wrong. Please try again.')
    return data
  }

  async function submitOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setBusy(true)
    setFormError('')
    const data = new FormData(event.currentTarget)
    try {
      const response = await callApi('order', {
        customerName: data.get('customerName'),
        email: data.get('email'),
        phone: data.get('phone'),
        fulfillment: data.get('fulfillment'),
        requestedTime: data.get('requestedTime'),
        deliveryAddress: data.get('deliveryAddress'),
        notes: data.get('notes'),
        website: data.get('website'),
        items: cart.map(({ slug, quantity, flavor }) => ({ slug, quantity, flavor })),
      })
      setCart([])
      setResult({ title: 'Your basket is with the team.', body: response.message || 'The Angel Wings team will contact you to confirm the order.', code: response.confirmationCode })
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Unable to submit the request.')
    } finally {
      setBusy(false)
    }
  }

  async function submitCatering(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setBusy(true)
    setFormError('')
    const data = new FormData(event.currentTarget)
    try {
      const response = await callApi('catering', {
        customerName: data.get('customerName'),
        organization: data.get('organization'),
        email: data.get('email'),
        phone: data.get('phone'),
        eventDate: data.get('eventDate'),
        eventTime: data.get('eventTime'),
        guestCount: Number(data.get('guestCount')),
        eventType: data.get('eventType'),
        serviceStyle: data.get('serviceStyle'),
        venueAddress: data.get('venueAddress'),
        budget: data.get('budget'),
        notes: data.get('notes'),
        website: data.get('website'),
      })
      setResult({ title: 'Your event is in review.', body: response.message || 'The catering team will follow up with next steps.', code: response.confirmationCode })
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Unable to submit the catering request.')
    } finally {
      setBusy(false)
    }
  }

  async function submitVip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setBusy(true)
    setFormError('')
    const data = new FormData(event.currentTarget)
    try {
      const response = await callApi('vip', {
        customerName: data.get('customerName'),
        email: data.get('email'),
        phone: data.get('phone'),
        birthday: data.get('birthday'),
        smsOptIn: data.get('smsOptIn') === 'on',
        emailOptIn: data.get('emailOptIn') === 'on',
        website: data.get('website'),
      })
      setResult({ title: 'Welcome to Angel Wings VIP.', body: response.message || 'You are in for drops, deals, and first access.' })
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Unable to join VIP.')
    } finally {
      setBusy(false)
    }
  }

  function closeModal() {
    setModal(null)
    setResult(null)
    setFormError('')
  }

  const today = new Date().toISOString().slice(0, 10)

  return (
    <main>
      <div className="announcement">Atlanta launch service · Order requests · Catering · Group orders</div>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Angel Wings home">
          <img src="/images/logo.png" alt="Angel Wings" />
        </a>
        <nav className={mobileOpen ? 'site-nav site-nav-open' : 'site-nav'} aria-label="Main navigation">
          <a href="#menu" onClick={() => setMobileOpen(false)}>Menu</a>
          <a href="#flavors" onClick={() => setMobileOpen(false)}>Flavors</a>
          <a href="#catering" onClick={() => setMobileOpen(false)}>Catering</a>
          <a href="#locations" onClick={() => setMobileOpen(false)}>Service</a>
          <button className="nav-text-button" onClick={() => { setModal('vip'); setMobileOpen(false); setResult(null) }}>VIP</button>
        </nav>
        <div className="header-actions">
          <button className="basket-button" onClick={() => setCartOpen(true)} aria-label={`Open basket with ${cartCount} items`}>
            Basket <span>{cartCount}</span>
          </button>
          <button className="menu-toggle" onClick={() => setMobileOpen((value) => !value)} aria-label="Toggle menu">☰</button>
        </div>
      </header>

      <section className="hero" id="top">
        <video autoPlay muted loop playsInline poster="/images/hero-wings-neon.jpg">
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        <div className="hero-scrim" />
        <div className="grain" />
        <div className="hero-content">
          <span className="eyebrow">A Casper Group Brand</span>
          <p className="hero-kicker">Wings. Shrimps. Fries. Respect the Basket.</p>
          <h1>Heaven <em>Sent.</em></h1>
          <p className="hero-copy">Crisp texture. Bold sauce. Late-night energy. Angel Wings turns the basket into the main event.</p>
          <div className="hero-actions">
            <button className="button button-primary" onClick={() => scrollToId('menu')}>Build Your Basket</button>
            <button className="button button-secondary" onClick={() => { setModal('catering'); setResult(null); setFormError('') }}>Book Catering</button>
          </div>
          <p className="microcopy">Online requests are reviewed by the team before final confirmation and payment.</p>
        </div>
        <div className="hero-stats" aria-label="Angel Wings highlights">
          <div><strong>10</strong><span>Signature flavors</span></div>
          <div><strong>3</strong><span>Basket pillars</span></div>
          <div><strong>Late</strong><span>Night energy</span></div>
        </div>
      </section>

      <section className="section featured-section" aria-labelledby="featured-heading">
        <div className="section-head">
          <div>
            <span className="eyebrow">Featured baskets</span>
            <h2 id="featured-heading">Start with the heavy hitters.</h2>
          </div>
          <button className="text-link" onClick={() => scrollToId('menu')}>View full menu →</button>
        </div>
        <div className="featured-grid">
          {featured.map((item) => (
            <article className="featured-card" key={item.slug}>
              <img src={item.image_path || '/images/wings-halo-plate.jpg'} alt={item.name} />
              <div className="featured-overlay" />
              <div className="featured-content">
                <span>{item.category}</span>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <div className="card-row">
                  <strong>{money(item.price)}</strong>
                  <button onClick={() => addToCart(item)}>Add +</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="statement-section">
        <div className="statement-image"><img src="/images/sauce-pour.jpg" alt="Angel Wings being sauced" /></div>
        <div className="statement-copy">
          <span className="eyebrow">The standard</span>
          <h2>Not fast food.<br /><em>Fast culture.</em></h2>
          <p>Angel Wings is built for people who do not crave average. Every basket is designed around crunch, sauce coverage, heat, and presentation that survives the ride.</p>
          <div className="principles">
            <div><strong>01</strong><span>Crisp first</span></div>
            <div><strong>02</strong><span>Sauce properly</span></div>
            <div><strong>03</strong><span>Pack with respect</span></div>
          </div>
        </div>
      </section>

      <section className="section menu-section" id="menu" aria-labelledby="menu-heading">
        <div className="section-head menu-head">
          <div>
            <span className="eyebrow">The launch menu</span>
            <h2 id="menu-heading">Build your basket.</h2>
            <p className="section-note">Estimated launch pricing. The team confirms availability, final total, fulfillment window, and payment after your request.</p>
          </div>
          <div className="live-badge" data-status={menuStatus}>{menuStatus === 'live' ? 'Live menu' : 'Menu preview'}</div>
        </div>
        <div className="category-tabs" role="tablist" aria-label="Menu categories">
          {categories.map((item) => (
            <button key={item} className={category === item ? 'active' : ''} onClick={() => setCategory(item)} role="tab" aria-selected={category === item}>
              {item === 'all' ? 'All' : item}
            </button>
          ))}
        </div>
        <div className="menu-grid">
          {visibleMenu.map((item) => (
            <article className="menu-card" key={item.slug}>
              <div className="menu-image">
                <img src={item.image_path || '/images/wings-halo-plate.jpg'} alt={item.name} loading="lazy" />
                {item.featured && <span>Most ordered</span>}
              </div>
              <div className="menu-body">
                <div className="menu-title-row"><h3>{item.name}</h3><strong>{money(item.price)}</strong></div>
                <p>{item.description}</p>
                <div className="heat" aria-label={`${item.heat} out of 5 heat`}>{'●'.repeat(item.heat)}{'○'.repeat(Math.max(0, 5 - item.heat))}</div>
                <label>
                  Flavor
                  <select defaultValue={flavors[Math.min(item.heat, flavors.length - 1)] || flavors[0]} id={`flavor-${item.slug}`}>
                    {flavors.map((flavor) => <option value={flavor} key={flavor}>{flavor}</option>)}
                  </select>
                </label>
                <button className="button button-card" onClick={() => {
                  const selector = document.getElementById(`flavor-${item.slug}`) as HTMLSelectElement | null
                  addToCart(item, selector?.value || flavors[0])
                }}>Add to Basket</button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="flavor-section" id="flavors">
        <div className="flavor-copy">
          <span className="eyebrow">The sauce vault</span>
          <h2>Choose your level.</h2>
          <p>From clean and buttery to full-send heat, every flavor is built to coat the wing—not drown it.</p>
        </div>
        <div className="flavor-list">
          {flavors.map((flavor, index) => (
            <div key={flavor}><span>{String(index + 1).padStart(2, '0')}</span><strong>{flavor}</strong><em>{'●'.repeat(Math.min(5, Math.ceil((index + 1) / 2)))}</em></div>
          ))}
        </div>
      </section>

      <section className="catering-section" id="catering">
        <img src="/images/loudini-mascot.jpg" alt="Loudini the Wing Wizard, Angel Wings mascot" />
        <div className="catering-overlay" />
        <div className="catering-content">
          <span className="eyebrow">Catering & group orders</span>
          <h2>Feed the whole function.</h2>
          <p>Office drops. Private events. Game nights. Brand activations. Food-truck service. Tell us the count and the occasion; we will build the basket strategy.</p>
          <div className="catering-options">
            <span>Drop-off</span><span>Pickup</span><span>Staffed service</span><span>Food truck</span>
          </div>
          <button className="button button-primary" onClick={() => { setModal('catering'); setResult(null); setFormError('') }}>Start Catering Request</button>
        </div>
      </section>

      <section className="section service-section" id="locations">
        <div className="section-head">
          <div>
            <span className="eyebrow">Atlanta launch</span>
            <h2>Service built around the moment.</h2>
          </div>
        </div>
        <div className="service-grid">
          <article><span>01</span><h3>Order Requests</h3><p>Build a basket online. The team confirms inventory, timing, final total, and payment instructions.</p><button onClick={() => scrollToId('menu')}>Start a basket →</button></article>
          <article><span>02</span><h3>Delivery Zones</h3><p>Delivery availability is confirmed based on the active kitchen, event, and service radius.</p><button onClick={() => { setCartOpen(true); showToast('Add your items, then choose delivery during checkout.') }}>Check through basket →</button></article>
          <article><span>03</span><h3>Events & Catering</h3><p>Large-format wing, shrimp, fry, and combo service for private and public events.</p><button onClick={() => { setModal('catering'); setResult(null) }}>Request catering →</button></article>
        </div>
      </section>

      <section className="vip-section" id="rewards">
        <div>
          <span className="eyebrow">Angel Wings VIP</span>
          <h2>First access tastes better.</h2>
          <p>Join for flavor drops, launch windows, group-order deals, birthday offers, and invitation-only tastings.</p>
        </div>
        <button className="button button-primary" onClick={() => { setModal('vip'); setResult(null); setFormError('') }}>Join the VIP</button>
      </section>

      <footer>
        <div className="footer-brand">
          <img src="/images/logo.png" alt="Angel Wings" />
          <p>Heaven Sent. Sinfully Good.<br />A Casper Group brand.</p>
        </div>
        <div><strong>Order</strong><a href="#menu">Menu</a><button onClick={() => setCartOpen(true)}>Basket</button><button onClick={() => { setModal('catering'); setResult(null) }}>Catering</button></div>
        <div><strong>Discover</strong><a href="#flavors">Flavors</a><a href="#locations">Service</a><button onClick={() => { setModal('vip'); setResult(null) }}>VIP</button></div>
        <div><strong>Operations</strong><span>Atlanta, Georgia</span><span>Pickup · Delivery · Events</span><span>Final details confirmed by team</span></div>
      </footer>
      <div className="legal-bar"><span>© 2026 Angel Wings. All rights reserved.</span><span>A Casper Group Brand</span></div>

      {cartOpen && (
        <aside className="cart-drawer" aria-label="Your Angel Wings basket">
          <button className="cart-backdrop" onClick={() => setCartOpen(false)} aria-label="Close basket" />
          <div className="cart-panel">
            <div className="cart-head"><div><span className="eyebrow">Your basket</span><h2>{cartCount} item{cartCount === 1 ? '' : 's'}</h2></div><button className="icon-button" onClick={() => setCartOpen(false)}>×</button></div>
            <div className="cart-items">
              {!cart.length && <div className="empty-state"><h3>The basket is waiting.</h3><p>Add wings, shrimp, fries, or a combo to begin.</p><button className="button button-secondary" onClick={() => { setCartOpen(false); scrollToId('menu') }}>Browse Menu</button></div>}
              {cart.map((item, index) => (
                <div className="cart-item" key={`${item.slug}-${item.flavor}`}>
                  <img src={item.image || '/images/wings-halo-plate.jpg'} alt="" />
                  <div><h3>{item.name}</h3><p>{item.flavor}</p><strong>{money(item.price * item.quantity)}</strong></div>
                  <div className="quantity"><button onClick={() => updateQuantity(index, item.quantity - 1)}>−</button><span>{item.quantity}</span><button onClick={() => updateQuantity(index, item.quantity + 1)}>+</button></div>
                </div>
              ))}
            </div>
            {!!cart.length && <div className="cart-summary"><div><span>Estimated subtotal</span><strong>{money(subtotal)}</strong></div><p>Taxes, delivery, service fees, availability, and final payment are confirmed by the team.</p><button className="button button-primary" onClick={openOrder}>Continue to Order Request</button><button className="clear-button" onClick={() => setCart([])}>Clear basket</button></div>}
          </div>
        </aside>
      )}

      {modal === 'order' && (
        <Modal title="Confirm your order request" eyebrow="Angel Wings basket" onClose={closeModal}>
          {result ? <ResultPanel result={result} onDone={closeModal} /> : (
            <form className="form" onSubmit={submitOrder}>
              <div className="form-order-summary">
                {cart.map((item) => <div key={`${item.slug}-${item.flavor}`}><span>{item.quantity}× {item.name}<small>{item.flavor}</small></span><strong>{money(item.quantity * item.price)}</strong></div>)}
                <div className="form-total"><span>Estimated subtotal</span><strong>{money(subtotal)}</strong></div>
              </div>
              <div className="form-grid two">
                <label>Full name<input name="customerName" required autoComplete="name" /></label>
                <label>Phone<input name="phone" required inputMode="tel" autoComplete="tel" /></label>
                <label>Email<input name="email" type="email" autoComplete="email" /></label>
                <label>Fulfillment<select name="fulfillment" required defaultValue="pickup"><option value="pickup">Pickup</option><option value="delivery">Delivery request</option><option value="event_pickup">Event pickup</option></select></label>
                <label>Preferred time<input name="requestedTime" placeholder="Example: Friday, 10:30 PM" /></label>
                <label>Delivery address<input name="deliveryAddress" autoComplete="street-address" placeholder="Required for delivery" /></label>
              </div>
              <label>Order notes<textarea name="notes" rows={3} placeholder="Allergies, access instructions, preferred contact method, or other details" /></label>
              <input className="honeypot" name="website" tabIndex={-1} autoComplete="off" />
              <p className="form-disclaimer">Submitting this form creates an order request, not a charged transaction. The team will confirm final price, availability, time, and payment.</p>
              {formError && <p className="form-error">{formError}</p>}
              <button className="button button-primary full" disabled={busy}>{busy ? 'Sending Request…' : 'Submit Order Request'}</button>
            </form>
          )}
        </Modal>
      )}

      {modal === 'catering' && (
        <Modal title="Build the event basket" eyebrow="Catering request" onClose={closeModal}>
          {result ? <ResultPanel result={result} onDone={closeModal} /> : (
            <form className="form" onSubmit={submitCatering}>
              <div className="form-grid two">
                <label>Full name<input name="customerName" required autoComplete="name" /></label>
                <label>Organization<input name="organization" autoComplete="organization" /></label>
                <label>Email<input name="email" type="email" required autoComplete="email" /></label>
                <label>Phone<input name="phone" required inputMode="tel" autoComplete="tel" /></label>
                <label>Event date<input name="eventDate" type="date" min={today} required /></label>
                <label>Event time<input name="eventTime" type="time" /></label>
                <label>Guest count<input name="guestCount" type="number" min="10" max="10000" required /></label>
                <label>Event type<input name="eventType" placeholder="Birthday, corporate, festival…" /></label>
                <label>Service style<select name="serviceStyle" defaultValue="drop_off"><option value="drop_off">Drop-off</option><option value="pickup">Pickup</option><option value="staffed_service">Staffed service</option><option value="food_truck">Food truck</option><option value="custom">Custom</option></select></label>
                <label>Budget range<input name="budget" placeholder="$500–$1,000" /></label>
              </div>
              <label>Venue address<input name="venueAddress" autoComplete="street-address" /></label>
              <label>Event details<textarea name="notes" rows={4} placeholder="Menu preferences, venue access, service expectations, dietary needs, and timeline" /></label>
              <input className="honeypot" name="website" tabIndex={-1} autoComplete="off" />
              {formError && <p className="form-error">{formError}</p>}
              <button className="button button-primary full" disabled={busy}>{busy ? 'Sending Request…' : 'Submit Catering Request'}</button>
            </form>
          )}
        </Modal>
      )}

      {modal === 'vip' && (
        <Modal title="Join Angel Wings VIP" eyebrow="Drops · deals · first access" onClose={closeModal}>
          {result ? <ResultPanel result={result} onDone={closeModal} /> : (
            <form className="form" onSubmit={submitVip}>
              <div className="form-grid two">
                <label>Full name<input name="customerName" required autoComplete="name" /></label>
                <label>Email<input name="email" type="email" required autoComplete="email" /></label>
                <label>Phone<input name="phone" inputMode="tel" autoComplete="tel" /></label>
                <label>Birthday<input name="birthday" placeholder="MM/DD" inputMode="numeric" /></label>
              </div>
              <label className="check"><input type="checkbox" name="emailOptIn" defaultChecked /><span>Email me flavor drops, offers, and launch windows.</span></label>
              <label className="check"><input type="checkbox" name="smsOptIn" /><span>Text me limited drops and ordering windows. Message and data rates may apply.</span></label>
              <input className="honeypot" name="website" tabIndex={-1} autoComplete="off" />
              {formError && <p className="form-error">{formError}</p>}
              <button className="button button-primary full" disabled={busy}>{busy ? 'Joining…' : 'Join the VIP'}</button>
            </form>
          )}
        </Modal>
      )}

      {toast && <div className="toast" role="status">{toast}</div>}
    </main>
  )
}
