import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const MENU_ENDPOINT = 'https://qhgmukwoennurwuvmbhy.supabase.co/functions/v1/angel-wings-intake?resource=menu'

export async function GET() {
  const startedAt = Date.now()
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 5000)

  try {
    const response = await fetch(MENU_ENDPOINT, {
      cache: 'no-store',
      signal: controller.signal,
      headers: { 'User-Agent': 'angel-wings-health-check/1.0' },
    })
    const data = await response.json() as { ok?: boolean; menu?: unknown[]; error?: string }
    const healthy = response.ok && data.ok === true && Array.isArray(data.menu) && data.menu.length > 0

    return NextResponse.json({
      ok: healthy,
      service: 'angel-wings-website',
      checks: {
        website: 'up',
        menuApi: healthy ? 'up' : 'degraded',
        menuItems: Array.isArray(data.menu) ? data.menu.length : 0,
      },
      responseTimeMs: Date.now() - startedAt,
      checkedAt: new Date().toISOString(),
    }, {
      status: healthy ? 200 : 503,
      headers: { 'Cache-Control': 'no-store' },
    })
  } catch (error) {
    return NextResponse.json({
      ok: false,
      service: 'angel-wings-website',
      checks: { website: 'up', menuApi: 'down', menuItems: 0 },
      error: error instanceof Error ? error.name : 'Health check failed',
      responseTimeMs: Date.now() - startedAt,
      checkedAt: new Date().toISOString(),
    }, {
      status: 503,
      headers: { 'Cache-Control': 'no-store' },
    })
  } finally {
    clearTimeout(timeout)
  }
}
