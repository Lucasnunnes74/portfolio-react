import { experiences } from '../../data/portfolio'
import Reveal from '../Reveal/Reveal'
import SectionHeading from '../SectionHeading/SectionHeading'
import ExperienceCard from './ExperienceCard'
import './Experience.css'

export default function Experience() {
  return (
    <section id="experiencia" className="section container">
      <SectionHeading tag="git log --experiencia" subtitle="Mais de 5 anos entregando código em produção.">
        Experiência profissional
      </SectionHeading>
      <ol className="timeline">
        {experiences.map((e, i) => (
          <li key={e.period} className="timeline__item">
            <Reveal delay={i * 60}>
              <ExperienceCard {...e} />
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  )
}
