import { Link } from 'react-router-dom'
import FaqList from '../components/FaqList.jsx'
import ReraPath from '../components/ReraPath.jsx'
import { useLang } from '../i18n/LanguageContext.jsx'
import {
  IconArrow, IconBrief, IconCheck, IconClock, IconDoc, IconGavel,
  IconBolt, IconBook, IconFolder, IconHome, IconPeople, IconPhone, IconPin, IconScales, IconSearch, IconUser, LogoMark
} from '../components/Icons.jsx'

const areaIcons = [
  <IconScales />, <IconHome />, <IconPeople />, <IconDoc />, <IconPeople />, <IconBrief />,
  <IconDoc />, <IconBrief />, <IconGavel />, <IconDoc />, <IconScales />, <IconDoc />
]

const apartIcons = [<IconUser />, <IconFolder />, <IconBolt />, <IconSearch />]

const clients = [
  { name: 'Akshat Apartments Private Limited' },
  { name: 'KEDIA BUILDERS & COLONIZERS' },
  { name: 'Kalash Realty' },
  { name: 'Icarus Builders And Developers Pvt. Ltd.' },
  { name: 'Saras Builders And Developers' },
  { name: 'JANVI DREAM DEVELOPERS PRIVATE LIMITED' },
  { name: 'Click4flats' }
]

export default function Home() {
  const { t } = useLang()
  const areas = t('home.areas')
  const apart = t('home.apart')
  const steps = t('home.steps')
  const ticker = t('home.ticker')
  const assist = t('home.assist')

  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <p className="slogan">{t('home.slogan')}</p>
            <h1>
              {t('home.headline')}
              <em>{t('home.subhead')}</em>
            </h1>
            <div className="btn-row">
              <Link className="btn btn-gold" to="/practice">
                {t('home.viewPractice')} <IconArrow />
              </Link>
              <Link className="btn btn-outline" to="/contact">
                {t('home.officeContact')}
              </Link>
            </div>
            <div className="hero-qual" aria-label={t('home.qualification')}>
              <span className="hq-ico"><IconBook /></span>
              <div>
                <span className="hq-l">{t('home.qualification')}</span>
                <ul>
                  <li>LL.M.</li>
                  <li>B.B.A. LL.B. (Hons.), Specialisation in Corporate Laws</li>
                  <li>Diploma in IPR Law, Management and Technology, GNLU</li>
                </ul>
              </div>
            </div>
            <ul className="chips" aria-label="Key facts">
              <li><IconCheck /> {t('home.chipBar')}</li>
              <li><IconPin /> Malviya Nagar, Jaipur</li>
              <li><IconDoc /> {t('home.chipDraft')}</li>
            </ul>
          </div>
          <aside className="hero-card">
            <h3>{t('home.assistTitle')}</h3>
            <p>{t('home.assistLead')}</p>
            <ul className="checks">
              {assist.map((item) => (
                <li key={item}><IconCheck /> {item}</li>
              ))}
            </ul>
            <div className="hero-card-foot">
              <p><IconPhone /> +91 98287 00854</p>
              <p>advsamkitjain@gmail.com</p>
            </div>
          </aside>
        </div>
      </section>

      <section className="stats-band">
        <div className="wrap stats-row">
          <div>
            <strong>7+</strong>
            <span>{t('home.yearsExp')}</span>
          </div>
          <div>
            <strong>High Court</strong>
            <span>{t('home.primaryPractice')}</span>
          </div>
          <div>
            <strong>Jaipur</strong>
            <span>{t('home.officeLocation')}</span>
          </div>
          <a className="stats-address" href="https://g.co/kgs/v2BxLMm" target="_blank" rel="noreferrer">
            <IconPin /> Ground Floor, 4/23 Shivanand Marg, Malviya Nagar, Jaipur-302017
          </a>
        </div>
      </section>

      <div className="ribbon">
        {ticker.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>

      <section className="section cream">
        <div className="wrap center">
          <p className="kicker">{t('home.practiceKicker')}</p>
          <h2>{t('home.practiceTitle')}</h2>
          <p className="sub">{t('home.practiceSub')}</p>
          <div className="cards-3">
            {areas.map((area, i) => (
              <article className="white-card" key={area.title}>
                <span className="icon-box">{areaIcons[i]}</span>
                <h3>{area.title}</h3>
                <p>{area.text}</p>
                <Link to="/practice">{t('common.readMore')} <IconArrow /></Link>
              </article>
            ))}
          </div>
          <Link className="btn btn-navy" to="/practice">
            {t('home.allPractice')} <IconArrow />
          </Link>
        </div>
      </section>

      <section className="section cream">
        <div className="wrap about-grid">
          <div className="sj-panel">
            <img src="/samkit-jain.webp" alt={t('brand.advocate')} />
            <span className="years">7+<small>{t('common.years')}</small></span>
            <div className="sj-caption">
              <strong>{t('brand.advocate')}</strong>
              <em>Rajasthan High Court</em>
            </div>
          </div>
          <div>
            <p className="kicker left">{t('home.aboutKicker')}</p>
            <p className="copy">{t('home.aboutP1')}</p>
            <p className="copy">{t('home.aboutP2')}</p>
            <Link className="btn btn-navy" to="/about">
              {t('home.moreAbout')} <IconArrow />
            </Link>
          </div>
        </div>
      </section>

      <section className="section cream tight">
        <div className="wrap center">
          <p className="kicker">{t('home.apartKicker')}</p>
          <h2>{t('home.apartTitle')}</h2>
          <p className="sub">{t('home.apartSub')}</p>
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

      <section className="section navy">
        <div className="wrap">
          <p className="kicker left">{t('home.glanceKicker')}</p>
          <h2 className="light">{t('home.glanceTitle')}</h2>
          <div className="glance">
            <div><strong>7+</strong><span>{t('home.yearsBar')}</span></div>
            <div><strong>19</strong><span>{t('home.practiceAreas')}</span></div>
            <div><strong>Hindi & English</strong><span>{t('home.draftingLangs')}</span></div>
            <div><strong>100+</strong><span>{t('home.clients')}</span></div>
          </div>
        </div>
      </section>

      <section className="section cream">
        <div className="wrap center">
          <p className="kicker">{t('home.approachKicker')}</p>
          <h2>{t('home.approachTitle')}</h2>
          <p className="sub">{t('home.approachSub')}</p>
          <div className="cards-4">
            {steps.map((step) => (
              <article className="white-card" key={step.n}>
                <span className="step-n">{step.n}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section cream tight">
        <div className="wrap center">
          <p className="kicker">{t('home.clientsKicker')}</p>
          <h2>{t('home.clientsTitle')}</h2>
          <p className="sub">{t('home.clientsSub')}</p>
          <div className="client-orbit" aria-label={t('home.clientsTitle')}>
            <div className="client-orbit-ring" aria-hidden="true" />
            <div className="client-orbit-core" aria-label={t('brand.name')}>
              <LogoMark caption />
            </div>
            {clients.map((client, i) => (
              <article
                className={`client-orbit-item n${i + 1}`}
                key={client.name}
                style={{ '--a': `${i * (360 / clients.length)}deg` }}
              >
                <strong>{client.name}</strong>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section cream" id="rera">
        <div className="wrap">
          <p className="kicker left">{t('home.reraKicker')}</p>
          <h2>{t('home.reraTitle')}</h2>
          <p className="sub" style={{ textAlign: 'left', marginBottom: '1.6rem' }}>
            {t('home.reraSub')}
          </p>
          <ReraPath />
          <Link className="btn btn-navy faq-cta" to="/rera">
            {t('home.reraCta')} <IconArrow />
          </Link>
        </div>
      </section>

      <section className="section cream" id="faq">
        <div className="wrap center">
          <p className="kicker">{t('home.faqKicker')}</p>
          <h2>{t('home.faqTitle')}</h2>
          <p className="sub">{t('home.faqSub')}</p>
          <FaqList items={t('faq.items')} />
          <Link className="btn btn-navy faq-cta" to="/faq">
            {t('home.faqCta')} <IconArrow />
          </Link>
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

      <section className="section cream">
        <div className="wrap center">
          <p className="kicker">{t('home.officeKicker')}</p>
          <h2>{t('home.officeTitle')}</h2>
          <div className="cards-3 office">
            <article className="white-card office-card">
              <span className="icon-box"><IconPin /></span>
              <div>
                <h3>{t('home.address')}</h3>
                <p>
                  {t('brand.advocate')}<br />
                  Ground Floor, 4/23 Shivanand Marg<br />
                  Malviya Nagar, Jaipur-302017
                </p>
                <a className="map-link" href="https://g.co/kgs/v2BxLMm" target="_blank" rel="noreferrer">
                  {t('common.maps')}
                </a>
              </div>
            </article>
            <article className="white-card office-card">
              <span className="icon-box"><IconPhone /></span>
              <div>
                <h3>{t('home.phone')}</h3>
                <p><a href="tel:+919828700854">+91 98287 00854</a></p>
              </div>
            </article>
            <article className="white-card office-card">
              <span className="icon-box"><IconClock /></span>
              <div>
                <h3>{t('home.hours')}</h3>
                <p>{t('home.hoursText').split('\n').map((line) => <span key={line}>{line}<br /></span>)}</p>
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  )
}
