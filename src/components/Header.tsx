'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Logo from './Logo'
import { User, LogOut } from 'lucide-react'

export default function Header({ title }: { title: string }) {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<string>('')
  const [currentTime, setCurrentTime] = useState({
    day: '',
    date: '',
    time: ''
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUser(localStorage.getItem('spc_user') || '')
    }
  }, [])

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('spc_user')
    }
    router.push('/')
  }

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date()
      
      const date = now.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })
      const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })
      
      setCurrentTime({ day: '', date, time })
    }

    updateDateTime()
    const interval = setInterval(updateDateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <header className="bg-blue-900 shadow-lg border-b border-blue-800">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <h1 className="text-4xl font-bold text-white">لوحة التحكم</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end text-white text-sm">
            <span className="text-white font-mono">{currentTime.date}</span>
            <span className="text-white font-mono">{currentTime.time}</span>
          </div>
          {currentUser && (
            <div className="flex items-center gap-3 bg-blue-800/50 px-5 py-3 rounded-xl">
              <User size={32} className="text-white" />
              <span className="text-white font-semibold">{currentUser}</span>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-300"
          >
            <LogOut size={20} />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </div>
    </header>
  )
}
