import SEO from '../components/SEO'
import ProjectCard from '../components/ProjectCard'
import { projects } from '../data/projects'
export default function Projects() {
  return <main className="page-shell"><SEO title="Projects" description="Real project index from RockyWearsAHat GitHub work." /><p className="eyebrow">Project index</p><h1>Actual builds, prototypes, and tools.</h1><p className="lead">A curated index of public work: AI coding infrastructure, local model experiments, workflow tooling, visual systems, security/networking, and business web apps.</p><div className="project-grid">{projects.map((p) => <ProjectCard key={p.slug} project={p} />)}</div></main>
}
