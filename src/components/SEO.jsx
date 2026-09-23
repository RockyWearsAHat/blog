import { useEffect } from 'react'
import { site } from '../data/site'

export default function SEO({ title, description, type = 'website' }) {
  useEffect(() => {
    const pageTitle = title ? `${title} · ${site.name}` : `${site.name} · ${site.tagline}`
    document.title = pageTitle
    const upsert = (name, value, attr = 'name') => {
      let el = document.querySelector(`meta[${attr}="${name}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, name)
        document.head.appendChild(el)
      }
      el.setAttribute('content', value)
    }
    upsert('description', description || site.description)
    upsert('og:title', pageTitle, 'property')
    upsert('og:description', description || site.description, 'property')
    upsert('og:type', type, 'property')
    upsert('twitter:card', 'summary_large_image')
  }, [title, description, type])
  return null
}
