import { Link, useParams } from 'react-router-dom'
import AdSlot from '../components/AdSlot.jsx'
import { getPost } from '../data/posts.js'

export default function Post() {
  const { slug } = useParams()
  const post = getPost(slug)

  if (!post) {
    return <div className="prose"><h1>Post not found.</h1><Link to="/writing">Back to writing</Link></div>
  }

  return (
    <article className="prose article-page">
      <Link className="back-link" to="/writing">← Back to writing</Link>
      <span className="pill">{post.eyebrow}</span>
      <h1>{post.title}</h1>
      <p className="lede">{post.summary}</p>
      <p className="muted">{post.date} · {post.minutes} min read</p>
      <AdSlot label="Quiet article ad" slot="3333333333" />
      {post.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      <h2>Working notes</h2>
      <ul>
        {post.takeaways.map((item) => <li key={item}>{item}</li>)}
      </ul>
      <div className="cta-panel compact">
        <h2>Want more notes like this?</h2>
        <p>Explore projects, lab tools, or reach out for software and AI workflow work.</p>
        <div className="hero-actions">
          <Link className="button" to="/projects">Projects</Link>
          <Link className="button primary" to="/hire">Hire Me</Link>
        </div>
      </div>
    </article>
  )
}
