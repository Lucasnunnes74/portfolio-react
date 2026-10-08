import { socialLinks } from '../../data/portfolio'
import './SocialRail.css'

const icons: Record<string, string> = { CV: '📄', LinkedIn: 'in', GitHub: '</>', WhatsApp: '✆' }

export default function SocialRail() {
  return (
    <ul className="rail">
      {socialLinks.map((l) => (
        <li key={l.label}>
          <a href={l.href} target="_blank" rel="noreferrer" aria-label={l.label} title={l.label}>
            {icons[l.label] ?? l.label[0]}
          </a>
        </li>
      ))}
    </ul>
  )
}
