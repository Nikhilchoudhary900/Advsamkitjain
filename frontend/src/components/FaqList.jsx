import { useState } from 'react'

export default function FaqList({ items, initialOpen = 0 }) {
  const [openIndex, setOpenIndex] = useState(initialOpen)

  function toggle(index) {
    setOpenIndex((current) => (current === index ? -1 : index))
  }

  return (
    <div className="faq-list">
      {items.map((item, index) => {
        const open = openIndex === index
        return (
          <article key={item.q} className={`faq-item${open ? ' open' : ''}`}>
            <button
              type="button"
              className="faq-q"
              aria-expanded={open}
              onClick={() => toggle(index)}
            >
              {item.q}
            </button>
            {open && (
              <div className="faq-a">
                {item.a.map((para) => (
                  <p key={para.slice(0, 40)}>{para}</p>
                ))}
              </div>
            )}
          </article>
        )
      })}
    </div>
  )
}
