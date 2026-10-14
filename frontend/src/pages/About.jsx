import { Link } from 'react-router-dom'
import { IconBolt, IconFolder, IconSearch, IconUser } from '../components/Icons.jsx'
import { useLang } from '../i18n/LanguageContext.jsx'

const apartIcons = [<IconUser />, <IconFolder />, <IconBolt />, <IconSearch />]

export default function About() {
  const { t } = useLang()
  const apart = t('home.apart')
  const work = t('about.work')
  const values = t('about.values')

  return (
    <>
      <section className="section cream">
        <div className="wrap about-grid">
          <div className="sj-panel">
            <img
              src="/samkit-jain.webp"
              alt={t('brand.name')}
            />
            <span className="years">7+<small>{t('common.years')}</small></span>
            <div className="sj-caption">
              <strong>{t('brand.name')}, {t('brand.advocate')}</strong>
              <em>{t('about.caption')}</em>
            </div>
          </div>
          <div>
            <p className="kicker left">{t('about.kicker')}</p>
            <h2>{t('about.title')}</h2>
            <p className="copy">{t('about.p1')}</p>
            <p className="copy">{t('about.p2')}</p>
            <p className="copy">{t('about.p3')}</p>
            <p className="copy">{t('about.p4')}</p>
            <p className="copy">{t('about.p5')}</p>
            <div className="glance mini">
              <div><strong>2019</strong><span>{t('about.enrolled')}</span></div>
              <div><strong>7+</strong><span>{t('about.yearsBar')}</span></div>
              <div><strong>Jaipur</strong><span>{t('about.place')}</span></div>
              <div><strong>RERA</strong><span>{t('about.core')}</span></div>
            </div>
            <Link className="btn btn-navy" to="/contact" style={{ marginTop: '1.4rem' }}>
              {t('common.consult')}
            </Link>
          </div>
        </div>
      </section>

      <section className="section cream tight">
        <div className="wrap center">
          <p className="kicker">{t('about.apartKicker')}</p>
          <h2>{t('about.apartTitle')}</h2>
          <div className="cards-4">
            {apart.map((item, i) => (
              <article className="white-card" key={item.title}>
                <span className="icon-box">{apartIcons[i]}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section cream tight">
        <div className="wrap center">
          <p className="kicker">{t('about.workKicker')}</p>
          <h2>{t('about.workTitle')}</h2>
          <div className="cards-4">
            {work.map((item) => (
              <article className="white-card" key={item.title}>
                <span className="step-n">{item.n}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section cream tight">
        <div className="wrap center">
          <p className="kicker">{t('about.valuesKicker')}</p>
          <h2>{t('about.valuesTitle')}</h2>
          <div className="cards-3">
            {values.map((item) => (
              <article className="white-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

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
