import { Link, useParams, Navigate } from 'react-router-dom'
import { notes } from '../data/notes.js'

export default function Note() {
  const { slug } = useParams()
  const note = notes.find((item) => item.slug === slug)
  if (!note) return <Navigate to="/notes" replace />

  return (
    <section className="page note-page">
      <p className="eyebrow">{note.category}</p>
      <h1>{note.title}</h1>
      <p className="lede">
        {note.date} · {note.read} read
      </p>
      {note.body.map((para) => (
        <p key={para.slice(0, 24)}>{para}</p>
      ))}
      <p className="small">
        This note is for general informational purposes only and does not
        constitute legal advice.
      </p>
      <Link className="btn btn-ghost" to="/notes">
        All notes
      </Link>
    </section>
  )
}
