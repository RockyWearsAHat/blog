import SEO from '../components/SEO.jsx'
import { site } from '../data/site.js'
export default function Hire() {
  return <section className="page shell"><SEO title="Hire" description="Hire Alex Waldmann for sharp web interfaces, AI coding workflows, and automation systems." /><p className="eyebrow">hire</p><h1>Need an interface that does not feel like a template?</h1><p className="page-lede">I build polished, useful systems: web experiences, AI workflows, automation, and sharp technical content.</p><div className="panel"><h2>Best fit</h2><p>Interactive landing pages, AI workflow audits, internal tools, data automation, and developer-facing content that needs both credibility and taste.</p><a className="button primary" href={`mailto:${site.email}`}>Email {site.owner}</a></div></section>
}
