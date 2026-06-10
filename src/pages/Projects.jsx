import { Link } from 'react-router-dom'
import SEO from '../components/SEO.jsx'
import { projects } from '../data/projects.js'

export default function Projects() {
  return (
    <section className="page shell">
      <SEO title="Proof of Work" description="Waldmann Labs proof of work: interface systems, tools, and visual engineering." />
      <p className="eyebrow">proof of work</p>
      <h1>The portfolio is the site, but the artifacts live here.</h1>
      <div className="content-grid">
        {projects.map((project) => (
          <Link className="article-card slash-card" to={`/projects/${project.slug}`} key={project.slug}>
            <h3>{project.title}</h3><p>{project.summary}</p><small>{project.stack.join(' · ')}</small>
          </Link>
        ))}
      </div>
    </section>
  )
}
