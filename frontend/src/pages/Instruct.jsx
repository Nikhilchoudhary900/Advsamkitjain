import { useState } from 'react'

const areas = [
  'High Court Matters',
  'Civil Litigation',
  'Family Matters',
  'Service Matters',
  'Real Estate and RERA',
  'Cheque Bounce Cases',
  'Consumer Disputes',
  'Other'
]

const initial = {
  name: '',
  email: '',
  telephone: '',
  area: 'High Court Matters',
  message: ''
}

export default function Instruct() {
  const [form, setForm] = useState(initial)
  const [status, setStatus] = useState({ type: '', text: '' })
  const [sending, setSending] = useState(false)

  function update(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function submit(e) {
    e.preventDefault()
    setSending(true)
    setStatus({ type: '', text: '' })
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const payload = await res.json()
      if (!res.ok) {
        setStatus({ type: 'error', text: payload.error || 'Unable to send the enquiry.' })
        return
      }
      setStatus({
        type: 'ok',
        text: `${payload.message} Reference ${payload.reference}.`
      })
      setForm(initial)
    } catch {
      setStatus({
        type: 'error',
        text: 'The office could not be reached online. Please telephone +91 98287 00854.'
      })
    } finally {
      setSending(false)
    }
  }

  return (
    <section className="page instruct">
      <header className="page-head">
        <p className="eyebrow">Contact</p>
        <h1>Discuss your matter in confidence.</h1>
        <p className="lede">
          Share the facts and documents. You will receive a clear view of the
          applicable law, the available remedies and the steps ahead.
        </p>
      </header>

      <div className="instruct-grid">
        <form className="enquiry" onSubmit={submit}>
          <label>
            Full name
            <input name="name" value={form.name} onChange={update} required autoComplete="name" />
          </label>
          <label>
            Email
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={update}
              required
              autoComplete="email"
            />
          </label>
          <label>
            Telephone
            <input
              name="telephone"
              value={form.telephone}
              onChange={update}
              autoComplete="tel"
            />
          </label>
          <label>
            Area of practice
            <select name="area" value={form.area} onChange={update}>
              {areas.map((area) => (
                <option key={area}>{area}</option>
              ))}
            </select>
          </label>
          <label className="full">
            The matter
            <textarea
              name="message"
              rows="6"
              value={form.message}
              onChange={update}
              required
              placeholder="Parties, court or tribunal, next date if any, and the issue on which counsel is sought."
            />
          </label>
          <button className="btn btn-gold" type="submit" disabled={sending}>
            {sending ? 'Sending…' : 'Request consultation'}
          </button>
          {status.text && (
            <p className={`form-status ${status.type}`} role="status">
              {status.text}
            </p>
          )}
        </form>

        <aside className="clerk-card">
          <p className="eyebrow">Office</p>
          <h2>Samkit Jain</h2>
          <p>Advocate, Rajasthan High Court</p>
          <p>
            <a href="tel:+919828700854">+91 98287 00854</a>
            <br />
            <a href="mailto:advsamkitjain@gmail.com">advsamkitjain@gmail.com</a>
          </p>
          <p>
            Ground Floor, 4/23 Shivanand Marg
            <br />
            Malviya Nagar, Jaipur-302017
            <br />
            <a href="https://g.co/kgs/v2BxLMm" target="_blank" rel="noreferrer">View on Google Maps</a>
          </p>
          <p>
            Monday to Saturday
            <br />
            10:00 AM to 9:30 PM
          </p>
          <p className="small">
            Conferences by appointment. Papers may be emailed in advance.
            This website does not solicit work or advertise the practice of law.
          </p>
        </aside>
      </div>
    </section>
  )
}
