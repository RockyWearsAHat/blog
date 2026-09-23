import { useParams } from 'react-router-dom'
import SEO from '../components/SEO'
import { posts } from '../data/posts'
export default function Post(){const {slug}=useParams(); const post=posts.find((p)=>p.slug===slug); if(!post)return <main className="page-shell"><h1>Post not found.</h1></main>; return <main className="page-shell article-page"><SEO title={post.title} description={post.excerpt} type="article"/><p className="eyebrow">{post.tag} · {post.date}</p><h1>{post.title}</h1><p className="lead">{post.excerpt}</p>{post.body.map((p,i)=><p key={i}>{p}</p>)}</main>}
