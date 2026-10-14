import { Link } from 'react-router-dom'
import ReraPath from '../components/ReraPath.jsx'
import { useLang } from '../i18n/LanguageContext.jsx'

export default function Rera() {
  const { t } = useLang()
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="kicker left">{t('rera.kicker')}</p>
          <h1>{t('rera.title')}</h1>
          <p className="lede dark">{t('rera.lead')}</p>
        </div>
      </section>

      <section className="section cream">
        <div className="wrap">
          <ReraPath />
          <Link className="btn btn-navy faq-cta" to="/contact">
            {t('common.consult')}
          </Link>
        </div>
      </section>
    </>
  )
}
