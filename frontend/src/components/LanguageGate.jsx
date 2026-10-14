import { useLang } from '../i18n/LanguageContext.jsx'

export default function LanguageGate() {
  const { setLang } = useLang()

  return (
    <div className="gate lang-gate">
      <div className="gate-inner">
        <p className="kicker">Language / भाषा</p>
        <h1>Choose your language</h1>
        <p className="gate-lead" style={{ textAlign: 'center' }}>
          अपनी भाषा चुनें
        </p>
        <div className="lang-gate-actions">
          <button className="gate-btn" type="button" onClick={() => setLang('en')}>
            English
          </button>
          <button className="gate-btn" type="button" onClick={() => setLang('hi')}>
            हिन्दी
          </button>
        </div>
      </div>
    </div>
  )
}
