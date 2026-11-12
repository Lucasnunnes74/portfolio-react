import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import type { PointerEvent, ReactNode } from 'react'
import './fx.css'

/** O filho é atraído levemente pelo cursor. O alvo de eventos é o wrapper estático (sem tremor). */
export default function Magnetic({ children, strength = 0.35 }: { children: ReactNode; strength?: number }) {
  const reduce = useReducedMotion()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 200, damping: 16 })
  const y = useSpring(my, { stiffness: 200, damping: 16 })

  const onMove = (e: PointerEvent<HTMLSpanElement>) => {
    if (e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left - r.width / 2) * strength)
    my.set((e.clientY - r.top - r.height / 2) * strength)
  }
  const reset = () => {
    mx.set(0)
    my.set(0)
  }

  if (reduce) return <span className="fx-magnetic">{children}</span>
  return (
    <span className="fx-magnetic" onPointerMove={onMove} onPointerLeave={reset}>
      <motion.span className="fx-magnetic__in" style={{ x, y }}>
        {children}
      </motion.span>
    </span>
  )
}
