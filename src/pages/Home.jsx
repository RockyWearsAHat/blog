import SEO from '../components/SEO'
import CinematicCanvas from '../components/CinematicCanvas'
import ProjectCard from '../components/ProjectCard'
import PostCard from '../components/PostCard'
import { useScrollProgress } from '../hooks/useScrollProgress'
import { projects } from '../data/projects'
import { posts } from '../data/posts'
import { principles, site } from '../data/site'

const navCards = [
  { href: '/writing', label: 'Writing', text: 'Field notes on AI workflows, creative systems, and building without letting agents run wild.' },
  { href: '/workflow', label: 'Workflow', text: 'The actual operating model: inspect, plan, route, build, verify, package, and hand off.' },
  { href: '/projects', label: 'Builds', text: 'Receipts when someone needs them, but not the whole personality of the site.' },
  { href: '/hire', label: 'Hire', text: 'For messy systems that need taste, code, documentation, automation, and judgment.' }
]

const capabilities = [
  ['Interface direction', 'Cinematic surfaces, scroll choreography, motion language, and technical storytelling that makes people stop scrolling.'],
  ['AI workflow control', 'Model routing, local-first experiments, agent guardrails, context packages, and reviewable implementation flow.'],
  ['Internal systems', 'Scripts, dashboards, devtools, docs, handoffs, automations, and ops glue around the real process.'],
  ['Evidence packaging', 'Turn messy work into a site, README, demo, case study, or operating manual that actually explains the value.']
]

const phases = [
  { max: 0.18, tag: '01 · cockpit', title: 'Start inside the machine.', body: 'Open in a readable cockpit frame instead of dropping the user into abstract placeholder geometry.' },
  { max: 0.42, tag: '02 · pan', title: 'Pan out through the window.', body: 'The camera slides outward and reveals the McLaren and tunnel rather than hiding the focal point.' },
  { max: 0.62, tag: '03 · chase', title: 'Lock into a rear chase.', body: 'The car becomes the anchor: imported model, tunnel depth, lane marks, light ribs, and motion streaks all stack around it.' },
  { max: 0.82, tag: '04 · overdrive', title: 'Kick into overdrive.', body: 'White flash, black impact wedges, pink glitch grid, and speed distortion push it toward the reference-video energy.' },
  { max: 1, tag: '05 · landing', title: 'Land on usable content.', body: 'The motion sequence resolves into quick nav and actual content instead of ending as a visual dead-end.' }
]

function PhasePanel({ progress }) {
  const active = phases.find((phase) => progress <= phase.max) || phases[phases.length - 1]
  return (
    <div className="stage-copy stage-phase-card">
      <span>{active.tag}</span>
      <h2>{active.title}</h2>
      <p>{active.body}</p>
    </div>
  )
}

export default function Home() {
  const progress = useScrollProgress('#scroll-stage')
  return (
    <>
      <SEO />
      <section id="scroll-stage" className="scroll-stage driving-stage">
        <CinematicCanvas scrollProgress={progress} />
        <div className="stage-copy stage-hero-copy">
          <p className="eyebrow">Rocky · @{site.handle}</p>
          <h1>Drive the system until the work comes into focus.</h1>
          <p>
            A cinematic build journal for AI workflow, devtools, automation, visual systems, and the kind of messy technical work that does not fit inside a clean resume card.
          </p>
          <div className="hero-actions"><a href="#quick-nav">Enter the site</a><a href="/workflow">See the workflow</a></div>
        </div>
        <PhasePanel progress={progress} />
      </section>

      <main className="page-shell home-after">
        <section id="quick-nav" className="quick-nav-panel">
          <div className="quick-nav-head">
            <p className="eyebrow">Quick nav</p>
            <h2>The motion lands somewhere useful.</h2>
            <p>The site now has a clearer destination after the hero: writing, workflow, builds, and collaboration paths that explain what Rocky actually does.</p>
          </div>
          <div className="quick-nav-grid">
            {navCards.map((card, i) => (
              <a href={card.href} className="quick-nav-card" key={card.href}>
                <strong>{String(i + 1).padStart(2, '0')}</strong>
                <h3>{card.label}</h3>
                <p>{card.text}</p>
              </a>
            ))}
          </div>
        </section>

        <section className="section-grid intro-panel manifesto-panel">
          <div>
            <p className="eyebrow">What this is</p>
            <h2>Not a fake lab. Not a resume skin. A working signal surface.</h2>
          </div>
          <p>
            Rocky is built to communicate taste and operating ability at the same time. The visual system gets attention; the writing and workflow explain how messy work becomes usable systems. The project index is evidence, not the whole personality.
          </p>
        </section>

        <section className="content-belt">
          <div className="belt-statement">
            <p className="eyebrow">Content engine</p>
            <h2>More than visuals: a site that can keep publishing.</h2>
            <p>Every section has a job. The hero proves taste. The nav routes attention. The writing explains opinions. The workflow explains how the work is done. The builds provide receipts only when needed.</p>
          </div>
          <div className="belt-grid">
            {capabilities.map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}
          </div>
        </section>

        <section className="principle-strip">
          {principles.map((p, i) => <article key={p}><strong>{String(i + 1).padStart(2, '0')}</strong><span>{p}</span></article>)}
        </section>

        <section className="split-heading oversized-heading">
          <div><p className="eyebrow">Operating proof</p><h2>Why companies should care.</h2></div>
          <a href="/hire">Hire / collaborate</a>
        </section>
        <section className="proof-panels">
          <article><strong>01</strong><h3>Workflow translation</h3><p>Turn vague, broken internal processes into maps, scripts, interfaces, docs, and repeatable handoffs.</p></article>
          <article><strong>02</strong><h3>AI cost control</h3><p>Route work by risk and difficulty so expensive agents stop doing cheap tasks and humans keep reviewable control.</p></article>
          <article><strong>03</strong><h3>Visual credibility</h3><p>Make technical artifacts feel serious enough for buyers, recruiters, partners, and operators to understand quickly.</p></article>
        </section>

        <section className="split-heading">
          <div><p className="eyebrow">Writing engine</p><h2>Notes that explain the operating system behind the builds.</h2></div>
          <a href="/writing">Read all</a>
        </section>
        <div className="post-grid">{posts.map((p) => <PostCard key={p.slug} post={p} />)}</div>

        <section className="split-heading quiet-projects">
          <div><p className="eyebrow">Evidence, not clutter</p><h2>A few public artifacts when you need receipts.</h2></div>
          <a href={site.github} target="_blank" rel="noreferrer">Open GitHub ↗</a>
        </section>
        <div className="project-grid compact-projects">{projects.slice(0, 3).map((p) => <ProjectCard key={p.slug} project={p} />)}</div>

        <section className="hire-panel">
          <p className="eyebrow">The offer</p>
          <h2>Bring Rocky in when the problem is not one ticket. It is a messy system that needs taste, code, documentation, and judgment.</h2>
          <p>Useful for automation, AI workflow design, devtools, internal tools, technical storytelling, and prototype surfaces that need to look credible instead of hacked together.</p>
          <a href="/workflow">View the workflow</a>
        </section>
      </main>
    </>
  )
}
