export interface StoreItem {
  id: string
  name: string
  quantity: number
  status: 'متوفر' | 'منخفض' | 'نفذ'
}

export const initialStoreItems: StoreItem[] = [
  { id: '1', name: 'أجهزة لاسلكي', quantity: 12, status: 'متوفر' },
  { id: '2', name: 'شواحن', quantity: 7, status: 'متوفر' },
  { id: '3', name: 'بطاريات', quantity: 20, status: 'متوفر' },
  { id: '4', name: 'حقائب إسعافات', quantity: 4, status: 'منخفض' },
]
