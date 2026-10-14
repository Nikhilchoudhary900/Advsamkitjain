import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Practice from './pages/Practice.jsx'
import Contact from './pages/Contact.jsx'
import Faq from './pages/Faq.jsx'
import Guide from './pages/Guide.jsx'
import Rera from './pages/Rera.jsx'
import Legal from './pages/Legal.jsx'
import DisclaimerGate, { hasAgreed } from './components/DisclaimerGate.jsx'
import LanguageGate from './components/LanguageGate.jsx'
import { useLang } from './i18n/LanguageContext.jsx'

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const id = hash.slice(1)
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

export default function App() {
  const location = useLocation()
  const { chosen } = useLang()
  const [accepted, setAccepted] = useState(() => hasAgreed())
  const legalPath = ['/terms', '/privacy', '/disclaimer'].includes(location.pathname)

  if (!chosen) {
    return <LanguageGate />
  }

  if (!accepted && !legalPath) {
    return <DisclaimerGate onAccept={() => setAccepted(true)} />
  }

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/rera" element={<Rera />} />
          <Route path="/disclaimer" element={<Legal kind="disclaimer" />} />
          <Route path="/privacy" element={<Legal kind="privacy" />} />
          <Route path="/terms" element={<Legal kind="terms" />} />
        </Route>
      </Routes>
    </>
  )
}
