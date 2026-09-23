export default function ProjectCard({ project }) {
  return (
    <article className="project-card">
      <div className="card-kicker">{project.type} · {project.status}</div>
      <h3>{project.title}</h3>
      <p>{project.summary}</p>
      <div className="stack-row">{project.stack.slice(0, 4).map((s) => <span key={s}>{s}</span>)}</div>
      <div className="card-actions">
        <a href={`/projects/${project.slug}`}>Read case note</a>
        <a href={project.repo} target="_blank" rel="noreferrer">GitHub ↗</a>
      </div>
    </article>
  )
}
