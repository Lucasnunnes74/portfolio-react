import { faArrowRight, faFileArrowDown } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedinIn, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import heroImg from '../../assets/imagens/perfil-banner.png'
import { profile, stats } from '../../data/portfolio'
import './Hero.css'

const socials = [
  { label: 'LinkedIn', href: profile.linkedin, icon: faLinkedinIn },
  { label: 'GitHub', href: profile.github, icon: faGithub },
  { label: 'WhatsApp', href: profile.whatsapp, icon: faWhatsapp },
]

export default function Hero() {
  return (
    <section id="inicio" className="hero container container--wide">
      <div className="hero__text">
        {/* <span className="hero__badge">
          <span className="hero__dot" aria-hidden="true" />
          {profile.availability}
        </span> */}
        <h1 className="hero__title">
          Olá, eu sou <span className="gradient-text">{profile.name}</span>
          <span className="hero__cursor" aria-hidden="true" />
        </h1>
        <p className="hero__sub">
          {profile.role} · <span className="purple">{profile.headline}</span>
        </p>
        <p className="hero__tagline">{profile.tagline}</p>
        <div className="hero__actions">
          <a href="#contato" className="btn btn--primary">
            Vamos conversar <FontAwesomeIcon icon={faArrowRight} />
          </a>
          <a href={profile.cv} download className="btn btn--ghost">
            <FontAwesomeIcon icon={faFileArrowDown} /> Baixar currículo
          </a>
        </div>
        <ul className="hero__social">
          {socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noreferrer noopener" aria-label={s.label} title={s.label}>
                <FontAwesomeIcon icon={s.icon} />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="hero__visual">
        <div className="hero__glow" aria-hidden="true" />
        <img src={heroImg} alt={`Ilustração de ${profile.name}`} className="hero__img" fetchPriority="high" />
      </div>
      <ul className="hero__stats">
        {stats.map((s) => (
          <li key={s.label} className="card">
            <strong>{s.value}</strong>
            <span>{s.label}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
