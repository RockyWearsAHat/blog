import { useEffect, useState } from 'react'

export function useScrollProgress(selector = '#scroll-stage') {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const update = () => {
      const el = document.querySelector(selector)
      if (!el) return setProgress(Math.min(1, window.scrollY / Math.max(1, document.body.scrollHeight - innerHeight)))
      const rect = el.getBoundingClientRect()
      const total = rect.height - window.innerHeight
      const traveled = Math.min(Math.max(-rect.top, 0), total)
      setProgress(total <= 0 ? 0 : traveled / total)
      document.documentElement.style.setProperty('--scroll-progress', String(traveled / Math.max(total, 1)))
    }
    update()
    addEventListener('scroll', update, { passive: true })
    addEventListener('resize', update)
    return () => { removeEventListener('scroll', update); removeEventListener('resize', update) }
  }, [selector])
  return progress
}
