import { useEffect, useState } from 'react'

const fallback = [
  {
    year: 'HC',
    title: 'Rajasthan High Court, Jaipur Bench',
    court: 'Writ · Civil · Criminal',
    note: 'Petitions, appeals, and revisions. Stay applications and final hearing.'
  },
  {
    year: 'CC',
    title: 'Commercial Court, Jaipur',
    court: 'Commercial suits',
    note: 'Suits of specified value, applications for interim injunction, and execution.'
  },
  {
    year: 'DJ',
    title: 'District & Sessions Courts, Jaipur',
    court: 'Civil · Sessions',
    note: 'Original suits, first appeals, bail, and trial work as instructed.'
  },
  {
    year: 'REV',
    title: 'Revenue authorities',
    court: 'Board of Revenue · Collector',
    note: 'Mutation, partition, and challenges to revenue orders, including writ review.'
  },
  {
    year: 'LAB',
    title: 'Labour & industrial fora',
    court: 'Labour Court · Industrial Tribunal',
    note: 'References, reinstatement, and service disputes arising from employment.'
  },
  {
    year: 'ARB',
    title: 'Arbitration',
    court: 'Section 9 · 11 · 34',
    note: 'Interim measures, appointment of arbitrator, and challenges to awards before the High Court.'
  }
]

export default function SelectedMatters() {
  const [matters, setMatters] = useState(fallback)

  useEffect(() => {
    fetch('/api/matters')
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((payload) => {
        if (payload?.data?.length) setMatters(payload.data)
      })
      .catch(() => {})
  }, [])

  return (
    <section className="page">
      <header className="page-head">
        <p className="eyebrow">Fora</p>
        <h1>Courts and tribunals of regular appearance.</h1>
        <p className="lede">
          Individual matters are not listed. Client identity and the result of
          any case remain confidential unless already on the public record.
        </p>
      </header>
      <ol className="matter-list">
        {matters.map((matter) => (
          <li key={`${matter.year}-${matter.title}`}>
            <span className="year">{matter.year}</span>
            <div>
              <h2>{matter.title}</h2>
              <p className="court">{matter.court}</p>
              <p>{matter.note}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
