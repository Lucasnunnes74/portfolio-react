import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'
import WordReveal from '../fx/WordReveal'
import './SectionHeading.css'

interface Props {
  tag: string
  children: ReactNode
  subtitle?: string
}

export default function SectionHeading({ tag, children, subtitle }: Props) {
  const reduce = useReducedMotion()
  return (
    <div className="heading">
      <span className="heading__tag">
        {`// ${tag}`}
        <span className="heading__cursor" aria-hidden="true" />
      </span>
      <h2 className="heading__title">{typeof children === 'string' ? <WordReveal text={children} /> : children}</h2>
      <motion.span
        className="heading__bar"
        aria-hidden="true"
        initial={reduce ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      />
      {subtitle && <p className="heading__sub">{subtitle}</p>}
    </div>
  )
}
