import { stacks } from '../../data/portfolio'
import SectionHeading from '../SectionHeading/SectionHeading'
import './Stacks.css'

export default function Stacks() {
  // lista duplicada para o loop infinito do marquee
  const loop = [...stacks, ...stacks]
  return (
    <section id="stacks" className="section">
      <SectionHeading tag="stacks.json">Minhas Principais Stacks</SectionHeading>
      <div className="marquee">
        <ul className="marquee__track">
          {loop.map((s, i) => (
            <li key={i} className="marquee__item" aria-hidden={i >= stacks.length}>
              <img src={s.logo} alt={s.name} title={s.name} loading="lazy" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
