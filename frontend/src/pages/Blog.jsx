import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { notes as seedNotes } from '../data/notes.js'
import { practiceAreas } from '../data/practice.js'
import { IconArrow } from '../components/Icons.jsx'

export default function Blog() {
  const { slug } = useParams()
  const seeded = seedNotes.find((item) => item.slug === slug)
  const [note, setNote] = useState(seeded || null)
  const [status, setStatus] = useState(seeded ? 'ready' : 'loading')

  useEffect(() => {
    let ignore = false
    fetch(`/api/blogs/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error('missing')
        return res.json()
      })
      .then((payload) => {
        if (!ignore && payload.data) {
          setNote(payload.data)
          setStatus('ready')
        }
      })
      .catch(() => {
        if (!ignore && !seeded) setStatus('missing')
      })
    return () => { ignore = true }
  }, [slug, seeded])

  if (status === 'missing') return <Navigate to="/blogs" replace />
  if (!note) {
    return (
      <section className="page-hero">
        <div className="wrap narrow">
          <p className="kicker left">Blogs</p>
          <h1>Loading the note…</h1>
        </div>
      </section>
    )
  }

  const area = practiceAreas.find((item) => item.id === note.areaId)
  const related = seedNotes.filter((item) => item.slug !== note.slug && item.category === note.category).slice(0, 3)

  return (
    <>
      <section className="page-hero article-hero">
        <div className="wrap narrow">
          <p className="kicker left">{note.category}</p>
          <h1>{note.title}</h1>
          <p className="lede dark">{note.date} · {note.read} read</p>
        </div>
      </section>
      <section className="section cream">
        <div className="wrap article-layout">
          <article className="article">
            {note.body.map((para) => (
              <p key={para.slice(0, 28)}>{para}</p>
            ))}
            <p className="fine">
              This note is for general informational purposes only and does not
              constitute legal advice.
            </p>
            <div className="btn-row">
              {area && (
                <Link className="btn btn-gold" to={`/practice#${area.id}`}>
                  {area.title} <IconArrow />
                </Link>
              )}
              <Link className="btn btn-navy" to="/blogs">
                All blogs <IconArrow />
              </Link>
            </div>
          </article>
          <aside className="article-aside">
            <p className="gold-label">About this note</p>
            <p>{note.excerpt}</p>
            <p className="fine">{note.date}</p>
            {related.length > 0 && (
              <>
                <p className="gold-label">Related notes</p>
                {related.map((item) => (
                  <Link className="related-link" key={item.slug} to={`/blogs/${item.slug}`}>
                    {item.title}
                  </Link>
                ))}
              </>
            )}
          </aside>
        </div>
      </section>
    </>
  )
}
