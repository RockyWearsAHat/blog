const LOCAL_KEY = 'rocky-local-content'

function localData() {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_KEY) || '{}')
  } catch {
    return {}
  }
}
function saveLocal(data) { localStorage.setItem(LOCAL_KEY, JSON.stringify(data)) }
function readBody(options) {
  try { return options.body ? JSON.parse(options.body) : {} } catch { return {} }
}

async function localFallback(path, options = {}) {
  const data = localData()
  const method = (options.method || 'GET').toUpperCase()
  if (path === '/api/auth/me' && method === 'GET') return { user: data.user || null, localFallback: true }
  if (path === '/api/auth/noauth' && method === 'POST') {
    data.user = { email: 'dev@local.test', role: 'admin', noAuth: true }
    saveLocal(data)
    return { ok: true, user: data.user, localFallback: true }
  }
  if (path === '/api/auth/logout' && method === 'POST') {
    delete data.user
    saveLocal(data)
    return { ok: true, localFallback: true }
  }
  if (path === '/api/auth/login' && method === 'POST') {
    data.user = { email: readBody(options).email || 'dev@local.test', role: 'admin', local: true }
    saveLocal(data)
    return { ok: true, user: data.user, localFallback: true }
  }
  if (path === '/api/auth/setup' && method === 'POST') {
    data.user = { email: readBody(options).email || 'dev@local.test', role: 'admin', local: true }
    saveLocal(data)
    return { ok: true, user: data.user, localFallback: true }
  }
  if (path === '/api/content' && method === 'GET') return { posts: data.posts || [], projects: data.projects || [], localFallback: true }
  if (path === '/api/content/posts' && method === 'POST') {
    const post = readBody(options)
    data.posts = [post, ...(data.posts || []).filter((p) => p.slug !== post.slug)]
    saveLocal(data)
    return { ok: true, post, localFallback: true }
  }
  if (path.startsWith('/api/content/posts/') && method === 'DELETE') {
    const slug = decodeURIComponent(path.split('/').pop())
    data.posts = (data.posts || []).filter((p) => p.slug !== slug)
    saveLocal(data)
    return { ok: true, localFallback: true }
  }
  throw new Error('Local fallback has no route for ' + method + ' ' + path)
}

export async function api(path, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) }
  try {
    const res = await fetch(path, { credentials: 'include', ...options, headers })
    const text = await res.text()
    const json = text ? JSON.parse(text) : {}
    if (!res.ok) throw new Error(json.error || `Request failed: ${res.status}`)
    return json
  } catch (error) {
    const allowFallback = location.hostname === 'localhost' || location.hostname === '127.0.0.1'
    if (allowFallback && import.meta.env.VITE_LOCAL_API_FALLBACK !== 'false') {
      console.warn('[Rocky] API request failed in Vite dev; using local fallback. Run `npm run dev:full` or `netlify dev` for real functions.', error)
      return localFallback(path, options)
    }
    throw error
  }
}
