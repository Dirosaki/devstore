import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { PropsWithChildren } from 'react'

import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    template: '%s | Dev Store',
    default: 'Dev Store',
  },
  description: 'Loja online de produtos de programação',
}

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="bg-zinc-950 text-zinc-50 antialiased">{children}</body>
    </html>
  )
}
