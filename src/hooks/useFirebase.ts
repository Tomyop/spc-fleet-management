'use client'

import { useState, useEffect } from 'react'
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  query, 
  where, 
  orderBy,
  getDoc,
  onSnapshot
} from 'firebase/firestore'
import { db } from '@/firebase/firebaseConfig'

export function useVehicles() {
  const [vehicles, setVehicles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      const q = query(collection(db, 'vehicles'), orderBy('createdAt', 'desc'))
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const vehiclesData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setVehicles(vehiclesData)
        setLoading(false)
      }, (err) => {
        console.error('Firebase vehicles error:', err)
        setError(err.message)
        setLoading(false)
      })

      return () => unsubscribe()
    } catch (err) {
      console.error('Firebase vehicles setup error:', err)
      setError(err instanceof Error ? err.message : 'Unknown error')
      setLoading(false)
    }
  }, [])

  const addVehicle = async (vehicle: any) => {
    await addDoc(collection(db, 'vehicles'), {
      ...vehicle,
      createdAt: new Date().toISOString()
    })
  }

  const updateVehicle = async (id: string, vehicle: any) => {
    await updateDoc(doc(db, 'vehicles', id), vehicle)
  }

  const deleteVehicle = async (id: string) => {
    await deleteDoc(doc(db, 'vehicles', id))
  }

  return { vehicles, loading, addVehicle, updateVehicle, deleteVehicle }
}

export function useEntryExit() {
  const [entries, setEntries] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      const q = query(collection(db, 'entryExit'), orderBy('timestamp', 'desc'))
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const entriesData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setEntries(entriesData)
        setLoading(false)
      }, (err) => {
        console.error('Firebase entry/exit error:', err)
        setError(err.message)
        setLoading(false)
      })

      return () => unsubscribe()
    } catch (err) {
      console.error('Firebase entry/exit setup error:', err)
      setError(err instanceof Error ? err.message : 'Unknown error')
      setLoading(false)
    }
  }, [])

  const addEntry = async (entry: any) => {
    await addDoc(collection(db, 'entryExit'), {
      ...entry,
      timestamp: new Date().toISOString()
    })
  }

  return { entries, loading, addEntry }
}

export function useReservations() {
  const [reservations, setReservations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      const q = query(collection(db, 'reservations'), orderBy('date', 'desc'))
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const reservationsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setReservations(reservationsData)
        setLoading(false)
      }, (err) => {
        console.error('Firebase reservations error:', err)
        setError(err.message)
        setLoading(false)
      })

      return () => unsubscribe()
    } catch (err) {
      console.error('Firebase reservations setup error:', err)
      setError(err instanceof Error ? err.message : 'Unknown error')
      setLoading(false)
    }
  }, [])

  const addReservation = async (reservation: any) => {
    await addDoc(collection(db, 'reservations'), {
      ...reservation,
      createdAt: new Date().toISOString()
    })
  }

  const updateReservation = async (id: string, data: any) => {
    await updateDoc(doc(db, 'reservations', id), data)
  }

  const deleteReservation = async (id: string) => {
    await deleteDoc(doc(db, 'reservations', id))
  }

  return { reservations, loading, addReservation, updateReservation, deleteReservation }
}

export function useInventory() {
  const [inventory, setInventory] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      const q = query(collection(db, 'inventory'), orderBy('name'))
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const inventoryData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setInventory(inventoryData)
        setLoading(false)
      }, (err) => {
        console.error('Firebase inventory error:', err)
        setError(err.message)
        setLoading(false)
      })

      return () => unsubscribe()
    } catch (err) {
      console.error('Firebase inventory setup error:', err)
      setError(err instanceof Error ? err.message : 'Unknown error')
      setLoading(false)
    }
  }, [])

  const addItem = async (item: any) => {
    await addDoc(collection(db, 'inventory'), {
      ...item,
      createdAt: new Date().toISOString()
    })
  }

  const updateItem = async (id: string, item: any) => {
    await updateDoc(doc(db, 'inventory', id), item)
  }

  const deleteItem = async (id: string) => {
    await deleteDoc(doc(db, 'inventory', id))
  }

  return { inventory, loading, addItem, updateItem, deleteItem }
}

export function useNotes() {
  const [notes, setNotes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      const q = query(collection(db, 'notes'), orderBy('createdAt', 'desc'))
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const notesData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setNotes(notesData)
        setLoading(false)
      }, (err) => {
        console.error('Firebase notes error:', err)
        setError(err.message)
        setLoading(false)
      })

      return () => unsubscribe()
    } catch (err) {
      console.error('Firebase notes setup error:', err)
      setError(err instanceof Error ? err.message : 'Unknown error')
      setLoading(false)
    }
  }, [])

  const addNote = async (note: any) => {
    await addDoc(collection(db, 'notes'), {
      ...note,
      createdAt: new Date().toISOString()
    })
  }

  const updateNote = async (id: string, note: any) => {
    await updateDoc(doc(db, 'notes', id), note)
  }

  const deleteNote = async (id: string) => {
    await deleteDoc(doc(db, 'notes', id))
  }

  return { notes, loading, addNote, updateNote, deleteNote }
}
