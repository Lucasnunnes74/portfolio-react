import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  /** px de deslocamento vertical (entra +distance, sai -distance) */
  distance?: number
  className?: string
}

/** Camada de profundidade: desloca em Y conforme a posição do elemento na viewport. */
export default function Parallax({ children, distance = 30, className }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance])
  if (reduce) return <div className={className}>{children}</div>
  return (
    <motion.div ref={ref} className={className} style={{ y }}>
      {children}
    </motion.div>
  )
}
