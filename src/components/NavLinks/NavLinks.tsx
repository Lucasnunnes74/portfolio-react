import { navItems } from '../../data/portfolio'

interface Props {
  className?: string
  active?: string
  onNavigate?: () => void
}

export default function NavLinks({ className, active, onNavigate }: Props) {
  return (
    <nav className={className} aria-label="Principal">
      {navItems.map((n) => (
        <a
          key={n.href}
          href={n.href}
          onClick={onNavigate}
          className={active === n.href.slice(1) ? 'is-active' : ''}
          aria-current={active === n.href.slice(1) ? 'true' : undefined}
        >
          {n.label}
        </a>
      ))}
    </nav>
  )
}
