'use client'

import { useState, useEffect } from 'react'
import { initialVehicles } from '@/data/vehicles'
import { logActivity } from '@/lib/logActivity'

export function useVehicles() {
  const [vehicles, setVehicles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedVehicles = localStorage.getItem('spc_vehicles')
      const allVehicles = savedVehicles ? JSON.parse(savedVehicles) : initialVehicles
      setVehicles(allVehicles.filter((v: any) => !v.hidden))
    }
    setLoading(false)
  }, [])

  // Listen for localStorage changes to update vehicles dynamically
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'spc_vehicles' && e.newValue) {
        const allVehicles = JSON.parse(e.newValue)
        setVehicles(allVehicles.filter((v: any) => !v.hidden))
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  useEffect(() => {
    if (!loading && typeof window !== 'undefined') {
      localStorage.setItem('spc_vehicles', JSON.stringify(vehicles))
    }
  }, [vehicles, loading])

  const addVehicle = async (vehicle: any) => {
    const newVehicle = {
      ...vehicle,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    }
    setVehicles([newVehicle, ...vehicles])
  }

  const updateVehicle = async (id: string, vehicle: any) => {
    const newVehicles = vehicles.map(v => v.id === id ? { ...v, ...vehicle } : v)
    setVehicles(newVehicles)
    try {
      const updated = newVehicles.find(v => v.id === id)
      const user = typeof window !== 'undefined' ? localStorage.getItem('spc_user') : ''
      await logActivity(
        'تحديث بيانات مركبة',
        updated?.plateNumber || id,
        updated?.type || null,
        user || null,
        null,
        updated?.status || null,
        JSON.stringify(vehicle)
      )
    } catch (e) {
      console.error('[useLocalData] Failed to log vehicle update', e)
    }
  }

  const deleteVehicle = async (id: string) => {
    setVehicles(vehicles.filter(v => v.id !== id))
  }

  // Computed statistics - only count vehicles with actual operations
  const stats = {
    total: vehicles.filter(v => v.status !== null).length,
    inService: vehicles.filter(v => v.status === 'داخل العمل').length,
    outOfService: vehicles.filter(v => v.status === 'خارج العمل').length,
    reserved: vehicles.filter(v => v.status === 'محجوزة').length,
    maintenance: vehicles.filter(v => v.status === 'صيانة').length,
  }

  return { vehicles, loading, addVehicle, updateVehicle, deleteVehicle, stats }
}

export function useEntryExit() {
  const [entries, setEntries] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setEntries([])
      setLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const addEntry = async (entry: any) => {
    const newEntry = {
      ...entry,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    }
    setEntries([newEntry, ...entries])
    try {
      const user = typeof window !== 'undefined' ? localStorage.getItem('spc_user') : ''
      await logActivity(
        newEntry.type || 'دخول/خروج',
        newEntry.vehiclePlate || null,
        newEntry.vehicleType || null,
        user || null,
        null,
        newEntry.type || null,
        newEntry.notes || null
      )
    } catch (e) {
      console.error('[useLocalData] Failed to log entry activity', e)
    }
  }

  return { entries, loading, addEntry }
}

export function useReservations() {
  const [reservations, setReservations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setReservations([])
      setLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const addReservation = async (reservation: any) => {
    const newReservation = {
      ...reservation,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    }
    setReservations([newReservation, ...reservations])
    try {
      await logActivity(
        'حجز مركبة',
        newReservation.vehiclePlate || null,
        newReservation.vehicleType || null,
        newReservation.userName || null,
        null,
        newReservation.status || null,
        newReservation.purpose || null
      )
    } catch (e) {
      console.error('[useLocalData] Failed to log reservation', e)
    }
  }

  const updateReservation = async (id: string, data: any) => {
    setReservations(reservations.map(r => r.id === id ? { ...r, ...data } : r))
  }

  const deleteReservation = async (id: string) => {
    const target = reservations.find(r => r.id === id)
    setReservations(reservations.filter(r => r.id !== id))
    try {
      if (target) {
        await logActivity(
          'إلغاء حجز',
          target.vehiclePlate || null,
          target.vehicleType || null,
          target.userName || null,
          null,
          'ملغى',
          null
        )
      }
    } catch (e) {
      console.error('[useLocalData] Failed to log reservation cancellation', e)
    }
  }

  return { reservations, loading, addReservation, updateReservation, deleteReservation }
}

export function useInventory() {
  const [inventory, setInventory] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setInventory([])
      setLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const addItem = async (item: any) => {
    const newItem = {
      ...item,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    }
    setInventory([newItem, ...inventory])
  }

  const updateItem = async (id: string, item: any) => {
    setInventory(inventory.map(i => i.id === id ? { ...i, ...item } : i))
  }

  const deleteItem = async (id: string) => {
    setInventory(inventory.filter(i => i.id !== id))
  }

  return { inventory, loading, addItem, updateItem, deleteItem }
}

export function useNotes() {
  const [notes, setNotes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setNotes([])
      setLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const addNote = async (note: any) => {
    const newNote = {
      ...note,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    }
    setNotes([newNote, ...notes])
  }

  const updateNote = async (id: string, note: any) => {
    setNotes(notes.map(n => n.id === id ? { ...n, ...note } : n))
  }

  const deleteNote = async (id: string) => {
    setNotes(notes.filter(n => n.id !== id))
  }

  return { notes, loading, addNote, updateNote, deleteNote }
}
