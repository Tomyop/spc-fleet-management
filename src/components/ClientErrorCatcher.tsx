'use client'

import { useEffect, useState } from 'react'

export default function ClientErrorCatcher() {
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const onError = (ev: any) => {
      try {
        const msg = ev?.message || (ev?.error && ev.error.message) || String(ev)
        console.error('[ClientErrorCatcher] error', ev)
        setError(msg)
      } catch (e) {
        console.error('[ClientErrorCatcher] failed to process error', e)
      }
    }

    const onRejection = (ev: PromiseRejectionEvent) => {
      try {
        const msg = (ev && (ev.reason && (ev.reason.message || String(ev.reason))) ) || String(ev)
        console.error('[ClientErrorCatcher] unhandledrejection', ev)
        setError(msg)
      } catch (e) {
        console.error('[ClientErrorCatcher] failed to process rejection', e)
      }
    }

    window.addEventListener('error', onError)
    window.addEventListener('unhandledrejection', onRejection)

    return () => {
      window.removeEventListener('error', onError)
      window.removeEventListener('unhandledrejection', onRejection)
    }
  }, [])

  if (!error) return null

  return (
    <div style={{position: 'fixed', right: 12, bottom: 12, zIndex: 9999}}>
      <div style={{background: 'rgba(255,40,40,0.95)', color: 'white', padding: '10px 14px', borderRadius: 8, maxWidth: 420, fontSize: 13, boxShadow: '0 6px 20px rgba(0,0,0,0.5)'}}>
        <div style={{fontWeight: 700, marginBottom: 6}}>Client Error (click to clear)</div>
        <div style={{whiteSpace: 'pre-wrap', maxHeight: 200, overflow: 'auto'}}>{error}</div>
        <div style={{marginTop: 8, display: 'flex', gap: 8}}>
          <button onClick={() => setError(null)} style={{background: 'rgba(255,255,255,0.12)', color: 'white', border: 'none', padding: '6px 8px', borderRadius: 6}}>Dismiss</button>
          <button onClick={() => { navigator.clipboard?.writeText(error || '') }} style={{background: 'rgba(255,255,255,0.12)', color: 'white', border: 'none', padding: '6px 8px', borderRadius: 6}}>Copy</button>
        </div>
      </div>
    </div>
  )
}
