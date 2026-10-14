import { useState } from 'react'
import { Link } from 'react-router-dom'
import { IconArrow } from '../components/Icons.jsx'
import { useLang } from '../i18n/LanguageContext.jsx'

export default function Guide() {
  const { t } = useLang()
  const [active, setActive] = useState(0)
  const situations = t('guide.situations')
  const sit = situations[active] || situations[0]

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="kicker left">{t('guide.kicker')}</p>
          <h1>{t('guide.title')}</h1>
          <p className="lede dark">{t('guide.lead')}</p>
        </div>
      </section>

      <section className="section cream">
        <div className="wrap finder">
          <div className="situations" role="group" aria-label={t('guide.kicker')}>
            {situations.map((item, index) => (
              <button
                key={item.area + index}
                type="button"
                className={`sit${active === index ? ' on' : ''}`}
                aria-pressed={active === index}
                onClick={() => setActive(index)}
              >
                <span className="num">{String(index + 1).padStart(2, '0')}</span>
                <span>{item.t}</span>
              </button>
            ))}
          </div>

          <div className="answer" aria-live="polite">
            <p className="kicker left">{t('guide.heardBy')}</p>
            <h3>{sit.h}</h3>
            <p className="q">{sit.t}</p>
            <ol className="route">
              {sit.steps.map((step, index) => (
                <li key={step[0]}>
                  <span className="step">{index + 1}</span>
                  <div>
                    <b>{step[0]}</b>
                    <span>{step[1]}</span>
                  </div>
                </li>
              ))}
            </ol>
            <Link className="btn btn-navy" to={`/practice#${sit.area}`}>
              {t('guide.seeArea')} <IconArrow />
            </Link>
            <p className="note">{t('guide.note')}</p>
          </div>
        </div>
      </section>
    </>
  )
}
