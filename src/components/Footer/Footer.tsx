import logo from '../../assets/imagens/logo-ls.webp'
import { profile } from '../../data/portfolio'
import NavLinks from '../NavLinks/NavLinks'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <NavLinks className="nav footer__nav" />
      <div className="container container--wide footer__bottom">
        <img src={logo} alt="LS" className="footer__logo" />
        <p>© {new Date().getFullYear()} {profile.fullName}. Feito com React e TypeScript.</p>
      </div>
    </footer>
  )
}
