import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import type { PointerEvent, ReactNode } from 'react'
import './fx.css'

interface Props {
  children: ReactNode
  className?: string
  /** inclinação máxima em graus */
  max?: number
}

/** Tilt 3D com perspectiva seguindo o ponteiro (apenas mouse). O brilho vem do spotlight global de `.card`. */
export default function TiltCard({ children, className, max = 7 }: Props) {
  const reduce = useReducedMotion()
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const rotateX = useSpring(rx, { stiffness: 220, damping: 22 })
  const rotateY = useSpring(ry, { stiffness: 220, damping: 22 })

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 2 * max)
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 2 * max)
  }
  const reset = () => {
    rx.set(0)
    ry.set(0)
  }

  if (reduce) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
    >
      {children}
    </motion.div>
  )
}
