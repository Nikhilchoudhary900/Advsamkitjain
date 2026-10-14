import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { practiceAreas } from '../data/practice.js'

const initial = {
  title: '',
  category: practiceAreas[0].title,
  areaId: practiceAreas[0].id,
  excerpt: '',
  body: '',
  date: '',
  key: ''
}

export default function Publish() {
  const [form, setForm] = useState(initial)
  const [status, setStatus] = useState({ type: '', text: '' })
  const [sending, setSending] = useState(false)
  const navigate = useNavigate()

  function update(e) {
    const { name, value } = e.target
    if (name === 'category') {
      const area = practiceAreas.find((item) => item.title === value)
      setForm((prev) => ({ ...prev, category: value, areaId: area?.id || '' }))
      return
    }
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function submit(e) {
    e.preventDefault()
    setSending(true)
    setStatus({ type: '', text: '' })
    try {
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const payload = await res.json()
      if (!res.ok) {
        setStatus({ type: 'error', text: payload.error || 'Unable to publish the note.' })
        return
      }
      setStatus({ type: 'ok', text: 'The note has been published.' })
      setTimeout(() => navigate(`/blogs/${payload.data.slug}`), 700)
    } catch {
      setStatus({ type: 'error', text: 'The office could not be reached. Please try again.' })
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <section className="page-hero">
        <div className="wrap narrow">
          <p className="kicker left">Publish</p>
          <h1>Add a new note</h1>
          <p className="lede dark">
            Notes added here appear on the Blogs page after they are published.
            Separate paragraphs with a blank line.
          </p>
        </div>
      </section>
      <section className="section cream">
        <div className="wrap narrow">
          <form className="white-card form publish-form" onSubmit={submit}>
            <label className="full">
              Title
              <input name="title" value={form.title} onChange={update} required />
            </label>
            <label>
              Area of practice
              <select name="category" value={form.category} onChange={update}>
                {practiceAreas.map((area) => (
                  <option key={area.id}>{area.title}</option>
                ))}
              </select>
            </label>
            <label>
              Date
              <input name="date" type="date" value={form.date} onChange={update} />
            </label>
            <label className="full">
              Excerpt
              <textarea name="excerpt" rows="3" value={form.excerpt} onChange={update} required />
            </label>
            <label className="full">
              Body
              <textarea name="body" rows="12" value={form.body} onChange={update} required />
            </label>
            <label>
              Publish key
              <input name="key" type="password" value={form.key} onChange={update} required autoComplete="off" />
            </label>
            <button className="btn btn-gold" type="submit" disabled={sending}>
              {sending ? 'Publishing…' : 'Publish note'}
            </button>
            {status.text && <p className={`form-status ${status.type}`}>{status.text}</p>}
          </form>
          <p className="fine" style={{ marginTop: '1rem' }}>
            <Link to="/blogs">Return to blogs</Link>
          </p>
        </div>
      </section>
    </>
  )
}
