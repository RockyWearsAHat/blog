import SEO from '../components/SEO'
import PostCard from '../components/PostCard'
import { posts } from '../data/posts'
export default function Writing(){return <main className="page-shell"><SEO title="Writing" description="Field notes on AI workflow, systems, and dev tooling."/><p className="eyebrow">Field notes</p><h1>Writing for builders who want the real operating model.</h1><p className="lead">No content farm fluff. Notes about cost-aware AI, workflow design, visual systems, and shipping tools under constraints.</p><div className="post-grid">{posts.map((p)=><PostCard key={p.slug} post={p}/>)}</div></main>}
