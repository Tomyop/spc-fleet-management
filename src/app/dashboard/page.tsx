'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useVehicles, useEntryExit, useReservations } from '@/hooks/useLocalData'
import { Car, ArrowRightLeft, Calendar, AlertTriangle, CheckCircle, Clock, Plus, X } from 'lucide-react'

export default function Dashboard() {
  const router = useRouter()
  const { vehicles } = useVehicles()
  const { entries } = useEntryExit()
  const { reservations, deleteReservation } = useReservations()
  const [localReservations, setLocalReservations] = useState<any[]>([])

  useEffect(() => {
    const savedReservations = localStorage.getItem('reservations')
    if (savedReservations) {
      setLocalReservations(JSON.parse(savedReservations))
    }
  }, [])

  const handleCancelReservation = (id: string) => {
    const updatedReservations = localReservations.filter((r: any) => r.id !== id)
    setLocalReservations(updatedReservations)
    localStorage.setItem('reservations', JSON.stringify(updatedReservations))
  }

  const stats = [
    {
      title: 'إجمالي المركبات',
      value: vehicles.length,
      icon: Car,
      color: 'bg-blue-600',
      description: 'مركبة مسجلة'
    },
    {
      title: 'داخل العمل',
      value: 0,
      icon: CheckCircle,
      color: 'bg-green-600',
      description: 'مركبة نشطة'
    },
    {
      title: 'خارج العمل',
      value: 0,
      icon: Clock,
      color: 'bg-orange-600',
      description: 'مركبة غير نشطة'
    },
    {
      title: 'محجوزة',
      value: 0,
      icon: Calendar,
      color: 'bg-purple-600',
      description: 'مركبة محجوزة'
    },
    {
      title: 'صيانة',
      value: 0,
      icon: AlertTriangle,
      color: 'bg-red-600',
      description: 'مركبة بالصيانة'
    },
    {
      title: 'حركات اليوم',
      value: entries.filter(e => {
        const today = new Date().toDateString()
        return new Date(e.timestamp).toDateString() === today
      }).length,
      icon: ArrowRightLeft,
      color: 'bg-indigo-600',
      description: 'عملية دخول/خروج'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-2xl p-6 shadow-lg border border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.3)]">
        <div className="text-white">
          <h2 className="text-3xl font-bold mb-2">مرحباً بك في نظام إدارة المركبات</h2>
          <p className="text-blue-200">شركة الوقاية الأمنية SPC</p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-300 hover:scale-105 border border-gray-700 hover:border-blue-500/50 group"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-gray-400 text-sm mb-1 group-hover:text-blue-400 transition-colors">{stat.title}</p>
                  <p className="text-3xl font-bold text-white mb-1 group-hover:text-blue-300 transition-colors">{stat.value}</p>
                  <p className="text-gray-500 text-xs">{stat.description}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-xl group-hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all duration-300`}>
                  <Icon size={24} className="text-white" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Entry/Exit */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-700 hover:border-blue-500/30 transition-all duration-300">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <ArrowRightLeft size={20} className="text-blue-400" />
            آخر عمليات الدخول والخروج
          </h3>
          <div className="space-y-3">
            {entries.slice(0, 5).map((entry) => (
              <div
                key={entry.id}
                className="bg-gray-700/50 rounded-lg p-4 hover:bg-gray-600/50 hover:border-blue-500/30 border border-transparent transition-all duration-300 group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-semibold group-hover:text-blue-300 transition-colors">{entry.employeeName}</p>
                    <p className="text-gray-400 text-sm">{entry.vehiclePlate}</p>
                  </div>
                  <div className="text-left">
                    <p className="text-blue-400 font-semibold">{entry.type}</p>
                    <p className="text-gray-500 text-xs">
                      {new Date(entry.timestamp).toLocaleDateString('ar-SA')}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {entries.length === 0 && (
              <p className="text-gray-500 text-center py-4">لا توجد عمليات مسجلة</p>
            )}
          </div>
        </div>

        {/* Active Reservations */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-700 hover:border-blue-500/30 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Calendar size={20} className="text-purple-400" />
              الحجوزات النشطة
            </h3>
            <button
              onClick={() => router.push('/reservation')}
              className="bg-blue-600 hover:bg-blue-700 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] text-white font-semibold py-2 px-4 rounded-xl transition-all duration-300 flex items-center gap-2"
            >
              حجز جديد
              <Plus size={16} />
            </button>
          </div>
          <div className="space-y-3">
            {localReservations.slice(0, 5).map((reservation) => (
              <div
                key={reservation.id}
                className="bg-gray-700/50 backdrop-blur-sm rounded-xl p-4 border border-gray-600 hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300 hover:scale-[1.02] group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-white font-bold text-lg mb-1">{reservation.vehiclePlate}</p>
                    <p className="text-gray-300 text-sm mb-1">{reservation.vehicleType || reservation.purpose}</p>
                    <p className="text-gray-500 text-xs">{reservation.userName}</p>
                  </div>
                  <div className="text-left ml-4">
                    <p className="text-blue-400 font-semibold">{reservation.date}</p>
                    <p className="text-gray-400 text-xs">{reservation.time}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 bg-purple-500/20 text-purple-400 text-xs rounded-full border border-purple-500/30">
                      {reservation.status || 'نشط'}
                    </span>
                  </div>
                  <button
                    onClick={() => handleCancelReservation(reservation.id)}
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/20 p-2 rounded-lg transition-all duration-300 ml-2 opacity-0 group-hover:opacity-100"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
            ))}
            {localReservations.length === 0 && (
              <p className="text-gray-500 text-center py-4">لا توجد حجوزات نشطة</p>
            )}
          </div>
        </div>
      </div>

      {/* Vehicles Status Overview */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-700 hover:border-blue-500/30 transition-all duration-300">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Car size={20} className="text-green-400" />
          نظرة عامة على حالة المركبات
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {vehicles.slice(0, 10).map((vehicle) => (
            <div
              key={vehicle.id}
              className="bg-gray-700/50 rounded-lg p-4 hover:bg-gray-600/50 hover:border-blue-500/30 border border-transparent transition-all duration-300 cursor-pointer hover:scale-105 group"
            >
              <p className="text-white font-semibold text-sm mb-2 group-hover:text-blue-300 transition-colors">{vehicle.plateNumber}</p>
              <p className="text-gray-400 text-xs mb-2">{vehicle.type}</p>
              <span
                className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                  vehicle.status === 'داخل العمل'
                    ? 'bg-green-600 text-white'
                    : vehicle.status === 'خارج العمل'
                    ? 'bg-orange-600 text-white'
                    : vehicle.status === 'صيانة'
                    ? 'bg-red-600 text-white'
                    : 'bg-purple-600 text-white'
                }`}
              >
                {vehicle.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
