import { useState } from 'react'
import { useLang } from '../i18n/LanguageContext.jsx'

export default function ReraPath() {
  const { t } = useLang()
  const [cur, setCur] = useState(0)
  const stages = t('rera.stages')
  const stage = stages[cur]
  const last = stages.length - 1
  const barWidth = `${(cur / last) * 100}%`

  return (
    <div className="rera-path">
      <div className="tl" role="tablist" aria-label="RERA stages">
        <div className="tl-line" />
        <div className="tl-bar" style={{ width: barWidth }} />
        {stages.map((item, index) => (
          <button
            key={item.l}
            type="button"
            role="tab"
            className={`${index === cur ? 'on' : ''}${index < cur ? ' done' : ''}`}
            aria-selected={index === cur}
            onClick={() => setCur(index)}
          >
            <span className="dot">{index + 1}</span>
            <span className="lbl">{item.l}</span>
          </button>
        ))}
      </div>

      <div className="tl-panel" role="tabpanel" aria-live="polite">
        <div className="big">{String(cur + 1).padStart(2, '0')}</div>
        <div>
          <h3>{stage.h}</h3>
          <p>{stage.p}</p>
          <div className="meta">
            {stage.m.map((tag) => (
              <span className="tl-pill" key={tag}>{tag}</span>
            ))}
          </div>
          <div className="tl-nav">
            <button
              className="btn btn-outline"
              type="button"
              disabled={cur === 0}
              onClick={() => setCur((n) => Math.max(0, n - 1))}
            >
              {t('common.previous')}
            </button>
            <button
              className="btn btn-gold"
              type="button"
              disabled={cur === last}
              onClick={() => setCur((n) => Math.min(last, n + 1))}
            >
              {t('common.next')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
