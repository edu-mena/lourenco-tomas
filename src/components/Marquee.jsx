/* ── Marquee ────────────────────────────────────── */
import { MARQUEE_ITEMS } from '../data/ui'

export function Marquee() {
  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {doubled.map((item, i) => (
          <span key={i} className="marquee__item">
            {item}
            <span className="marquee__dot" />
          </span>
        ))}
      </div>
    </div>
  )
}
