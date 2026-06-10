import { Link } from 'react-router-dom'
import SectionHeader from '../components/SectionHeader.jsx'
import { labTools } from '../data/labTools.js'

export default function Lab() {
  return (
    <div>
      <SectionHeader eyebrow="Waldmann Lab" title="Tools, experiments, and prototypes.">
        Some are polished. Some are raw. All of them are part of the process of turning technical ideas into useful systems.
      </SectionHeader>
      <div className="grid project-grid">
        {labTools.map((tool) => (
          <Link className="card linked-card" key={tool.slug} to={tool.path}>
            <span className="pill">{tool.status}</span>
            <h2>{tool.title}</h2>
            <p>{tool.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
