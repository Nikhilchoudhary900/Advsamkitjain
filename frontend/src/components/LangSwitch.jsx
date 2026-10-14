import { useLang } from '../i18n/LanguageContext.jsx'

export default function LangSwitch({ className = '' }) {
  const { lang, setLang } = useLang()

  return (
    <div className={`lang-switch ${className}`.trim()} role="group" aria-label="Language">
      <button
        type="button"
        className={lang === 'en' ? 'on' : ''}
        onClick={() => setLang('en')}
        aria-pressed={lang === 'en'}
      >
        EN
      </button>
      <button
        type="button"
        className={lang === 'hi' ? 'on' : ''}
        onClick={() => setLang('hi')}
        aria-pressed={lang === 'hi'}
      >
        हिन्दी
      </button>
    </div>
  )
}
