import { Link } from 'react-router-dom'
import { ArrowRight, Braces, Cpu, FlaskConical, PenTool, Wrench } from 'lucide-react'
import Card from '../components/Card.jsx'
import AdSlot from '../components/AdSlot.jsx'
import { posts } from '../data/posts.js'
import { projects } from '../data/projects.js'

export default function Home() {
  return (
    <div>
      <section className="hero">
        <p className="eyebrow">Personal engineering lab</p>
        <h1>Alex Waldmann builds software, AI-assisted systems, and experimental tools.</h1>
        <p className="hero-copy">
          This site is a public workspace: projects, technical writing, build logs, experiments, and tools for people who want to understand complex systems more clearly.
        </p>
        <div className="hero-actions">
          <Link className="button primary" to="/projects">View Projects <ArrowRight size={18} /></Link>
          <Link className="button" to="/writing">Read Writing</Link>
          <Link className="button ghost" to="/lab">Explore the Lab</Link>
        </div>
      </section>

      <section className="grid feature-grid">
        <Card>
          <Cpu className="icon" />
          <h3>AI systems</h3>
          <p>Practical workflows, cost-aware tooling, local-first experiments, and engineering judgment around AI-assisted development.</p>
        </Card>
        <Card>
          <Braces className="icon" />
          <h3>Software projects</h3>
          <p>Web apps, developer utilities, automation workflows, data tools, and prototypes that turn ideas into usable systems.</p>
        </Card>
        <Card>
          <FlaskConical className="icon" />
          <h3>Waldmann Lab</h3>
          <p>Small tools, experiments, calculators, prompts, visual systems, and unfinished ideas built in public.</p>
        </Card>
      </section>

      <section className="split-section">
        <div>
          <p className="eyebrow">Featured writing</p>
          <h2>Technical notes, build logs, and systems thinking.</h2>
        </div>
        <Link className="text-link" to="/writing">All writing <ArrowRight size={16} /></Link>
      </section>
      <div className="grid post-grid">
        {posts.slice(0, 3).map((post) => (
          <Link className="card linked-card" key={post.slug} to={`/writing/${post.slug}`}>
            <span className="pill">{post.eyebrow}</span>
            <h3>{post.title}</h3>
            <p>{post.summary}</p>
            <small>{post.minutes} min read</small>
          </Link>
        ))}
      </div>

      <AdSlot label="Small non-intrusive ad" slot="1111111111" />

      <section className="split-section">
        <div>
          <p className="eyebrow">Featured projects</p>
          <h2>Things being built, tested, and shipped.</h2>
        </div>
        <Link className="text-link" to="/projects">All projects <ArrowRight size={16} /></Link>
      </section>
      <div className="grid project-grid">
        {projects.slice(0, 3).map((project) => (
          <Link className="card linked-card" key={project.slug} to={`/projects/${project.slug}`}>
            <span className="pill">{project.type}</span>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="tag-row">{project.stack.slice(0, 3).map((item) => <span key={item}>{item}</span>)}</div>
          </Link>
        ))}
      </div>

      <section className="cta-panel">
        <PenTool className="icon" />
        <h2>Need software, automation, AI tooling, or a technical prototype?</h2>
        <p>I’m interested in projects where clear thinking, practical systems, and fast iteration matter.</p>
        <Link className="button primary" to="/hire">Work with me <Wrench size={18} /></Link>
      </section>
    </div>
  )
}
