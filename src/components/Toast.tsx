'use client'

import { useEffect, useState } from 'react'
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

interface ToastProps {
  message: string
  type: ToastType
  duration?: number
  onClose: () => void
}

export default function Toast({ message, type, duration = 3000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onClose, 300)
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} className="text-green-400" />
      case 'error':
        return <XCircle size={20} className="text-red-400" />
      case 'warning':
        return <AlertCircle size={20} className="text-orange-400" />
      case 'info':
        return <AlertCircle size={20} className="text-blue-400" />
    }
  }

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-900/90'
      case 'error':
        return 'bg-red-900/90'
      case 'warning':
        return 'bg-orange-900/90'
      case 'info':
        return 'bg-blue-900/90'
    }
  }

  return (
    <div
      className={`fixed top-4 right-4 z-50 ${getBackgroundColor()} backdrop-blur-lg rounded-xl p-4 shadow-2xl border border-white/20 transition-all duration-300 transform ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
    >
      <div className="flex items-center gap-3">
        {getIcon()}
        <p className="text-white font-medium">{message}</p>
        <button
          onClick={() => {
            setIsVisible(false)
            setTimeout(onClose, 300)
          }}
          className="text-white hover:text-gray-300 transition-colors"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  )
}
