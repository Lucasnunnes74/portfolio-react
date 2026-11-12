import { faAward, faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { certifications, education } from '../../data/portfolio'
import Rise from '../fx/Rise'
import TiltCard from '../fx/TiltCard'
import SectionHeading from '../SectionHeading/SectionHeading'
import './Education.css'

export default function Education() {
  return (
    <section id="formacao" className="section container container--wide">
      <SectionHeading tag="formacao.json">Formação e certificações</SectionHeading>
      <div className="edu-grid">
        <div>
          <h3 className="edu-grid__title">Formação acadêmica</h3>
          <ul className="edu">
            {education.map((e, i) => (
              <li key={e.institution}>
                <Rise delay={0.07 * i} x={-30}>
                  <TiltCard max={1.5}>
                    <article className="card fx-surface edu__item">
                      <span className="edu__icon" aria-hidden="true">
                        <FontAwesomeIcon icon={faGraduationCap} />
                      </span>
                      <div>
                        <h4>{e.course}</h4>
                        <p>{e.institution}</p>
                      </div>
                      <time>{e.period}</time>
                    </article>
                  </TiltCard>
                </Rise>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="edu-grid__title">Certificações e cursos</h3>
          <ul className="edu">
            {certifications.map((c, i) => (
              <li key={c.title}>
                <Rise delay={0.07 * i} x={30}>
                  <TiltCard max={1.5}>
                    <article className="card fx-surface edu__item edu__item--cert">
                      <span className="edu__icon edu__icon--cert" aria-hidden="true">
                        <FontAwesomeIcon icon={faAward} />
                      </span>
                      <h4>{c.title}</h4>
                    </article>
                  </TiltCard>
                </Rise>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
