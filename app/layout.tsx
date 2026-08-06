import type { Metadata, Viewport } from 'next'
import './globals.css'

const siteUrl = 'https://iwantangelwings.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: 'Angel Wings',
  title: {
    default: 'Angel Wings — Heaven Sent. Sinfully Good.',
    template: '%s | Angel Wings',
  },
  description: 'Wings, shrimp, fries, catering, and group orders built around crisp texture, bold sauce, and late-night energy. A Casper Group brand.',
  keywords: ['Angel Wings', 'Atlanta wings', 'wing catering', 'group orders', 'shrimp basket', 'Casper Group'],
  alternates: { canonical: '/' },
  icons: {
    icon: '/images/logo.png',
    apple: '/images/logo.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Angel Wings',
    title: 'Angel Wings — Heaven Sent. Sinfully Good.',
    description: 'Wings. Shrimps. Fries. Respect the Basket. Build an order request, book catering, and join Angel Wings VIP.',
    images: [{
      url: '/images/hero-wings-neon.jpg',
      width: 1200,
      height: 630,
      alt: 'Angel Wings — Heaven Sent. Sinfully Good.',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Angel Wings — Heaven Sent. Sinfully Good.',
    description: 'Wings. Shrimps. Fries. Respect the Basket.',
    images: ['/images/hero-wings-neon.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#060608',
  colorScheme: 'dark',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
