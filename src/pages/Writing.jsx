import SEO from '../components/SEO.jsx'
import ArticleCard from '../components/ArticleCard.jsx'
import { posts } from '../data/posts.js'

export default function Writing() {
  return (
    <section className="page shell">
      <SEO title="Field Notes" description="AI coding field notes from Waldmann Labs: cost, local models, prompting, design, and build logs." />
      <p className="eyebrow">field notes</p>
      <h1>AI coding, local-first workflows, and build logs with teeth.</h1>
      <p className="page-lede">Useful posts first. Visual spectacle second. The entire archive is semantic, linkable, and search-readable.</p>
      <div className="content-grid">
        {posts.map((post) => <ArticleCard key={post.slug} post={post} />)}
      </div>
    </section>
  )
}
