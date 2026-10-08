import { skillGroups } from '../../data/portfolio'
import Reveal from '../Reveal/Reveal'
import SectionHeading from '../SectionHeading/SectionHeading'
import './Skills.css'

export default function Skills() {
  return (
    <section id="skills" className="section container container--wide">
      <SectionHeading tag="skills.json" subtitle="Tecnologias e práticas que uso no dia a dia, do front-end à infraestrutura.">
        Habilidades técnicas
      </SectionHeading>
      <div className="skills">
        {skillGroups.map((g, i) => (
          <Reveal key={g.title} delay={i * 80}>
            <article className="card skills__card">
              <h3>{g.title}</h3>
              <p>{g.description}</p>
              <ul className="skills__chips">
                {g.items.map((s) => (
                  <li key={s.name} className="chip">
                    {s.logo && <img src={s.logo} alt="" width="18" height="18" loading="lazy" />}
                    {s.name}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
