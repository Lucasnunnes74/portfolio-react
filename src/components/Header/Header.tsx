import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import logo from '../../assets/imagens/logo-name.webp'
import { navItems, profile } from '../../data/portfolio'
import { useActiveSection } from '../../hooks/useActiveSection'
import NavLinks from '../NavLinks/NavLinks'
import './Header.css'

const ids = navItems.map((n) => n.href.slice(1))

export default function Header() {
  const active = useActiveSection(ids)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className={`header ${scrolled || open ? 'is-solid' : ''}`}>
      <div className="header__inner">
        <a href="#inicio" aria-label={`${profile.name} — início`} onClick={() => setOpen(false)}>
          <img src={logo} alt={profile.name} className="header__logo" />
        </a>
        <NavLinks className="nav header__nav" active={active} />
        <a href={profile.cv} download className="btn btn--ghost header__cv">
          Currículo
        </a>
        <button
          type="button"
          className="header__toggle"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          aria-controls="menu-mobile"
          onClick={() => setOpen((v) => !v)}
        >
          <FontAwesomeIcon icon={open ? faXmark : faBars} />
        </button>
      </div>
      <div id="menu-mobile" className={`header__drawer ${open ? 'is-open' : ''}`}>
        <NavLinks className="header__drawer-nav" active={active} onNavigate={() => setOpen(false)} />
        <a href={profile.cv} download className="btn btn--primary" onClick={() => setOpen(false)}>
          Baixar currículo
        </a>
      </div>
    </header>
  )
}
