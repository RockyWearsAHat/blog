import { MongoClient } from 'mongodb'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

let cachedClient
async function db() {
  if (!process.env.MONGODB_URI) throw new Error('Missing MONGODB_URI')
  if (!cachedClient) cachedClient = new MongoClient(process.env.MONGODB_URI)
  await cachedClient.connect()
  return cachedClient.db(process.env.MONGODB_DB || 'rocky_blog')
}
function json(statusCode, body, extraHeaders = {}) {
  const headers = { 'Content-Type': 'application/json', ...extraHeaders }
  return { statusCode, headers, body: JSON.stringify(body) }
}
function withCookie(statusCode, body, cookieValue) {
  return json(statusCode, body, { 'Set-Cookie': cookieValue })
}
function parseCookies(header = '') {
  return Object.fromEntries(header.split(';').map((v) => v.trim().split('=').map(decodeURIComponent)).filter((v) => v[0]))
}
function sign(user) {
  return jwt.sign({ id: String(user._id || user.id), email: user.email, role: user.role || 'admin' }, process.env.JWT_SECRET || 'dev-secret-change-me', { expiresIn: '7d' })
}
function cookie(token) {
  return `rocky_token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 24 * 7}${process.env.URL ? '; Secure' : ''}`
}
function clearCookie() { return 'rocky_token=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0' }
async function currentUser(event) {
  if (String(process.env.NO_AUTH).toLowerCase() === 'true') return { email: 'dev@noauth.local', role: 'admin', noAuth: true }
  const token = parseCookies(event.headers.cookie || event.headers.Cookie || '').rocky_token
  if (!token) return null
  try { return jwt.verify(token, process.env.JWT_SECRET || 'dev-secret-change-me') } catch { return null }
}
async function requireUser(event) {
  const user = await currentUser(event)
  if (!user) {
    const err = new Error('Unauthorized')
    err.status = 401
    throw err
  }
  return user
}
function body(event) {
  try { return event.body ? JSON.parse(event.body) : {} } catch { return {} }
}
function routePath(event) {
  return event.path.replace('/.netlify/functions/api', '').replace(/^\/api/, '') || '/'
}

export async function handler(event) {
  const path = routePath(event)
  const method = event.httpMethod
  try {
    if (method === 'GET' && path === '/health') return json(200, { ok: true, noAuth: String(process.env.NO_AUTH).toLowerCase() === 'true' })
    if (method === 'GET' && path === '/auth/me') return json(200, { user: await currentUser(event) })
    if (method === 'POST' && path === '/auth/noauth') {
      if (String(process.env.NO_AUTH).toLowerCase() !== 'true') return json(403, { error: 'NO_AUTH is not enabled' })
      const user = { id: 'noauth', email: 'dev@noauth.local', role: 'admin', noAuth: true }
      return withCookie(200, { ok: true, user }, cookie(sign(user)))
    }
    if (method === 'POST' && path === '/auth/logout') return withCookie(200, { ok: true }, clearCookie())
    if (method === 'POST' && path === '/auth/setup') {
      const { email, password, setupToken } = body(event)
      if (!process.env.ADMIN_SETUP_TOKEN || setupToken !== process.env.ADMIN_SETUP_TOKEN) return json(403, { error: 'Invalid setup token' })
      if (!email || !password || password.length < 8) return json(400, { error: 'Email and 8+ character password required' })
      const database = await db()
      const users = database.collection('users')
      const count = await users.countDocuments({ role: 'admin' })
      if (count > 0) return json(409, { error: 'Admin already exists' })
      const passwordHash = await bcrypt.hash(password, 12)
      const result = await users.insertOne({ email: email.toLowerCase(), passwordHash, role: 'admin', createdAt: new Date() })
      const user = { _id: result.insertedId, email: email.toLowerCase(), role: 'admin' }
      return withCookie(200, { ok: true, user: { email: user.email, role: user.role } }, cookie(sign(user)))
    }
    if (method === 'POST' && path === '/auth/login') {
      const { email, password } = body(event)
      const database = await db()
      const user = await database.collection('users').findOne({ email: String(email || '').toLowerCase() })
      if (!user || !(await bcrypt.compare(password || '', user.passwordHash))) return json(401, { error: 'Invalid email or password' })
      return withCookie(200, { ok: true, user: { email: user.email, role: user.role } }, cookie(sign(user)))
    }
    if (method === 'GET' && path === '/content') {
      const database = await db()
      const [posts, projects] = await Promise.all([
        database.collection('posts').find({}).sort({ createdAt: -1 }).limit(100).toArray(),
        database.collection('projects').find({}).sort({ createdAt: -1 }).limit(100).toArray()
      ])
      return json(200, { posts, projects })
    }
    if (method === 'POST' && path === '/content/posts') {
      await requireUser(event)
      const input = body(event)
      if (!input.title || !input.slug) return json(400, { error: 'Title and slug are required' })
      const database = await db()
      const existing = await database.collection('posts').findOne({ slug: input.slug })
      const doc = { ...input, updatedAt: new Date(), createdAt: existing?.createdAt || new Date() }
      await database.collection('posts').updateOne({ slug: input.slug }, { $set: doc }, { upsert: true })
      return json(200, { ok: true, post: doc })
    }
    if (method === 'DELETE' && path.startsWith('/content/posts/')) {
      await requireUser(event)
      const slug = decodeURIComponent(path.split('/').pop())
      const database = await db()
      await database.collection('posts').deleteOne({ slug })
      return json(200, { ok: true })
    }
    return json(404, { error: `No route for ${method} ${path}` })
  } catch (error) {
    return json(error.status || 500, { error: error.message || 'Server error' })
  }
}
