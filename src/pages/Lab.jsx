import SEO from '../components/SEO.jsx'
import { labTools } from '../data/labTools.js'

export default function Lab() {
  return (
    <section className="page shell">
      <SEO title="Lab" description="Small tools and experiments from Waldmann Labs." />
      <p className="eyebrow">lab bench</p>
      <h1>Tools, prompts, and small systems.</h1>
      <div className="content-grid">
        {labTools.map((tool) => <a className="article-card slash-card" href={tool.href} key={tool.title}><h3>{tool.title}</h3><p>{tool.description}</p></a>)}
      </div>
    </section>
  )
}
