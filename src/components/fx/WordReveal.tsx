import { motion, useReducedMotion, type Variants } from 'motion/react'
import './fx.css'

const parent: Variants = { hide: {}, show: { transition: { staggerChildren: 0.03 } } }
const word: Variants = {
  hide: { y: '110%', rotateX: -30, opacity: 0 },
  show: { y: '0%', rotateX: 0, opacity: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
}

/** Revela o texto palavra a palavra. O texto completo continua no DOM (palavras são spans reais). */
export default function WordReveal({ text }: { text: string }) {
  const reduce = useReducedMotion()
  if (reduce) return <>{text}</>
  const words = text.split(' ')
  return (
    <motion.span
      className="fx-words"
      variants={parent}
      initial="hide"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
    >
      {words.map((w, i) => (
        <span key={`${w}-${i}`}>
          <span className="fx-word">
            <motion.span className="fx-word__in" variants={word}>
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 ? ' ' : null}
        </span>
      ))}
    </motion.span>
  )
}
