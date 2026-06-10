import { Link, useParams } from 'react-router-dom'
import { ExternalLink } from 'lucide-react'
import { getProject } from '../data/projects.js'

export default function Project() {
  const { slug } = useParams()
  const project = getProject(slug)

  if (!project) return <div className="prose"><h1>Project not found.</h1><Link to="/projects">Back to projects</Link></div>

  return (
    <article className="prose article-page">
      <Link className="back-link" to="/projects">← Back to projects</Link>
      <span className="pill">{project.type}</span>
      <h1>{project.title}</h1>
      <p className="lede">{project.description}</p>
      <dl className="details-grid">
        <div><dt>Status</dt><dd>{project.status}</dd></div>
        <div><dt>Type</dt><dd>{project.type}</dd></div>
        <div><dt>Stack</dt><dd>{project.stack.join(', ')}</dd></div>
      </dl>
      <h2>Why this exists</h2>
      <p>This project is part of Waldmann Lab: a place for building useful systems in public, turning messy ideas into working prototypes, and documenting what breaks along the way.</p>
      <h2>Links</h2>
      <div className="hero-actions">
        <Link className="button primary" to={project.links.demo}>Live demo <ExternalLink size={16} /></Link>
        <a className="button" href={project.links.github}>GitHub</a>
        <Link className="button ghost" to="/hire">Build something similar</Link>
      </div>
    </article>
  )
}
