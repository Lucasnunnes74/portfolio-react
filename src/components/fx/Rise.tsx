import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'
import './fx.css'

interface Props {
  children: ReactNode
  delay?: number
  className?: string
  /** deslocamento horizontal inicial (px) para entradas laterais */
  x?: number
}

/** Entrada em 3D (rotateX + translate + scale) ao entrar na tela; roda uma vez. */
export default function Rise({ children, delay = 0, className, x = 0 }: Props) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={`fx-rise ${className ?? ''}`}
      initial={{ opacity: 0, y: 22, x: x * 0.4, rotateX: -5, scale: 0.99 }}
      whileInView={{ opacity: 1, y: 0, x: 0, rotateX: 0, scale: 1 }}
      viewport={{ once: true, margin: '0px 0px -4% 0px' }}
      transition={{ duration: 0.5, delay: Math.min(delay, 0.15), ease: [0.22, 1, 0.36, 1] }}
      style={{ transformPerspective: 1000 }}
    >
      {children}
    </motion.div>
  )
}
