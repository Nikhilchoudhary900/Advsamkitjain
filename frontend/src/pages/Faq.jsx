import { Link } from 'react-router-dom'
import FaqList from '../components/FaqList.jsx'
import { useLang } from '../i18n/LanguageContext.jsx'

export default function Faq() {
  const { t } = useLang()
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="kicker left">{t('faq.kicker')}</p>
          <h1>{t('faq.title')}</h1>
          <p className="lede">{t('faq.lead')}</p>
        </div>
      </section>

      <section className="section cream">
        <div className="wrap">
          <FaqList items={t('faq.items')} />
          <Link className="btn btn-navy faq-cta" to="/contact">
            {t('common.consult')}
          </Link>
        </div>
      </section>
    </>
  )
}
