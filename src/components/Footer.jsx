import { site } from '../data/site.js'

export default function Footer() {
  return (
    <footer className="site-footer">
      <p>
        <strong>{site.name}</strong> · Built by {site.owner} · <a href={site.github}>@{site.handle}</a>
      </p>
      <p>Black-white comic metal, scroll-rigged Three.js, readable enough for search engines, loud enough to remember.</p>
    </footer>
  )
}
