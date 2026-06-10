import SEO from '../components/SEO.jsx'
import { site } from '../data/site.js'
export default function About() {
  return <section className="page shell"><SEO title="Manifesto" /><p className="eyebrow">manifesto</p><h1>Waldmann Labs is not actually a lab. It is a standard.</h1><p className="page-lede">Built by {site.owner} / @{site.handle}: a public notebook for AI coding, visual engineering, and human-led software craft.</p><div className="panel ink-panel"><h2>Operating rules</h2><p>Make it useful. Make it fast. Make it memorable. Keep the writing indexable. Keep the interface dangerous enough to feel alive.</p></div></section>
}
