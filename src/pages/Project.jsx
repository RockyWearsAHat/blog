import { Link, useParams } from 'react-router-dom'
import SEO from '../components/SEO.jsx'
import { projects } from '../data/projects.js'

export default function Project() {
  const { slug } = useParams()
  const project = projects.find((item) => item.slug === slug)
  if (!project) return <section className="page shell"><h1>Artifact missing.</h1><Link to="/projects">Back</Link></section>
  return (
    <section className="page shell">
      <SEO title={project.title} description={project.summary} />
      <Link className="back-link" to="/projects">← Proof of work</Link>
      <div className="panel ink-panel">
        <p className="eyebrow">artifact</p><h1>{project.title}</h1><p>{project.summary}</p>
        <p><strong>Stack:</strong> {project.stack.join(', ')}</p><p><strong>Proof:</strong> {project.proof}</p>
      </div>
    </section>
  )
}
