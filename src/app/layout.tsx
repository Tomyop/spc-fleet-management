import type { Metadata } from 'next'
import { Cairo } from 'next/font/google'
import './globals.css'
import ClientErrorCatcher from '@/components/ClientErrorCatcher'

const cairo = Cairo({ 
  subsets: ['arabic', 'latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-cairo',
})

export const metadata: Metadata = {
  title: 'SPC Fleet Management System',
  description: 'نظام إدارة مركبات شركة الوقاية الأمنية',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={cairo.variable}>
        <ClientErrorCatcher />
        {children}
      </body>
    </html>
  )
}
