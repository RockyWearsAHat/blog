import { useEffect } from 'react'
import { site } from '../data/site.js'

export default function SEO({ title, description, type = 'website' }) {
  useEffect(() => {
    const pageTitle = title ? `${title} · ${site.name}` : `${site.name} · ${site.tagline}`
    const copy = description || site.description
    document.title = pageTitle

    const set = (key, value, attr = 'name') => {
      let tag = document.querySelector(`meta[${attr}="${key}"]`)
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute(attr, key)
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', value)
    }

    set('description', copy)
    set('robots', 'index,follow')
    set('og:title', pageTitle, 'property')
    set('og:description', copy, 'property')
    set('og:type', type, 'property')
    set('twitter:card', 'summary_large_image')

    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = `${site.domain}${window.location.pathname}`
  }, [title, description, type])

  return null
}
