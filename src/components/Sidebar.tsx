'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Car,
  ArrowRightLeft,
  Calendar,
  Settings,
  LogOut,
  Menu,
  X,
  Package
} from 'lucide-react'

const menuItems = [
  { icon: LayoutDashboard, label: 'لوحة التحكم', path: '/dashboard' },
  { icon: Car, label: 'المركبات', path: '/vehicles' },
  { icon: ArrowRightLeft, label: 'دخول / خروج', path: '/entry-exit' },
  { icon: Calendar, label: 'الحجز', path: '/reservations' },
  { icon: Package, label: 'المخزن', path: '/store' },
  { icon: Settings, label: 'الإعدادات', path: '/settings' },
]

export default function Sidebar() {
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState<string>('')

  useState(() => {
    if (typeof window !== 'undefined') {
      setCurrentUser(localStorage.getItem('spc_user') || '')
    }
  })

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('spc_user')
    }
    router.push('/')
  }

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 right-4 z-50 bg-blue-900 text-white p-2 rounded-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 right-0 z-40 w-64 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.path
              return (
                <button
                  key={item.path}
                  onClick={() => {
                    router.push(item.path)
                    setIsOpen(false)
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              )
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-gray-700">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-900/20 hover:text-red-300 transition-all duration-200"
            >
              <span className="font-medium">تسجيل الخروج</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
