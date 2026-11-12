import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import photo from '../../assets/imagens/lucas-santos.webp'
import { aboutFacts, aboutParagraphs, profile, softSkills, stats } from '../../data/portfolio'
import CountUp from '../fx/CountUp'
import Parallax from '../fx/Parallax'
import Rise from '../fx/Rise'
import TiltCard from '../fx/TiltCard'
import SectionHeading from '../SectionHeading/SectionHeading'
import './About.css'

export default function About() {
  return (
    <section id="sobre" className="section container container--wide">
      <SectionHeading tag="whoami">Sobre mim</SectionHeading>
      <div className="about">
        <div className="about__side">
          <Rise x={-40}>
            <div className="about__stage">
              <TiltCard max={10} className="about__tilt">
                <div className="about__frame">
                  <span className="about__ring" aria-hidden="true" />
                  <div className="about__avatar">
                    <img src={photo} alt={profile.fullName} loading="lazy" />
                  </div>
                  <span className="about__corner about__corner--tl" aria-hidden="true" />
                  <span className="about__corner about__corner--br" aria-hidden="true" />
                </div>
              </TiltCard>
              <Parallax distance={26} className="about__float about__float--a">
                <span aria-hidden="true">&lt;React /&gt;</span>
              </Parallax>
              <Parallax distance={50} className="about__float about__float--b">
                <span aria-hidden="true">Next.js</span>
              </Parallax>
              <Parallax distance={18} className="about__float about__float--c">
                <span aria-hidden="true">TS</span>
              </Parallax>
            </div>
          </Rise>
          <ul className="about__stats">
            {stats.map((s, i) => (
              <li key={s.label}>
                <Rise delay={0.1 * i}>
                  <div className="card fx-surface about__stat">
                    <strong className="gradient-text">
                      <CountUp value={s.value} />
                    </strong>
                    <span>{s.label}</span>
                  </div>
                </Rise>
              </li>
            ))}
          </ul>
        </div>
        <div className="about__main">
          {aboutParagraphs.map((p, i) => (
            <Rise key={p} delay={0.05 * i}>
              <p>{p}</p>
            </Rise>
          ))}
          <Rise>
            <div className="term card fx-surface">
              <div className="term__bar" aria-hidden="true">
                <i />
                <i />
                <i />
                <span>~/lucas/facts.sh</span>
              </div>
              <p className="term__cmd" aria-hidden="true">$ cat facts.json</p>
              <dl className="term__facts">
                {aboutFacts.map((f) => (
                  <div key={f.label}>
                    <dt>{f.label}</dt>
                    <dd>{f.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Rise>
          <h3 className="about__sub">Como eu trabalho</h3>
          <ul className="about__skills">
            {softSkills.map((s, i) => (
              <li key={s.title}>
                <Rise delay={0.07 * i}>
                  <div className="card fx-surface about__skill">
                    <span className="about__check" aria-hidden="true">
                      <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span>
                      <strong>{s.title}:</strong> {s.text}
                    </span>
                  </div>
                </Rise>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
