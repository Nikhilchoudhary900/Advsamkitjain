import { useState } from 'react'
import { IconClock, IconMail, IconPhone, IconPin } from '../components/Icons.jsx'
import { useLang } from '../i18n/LanguageContext.jsx'

const initial = { name: '', email: '', telephone: '', area: '', message: '' }
const OFFICE_WHATSAPP = '919828700854'
const OFFICE_EMAIL = 'advsamkitjain@gmail.com'

function enquiryText(form, reference) {
  return [
    'Hello, I would like to request a consultation.',
    reference ? `Reference: ${reference}` : null,
    `Name: ${form.name}`,
    `Email: ${form.email}`,
    form.telephone ? `Telephone: ${form.telephone}` : null,
    `Area: ${form.area}`,
    `Matter: ${form.message}`
  ].filter(Boolean).join('\n')
}

function openLink(url) {
  const link = document.createElement('a')
  link.href = url
  link.target = '_blank'
  link.rel = 'noopener noreferrer'
  document.body.appendChild(link)
  link.click()
  link.remove()
}

function sendToWhatsApp(text) {
  openLink(`https://api.whatsapp.com/send?phone=${OFFICE_WHATSAPP}&text=${encodeURIComponent(text)}`)
}

function sendToMail(name, text) {
  const subject = `Consultation request from ${name}`
  openLink(`mailto:${OFFICE_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`)
}

export default function Contact() {
  const { t } = useLang()
  const areas = t('contact.areas')
  const [form, setForm] = useState({ ...initial, area: areas[0] })
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
    const snapshot = { ...form }
    const text = enquiryText(snapshot)
    sendToWhatsApp(text)
    sendToMail(snapshot.name, text)
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(snapshot)
      })
      const payload = await res.json()
      if (!res.ok) {
        setStatus({ type: 'error', text: payload.error || t('contact.sendError') })
        return
      }
      setStatus({
        type: 'ok',
        text: `${payload.message} Reference ${payload.reference}. WhatsApp and email have been opened with this request.`
      })
      setForm({ ...initial, area: areas[0] })
    } catch {
      setStatus({
        type: 'ok',
        text: t('contact.sendOk')
      })
      setForm({ ...initial, area: areas[0] })
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="kicker left">{t('contact.kicker')}</p>
          <h1>{t('contact.title')}</h1>
          <p className="lede dark">{t('contact.lead')}</p>
        </div>
      </section>

      <section className="section cream">
        <div className="wrap contact-grid">
          <div className="contact-main">
            <form className="white-card form" onSubmit={submit}>
              <label>
                {t('contact.name')}
                <input name="name" value={form.name} onChange={update} required autoComplete="name" />
              </label>
              <label>
                {t('contact.email')}
                <input name="email" type="email" value={form.email} onChange={update} required autoComplete="email" />
              </label>
              <label>
                {t('contact.telephone')}
                <input name="telephone" value={form.telephone} onChange={update} autoComplete="tel" />
              </label>
              <label>
                {t('contact.area')}
                <select name="area" value={form.area} onChange={update}>
                  {areas.map((area) => <option key={area}>{area}</option>)}
                </select>
              </label>
              <label className="full">
                {t('contact.matter')}
                <textarea name="message" rows="6" value={form.message} onChange={update} required placeholder={t('contact.placeholder')} />
              </label>
              <button className="btn btn-gold" type="submit" disabled={sending}>
                {sending ? t('common.sending') : t('common.consult')}
              </button>
              {status.text && <p className={`form-status ${status.type}`}>{status.text}</p>}
            </form>

            <div className="office-strip" aria-label="Office photographs">
              <figure>
                <img src="/office.webp" alt="Samkit Jain at the office in Jaipur" />
              </figure>
              <figure>
                <img src="/office-2.webp" alt="Office interior of Samkit Jain, Advocate" />
              </figure>
              <figure>
                <img src="/office-3.webp" alt="Office of Samkit Jain, Advocate, Jaipur" />
              </figure>
            </div>
          </div>

          <aside className="white-card chamber-card">
            <p className="kicker left">{t('contact.officeKicker')}</p>
            <h2>{t('contact.officeTitle')}</h2>
            <p><IconPin /> Ground Floor, 4/23 Shivanand Marg, Malviya Nagar, Jaipur-302017</p>
            <p><IconPhone /> <a href="tel:+919828700854">+91 98287 00854</a></p>
            <p><IconMail /> <a href="mailto:advsamkitjain@gmail.com">advsamkitjain@gmail.com</a></p>
            <p><IconClock /> {t('contact.hours')}</p>
            <p>
              <a className="map-link" href="https://g.co/kgs/v2BxLMm" target="_blank" rel="noreferrer">
                {t('common.maps')}
              </a>
            </p>
            <p className="fine">{t('contact.fine')}</p>
          </aside>
        </div>
      </section>
    </>
  )
}
