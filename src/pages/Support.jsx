import SectionHeader from '../components/SectionHeader.jsx'
import { site } from '../data/site.js'

export default function Support() {
  return (
    <div>
      <SectionHeader eyebrow="Support" title="Support the work.">
        If a tool, guide, or project here helped you think more clearly, save time, or build something better, you can support future work.
      </SectionHeader>
      <section className="grid feature-grid">
        <a className="card linked-card" href={site.support.coffee}><h2>Buy Me a Coffee</h2><p>Small one-time support for useful writing and tools.</p></a>
        <a className="card linked-card" href={site.support.kofi}><h2>Ko-fi</h2><p>Support experiments, prototypes, and public notes.</p></a>
        <a className="card linked-card" href={site.support.stripe}><h2>Sponsor a tool</h2><p>Help fund a specific guide, calculator, or interactive lab experiment.</p></a>
      </section>
      <p className="muted">Replace these links in `.env` when your accounts are ready.</p>
    </div>
  )
}
