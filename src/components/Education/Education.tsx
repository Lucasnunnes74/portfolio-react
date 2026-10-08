import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { education } from '../../data/portfolio'
import Reveal from '../Reveal/Reveal'
import SectionHeading from '../SectionHeading/SectionHeading'
import './Education.css'

export default function Education() {
  return (
    <section id="formacao" className="section container">
      <SectionHeading tag="formacao.json">Formação acadêmica</SectionHeading>
      <ul className="edu">
        {education.map((e, i) => (
          <li key={e.institution}>
            <Reveal delay={i * 60}>
              <article className="card edu__item">
                <span className="edu__icon" aria-hidden="true">
                  <FontAwesomeIcon icon={faGraduationCap} />
                </span>
                <div>
                  <h3>{e.course}</h3>
                  <p>{e.institution}</p>
                </div>
                <time>{e.period}</time>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  )
}
