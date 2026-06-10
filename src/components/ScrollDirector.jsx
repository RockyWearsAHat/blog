import { useEffect } from 'react'

export default function ScrollDirector() {
  useEffect(() => {
    let raf = 0
    const root = document.documentElement
    const update = () => {
      const max = Math.max(1, document.body.scrollHeight - window.innerHeight)
      const progress = Math.min(1, Math.max(0, window.scrollY / max))
      root.style.setProperty('--scroll', progress.toFixed(5))
      root.style.setProperty('--scroll-px', `${window.scrollY.toFixed(1)}px`)
      root.style.setProperty('--vh', `${window.innerHeight * 0.01}px`)
      raf = 0
    }
    const request = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', request, { passive: true })
    window.addEventListener('resize', request)
    return () => {
      window.removeEventListener('scroll', request)
      window.removeEventListener('resize', request)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])
  return null
}
