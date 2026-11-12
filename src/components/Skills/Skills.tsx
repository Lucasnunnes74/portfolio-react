import { motion, useReducedMotion, type Variants } from 'motion/react'
import { skillGroups } from '../../data/portfolio'
import Parallax from '../fx/Parallax'
import Rise from '../fx/Rise'
import TiltCard from '../fx/TiltCard'
import SectionHeading from '../SectionHeading/SectionHeading'
import './Skills.css'

const list: Variants = { hide: {}, show: { transition: { staggerChildren: 0.045, delayChildren: 0.25 } } }
const chip: Variants = {
  hide: { opacity: 0, scale: 0.6, y: 14, rotateX: -50 },
  show: { opacity: 1, scale: 1, y: 0, rotateX: 0, transition: { type: 'spring', stiffness: 320, damping: 20 } },
}
// profundidade e largura (grid de 6 colunas) por cartão
const LAYOUT = [
  { span: 'skills__item--wide', depth: 0 },
  { span: 'skills__item--thin', depth: 10 },
  { span: 'skills__item--half', depth: 6 },
  { span: 'skills__item--half', depth: 8 },
]

export default function Skills() {
  const reduce = useReducedMotion()
  return (
    <section id="skills" className="section container container--wide">
      <SectionHeading tag="skills.json" subtitle="Tecnologias e práticas que uso no dia a dia, do front-end à infraestrutura.">
        Habilidades técnicas
      </SectionHeading>
      <div className="skills">
        {skillGroups.map((g, i) => {
          const l = LAYOUT[i % LAYOUT.length]
          return (
            <Parallax key={g.title} distance={l.depth} className={`skills__item ${l.span}`}>
              <Rise delay={0.06 * i}>
                <TiltCard max={2} className="skills__tilt">
                  <article className="card fx-surface skills__card">
                    <span className="skills__idx" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                    <h3>{g.title}</h3>
                    <p>{g.description}</p>
                    <motion.ul
                      className="skills__chips"
                      variants={list}
                      initial={reduce ? false : 'hide'}
                      whileInView="show"
                      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
                    >
                      {g.items.map((s) => (
                        <motion.li key={s.name} className="chip" variants={chip}>
                          {s.logo && <img src={s.logo} alt="" width="20" height="20" loading="lazy" />}
                          {s.name}
                        </motion.li>
                      ))}
                    </motion.ul>
                  </article>
                </TiltCard>
              </Rise>
            </Parallax>
          )
        })}
      </div>
    </section>
  )
}
