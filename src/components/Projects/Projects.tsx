import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { projects } from '../../data/portfolio'
import Reveal from '../Reveal/Reveal'
import SectionHeading from '../SectionHeading/SectionHeading'
import './Projects.css'

export default function Projects() {
  return (
    <section id="projetos" className="section container container--wide">
      <SectionHeading tag="projetos.map()" subtitle="Entregas em destaque da minha trajetória profissional.">
        Projetos em destaque
      </SectionHeading>
      <div className="projects">
        {projects.map((p, i) => (
          <Reveal key={p.title} delay={i * 80}>
            <article className="card project">
              <span className="project__context">{p.context}</span>
              <h3>{p.title}</h3>
              <p>{p.description}</p>
              <ul className="project__tech">
                {p.tech.map((t) => (
                  <li key={t} className="chip">{t}</li>
                ))}
              </ul>
              {p.href && (
                <a href={p.href} target="_blank" rel="noreferrer noopener" className="project__link">
                  Ver projeto <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                </a>
              )}
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
