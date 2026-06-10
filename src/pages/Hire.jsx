import { Mail } from 'lucide-react'
import SectionHeader from '../components/SectionHeader.jsx'
import { site } from '../data/site.js'

export default function Hire() {
  return (
    <div>
      <SectionHeader eyebrow="Hire Me" title="Software, automation, AI tooling, and technical prototypes.">
        Good fits include internal tools, full-stack prototypes, AI workflow design, data parsing, automation, debugging, and project rescue.
      </SectionHeader>
      <section className="grid feature-grid">
        <article className="card"><h2>AI workflow audit</h2><p>Map where AI helps, where it wastes money, and how to redesign prompts, context, and tooling.</p></article>
        <article className="card"><h2>Prototype build</h2><p>Turn a rough product idea into a working Vite/React app, internal tool, calculator, or proof of concept.</p></article>
        <article className="card"><h2>Automation</h2><p>Build workflows that parse, transform, clean, move, or summarize data reliably.</p></article>
      </section>
      <section className="cta-panel">
        <h2>Start a conversation</h2>
        <p>Send a short note with what you are building, what is broken, and what a successful outcome looks like.</p>
        <a className="button primary" href={`mailto:${site.email}?subject=Project inquiry for Alex Waldmann`}><Mail size={18} /> Email me</a>
      </section>
    </div>
  )
}
