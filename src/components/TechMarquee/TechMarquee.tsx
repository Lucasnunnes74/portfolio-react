import { skillGroups } from '../../data/portfolio'
import './TechMarquee.css'

const items = skillGroups.flatMap((g) => g.items).filter((i) => i.logo)

export default function TechMarquee() {
  const row = (hidden: boolean) => (
    <ul className="marquee__row" aria-hidden={hidden || undefined}>
      {items.map((i) => (
        <li key={i.name}>
          <img src={i.logo} alt={hidden ? '' : i.name} width="28" height="28" loading="lazy" />
          {i.name}
        </li>
      ))}
    </ul>
  )
  return (
    <div className="marquee" aria-label="Tecnologias que utilizo">
      <div className="marquee__track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  )
}
