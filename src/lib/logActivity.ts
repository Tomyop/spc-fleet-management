export async function logActivity(
  operationType: string,
  vehicleNumber: string | null,
  vehicleType: string | null,
  username: string | null,
  department: string | null,
  status: string | null,
  notes: string | null
) {
  const webhook = 'https://script.google.com/macros/s/AKfycbxUqzpDKSAimJhT-NZjleC3QMBzI3qr8RVVgox0D8WWmP7IKDT85GT7Szo77QjxCWhn/exec'
  const payload = {
    operationType,
    vehicleNumber: vehicleNumber || '',
    vehicleType: vehicleType || '',
    username: username || '',
    department: department || '',
    status: status || '',
    notes: notes || '',
    timestamp: new Date().toISOString()
  }

  const controller = typeof AbortController !== 'undefined' ? new AbortController() : null
  const timeout = controller ? setTimeout(() => controller.abort(), 8000) : null

  try {
    console.group(`[ActivityLog] ${operationType} — ${vehicleNumber || 'N/A'}`)
    console.info('[ActivityLog] Sending payload to webhook:', webhook)
    console.debug('[ActivityLog] Payload', payload)

    const res = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller ? controller.signal : undefined
    })

    if (timeout) clearTimeout(timeout)

    if (!res.ok) {
      const text = await res.text().catch(() => '')
      console.error('[ActivityLog] Webhook returned non-OK status', res.status, text)
      console.groupEnd()
      return false
    }

    const body = await res.json().catch(() => null)
    console.info('[ActivityLog] Webhook response OK', body)
    console.groupEnd()
    return true
  } catch (err: any) {
    if (err && err.name === 'AbortError') {
      console.error('[ActivityLog] Request aborted (timeout)')
    } else {
      console.error('[ActivityLog] Error sending activity', err)
    }
    console.groupEnd()
    return false
  }
}
