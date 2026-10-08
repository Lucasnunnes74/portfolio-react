import photo from '../../assets/imagens/lucas-santos.webp'
import { socialLinks, softSkills, softSkillsIntro } from '../../data/portfolio'
import './SoftSkills.css'

export default function SoftSkills() {
  const cv = socialLinks.find((l) => l.label === 'CV')
  return (
    <section id="soft-skills" className="section container container--wide soft">
      <div className="soft__photo">
        <div className="soft__avatar"><img src={photo} alt="Lucas Santos" /></div>
        <a href={cv?.href} download className="pill pill--light">
          Baixar Currículo
        </a>
      </div>
      <div className="card soft__card">
        <h2 className="soft__title">
          Soft <span className="accent">Skills</span>
        </h2>
        <p className="soft__intro">{softSkillsIntro}</p>
        <ul className="soft__list">
          {softSkills.map((s) => (
            <li key={s.title}>
              <span className="soft__check" aria-hidden="true">✓</span>
              <span>
                {s.title}: {s.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
