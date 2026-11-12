import { animate, useInView, useReducedMotion } from 'motion/react'
import { useEffect, useRef } from 'react'

/** Mostra `value` no DOM; se começar com número, conta de 0 até ele ao entrar na tela. */
export default function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const reduce = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    const m = /^(\d+)(.*)$/.exec(value)
    if (!inView || !el || !m || reduce) return
    const controls = animate(0, Number(m[1]), {
      duration: 1.5,
      ease: 'easeOut',
      onUpdate: (v) => {
        el.textContent = `${Math.round(v)}${m[2]}`
      },
    })
    return () => controls.stop()
  }, [inView, value, reduce])

  return <span ref={ref}>{value}</span>
}
