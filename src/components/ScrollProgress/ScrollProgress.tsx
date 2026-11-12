import { motion, useScroll, useSpring } from 'motion/react'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 160, damping: 30, mass: 0.3 })
  return <motion.div className="progress-bar" style={{ scaleX }} aria-hidden="true" />
}
