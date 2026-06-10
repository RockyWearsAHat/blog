import { Link } from 'react-router-dom'
import SectionHeader from '../components/SectionHeader.jsx'
import AdSlot from '../components/AdSlot.jsx'
import { posts } from '../data/posts.js'

export default function Writing() {
  return (
    <div>
      <SectionHeader eyebrow="Writing" title="Technical essays, build logs, and field notes.">
        Practical notes on software, AI tooling, local-first workflows, debugging, systems thinking, and experiments.
      </SectionHeader>
      <div className="list-stack">
        {posts.map((post) => (
          <Link className="wide-card" key={post.slug} to={`/writing/${post.slug}`}>
            <div>
              <span className="pill">{post.eyebrow}</span>
              <h2>{post.title}</h2>
              <p>{post.summary}</p>
            </div>
            <small>{post.date} · {post.minutes} min</small>
          </Link>
        ))}
      </div>
      <AdSlot label="Tiny article-list ad" slot="2222222222" />
    </div>
  )
}
