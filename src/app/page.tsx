'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { users } from '@/data/vehicles'
import Logo from '@/components/Logo'

export default function UserSelection() {
  const router = useRouter()
  const [selectedUser, setSelectedUser] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('spc_user')
      if (savedUser) {
        router.push('/dashboard')
      }
    }
  }, [router])

  const handleUserSelect = (userName: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('spc_user', userName)
    }
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-gray-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md">
        {/* SPC Logo - Centered and enlarged */}
        <div className="flex justify-center items-center mb-10">
          <Logo size="xl" showText={false} />
        </div>

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8 leading-relaxed">
          نظام إدارة مركبات
          <br />
          شركة الوقاية الأمنية
        </h1>

        <div className="space-y-4">
          <p className="text-center text-gray-700 font-semibold mb-6 text-lg">
            اختر المستخدم:
          </p>
          {users.map((user) => (
            <button
              key={user.id}
              onClick={() => handleUserSelect(user.name)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {user.name}
            </button>
          ))}
        </div>

        <div className="mt-10 text-center text-gray-500 text-sm">
          <p>جميع العمليات يتم حفظها باسم المستخدم</p>
        </div>
      </div>
    </div>
  )
}
