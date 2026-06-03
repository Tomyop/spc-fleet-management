'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Calendar, Clock, Car, ArrowRight, X, Truck, Bus } from 'lucide-react'
import { initialVehicles, vehicleTypes } from '@/data/vehicles'
import Header from '@/components/Header'
import Toast, { ToastType } from '@/components/Toast'
import { logActivity } from '@/lib/logActivity'

export default function ReservationPage() {
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [selectedVehicleType, setSelectedVehicleType] = useState('')
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null)
  const [showVehicleModal, setShowVehicleModal] = useState(false)
  const [purpose, setPurpose] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null)

  const currentUser = typeof window !== 'undefined' ? localStorage.getItem('spc_user') : ''

  const filteredVehicles = selectedVehicleType
    ? initialVehicles.filter(v => v.type === selectedVehicleType && !v.hidden)
    : []

  const getStatusColor = (status: string | null) => {
    switch (status) {
      case 'داخل العمل':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'خارج العمل':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30'
      case 'محجوزة':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
      case 'صيانة':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getVehicleIcon = (typeName: string) => {
    switch (typeName) {
      case 'Hyundai Tucson':
        return <Car size={20} className="text-blue-400" />
      case 'Hyundai Creta':
        return <Car size={20} className="text-blue-400" />
      case 'Hyundai H1':
        return <Bus size={20} className="text-blue-400" />
      case 'Hyundai Santa Fe':
        return <Truck size={20} className="text-blue-400" />
      case 'TLC B6':
        return <Car size={20} className="text-blue-400" />
      default:
        return <Car size={20} className="text-blue-400" />
    }
  }

  const handleVehicleSelect = (vehicle: any) => {
    if (!selectedDate || !selectedTime) {
      setToast({ message: 'يرجى ملء التاريخ والوقت قبل اختيار المركبة', type: 'warning' })
      return
    }

    setSelectedVehicle(vehicle)
    setShowVehicleModal(false)
  }

  const handleSaveReservation = async () => {
    if (!selectedDate || !selectedTime || !selectedVehicle || !selectedStatus) {
      setToast({ message: 'يرجى ملء جميع الحقول المطلوبة', type: 'warning' })
      return
    }

    // Save reservation to localStorage
    const reservations = JSON.parse(localStorage.getItem('reservations') || '[]')
    const newReservation = {
      id: Date.now().toString(),
      userName: currentUser,
      vehicleType: selectedVehicle.type,
      vehiclePlate: selectedVehicle.plateNumber,
      date: selectedDate,
      time: selectedTime,
      purpose: selectedStatus,
      status: selectedStatus,
      createdAt: new Date().toISOString()
    }
    reservations.push(newReservation)
    localStorage.setItem('reservations', JSON.stringify(reservations))

    // Update vehicle status based on selected status
    const vehicles = JSON.parse(localStorage.getItem('spc_vehicles') || JSON.stringify(initialVehicles))
    const targetVehicle = vehicles.find((v: any) => v.id === selectedVehicle.id)
    const oldStatus = targetVehicle?.status || null
    
    const updatedVehicles = vehicles.map((v: any) => 
      v.id === selectedVehicle.id 
        ? { ...v, status: selectedStatus, available: false }
        : v
    )
    localStorage.setItem('spc_vehicles', JSON.stringify(updatedVehicles))

    // Update today's movements counter
    const entries = JSON.parse(localStorage.getItem('entries') || '[]')
    const todayEntry = {
      id: Date.now().toString(),
      employeeName: currentUser,
      vehiclePlate: selectedVehicle.plateNumber,
      type: 'حجز',
      timestamp: new Date().toISOString()
    }
    entries.push(todayEntry)
    localStorage.setItem('entries', JSON.stringify(entries))
    try {
      const user = currentUser || (typeof window !== 'undefined' ? localStorage.getItem('spc_user') : '')
      const dept = typeof window !== 'undefined' ? localStorage.getItem('spc_department') : ''
      await logActivity(
        'حجز مركبة',
        selectedVehicle.plateNumber,
        selectedVehicle.type,
        user || '',
        dept || '',
        selectedStatus,
        purpose || ''
      )
      console.info('[Reservation] Logged activity for reservation', selectedVehicle.plateNumber)
    } catch (err) {
      console.error('[Reservation] Failed to log activity', err)
    }

    // Send Telegram notification
    try {
      await fetch('/api/telegram/notify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: currentUser,
          vehicleType: selectedVehicle.type,
          vehiclePlate: selectedVehicle.plateNumber,
          date: selectedDate,
          time: selectedTime,
          purpose: selectedStatus,
        }),
      })
      console.log('[Reservation] Telegram notification sent')
    } catch (err) {
      console.error('[Reservation] Failed to send Telegram notification:', err)
    }

    setToast({ message: 'تم إنشاء الحجز بنجاح!', type: 'success' })
    setTimeout(() => router.push('/dashboard'), 1500)
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <Header title="حجز مركبة" />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Glassmorphism Card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 shadow-[0_0_40px_rgba(59,130,246,0.2)]">
            <h1 className="text-3xl font-bold text-white mb-8 text-center">
              حجز مركبة جديدة
            </h1>

            <div className="space-y-6">
              {/* Date and Time Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-white font-semibold flex items-center gap-2">
                    <Calendar size={20} className="text-blue-400" />
                    التاريخ
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-blue-500/50"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-white font-semibold flex items-center gap-2">
                    <Clock size={20} className="text-blue-400" />
                    الوقت
                  </label>
                  <input
                    type="time"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-blue-500/50"
                    required
                  />
                </div>
              </div>

              {/* Vehicle Type Selection */}
              <div className="space-y-2">
                <label className="text-white font-semibold flex items-center gap-2">
                  <Car size={20} className="text-blue-400" />
                  نوع المركبة
                </label>
                <div className="relative">
                  <select
                    value={selectedVehicleType}
                    onChange={(e) => {
                      setSelectedVehicleType(e.target.value)
                      setSelectedVehicle(null)
                    }}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 pl-12 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none cursor-pointer"
                    required
                  >
                    <option value="" className="bg-gray-800">اختر نوع المركبة</option>
                    {vehicleTypes.map((type) => (
                      <option key={type.id} value={type.name} className="bg-gray-800">
                        {type.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    {selectedVehicleType ? getVehicleIcon(selectedVehicleType) : <Car size={20} className="text-blue-400" />}
                  </div>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" className="text-gray-400">
                      <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Selected Vehicle Display */}
              {selectedVehicle && (
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-semibold text-lg">{selectedVehicle.plateNumber}</p>
                      <p className="text-gray-300">{selectedVehicle.type}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(selectedVehicle.status)}`}>
                      {selectedVehicle.status}
                    </div>
                  </div>
                </div>
              )}

              {/* Vehicle Selection Button */}
              {selectedVehicleType && !selectedVehicle && (
                <button
                  type="button"
                  onClick={() => setShowVehicleModal(true)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <Car size={20} />
                  اختيار رقم اللوحة
                  <ArrowRight size={20} />
                </button>
              )}

              {/* Purpose - Only show after vehicle is selected */}
              {selectedVehicle && (
                <div className="space-y-2">
                  <label className="text-white font-semibold">الغرض من الحجز</label>
                  <div className="relative">
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none cursor-pointer"
                      required
                    >
                      <option value="" className="bg-gray-800">اختر الحالة</option>
                      <option value="محجوزة" className="bg-gray-800">محجوزة</option>
                      <option value="داخل العمل" className="bg-gray-800">داخل العمل</option>
                      <option value="خارج العمل" className="bg-gray-800">خارج العمل</option>
                      <option value="صيانة" className="bg-gray-800">صيانة</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg width="12" height="8" viewBox="0 0 12 8" fill="none" className="text-gray-400">
                        <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>
              )}

              {/* Save Button - Only show after status is selected */}
              {selectedVehicle && selectedStatus && (
                <button
                  type="button"
                  onClick={handleSaveReservation}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  حفظ / تخزين
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Vehicle Selection Modal */}
      {showVehicleModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
          <div className="bg-gray-900/95 backdrop-blur-xl rounded-3xl p-6 md:p-8 max-w-5xl w-full max-h-[85vh] overflow-y-auto border border-blue-500/30 shadow-[0_0_50px_rgba(59,130,246,0.3)] animate-in zoom-in duration-300">
            <div className="flex items-center justify-between mb-6 md:mb-8">
              <div className="flex items-center gap-3">
                {getVehicleIcon(selectedVehicleType)}
                <h2 className="text-xl md:text-2xl font-bold text-white">
                  اختر مركبة - {selectedVehicleType}
                </h2>
              </div>
              <button
                onClick={() => setShowVehicleModal(false)}
                className="text-white hover:text-red-400 hover:bg-red-500/20 p-2 rounded-xl transition-all duration-300"
              >
                <X size={24} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {filteredVehicles.map((vehicle) => (
                <button
                  key={vehicle.id}
                  onClick={() => handleVehicleSelect(vehicle)}
                  disabled={!vehicle.available}
                  className={`p-4 md:p-5 rounded-2xl border transition-all duration-300 transform hover:scale-105 group ${
                    vehicle.available
                      ? 'bg-white/5 border-white/20 hover:border-blue-500/50 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] cursor-pointer'
                      : 'bg-gray-800/50 border-gray-700 cursor-not-allowed opacity-50'
                  }`}
                >
                  <div className="text-center">
                    <p className="text-white font-bold text-lg md:text-2xl mb-2 group-hover:text-blue-400 transition-colors">{vehicle.plateNumber}</p>
                    <p className="text-gray-300 text-xs md:text-sm mb-3 flex items-center justify-center gap-2">
                      {getVehicleIcon(vehicle.type)}
                      {vehicle.type}
                    </p>
                    <div className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium border ${getStatusColor(vehicle.status)}`}>
                      {vehicle.status}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {filteredVehicles.length === 0 && (
              <p className="text-gray-400 text-center py-8">لا توجد مركبات متاحة لهذا النوع</p>
            )}
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  )
}
