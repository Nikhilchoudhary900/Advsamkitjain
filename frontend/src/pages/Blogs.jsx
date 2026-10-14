import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { notes as seedNotes } from '../data/notes.js'
import { practiceAreas } from '../data/practice.js'
import { IconArrow, IconClock } from '../components/Icons.jsx'

export default function Blogs() {
  const [active, setActive] = useState('all')
  const [notes, setNotes] = useState(seedNotes)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let ignore = false
    fetch('/api/blogs')
      .then((res) => res.json())
      .then((payload) => {
        if (!ignore && Array.isArray(payload.data) && payload.data.length) {
          setNotes(payload.data)
        }
      })
      .catch(() => {})
      .finally(() => {
        if (!ignore) setLoading(false)
      })
    return () => { ignore = true }
  }, [])

  const categories = useMemo(() => {
    const fromNotes = notes.map((note) => note.category)
    const fromPractice = practiceAreas.map((area) => area.title)
    return ['all', ...new Set([...fromNotes, ...fromPractice])]
  }, [notes])

  const visible = notes.filter((note) => active === 'all' || note.category === active)
  const featured = visible[0]
  const rest = visible.slice(1)

  return (
    <>
      <section className="page-hero blog-hero">
        <div className="wrap">
          <p className="kicker left">Blogs</p>
          <h1>Notes from the practice</h1>
          <p className="lede dark">
            Short notes on procedure, forums and ordinary remedies. They are for
            general information. They do not constitute legal advice and are not
            a solicitation of work.
          </p>
          <div className="blog-hero-meta">
            <span>{notes.length} notes</span>
            <span>{categories.length - 1} areas</span>
            <Link to="/blogs/new">Publish a note</Link>
          </div>
        </div>
      </section>

      <section className="section cream tight">
        <div className="wrap">
          <div className="blog-filters">
            {categories.map((filter) => (
              <button
                key={filter}
                className={active === filter ? 'is-on' : ''}
                onClick={() => setActive(filter)}
                type="button"
              >
                {filter === 'all' ? 'All notes' : filter}
              </button>
            ))}
          </div>

          {loading && notes.length === 0 && <p className="fine">Loading notes…</p>}

          {featured && (
            <article className="blog-feature">
              <div>
                <p className="blog-meta">
                  <span className="pill light">{featured.category}</span>
                  <span><IconClock /> {featured.read} read</span>
                </p>
                <h2>
                  <Link to={`/blogs/${featured.slug}`}>{featured.title}</Link>
                </h2>
                <p>{featured.excerpt}</p>
                <p className="blog-foot">
                  <span>{featured.date}</span>
                  <Link to={`/blogs/${featured.slug}`}>Read the note <IconArrow /></Link>
                </p>
              </div>
              <div className="blog-feature-aside">
                <strong>Latest note</strong>
                <p>Updated as new notes are published from the office.</p>
              </div>
            </article>
          )}

          <div className="blog-grid">
            {rest.map((note) => (
              <article className="blog-card" key={note.slug}>
                <p className="blog-meta">
                  <span className="pill light">{note.category}</span>
                  <span><IconClock /> {note.read} read</span>
                </p>
                <h3>
                  <Link to={`/blogs/${note.slug}`}>{note.title}</Link>
                </h3>
                <p>{note.excerpt}</p>
                <p className="blog-foot">
                  <span>{note.date}</span>
                  <Link to={`/blogs/${note.slug}`}>Read <IconArrow /></Link>
                </p>
              </article>
            ))}
          </div>

          {!visible.length && !loading && (
            <p className="fine">No notes in this area yet.</p>
          )}
        </div>
      </section>
    </>
  )
}
