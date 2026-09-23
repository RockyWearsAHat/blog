import { useParams } from 'react-router-dom'
import SEO from '../components/SEO'
import { projects } from '../data/projects'
export default function Project() {
  const { slug } = useParams(); const project = projects.find((p) => p.slug === slug)
  if (!project) return <main className="page-shell"><h1>Project not found.</h1></main>
  return <main className="page-shell detail-page"><SEO title={project.title} description={project.summary} /><p className="eyebrow">{project.type} · {project.year}</p><h1>{project.title}</h1><p className="lead">{project.summary}</p><section className="detail-grid"><article><h2>Why it matters</h2><p>{project.whyItMatters}</p></article><article><h2>Stack</h2><div className="stack-row">{project.stack.map((s)=><span key={s}>{s}</span>)}</div><a className="button-line" href={project.repo} target="_blank" rel="noreferrer">Open repository ↗</a></article></section><section><h2>Proof points</h2><ul className="proof-list">{project.proof.map((item)=><li key={item}>{item}</li>)}</ul></section></main>
}
