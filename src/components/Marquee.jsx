/* ── Marquee ────────────────────────────────────── */
const ITEMS = [
  'T-Shirts','Murais','Telas','Calçados', 'T-Shirts','Murais','Telas','Calçados'
]

export function Marquee() {
  const doubled = [...ITEMS, ...ITEMS]
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
