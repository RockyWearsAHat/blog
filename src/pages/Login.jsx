import { useState } from 'react'
import SEO from '../components/SEO'
import { api } from '../utils/api'

export default function Login() {
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [setupToken, setSetupToken] = useState('')
  const [message, setMessage] = useState('')
  const submit = async (e) => {
    e.preventDefault(); setMessage('Working...')
    try {
      await api(mode === 'setup' ? '/api/auth/setup' : '/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password, setupToken }) })
      location.href = '/admin'
    } catch (err) { setMessage(err.message) }
  }
  const noAuth = async () => { try { await api('/api/auth/noauth', { method: 'POST' }); location.href = '/admin' } catch (e) { setMessage(e.message) } }
  return <main className="page-shell auth-page"><SEO title="Login"/><p className="eyebrow">Admin access</p><h1>{mode === 'setup' ? 'Create the first admin.' : 'Sign in to edit content.'}</h1><form className="auth-card" onSubmit={submit}><label>Email<input value={email} onChange={(e)=>setEmail(e.target.value)} type="email"/></label><label>Password<input value={password} onChange={(e)=>setPassword(e.target.value)} type="password"/></label>{mode==='setup'&&<label>Setup token<input value={setupToken} onChange={(e)=>setSetupToken(e.target.value)} /></label>}<button>{mode==='setup'?'Create admin':'Login'}</button><button type="button" onClick={()=>setMode(mode==='setup'?'login':'setup')}>{mode==='setup'?'Back to login':'First admin setup'}</button><button type="button" onClick={noAuth}>No-auth dev login</button>{message&&<p className="form-message">{message}</p>}</form><p className="dev-note">For real MongoDB/bcrypt/JWT auth, run through Netlify Functions. In plain Vite dev, the client falls back to local test mode so the UI does not explode.</p></main>
}
