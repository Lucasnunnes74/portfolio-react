import { motion, useInView, useReducedMotion, useScroll, useSpring } from 'motion/react'
import { useRef } from 'react'
import { experiences } from '../../data/portfolio'
import type { ExperienceItem } from '../../types'
import Rise from '../fx/Rise'
import TiltCard from '../fx/TiltCard'
import SectionHeading from '../SectionHeading/SectionHeading'
import ExperienceCard from './ExperienceCard'
import './Experience.css'

function TimelineItem({ item }: { item: ExperienceItem }) {
  const ref = useRef<HTMLLIElement>(null)
  const lit = useInView(ref, { once: true, margin: '0px 0px -55% 0px' })
  return (
    <li ref={ref} className={`timeline__item ${lit ? 'is-lit' : ''}`}>
      <span className="timeline__node" aria-hidden="true" />
      <Rise x={40}>
        <TiltCard max={1}>
          <ExperienceCard {...item} />
        </TiltCard>
      </Rise>
    </li>
  )
}

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 })

  return (
    <section id="experiencia" className="section container">
      <SectionHeading tag="git log --experiencia" subtitle="Mais de 5 anos entregando código em produção.">
        Experiência profissional
      </SectionHeading>
      <div className="timeline-wrap" ref={ref}>
        <span className="timeline__track" aria-hidden="true">
          <motion.span className="timeline__beam" style={{ scaleY: reduce ? 1 : scaleY }} />
        </span>
        <ol className="timeline">
          {experiences.map((e) => (
            <TimelineItem key={e.period} item={e} />
          ))}
        </ol>
      </div>
    </section>
  )
}
