import { useEffect, useRef } from 'react'

const client = import.meta.env.VITE_ADSENSE_CLIENT

export default function AdSlot({ slot = '0000000000', label = 'Sponsored' }) {
  const pushed = useRef(false)

  useEffect(() => {
    if (!client || pushed.current) return
    pushed.current = true
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (error) {
      console.warn('AdSense slot could not initialize', error)
    }
  }, [])

  if (!client) {
    return (
      <aside className="ad-slot ad-placeholder" aria-label="Ad placeholder">
        <span>{label}</span>
        <p>AdSense placeholder. Add VITE_ADSENSE_CLIENT and real slot IDs after approval.</p>
      </aside>
    )
  }

  return (
    <aside className="ad-slot" aria-label={label}>
      <span>{label}</span>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  )
}
