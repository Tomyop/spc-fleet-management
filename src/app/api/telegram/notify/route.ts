import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userName, vehicleType, vehiclePlate, date, time, purpose } = body

    // التوكن الجديد المحدث
    const botToken = '8683115887:AAEgG4svMgL8PuKqzqSSdv6060rEFwMifsU'
    const chatId = '8624852792'

    // رسالة الإشعار
    const message = `🚨 إشعار حجز مركبة جديد 🚨
    
👤 المستخدم: ${userName}
🚗 نوع المركبة: ${vehicleType}
🔢 رقم اللوحة: ${vehiclePlate}
📅 التاريخ: ${date}
⏰ الوقت: ${time}
🎯 الغرض: ${purpose}

تم إنشاء الحجز بنجاح ✅`

    // إرسال الطلب لتليجرام
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Telegram API Error:', errorData)
      return NextResponse.json({ error: 'Telegram API Error', details: errorData }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Internal Server Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}