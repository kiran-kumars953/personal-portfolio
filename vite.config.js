import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'node:fs'
import path from 'node:path'

// Reads MAILERSEND_* / CONTACT_TO_EMAIL from .dev.vars (preferred) or .env
function loadServerVars() {
  const out = {}
  for (const file of ['.dev.vars', '.env']) {
    try {
      const txt = fs.readFileSync(path.resolve(process.cwd(), file), 'utf8')
      for (const line of txt.split(/\r?\n/)) {
        const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/)
        if (m && !line.trim().startsWith('#') && !(m[1] in out)) out[m[1]] = m[2].trim()
      }
    } catch { /* file may not exist */ }
  }
  return out
}

// Dev-only: run the Cloudflare Pages Function at /api/contact inside Vite,
// so `npm run dev` (port 5173) can send email just like production.
function contactApiDevPlugin() {
  return {
    name: 'dev-contact-api',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/api/contact', async (req, res, next) => {
        if (req.method !== 'POST') return next()
        try {
          const chunks = []
          for await (const c of req) chunks.push(c)
          const body = Buffer.concat(chunks).toString('utf8')

          const mod = await server.ssrLoadModule('/functions/api/contact.js')
          const request = new Request('http://localhost/api/contact', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body,
          })
          const response = await mod.onRequestPost({ request, env: loadServerVars() })

          res.statusCode = response.status
          response.headers.forEach((v, k) => res.setHeader(k, v))
          res.end(await response.text())
        } catch (err) {
          res.statusCode = 500
          res.setHeader('content-type', 'application/json')
          res.end(JSON.stringify({ error: 'Dev function error', detail: String(err) }))
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), contactApiDevPlugin()],
})
