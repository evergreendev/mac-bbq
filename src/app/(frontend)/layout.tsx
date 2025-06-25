import type { Metadata } from 'next'

import { cn } from 'src/utilities/cn'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import { Playball, Roboto_Condensed, Bree_Serif, Nunito } from 'next/font/google'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'
import './globals.css'
import Script from 'next/script'

const playball = Playball({
  subsets:['latin'],
  weight: ["400"],
  variable: "--font-playball",
  display: "swap"
})

const nunito = Nunito({
  subsets:['latin'],
  weight: ["400", "700"],
  variable: "--font-nunito",
  display: "swap"
})

const breeSerif = Bree_Serif({
  subsets:['latin'],
  weight: ["400"],
  variable: "--font-bree-serif",
  display: "swap"
})

const robotoCondensed = Roboto_Condensed({
  subsets: ['latin'],
  weight: ["400", "100", "200", "300", "500", "900"],
  variable: "--font-roboto",
  display: "swap"
})

export default async function RootLayout({ children }: { children: React.ReactNode, params: any }) {
  const { isEnabled } = await draftMode()

  return (
    <html className={cn(GeistSans.variable, nunito.variable, GeistMono.variable, breeSerif.variable, playball.variable, robotoCondensed.variable)} lang="en" suppressHydrationWarning>
      <head>
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />
          <LivePreviewListener />
          {children}
          <Footer />
          <Script src="https://fareharbor.com/embeds/api/v1/?autolightframe=yes"/>

          {/* Google Analytics */}
          <Script src="https://www.googletagmanager.com/gtag/js?id=G-01W2M0DLC0" strategy="afterInteractive" />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-01W2M0DLC0');
            `}
          </Script>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'https://payloadcms.com'),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}
