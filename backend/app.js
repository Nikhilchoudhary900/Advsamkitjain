import express from 'express'
import cors from 'cors'
import { writeFile, mkdir } from 'fs/promises'
import { existsSync, readFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { notes as seedNotes } from './seed-notes.js'

const ROOT = dirname(fileURLToPath(import.meta.url))
const DATA_DIR = join(ROOT, 'data')
const BLOGS_FILE = join(DATA_DIR, 'blogs.json')
const PUBLISH_KEY = process.env.BLOG_PUBLISH_KEY || 'sj-publish-2026'

const app = express()
app.use(cors())
app.use(express.json({ limit: '1mb' }))

// On Vercel the function may receive the full /api-prefixed path; normalise it
// so the same routes work whether mounted at the root or behind /api.
app.use((req, _res, next) => {
  if (req.url === '/api') {
    req.url = '/'
  } else if (req.url.startsWith('/api/')) {
    req.url = req.url.slice(4)
  }
  next()
})

const enquiries = []

function loadBlogsSync() {
  try {
    if (existsSync(BLOGS_FILE)) {
      const parsed = JSON.parse(readFileSync(BLOGS_FILE, 'utf8'))
      if (Array.isArray(parsed) && parsed.length) return parsed
    }
  } catch {
    /* fall through to seed data */
  }
  return seedNotes.map((note) => ({ ...note }))
}

let blogs = loadBlogsSync()

const practiceAreas = [
  {
    id: 'criminal',
    title: 'Criminal Law',
    summary: 'Defence representation, bail, appeals and revision in criminal matters.',
    detail: 'Anticipatory and regular bail, quashing, revision, and defence at trial. Appearances before the High Court, Sessions Court and Magistrate Courts at Jaipur.'
  },
  {
    id: 'civil',
    title: 'Civil Litigation',
    summary: 'Suits, injunctions, property disputes and civil appeals.',
    detail: 'Original suits, interim injunctions, execution, and first and second appeals before the civil courts and the High Court.'
  },
  {
    id: 'writ',
    title: 'Writ Petitions',
    summary: 'Constitutional remedies before the High Court.',
    detail: 'Petitions under Articles 226 and 227, stay applications, and challenges to administrative and quasi-judicial orders.'
  },
  {
    id: 'family',
    title: 'Family & Matrimonial',
    summary: 'Divorce, maintenance, custody and matrimonial disputes.',
    detail: 'Mutual consent and contested divorce, maintenance, custody, restitution, and related applications under family law.'
  },
  {
    id: 'service',
    title: 'Service Matters',
    summary: 'Employment and service disputes of government employees.',
    detail: 'Departmental proceedings, promotion, seniority, termination, and writs arising from service under the State.'
  },
  {
    id: 'property',
    title: 'Property & Real Estate',
    summary: 'Title, partition, possession and builder disputes.',
    detail: 'Suits for declaration, specific performance, partition, and disputes with builders and societies, including consumer complaints where appropriate.'
  },
  {
    id: 'cheque',
    title: 'Negotiable Instruments',
    summary: 'Complaints and defence under Section 138 of the Negotiable Instruments Act.',
    detail: 'Dishonour of cheque, compounding, and appeals from conviction or acquittal in NI Act matters.'
  },
  {
    id: 'consumer',
    title: 'Consumer Disputes',
    summary: 'Complaints for deficiency of service and defective goods.',
    detail: 'Complaints before the District, State and National Commissions, including builder-buyer and professional-service disputes.'
  },
  {
    id: 'mact',
    title: 'Motor Accident Claims',
    summary: 'Compensation claims before MACT and appeals in the High Court.',
    detail: 'Petitions for compensation arising from motor accidents, including death and disability claims, and appeals from Tribunal awards.'
  },
  {
    id: 'banking',
    title: 'Banking & SARFAESI',
    summary: 'Recovery, DRT proceedings and challenges to SARFAESI action.',
    detail: 'Representation in DRT, DRAT and High Court proceedings, including stay of possession and auction under the SARFAESI Act.'
  },
  {
    id: 'cyber',
    title: 'Cyber Crime',
    summary: 'Offences under the IT Act, online fraud and digital evidence.',
    detail: 'Bail and defence in cheating by electronic means, identity theft, and complaints under the Information Technology Act.'
  },
  {
    id: 'dv',
    title: 'Domestic Violence',
    summary: 'Protection, residence, maintenance and related relief.',
    detail: 'Applications under the Protection of Women from Domestic Violence Act, including protection orders and monetary relief.'
  },
  {
    id: 'succession',
    title: 'Succession & Inheritance',
    summary: 'Probate, letters of administration, wills and partition of estate.',
    detail: 'Petitions for probate and succession certificates, disputes over wills, and suits for partition of property.'
  },
  {
    id: 'land',
    title: 'Land Acquisition',
    summary: 'Compensation, lapsing of acquisition and references under the Act.',
    detail: 'Challenges to acquisition notifications, claims for enhanced compensation, and writs where possession has not been taken.'
  },
  {
    id: 'education',
    title: 'Education Matters',
    summary: 'Admission, examination, service of teaching staff and university orders.',
    detail: 'Writs concerning admission, results, rustication, and service of teachers and university employees.'
  },
  {
    id: 'commercial',
    title: 'Commercial Contracts',
    summary: 'Suits on contracts, injunctions and commercial court work.',
    detail: 'Recovery on invoices and guarantees, specific performance, and commercial suits before the Commercial Court at Jaipur.'
  }
]

function slugify(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}

function estimateRead(body) {
  const words = body.join(' ').split(/\s+/).filter(Boolean).length
  const minutes = Math.max(3, Math.round(words / 180))
  return `${minutes} min`
}

function formatDate(value) {
  if (!value) {
    return new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(new Date())
  }
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return String(value)
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(parsed)
}

async function saveBlogs() {
  try {
    await mkdir(DATA_DIR, { recursive: true })
    await writeFile(BLOGS_FILE, JSON.stringify(blogs, null, 2))
  } catch {
    /* read-only filesystem (e.g. Vercel) - keep the in-memory copy only */
  }
}

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', office: 'Samkit Jain, Advocate' })
})

app.get('/blogs', (_req, res) => {
  res.json({ data: blogs })
})

app.get('/blogs/:slug', (req, res) => {
  const note = blogs.find((item) => item.slug === req.params.slug)
  if (!note) return res.status(404).json({ error: 'Blog not found.' })
  res.json({ data: note })
})

app.post('/blogs', async (req, res) => {
  const { title, category, areaId, excerpt, body, date, key } = req.body || {}
  if (key !== PUBLISH_KEY) {
    return res.status(401).json({ ok: false, error: 'Invalid publish key.' })
  }
  if (!title || !category || !excerpt || !body) {
    return res.status(400).json({
      ok: false,
      error: 'Title, category, excerpt and body are required.'
    })
  }

  const paragraphs = Array.isArray(body)
    ? body.map((para) => String(para).trim()).filter(Boolean)
    : String(body).split(/\n{2,}/).map((para) => para.trim()).filter(Boolean)

  if (!paragraphs.length) {
    return res.status(400).json({ ok: false, error: 'Please add the body of the note.' })
  }

  let slug = slugify(title)
  if (!slug) slug = `note-${Date.now()}`
  if (blogs.some((item) => item.slug === slug)) slug = `${slug}-${Date.now()}`

  const note = {
    slug,
    category: String(category).trim(),
    areaId: areaId ? String(areaId).trim() : '',
    read: estimateRead(paragraphs),
    date: formatDate(date),
    title: String(title).trim(),
    excerpt: String(excerpt).trim(),
    body: paragraphs
  }

  blogs.unshift(note)
  await saveBlogs()
  res.status(201).json({ ok: true, data: note })
})

app.get('/practice-areas', (_req, res) => {
  res.json({ data: practiceAreas })
})

app.post('/enquiries', (req, res) => {
  const { name, email, telephone, area, message } = req.body || {}

  if (!name || !email || !message) {
    return res.status(400).json({
      ok: false,
      error: 'Name, email and a short description of the matter are required.'
    })
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailPattern.test(email)) {
    return res.status(400).json({ ok: false, error: 'Please provide a valid email address.' })
  }

  const enquiry = {
    id: `ENQ-${Date.now()}`,
    name: String(name).trim(),
    email: String(email).trim().toLowerCase(),
    telephone: telephone ? String(telephone).trim() : '',
    area: area ? String(area).trim() : 'General',
    message: String(message).trim(),
    receivedAt: new Date().toISOString()
  }

  enquiries.unshift(enquiry)
  if (enquiries.length > 200) enquiries.pop()

  res.status(201).json({
    ok: true,
    reference: enquiry.id,
    message: 'Your enquiry has been received. The office will respond within one working day.'
  })
})

app.get('/enquiries', (_req, res) => {
  res.json({ data: enquiries })
})

app.use((req, res, next) => {
  if (/^\/api(\/|$)/.test(req.originalUrl)) {
    return res.status(404).json({ error: 'Not found.' })
  }
  next()
})

export default app
