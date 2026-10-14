import { useState } from 'react'
import { Link } from 'react-router-dom'
import LangSwitch from './LangSwitch.jsx'
import { useLang } from '../i18n/LanguageContext.jsx'

const KEY = 'sj-bci-agree'

export default function DisclaimerGate({ onAccept }) {
  const { t, lang } = useLang()
  const [agreed, setAgreed] = useState(false)

  function continueToSite() {
    if (!agreed) return
    window.localStorage.setItem(KEY, '1')
    onAccept()
  }

  return (
    <div className="gate">
      <div className="gate-inner">
        <div className="gate-lang">
          <LangSwitch />
        </div>
        <h1>{t('gate.title')}</h1>
        <p className="gate-lead">{t('gate.lead')}</p>
        <ul>
          {t('gate.items').map((item) => (
            <li key={item.slice(0, 40)}>{item}</li>
          ))}
        </ul>
        <p className="gate-foot">
          {lang === 'hi'
            ? 'कृपया हमारी वेबसाइट की '
            : 'Please read and accept our website’s '}
          <Link to="/terms">{t('gate.terms')}</Link>
          {lang === 'hi' ? ' और हमारी ' : ' and our '}
          <Link to="/privacy">{t('gate.privacy')}</Link>.
        </p>
        <label className="gate-check">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />
          <span>{t('gate.agree')}</span>
        </label>
        <button
          className="gate-btn"
          type="button"
          disabled={!agreed}
          onClick={continueToSite}
        >
          {t('gate.continue')}
        </button>
      </div>
    </div>
  )
}

export function hasAgreed() {
  try {
    return window.localStorage.getItem(KEY) === '1'
  } catch {
    return false
  }
}
