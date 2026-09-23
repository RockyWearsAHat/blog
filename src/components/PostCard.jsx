export default function PostCard({ post }) {
  return (
    <article className="post-card">
      <div className="card-kicker">{post.tag} · {post.date}</div>
      <h3>{post.title}</h3>
      <p>{post.excerpt}</p>
      <a href={`/writing/${post.slug}`}>Read note</a>
    </article>
  )
}
