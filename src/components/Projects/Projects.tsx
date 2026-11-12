import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { projects } from '../../data/portfolio'
import Rise from '../fx/Rise'
import TiltCard from '../fx/TiltCard'
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
          <div key={p.title} className={`projects__item ${i < 2 ? 'projects__item--big' : ''}`}>
            <Rise delay={0.08 * (i % 3)}>
              <TiltCard max={3} className="edge">
                <article className="card fx-surface project">
                  <span className="project__no" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
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
              </TiltCard>
            </Rise>
          </div>
        ))}
      </div>
    </section>
  )
}
