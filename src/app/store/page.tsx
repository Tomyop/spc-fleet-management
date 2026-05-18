'use client'

import { useState } from 'react'
import { initialStoreItems } from '@/data/store'
import { Package, AlertTriangle, CheckCircle, XCircle } from 'lucide-react'

export default function Store() {
  const [storeItems, setStoreItems] = useState(initialStoreItems)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'متوفر':
        return 'bg-green-600'
      case 'منخفض':
        return 'bg-orange-600'
      case 'نفذ':
        return 'bg-red-600'
      default:
        return 'bg-gray-600'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'متوفر':
        return CheckCircle
      case 'منخفض':
        return AlertTriangle
      case 'نفذ':
        return XCircle
      default:
        return CheckCircle
    }
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-2xl p-6 shadow-lg">
        <div className="text-white">
          <h2 className="text-3xl font-bold mb-2">مخزن شركة الوقاية الأمنية SPC</h2>
          <p className="text-blue-200">إدارة المخزون والمعدات</p>
        </div>
      </div>

      {/* Store Items Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {storeItems.map((item) => {
          const StatusIcon = getStatusIcon(item.status)
          return (
            <div
              key={item.id}
              className="bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-700"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-600 p-3 rounded-xl">
                    <Package size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{item.name}</h3>
                    <p className="text-gray-400 text-sm">الكمية المتبقية</p>
                  </div>
                </div>
                <div className={`${getStatusColor(item.status)} p-2 rounded-lg`}>
                  <StatusIcon size={20} className="text-white" />
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700">
                <div>
                  <p className="text-3xl font-bold text-white">{item.quantity}</p>
                  <p className="text-gray-500 text-xs">قطعة</p>
                </div>
                <div className="text-left">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                      item.status === 'متوفر'
                        ? 'bg-green-600/20 text-green-400'
                        : item.status === 'منخفض'
                        ? 'bg-orange-600/20 text-orange-400'
                        : 'bg-red-600/20 text-red-400'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Summary Section */}
      <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Package size={20} className="text-blue-400" />
          ملخص المخزون
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-700 rounded-lg p-4">
            <p className="text-gray-400 text-sm mb-1">إجمالي الأصناف</p>
            <p className="text-2xl font-bold text-white">{storeItems.length}</p>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <p className="text-gray-400 text-sm mb-1">متوفر</p>
            <p className="text-2xl font-bold text-green-400">
              {storeItems.filter(item => item.status === 'متوفر').length}
            </p>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <p className="text-gray-400 text-sm mb-1">منخفض / نفذ</p>
            <p className="text-2xl font-bold text-orange-400">
              {storeItems.filter(item => item.status === 'منخفض' || item.status === 'نفذ').length}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
