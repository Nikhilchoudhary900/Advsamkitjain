import { Link } from 'react-router-dom'

export default function Profile() {
  return (
    <section className="page">
      <header className="page-head">
        <p className="eyebrow">About the advocate</p>
        <h1>Samkit Jain</h1>
        <p className="lede">
          Advocate enrolled with the Bar Council of India, practising at Jaipur.
          Appearances primarily before the Rajasthan High Court, along with
          tribunals and the district courts.
        </p>
      </header>

      <div className="profile-layout">
        <div className="profile-column">
          <h2>Professional standing</h2>
          <dl className="timeline">
            <div>
              <dt>Enrolment</dt>
              <dd>Advocate, Bar Council of India</dd>
            </div>
            <div>
              <dt>Court</dt>
              <dd>Rajasthan High Court — principal work at the Jaipur Bench</dd>
            </div>
            <div>
              <dt>Experience</dt>
              <dd>Eight years at the Bar; more than fifty clients advised</dd>
            </div>
            <div>
              <dt>Office</dt>
              <dd>
                Ground Floor, 4/23 Shivanand Marg, Malviya Nagar, Jaipur-302017
                {' '}
                <a href="https://g.co/kgs/v2BxLMm" target="_blank" rel="noreferrer">View on Google Maps</a>
              </dd>
            </div>
          </dl>
        </div>
        <div className="profile-column">
          <h2>How to reach the office</h2>
          <ul className="plain-list">
            <li>
              Telephone:{' '}
              <a href="tel:+919828700854">+91 98287 00854</a>
            </li>
            <li>
              Email:{' '}
              <a href="mailto:advsamkitjain@gmail.com">advsamkitjain@gmail.com</a>
            </li>
            <li>Consultation hours: Monday to Saturday, 10:00 AM – 9:30 PM</li>
            <li>Conferences at the office by prior appointment</li>
          </ul>
          <h2>Work taken</h2>
          <ul className="plain-list">
            <li>Civil suits, injunctions and property disputes</li>
            <li>Writ petitions and constitutional remedies</li>
            <li>Matrimonial, service and consumer matters</li>
          </ul>
        </div>
      </div>

      <aside className="note">
        <p className="eyebrow">Professional conduct</p>
        <p>
          Instructions are accepted subject to conflict, competence, and the
          Advocates Act. Fees and the scope of work are confirmed in writing
          before papers are filed. No outcome is promised. This website does
          not solicit work or advertise the practice of law.
        </p>
        <Link className="inline-link" to="/disclaimer">
          Read the full disclaimer
        </Link>
      </aside>
    </section>
  )
}
