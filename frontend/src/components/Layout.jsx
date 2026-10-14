import { NavLink, Outlet, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { IconClock, IconMail, IconPhone, IconPin, IconWhatsApp, LogoMark } from './Icons.jsx'
import LangSwitch from './LangSwitch.jsx'
import { useLang } from '../i18n/LanguageContext.jsx'

const linkKeys = [
  { to: '/', key: 'home' },
  { to: '/about', key: 'about' },
  { to: '/practice', key: 'practice' },
  { to: '/blogs', key: 'blogs' },
  { to: '/guide', key: 'guide' },
  { to: '/faq', key: 'faq' },
  { to: '/contact', key: 'contact' }
]

export default function Layout() {
  const { t } = useLang()
  const [open, setOpen] = useState(false)
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    function onScroll() {
      setShowTop(window.scrollY > 400)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = linkKeys.map((link) => ({ ...link, label: t(`nav.${link.key}`) }))

  return (
    <div className="site">
      <div className="topbar">
        <div className="wrap topbar-inner">
          <span><IconPin /> Malviya Nagar, Jaipur</span>
          <span><IconClock /> {t('topbar.hours')}</span>
          <span className="topbar-right">
            <a href="mailto:advsamkitjain@gmail.com"><IconMail /> advsamkitjain@gmail.com</a>
            <a href="tel:+919828700854"><IconPhone /> +91 98287 00854</a>
          </span>
        </div>
      </div>

      <header className="header">
        <div className="wrap header-inner">
          <Link to="/" className="brand" onClick={() => setOpen(false)}>
            <LogoMark className="brand-mark" />
            <span className="brand-text">
              <strong>{t('brand.name')}</strong>
              <em>{t('brand.tag')}</em>
            </span>
          </Link>

          <button
            className={`menu-btn ${open ? 'open' : ''}`}
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle navigation"
            aria-expanded={open}
          >
            <span />
            <span />
            <span />
          </button>

          <nav className={open ? 'open' : ''}>
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
            <LangSwitch className="nav-lang" />
          </nav>

          <div className="header-cta">
            <LangSwitch />
            <a className="phone-chip" href="tel:+919828700854">
              <IconPhone />
              <span>
                +91 98287
                <br />
                00854
              </span>
            </a>
            <Link className="btn btn-gold" to="/contact" onClick={() => setOpen(false)}>
              {t('nav.book')}
            </Link>
          </div>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="footer">
        <div className="wrap footer-grid">
          <div>
            <h3>{t('brand.name')}, {t('brand.advocate')}</h3>
            <p className="gold-label">Rajasthan High Court</p>
            <p>{t('footer.blurb')}</p>
          </div>
          <div>
            <p className="gold-label">{t('footer.navigate')}</p>
            {links.map((link) => (
              <Link key={link.to} to={link.to}>{link.label}</Link>
            ))}
          </div>
          <div>
            <p className="gold-label">{t('footer.practice')}</p>
            <Link to="/practice#highcourt">{t('footer.highcourt')}</Link>
            <Link to="/practice#rera">{t('footer.rera')}</Link>
            <Link to="/practice#consumer">{t('footer.consumer')}</Link>
            <Link to="/practice#family">{t('footer.family')}</Link>
            <Link to="/practice#mact">{t('footer.mact')}</Link>
            <Link to="/practice#succession">{t('footer.succession')}</Link>
            <Link to="/practice">{t('footer.allAreas')}</Link>
          </div>
          <div>
            <p className="gold-label">{t('footer.office')}</p>
            <p><IconPin /> Ground Floor, 4/23 Shivanand Marg, Malviya Nagar, Jaipur-302017</p>
            <a href="https://g.co/kgs/v2BxLMm" target="_blank" rel="noreferrer">{t('footer.maps')}</a>
            <p><IconPhone /> <a href="tel:+919828700854">+91 98287 00854</a></p>
            <p><IconMail /> <a href="mailto:advsamkitjain@gmail.com">advsamkitjain@gmail.com</a></p>
          </div>
        </div>
        <div className="wrap footer-note">
          <p>{t('footer.disclaimer')}</p>
        </div>
        <div className="wrap footer-bottom">
          <p>{t('footer.copyright').replace('{year}', String(new Date().getFullYear()))}</p>
          <p>
            <Link to="/disclaimer">{t('footer.disclaimerLink')}</Link>
            <Link to="/privacy">{t('footer.privacy')}</Link>
            <Link to="/terms">{t('footer.terms')}</Link>
          </p>
        </div>
      </footer>

      <div className="float">
        <a
          className="float-wa"
          href="https://api.whatsapp.com/send?phone=919828700854&text=Hello%2C%20I%20would%20like%20to%20discuss%20a%20legal%20matter%20with%20Samkit%20Jain%2C%20Advocate."
          target="_blank"
          rel="noreferrer"
          aria-label="WhatsApp"
        >
          <IconWhatsApp />
        </a>
        <a className="float-call" href="tel:+919828700854" aria-label="Call">
          <IconPhone />
        </a>
        {showTop && (
          <button className="float-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top">
            ^
          </button>
        )}
      </div>
    </div>
  )
}
