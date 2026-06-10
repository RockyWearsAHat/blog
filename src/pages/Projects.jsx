import { Link } from 'react-router-dom'
import SectionHeader from '../components/SectionHeader.jsx'
import { projects } from '../data/projects.js'

export default function Projects() {
  return (
    <div>
      <SectionHeader eyebrow="Projects" title="Software, tools, and experiments.">
        A portfolio of what I’m building: useful products, technical prototypes, automation, creative coding, and AI-assisted workflows.
      </SectionHeader>
      <div className="grid project-grid">
        {projects.map((project) => (
          <Link className="card linked-card" key={project.slug} to={`/projects/${project.slug}`}>
            <span className="pill">{project.status}</span>
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <div className="tag-row">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}
