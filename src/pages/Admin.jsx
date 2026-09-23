import { useEffect, useState } from 'react'
import SEO from '../components/SEO'
import { api } from '../utils/api'

const emptyPost = { title: '', slug: '', tag: '', excerpt: '', body: '' }
export default function Admin() {
  const [user, setUser] = useState(null)
  const [content, setContent] = useState({ posts: [], projects: [] })
  const [draft, setDraft] = useState(emptyPost)
  const [message, setMessage] = useState('Loading...')
  useEffect(() => { boot() }, [])
  async function boot(){ try { const me=await api('/api/auth/me'); if(!me.user){ location.href='/login'; return } setUser(me.user); const c=await api('/api/content'); setContent(c); setMessage(me.localFallback||c.localFallback?'Local dev fallback active. Use netlify dev/dev:full for real DB.':'Connected.') } catch(e){ setMessage(e.message) } }
  async function savePost(e){ e.preventDefault(); const post = { ...draft, body: draft.body.split('\n').filter(Boolean), date: new Date().toISOString().slice(0,10) }; try { await api('/api/content/posts',{method:'POST',body:JSON.stringify(post)}); setContent((c)=>({...c,posts:[post,...c.posts]})); setDraft(emptyPost); setMessage('Saved post.') } catch(e){ setMessage(e.message) } }
  async function logout(){ await api('/api/auth/logout',{method:'POST'}); location.href='/login' }
  return <main className="page-shell admin-page"><SEO title="Admin"/><p className="eyebrow">Content console</p><h1>Admin panel</h1><p className="lead">Create blog notes, review dynamic content, and keep the site useful without editing code every time.</p><div className="admin-bar"><span>{user?.email}</span><button onClick={logout}>Logout</button></div><p className="form-message">{message}</p><section className="admin-grid"><form className="auth-card" onSubmit={savePost}><h2>New post</h2><label>Title<input value={draft.title} onChange={(e)=>setDraft({...draft,title:e.target.value,slug:e.target.value.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')})}/></label><label>Slug<input value={draft.slug} onChange={(e)=>setDraft({...draft,slug:e.target.value})}/></label><label>Tag<input value={draft.tag} onChange={(e)=>setDraft({...draft,tag:e.target.value})}/></label><label>Excerpt<textarea value={draft.excerpt} onChange={(e)=>setDraft({...draft,excerpt:e.target.value})}/></label><label>Body paragraphs<textarea rows="8" value={draft.body} onChange={(e)=>setDraft({...draft,body:e.target.value})}/></label><button>Save post</button></form><section><h2>Stored posts</h2>{content.posts?.length?content.posts.map((p)=><article className="mini-row" key={p.slug}><strong>{p.title}</strong><span>{p.tag}</span></article>):<p>No stored posts yet.</p>}</section></section></main>
}
