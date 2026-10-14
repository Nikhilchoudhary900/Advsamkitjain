import { Link } from 'react-router-dom'
import { notes } from '../data/notes.js'

export default function Notes() {
  return (
    <section className="page">
      <header className="page-head">
        <p className="eyebrow">Notes</p>
        <h1>Short accounts of procedure, not advice on a case.</h1>
        <p className="lede">
          These notes are for general information. They do not constitute legal
          advice and are not a solicitation of work.
        </p>
      </header>
      <div className="notes-grid">
        {notes.map((note) => (
          <article key={note.slug}>
            <p className="note-meta">
              <span>{note.category}</span>
              <span>{note.read} read</span>
            </p>
            <h2>
              <Link to={`/notes/${note.slug}`}>{note.title}</Link>
            </h2>
            <p>{note.excerpt}</p>
            <p className="note-foot">
              <span>{note.date}</span>
              <Link to={`/notes/${note.slug}`}>Read</Link>
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
