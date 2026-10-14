import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { strings } from './strings.js'

const KEY = 'sj-lang'
const LanguageContext = createContext(null)

function lookup(table, key) {
  return key.split('.').reduce((acc, part) => (acc == null ? acc : acc[part]), table)
}

function storedLang() {
  try {
    const value = window.localStorage.getItem(KEY)
    return value === 'hi' || value === 'en' ? value : null
  } catch {
    return null
  }
}

export function LanguageProvider({ children }) {
  const initial = storedLang()
  const [lang, setLangState] = useState(initial || 'en')
  const [chosen, setChosen] = useState(Boolean(initial))

  useEffect(() => {
    document.documentElement.lang = lang === 'hi' ? 'hi' : 'en'
    if (!chosen) return
    try {
      window.localStorage.setItem(KEY, lang)
    } catch {
      /* ignore */
    }
  }, [lang, chosen])

  const value = useMemo(() => ({
    lang,
    chosen,
    setLang: (next) => {
      setLangState(next)
      setChosen(true)
    },
    t: (key) => {
      const found = lookup(strings[lang] || strings.en, key)
      if (found == null) return lookup(strings.en, key) ?? key
      return found
    }
  }), [lang, chosen])

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used within LanguageProvider')
  return ctx
}
