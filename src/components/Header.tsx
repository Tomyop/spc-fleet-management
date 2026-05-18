'use client'

import { useState, useEffect } from 'react'
import Logo from './Logo'
import { User } from 'lucide-react'

export default function Header({ title }: { title: string }) {
  const [currentUser, setCurrentUser] = useState<string>('')
  const [currentTime, setCurrentTime] = useState({
    day: '',
    date: '',
    time: ''
  })

  useEffect(() => {
    setCurrentUser(localStorage.getItem('spc_user') || '')
  }, [])

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date()
      const arabicDays = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت']
      
      const day = arabicDays[now.getDay()]
      const date = now.toLocaleDateString('ar-EG', { day: '2-digit', month: '2-digit', year: 'numeric' })
      const time = now.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })
      
      setCurrentTime({ day, date, time })
    }

    updateDateTime()
    const interval = setInterval(updateDateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <header className="bg-gray-900 shadow-sm border-b border-gray-700">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <h1 className="text-4xl font-bold text-white">{title}</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end text-white text-sm">
            <span className="font-semibold">{currentTime.day}</span>
            <span className="text-gray-300">{currentTime.date}</span>
            <span className="text-blue-300 font-mono">{currentTime.time}</span>
          </div>
          {currentUser && (
            <div className="flex items-center gap-3 bg-blue-800/50 px-4 py-2 rounded-xl">
              <User size={20} className="text-blue-200" />
              <span className="text-white font-semibold">{currentUser}</span>
            </div>
          )}
          <Logo size="md" showText={false} />
        </div>
      </div>
    </header>
  )
}
