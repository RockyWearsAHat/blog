import { Link } from 'react-router-dom'
import SEO from '../components/SEO.jsx'
import ArticleCard from '../components/ArticleCard.jsx'
import AdSlot from '../components/AdSlot.jsx'
import { posts } from '../data/posts.js'
import { site } from '../data/site.js'

export default function Home() {
  return (
    <>
      <SEO />
      <section className="hero shell" aria-labelledby="hero-title">
        <div className="hero-copy panel ink-panel">
          <p className="eyebrow">R3F · shader ink · scroll impact frames</p>
          <h1 id="hero-title">AI coding notes inside a chrome manga machine.</h1>
          <p className="hero-lede">
            Waldmann Labs is not a project list. It is the artifact: a black-and-white comic-metal interface for field notes, tools, and proof that taste still matters.
          </p>
          <div className="hero-actions">
            <Link className="button primary" to="/writing">Read field notes</Link>
            <Link className="button" to="/tools/ai-coding-cost-calculator">Open reactor</Link>
            <a className="button ghost" href={site.repo}>View repo</a>
          </div>
        </div>
        <aside className="hero-spec panel">
          <span>visual brief</span>
          <strong>donut/cube impact reel energy</strong>
          <p>Speed-line tunnel. Inked central mesh. Pink glitch explosion. Scroll-scrubbed camera. SEO text stays real.</p>
        </aside>
      </section>

      <section className="impact-scroll" aria-label="Scroll-driven visual chapters">
        <article className="impact-card left">
          <span className="chapter">01 / whiteout</span>
          <h2>High contrast manga blast.</h2>
          <p>Like the donut frames: white paper, violent black lines, central object getting sliced by speed.</p>
        </article>
        <article className="impact-card right pink">
          <span className="chapter">02 / cube detonation</span>
          <h2>Pink energy failure state.</h2>
          <p>Grid floor, neon fragments, aggressive outlines, and the feeling that Blender just became a comic panel.</p>
        </article>
        <article className="impact-card left">
          <span className="chapter">03 / tunnel punch</span>
          <h2>The page moves like an impact frame.</h2>
          <p>The scene is always slightly alive, but the big transformations are driven by scroll so navigation feels physical.</p>
        </article>
      </section>

      <section className="shell split-section">
        <div className="panel slash-card">
          <p className="eyebrow">why this exists</p>
          <h2>The site itself is the portfolio.</h2>
          <p>
            No beige cards. No generic template. This is a content site that still proves engineering, motion design, restraint, and the ability to ship something memorable.
          </p>
        </div>
        <div className="stats-grid">
          <div><strong>R3F</strong><span>Three.js scene</span></div>
          <div><strong>GLSL</strong><span>ink shader</span></div>
          <div><strong>SEO</strong><span>semantic pages</span></div>
          <div><strong>0 fluff</strong><span>sharp content</span></div>
        </div>
      </section>

      <section className="shell content-grid" aria-labelledby="latest-title">
        <div className="section-heading">
          <p className="eyebrow">latest field notes</p>
          <h2 id="latest-title">Readable, useful, searchable.</h2>
        </div>
        {posts.map((post) => <ArticleCard key={post.slug} post={post} />)}
      </section>

      <section className="shell reference-section">
        <p className="eyebrow">reference treatment</p>
        <h2>Built from the three reels you sent.</h2>
        <div className="reference-grid">
          {site.instagramReferences.map((ref) => (
            <a key={ref.url} className="reference-card" href={ref.url} target="_blank" rel="noreferrer">
              <strong>{ref.title}</strong>
              <span>{ref.treatment}</span>
            </a>
          ))}
        </div>
      </section>
      <div className="shell"><AdSlot /></div>
    </>
  )
}
