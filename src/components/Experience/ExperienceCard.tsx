import type { ExperienceItem } from '../../types'

export default function ExperienceCard({ period, duration, role, company, location, summary, highlights }: ExperienceItem) {
  return (
    <article className="card exp-card">
      <header className="exp-card__head">
        <div>
          <h3 className="exp-card__role">{role}</h3>
          <p className="exp-card__company">
            {company} <span>· {location}</span>
          </p>
        </div>
        <p className="exp-card__period">
          <time>{period}</time>
          <span>{duration}</span>
        </p>
      </header>
      {summary && <p className="exp-card__summary">{summary}</p>}
      <ul className="exp-card__list">
        {highlights.map((h) => (
          <li key={h}>{h}</li>
        ))}
      </ul>
    </article>
  )
}
