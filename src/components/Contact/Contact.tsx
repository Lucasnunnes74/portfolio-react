import { faGithub, faLinkedinIn, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faFileArrowDown, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, type ChangeEvent, type FormEvent } from 'react'
import { profile } from '../../data/portfolio'
import Magnetic from '../fx/Magnetic'
import Rise from '../fx/Rise'
import TiltCard from '../fx/TiltCard'
import SectionHeading from '../SectionHeading/SectionHeading'
import './Contact.css'

const empty = { nome: '', email: '', telefone: '', mensagem: '' }

// URL de produção do webhook do n8n (ver .env.example)
const WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL as string | undefined

type Status = 'idle' | 'sending' | 'success' | 'error' | 'mailto'

const channels = [
  { label: 'E-mail', value: profile.email, href: `mailto:${profile.email}`, icon: faEnvelope },
  { label: 'WhatsApp', value: profile.phone, href: profile.whatsapp, icon: faWhatsapp },
  { label: 'LinkedIn', value: 'lucas-santos-da-silva', href: profile.linkedin, icon: faLinkedinIn },
  { label: 'GitHub', value: 'Lucasnunnes74', href: profile.github, icon: faGithub },
]

export default function Contact() {
  const [form, setForm] = useState(empty)
  const [status, setStatus] = useState<Status>('idle')
  const [honeypot, setHoneypot] = useState('')

  const set = (k: keyof typeof empty) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  const openMailClient = () => {
    const body = `${form.mensagem}\n\n${form.nome}\n${form.email}\n${form.telefone}`
    const subject = `Contato do portfólio - ${form.nome}`
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    if (status === 'sending') return
    // campo oculto preenchido = bot; finge sucesso sem enviar
    if (honeypot) {
      setStatus('success')
      setForm(empty)
      return
    }
    if (!WEBHOOK_URL) {
      openMailClient()
      setStatus('mailto')
      return
    }
    setStatus('sending')
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          data_envio: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
        }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setStatus('success')
      setForm(empty)
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contato" className="section container container--wide">
      <SectionHeading
        tag="contato.send()"
        subtitle={`${profile.availability}. Vamos conversar?`}
      >
        Entre em contato
      </SectionHeading>
      <Rise>
        <div className="cta card fx-surface">
          <p className="cta__status">
            <i aria-hidden="true" /> Disponível para novas oportunidades
          </p>
          <p className="cta__title">
            Vamos construir <span className="gradient-text">algo rápido, acessível e visível</span> juntos?
          </p>
          <div className="cta__actions">
            <Magnetic>
              <a className="btn btn--primary cta__btn" href={`mailto:${profile.email}`}>
                <FontAwesomeIcon icon={faEnvelope} /> Enviar e-mail
              </a>
            </Magnetic>
            <Magnetic>
              <a className="btn btn--ghost cta__btn" href={profile.whatsapp} target="_blank" rel="noreferrer noopener">
                <FontAwesomeIcon icon={faWhatsapp} /> WhatsApp
              </a>
            </Magnetic>
            <Magnetic>
              <a className="btn btn--ghost cta__btn" href={profile.cv} target="_blank" rel="noreferrer noopener">
                <FontAwesomeIcon icon={faFileArrowDown} /> Currículo
              </a>
            </Magnetic>
          </div>
        </div>
      </Rise>
      <div className="contact">
        <Rise x={-30} className="contact__info">
          <ul className="contact__list">
            {channels.map((c) => (
              <li key={c.label}>
                <TiltCard max={2}>
                  <a href={c.href} target={c.href.startsWith('mailto') ? undefined : '_blank'} rel="noreferrer noopener" className="card fx-surface contact__channel">
                    <span className="contact__icon" aria-hidden="true"><FontAwesomeIcon icon={c.icon} /></span>
                    <span>
                      <small>{c.label}</small>
                      <strong>{c.value}</strong>
                    </span>
                  </a>
                </TiltCard>
              </li>
            ))}
          </ul>
          <p className="contact__loc">
            <FontAwesomeIcon icon={faLocationDot} /> {profile.location}
          </p>
        </Rise>
        <Rise delay={0.1} x={30}>
          <form className="form card fx-surface" onSubmit={submit}>
            <label>Nome<input required autoComplete="name" value={form.nome} onChange={set('nome')} /></label>
            <label>E-mail<input required type="email" autoComplete="email" value={form.email} onChange={set('email')} /></label>
            <label>Telefone (opcional)<input type="tel" autoComplete="tel" value={form.telefone} onChange={set('telefone')} /></label>
            <label>Mensagem<textarea required rows={5} value={form.mensagem} onChange={set('mensagem')} /></label>
            <input
              className="form__hp"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
            <button type="submit" className="btn btn--primary" disabled={status === 'sending'}>
              {status === 'sending' ? 'Enviando…' : 'Enviar mensagem'}
            </button>
            <div role="status" aria-live="polite">
              {status === 'success' && <p className="form__ok">Mensagem enviada! Retorno em breve.</p>}
              {status === 'mailto' && <p className="form__ok">Abrindo seu cliente de e-mail…</p>}
              {status === 'error' && (
                <p className="form__err">
                  Não foi possível enviar agora.{' '}
                  <button type="button" className="form__link" onClick={openMailClient}>
                    Enviar pelo meu e-mail
                  </button>{' '}
                  ou escreva para {profile.email}.
                </p>
              )}
            </div>
          </form>
        </Rise>
      </div>
    </section>
  )
}
