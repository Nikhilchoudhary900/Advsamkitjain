import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext.jsx'

export default function Legal({ kind }) {
  const { t } = useLang()
  const page = t(`legal.${kind}`) || t('legal.disclaimer')
  return (
    <>
      <section className="page-hero">
        <div className="wrap narrow">
          <p className="kicker left">{page.kicker}</p>
          <h1>{page.title}</h1>
        </div>
      </section>
      <section className="section cream">
        <div className="wrap narrow article">
          {page.body.map((para) => (
            <p key={para.slice(0, 32)}>{para}</p>
          ))}
          <Link className="btn btn-navy" to="/">{t('common.returnHome')}</Link>
        </div>
      </section>
    </>
  )
}
