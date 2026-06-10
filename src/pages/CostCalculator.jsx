import { useMemo, useState } from 'react'
import SectionHeader from '../components/SectionHeader.jsx'

const riskMultipliers = {
  small: 1,
  medium: 1.7,
  large: 2.8
}

const modelRates = {
  basic: 0.02,
  standard: 0.08,
  premium: 0.22,
  local: 0
}

export default function CostCalculator() {
  const [hours, setHours] = useState(3)
  const [prompts, setPrompts] = useState(8)
  const [days, setDays] = useState(22)
  const [model, setModel] = useState('standard')
  const [context, setContext] = useState('medium')
  const [agent, setAgent] = useState(false)

  const result = useMemo(() => {
    const base = hours * prompts * days * modelRates[model]
    const agentMultiplier = agent ? 3.5 : 1
    const estimate = base * riskMultipliers[context] * agentMultiplier
    let risk = 'Low'
    if (estimate > 100 || agent) risk = 'High'
    else if (estimate > 35 || context === 'large') risk = 'Medium'
    return { estimate, risk }
  }, [hours, prompts, days, model, context, agent])

  return (
    <div>
      <SectionHeader eyebrow="Interactive tool" title="AI Coding Cost Calculator">
        A rough workflow risk estimator. It is intentionally conservative: the goal is to reveal when a workflow deserves tighter controls.
      </SectionHeader>

      <section className="tool-panel">
        <div className="form-grid">
          <label>Hours per day
            <input type="number" min="0" value={hours} onChange={(e) => setHours(Number(e.target.value))} />
          </label>
          <label>Prompts per hour
            <input type="number" min="0" value={prompts} onChange={(e) => setPrompts(Number(e.target.value))} />
          </label>
          <label>Days per month
            <input type="number" min="0" value={days} onChange={(e) => setDays(Number(e.target.value))} />
          </label>
          <label>Model tier
            <select value={model} onChange={(e) => setModel(e.target.value)}>
              <option value="local">Local / free</option>
              <option value="basic">Basic cloud model</option>
              <option value="standard">Standard paid model</option>
              <option value="premium">Premium model</option>
            </select>
          </label>
          <label>Repo/context size
            <select value={context} onChange={(e) => setContext(e.target.value)}>
              <option value="small">Small: one file/function</option>
              <option value="medium">Medium: several files</option>
              <option value="large">Large: repo-wide / logs / history</option>
            </select>
          </label>
          <label className="checkbox-label">
            <input type="checkbox" checked={agent} onChange={(e) => setAgent(e.target.checked)} /> Agent mode / autonomous edits
          </label>
        </div>

        <div className="result-card">
          <span className="pill">{result.risk} risk</span>
          <h2>${result.estimate.toFixed(2)} / month</h2>
          <p>This is not exact billing. It is a planning estimate to make expensive patterns visible before they become a problem.</p>
          <h3>Safer workflow</h3>
          <ul>
            <li>Ask for diagnosis before code.</li>
            <li>Limit the model to one file or one error.</li>
            <li>Request the smallest patch, not a rewrite.</li>
            <li>Use local models for routine explanation and boilerplate.</li>
            <li>Set spending limits before connecting any API key.</li>
          </ul>
        </div>
      </section>
    </div>
  )
}
