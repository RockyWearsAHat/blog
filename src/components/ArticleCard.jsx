import { Link } from 'react-router-dom'

export default function ArticleCard({ post }) {
  return (
    <Link className="article-card slash-card" to={`/writing/${post.slug}`}>
      <span className="card-kicker">{post.tag} · {post.minutes}</span>
      <h3>{post.title}</h3>
      <p>{post.dek}</p>
      <small>{post.date}</small>
    </Link>
  )
}
