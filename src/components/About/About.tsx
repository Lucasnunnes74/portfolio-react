import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import photo from '../../assets/imagens/lucas-santos.webp'
import { aboutFacts, aboutParagraphs, profile, softSkills } from '../../data/portfolio'
import Reveal from '../Reveal/Reveal'
import SectionHeading from '../SectionHeading/SectionHeading'
import './About.css'

export default function About() {
  return (
    <section id="sobre" className="section container container--wide">
      <SectionHeading tag="whoami">Sobre mim</SectionHeading>
      <div className="about">
        <Reveal className="about__side">
          <div className="about__avatar">
            <img src={photo} alt={profile.fullName} loading="lazy" />
          </div>
          <dl className="about__facts card">
            {aboutFacts.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
        <Reveal delay={100} className="about__main">
          {aboutParagraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <h3 className="about__sub">Como eu trabalho</h3>
          <ul className="about__skills">
            {softSkills.map((s) => (
              <li key={s.title}>
                <span className="about__check" aria-hidden="true">
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span>
                  <strong>{s.title}:</strong> {s.text}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
