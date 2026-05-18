'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { users } from '@/data/vehicles'
import Logo from '@/components/Logo'

export default function UserSelection() {
  const router = useRouter()
  const [selectedUser, setSelectedUser] = useState<string | null>(null)

  useEffect(() => {
    const savedUser = localStorage.getItem('spc_user')
    if (savedUser) {
      router.push('/dashboard')
    }
  }, [router])

  const handleUserSelect = (userName: string) => {
    localStorage.setItem('spc_user', userName)
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-gray-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        {/* SPC Logo */}
        <div className="flex justify-center mb-8">
          <Logo size="lg" showText={true} />
        </div>

        <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
          نظام إدارة مركبات SPC
        </h1>
        <p className="text-center text-gray-600 mb-8">
          شركة الوقاية الأمنية
        </p>

        <div className="space-y-3">
          <p className="text-center text-gray-700 font-semibold mb-4">
            اختر المستخدم:
          </p>
          {users.map((user) => (
            <button
              key={user.id}
              onClick={() => handleUserSelect(user.name)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {user.name}
            </button>
          ))}
        </div>

        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>جميع العمليات يتم حفظها باسم المستخدم</p>
        </div>
      </div>
    </div>
  )
}
