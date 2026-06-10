import { Link, useParams } from 'react-router-dom'
import SEO from '../components/SEO.jsx'
import { posts } from '../data/posts.js'

export default function Post() {
  const { slug } = useParams()
  const post = posts.find((item) => item.slug === slug)
  if (!post) {
    return <section className="page shell"><h1>Field note not found.</h1><Link to="/writing">Back to writing</Link></section>
  }
  return (
    <article className="article shell">
      <SEO title={post.title} description={post.dek} type="article" />
      <Link className="back-link" to="/writing">← Field Notes</Link>
      <header className="article-hero panel ink-panel">
        <p className="eyebrow">{post.tag} · {post.date} · {post.minutes}</p>
        <h1>{post.title}</h1>
        <p>{post.dek}</p>
      </header>
      <div className="article-body">
        {post.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
    </article>
  )
}
