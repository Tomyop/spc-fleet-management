'use client'

import Header from '@/components/Header'

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-900 flex">
      <div className="flex-1 flex flex-col">
        <Header title="مخزن شركة الوقاية الأمنية SPC" />
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
