import { createServer } from 'http'
import express from 'express'
import { existsSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import app from './app.js'

const ROOT = dirname(fileURLToPath(import.meta.url))
const PORT = process.env.PORT || 3001
const CLIENT_DIR = process.env.CLIENT_DIR || join(ROOT, '..', 'frontend', 'dist')

if (existsSync(CLIENT_DIR)) {
  app.use(express.static(CLIENT_DIR))
  app.get('*', (req, res) => {
    if (req.path.startsWith('/api') || req.path.startsWith('/health')) {
      return res.status(404).json({ error: 'Not found.' })
    }
    res.sendFile(join(CLIENT_DIR, 'index.html'))
  })
} else {
  app.get('/', (_req, res) => {
    res.json({ status: 'ok', message: 'Frontend build not found. Run the frontend build.' })
  })
}

const server = createServer(app)
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Samkit Jain office API listening on port ${PORT}`)
})
