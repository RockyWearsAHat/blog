import http from 'node:http'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import dotenv from 'dotenv'
import { handler } from '../netlify/functions/api.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.resolve(__dirname, '..', '.env') })

const port = process.env.DEV_API_PORT || 8888
const server = http.createServer(async (req, res) => {
  const chunks = []
  req.on('data', (c) => chunks.push(c))
  req.on('end', async () => {
    try {
      const url = new URL(req.url, `http://localhost:${port}`)
      const result = await handler({
        path: url.pathname,
        httpMethod: req.method,
        headers: req.headers,
        body: Buffer.concat(chunks).toString() || null,
        queryStringParameters: Object.fromEntries(url.searchParams)
      })
      res.statusCode = result.statusCode || 200
      Object.entries(result.headers || {}).forEach(([k, v]) => { if (v) res.setHeader(k, v) })
      res.end(result.body || '')
    } catch (e) {
      res.statusCode = 500
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ error: e.message }))
    }
  })
})
server.listen(port, () => console.log(`[Rocky] local API shim listening on http://localhost:${port}`))
