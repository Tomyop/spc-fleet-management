'use client'

import { useVehicles, useEntryExit, useReservations } from '@/hooks/useLocalData'
import { Car, ArrowRightLeft, Calendar, AlertTriangle, CheckCircle, Clock } from 'lucide-react'

export default function Dashboard() {
  const { vehicles } = useVehicles()
  const { entries } = useEntryExit()
  const { reservations } = useReservations()

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
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-2xl p-6 shadow-lg">
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
              className="bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-700"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-gray-400 text-sm mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                  <p className="text-gray-500 text-xs">{stat.description}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-xl`}>
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
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <ArrowRightLeft size={20} className="text-blue-400" />
            آخر عمليات الدخول والخروج
          </h3>
          <div className="space-y-3">
            {entries.slice(0, 5).map((entry) => (
              <div
                key={entry.id}
                className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-semibold">{entry.employeeName}</p>
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
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Calendar size={20} className="text-purple-400" />
            الحجوزات النشطة
          </h3>
          <div className="space-y-3">
            {reservations.slice(0, 5).map((reservation) => (
              <div
                key={reservation.id}
                className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-semibold">{reservation.vehiclePlate}</p>
                    <p className="text-gray-400 text-sm">{reservation.purpose}</p>
                  </div>
                  <div className="text-left">
                    <p className="text-purple-400 font-semibold">{reservation.date}</p>
                    <p className="text-gray-500 text-xs">{reservation.time}</p>
                  </div>
                </div>
              </div>
            ))}
            {reservations.length === 0 && (
              <p className="text-gray-500 text-center py-4">لا توجد حجوزات نشطة</p>
            )}
          </div>
        </div>
      </div>

      {/* Vehicles Status Overview */}
      <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Car size={20} className="text-green-400" />
          نظرة عامة على حالة المركبات
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {vehicles.slice(0, 10).map((vehicle) => (
            <div
              key={vehicle.id}
              className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors cursor-pointer"
            >
              <p className="text-white font-semibold text-sm mb-2">{vehicle.plateNumber}</p>
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
