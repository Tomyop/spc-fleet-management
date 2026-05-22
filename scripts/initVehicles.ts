import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, getDocs, query, where } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || ""
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const vehicles = [
  {
    plateNumber: '5-2621633',
    type: 'Hyundai Tucson',
    year: 2021,
    color: 'أبيض',
    ownership: 'SPC',
    chassisNumber: 'KMHJB81DBNU216228',
    status: 'داخل العمل',
    available: true,
    createdAt: new Date().toISOString()
  },
  {
    plateNumber: '5-2622144',
    type: 'Hyundai Tucson',
    year: 2021,
    color: 'أبيض',
    ownership: 'SPC',
    chassisNumber: 'KMHJB81DBNU127099',
    status: 'داخل العمل',
    available: true,
    createdAt: new Date().toISOString()
  },
  {
    plateNumber: '5-2970154',
    type: 'Hyundai Creta',
    year: 2024,
    color: 'أبيض',
    ownership: 'SPC',
    chassisNumber: 'MF3PB812ESJ144885',
    status: 'داخل العمل',
    available: true,
    createdAt: new Date().toISOString()
  },
  {
    plateNumber: '5-2882336',
    type: 'Hyundai Creta',
    year: 2023,
    color: 'أبيض',
    ownership: 'SPC',
    chassisNumber: 'MALPB812EPM290301',
    status: 'داخل العمل',
    available: true,
    createdAt: new Date().toISOString()
  },
  {
    plateNumber: '5-2718951',
    type: 'Hyundai Creta',
    year: 2023,
    color: 'أبيض',
    ownership: 'SPC',
    chassisNumber: 'MALPB812EPM294350',
    status: 'داخل العمل',
    available: true,
    createdAt: new Date().toISOString()
  },
  {
    plateNumber: '5-2417421',
    type: 'TLC B6',
    year: 2021,
    color: 'أبيض',
    ownership: 'SPC',
    chassisNumber: 'JTMHX01J4M4228295',
    status: 'داخل العمل',
    available: true,
    createdAt: new Date().toISOString()
  },
  {
    plateNumber: '5-2417413',
    type: 'TLC B6',
    year: 2021,
    color: 'أبيض',
    ownership: 'SPC',
    chassisNumber: 'JTMHX01J6M4228301',
    status: 'داخل العمل',
    available: true,
    createdAt: new Date().toISOString()
  },
  {
    plateNumber: '5-2882682',
    type: 'Hyundai H1',
    year: 2014,
    color: 'أبيض',
    ownership: 'SPC',
    chassisNumber: 'KMJWA37RAFU706901',
    status: 'داخل العمل',
    available: true,
    createdAt: new Date().toISOString()
  },
  {
    plateNumber: '5-2547657',
    type: 'Hyundai Santa Fe',
    year: 2018,
    color: 'رمادي',
    ownership: 'SPC',
    chassisNumber: 'KMHST8ICDJU842664',
    status: 'داخل العمل',
    available: true,
    createdAt: new Date().toISOString()
  },
  {
    plateNumber: '5-2549379',
    type: 'Hyundai Santa Fe',
    year: 2019,
    color: 'رمادي',
    ownership: 'SPC',
    chassisNumber: 'KMHS381FDLU206088',
    status: 'داخل العمل',
    available: true,
    createdAt: new Date().toISOString()
  }
]

async function initVehicles() {
  try {
    console.log('Starting to add vehicles to Firebase...')
    
    for (const vehicle of vehicles) {
      // Check if vehicle already exists
      const q = query(collection(db, 'vehicles'), where('plateNumber', '==', vehicle.plateNumber))
      const querySnapshot = await getDocs(q)
      
      if (querySnapshot.empty) {
        await addDoc(collection(db, 'vehicles'), vehicle)
        console.log(`Added vehicle: ${vehicle.plateNumber}`)
      } else {
        console.log(`Vehicle already exists: ${vehicle.plateNumber}`)
      }
    }
    
    console.log('Vehicles initialization completed!')
  } catch (error) {
    console.error('Error initializing vehicles:', error)
  }
}

initVehicles()
