import { Link } from 'react-router-dom'
import { practiceAreas } from '../data/practice.js'
import { useLang } from '../i18n/LanguageContext.jsx'
import {
  IconArrow, IconBadge, IconBook, IconBrief, IconCar, IconDoc,
  IconHome, IconKey, IconPeople, IconScales, IconShield, IconWill
} from '../components/Icons.jsx'

const icons = {
  doc: <IconDoc />,
  scales: <IconScales />,
  people: <IconPeople />,
  brief: <IconBrief />,
  home: <IconHome />,
  badge: <IconBadge />,
  car: <IconCar />,
  shield: <IconShield />,
  will: <IconWill />,
  book: <IconBook />,
  key: <IconKey />
}

const groupIds = {
  court: ['highcourt', 'civil', 'family', 'cheque', 'service', 'cyber', 'succession', 'education'],
  realestate: ['rera', 'tenancy'],
  tribunals: ['consumer', 'mact', 'banking', 'insurance'],
  advisory: ['commercial', 'arbitration', 'corporate', 'drafting', 'nonlitigation']
}

function AreaCard({ area, index, discuss }) {
  const number = String(index + 1).padStart(2, '0')

  return (
    <article className="practice-card" id={area.id}>
      <div className="practice-card-top">
        <span className="practice-no">{number}</span>
        <span className="icon-box">{icons[area.icon]}</span>
      </div>
      <h3>{area.title}</h3>
      <p>{area.detail}</p>
      {area.points?.length > 0 && (
        <ul className="area-points">
          {area.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      )}
      <div className="card-links">
        <Link to="/contact">{discuss} <IconArrow /></Link>
      </div>
    </article>
  )
}

export default function Practice() {
  const { t } = useLang()
  const groups = t('practice.groups').map((group) => ({ ...group, ids: groupIds[group.id] }))

  return (
    <>
      <section className="page-hero practice-hero">
        <div className="wrap">
          <p className="kicker left">{t('practice.kicker')}</p>
          <h1>{t('practice.title')}</h1>
          <p className="lede dark">{t('practice.lead')}</p>
          <div className="practice-stats">
            <div><strong>{practiceAreas.length}</strong><span>{t('practice.areasLabel')}</span></div>
            <div><strong>7+</strong><span>{t('practice.yearsBar')}</span></div>
            <div><strong>High Court</strong><span>{t('practice.primary')}</span></div>
            <div><strong>Jaipur</strong><span>{t('practice.place')}</span></div>
          </div>
          <nav className="practice-jump" aria-label="Practice groups">
            {groups.map((group) => (
              <a key={group.id} href={`#group-${group.id}`}>{group.title}</a>
            ))}
          </nav>
        </div>
      </section>

      {groups.map((group) => {
        const items = group.ids
          .map((id) => practiceAreas.find((area) => area.id === id))
          .filter(Boolean)
        return (
          <section className="section cream tight" key={group.id} id={`group-${group.id}`}>
            <div className="wrap">
              <div className="practice-head">
                <div>
                  <p className="kicker left">{group.title}</p>
                  <h2>{group.text}</h2>
                </div>
                <span className="practice-count">{t('practice.areasCount').replace('{n}', String(items.length))}</span>
              </div>
              <div className="practice-grid">
                {items.map((area, index) => (
                  <AreaCard key={area.id} area={area} index={index} discuss={t('practice.discuss')} />
                ))}
              </div>
            </div>
          </section>
        )
      })}

      <section className="section cream">
        <div className="wrap">
          <div className="cta-panel">
            <h2>{t('common.ctaTitle')}</h2>
            <p>{t('common.ctaText')}</p>
            <div className="btn-row">
              <a className="btn btn-gold" href="tel:+919828700854">{t('common.call')}</a>
              <Link className="btn btn-outline-light" to="/contact">{t('common.consult')}</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
