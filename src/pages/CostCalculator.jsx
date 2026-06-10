import { useMemo, useState } from 'react'
import SEO from '../components/SEO.jsx'

export default function CostCalculator() {
  const [hours, setHours] = useState(4)
  const [prompts, setPrompts] = useState(10)
  const [agent, setAgent] = useState(2.5)
  const [model, setModel] = useState(1.8)
  const estimate = useMemo(() => Math.round(hours * prompts * agent * model * 30 * 0.09), [hours, prompts, agent, model])
  const risk = estimate > 450 ? 'critical' : estimate > 150 ? 'high' : estimate > 40 ? 'watch it' : 'controlled'
  return (
    <section className="page shell calculator-page">
      <SEO title="AI Coding Cost Reactor" description="Estimate AI coding cost risk from prompt volume, agent mode, model cost, and daily usage." />
      <p className="eyebrow">interactive tool</p>
      <h1>AI Coding Cost Reactor</h1>
      <p className="page-lede">A deliberately rough but useful estimator for the kind of workflow that turns “help me code” into a billing incident.</p>
      <div className="calculator panel">
        <label>Hours/day <input type="range" min="1" max="12" value={hours} onChange={(e) => setHours(Number(e.target.value))} /><strong>{hours}</strong></label>
        <label>Prompts/hour <input type="range" min="2" max="40" value={prompts} onChange={(e) => setPrompts(Number(e.target.value))} /><strong>{prompts}</strong></label>
        <label>Agent intensity <select value={agent} onChange={(e) => setAgent(Number(e.target.value))}><option value="1">manual chat</option><option value="2.5">agent mode</option><option value="5">repo-wide chaos</option></select></label>
        <label>Model multiplier <select value={model} onChange={(e) => setModel(Number(e.target.value))}><option value="0.6">local/free</option><option value="1.8">standard paid</option><option value="4">premium heavy</option></select></label>
        <output className={`estimate ${risk.replace(' ', '-')}`}>${estimate}<span>/month estimated risk</span></output>
        <p><strong>Risk: {risk}.</strong> Safer workflow: local model for rough work, paid model for narrow patches, never repo-wide agent mode without a budget.</p>
      </div>
    </section>
  )
}
