import { faArrowRight, faFileArrowDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react'
import { useRef, useSyncExternalStore, type ReactNode } from 'react'
import logo from '../../assets/imagens/logo-small.webp'
import reactLogo from '../../assets/imagens/react.webp'
import tailwindLogo from '../../assets/imagens/tailwind.webp'
import tsLogo from '../../assets/imagens/typescript.webp'
import { aboutFacts, experiences, profile, skillGroups, stats } from '../../data/portfolio'
import './LaptopHero.css'

const NARROW = '(max-width: 700px)'
const subscribeNarrow = (cb: () => void) => {
  const mq = window.matchMedia(NARROW)
  mq.addEventListener('change', cb)
  return () => mq.removeEventListener('change', cb)
}
const useNarrow = () =>
  useSyncExternalStore(
    subscribeNarrow,
    () => window.matchMedia(NARROW).matches,
    () => false,
  )

/** Janela de scroll (0..1) em que cada painel aparece dentro da tela do notebook. */
const WINDOWS = {
  terminal: [0.3, 0.47],
  sobre: [0.47, 0.62],
  stack: [0.62, 0.77],
  exp: [0.77, 0.91],
  contato: [0.91, 1.01],
} as const

function Panel({
  p,
  range,
  last,
  children,
}: {
  p: MotionValue<number>
  range: readonly [number, number]
  last?: boolean
  children: ReactNode
}) {
  const [a, b] = range
  const f = 0.025
  const opacity = useTransform(p, [a - f, a, b, b + f], [0, 1, 1, last ? 1 : 0])
  const y = useTransform(p, [a - f, a, b, b + f], [14, 0, 0, last ? 0 : -14])
  return (
    <motion.div className="screen__panel" style={{ opacity, y }}>
      {children}
    </motion.div>
  )
}

/** Chips flutuando em profundidades diferentes ao redor do notebook (parallax no scroll). */
const CHIPS = [
  { label: 'React', logo: reactLogo, left: '4%', top: '22%', depth: 1.2, rot: -6 },
  { label: 'TypeScript', logo: tsLogo, left: '9%', top: '62%', depth: 0.7, rot: 4 },
  { label: 'Next.js SSR/SSG', left: '2%', top: '42%', depth: 0.45, rot: -3 },
  { label: 'Core Web Vitals', right: '4%', top: '26%', depth: 1, rot: 5 },
  { label: 'Tailwind', logo: tailwindLogo, right: '8%', top: '60%', depth: 0.6, rot: -4 },
  { label: 'n8n · Docker', right: '2%', top: '44%', depth: 1.35, rot: 3 },
] as const

function FloatingChip({ p, chip }: { p: MotionValue<number>; chip: (typeof CHIPS)[number] }) {
  const y = useTransform(p, [0.3, 0.72], [90 * chip.depth, -110 * chip.depth])
  const opacity = useTransform(p, [0.28, 0.4, 0.58, 0.72], [0, 1, 1, 0])
  const pos = 'left' in chip ? { left: chip.left } : { right: chip.right }
  return (
    <motion.div className="chip3d" style={{ ...pos, top: chip.top, y, opacity, rotate: chip.rot }} aria-hidden="true">
      <span className="chip3d__in" style={{ animationDelay: `${-chip.depth * 2}s` }}>
        {'logo' in chip && <img src={chip.logo} alt="" width="20" height="20" loading="lazy" />}
        {chip.label}
      </span>
    </motion.div>
  )
}

function Screen({ p }: { p: MotionValue<number> }) {
  const bar = useTransform(p, [WINDOWS.terminal[0], 1], [0, 1])
  const frontend = skillGroups[0].items
  const recent = experiences.slice(0, 3)

  return (
    <div className="screen" aria-hidden="true">
      <div className="screen__bar">
        <i /><i /><i />
        <span className="screen__url">lucas-santos.dev</span>
      </div>

      <div className="screen__body">
        <Panel p={p} range={WINDOWS.terminal}>
          <p className="t-dim">~/portfolio <span className="t-grn">main</span></p>
          <p><span className="t-red">$</span> whoami</p>
          <p className="t-big">{profile.name}<span className="t-cursor" /></p>
          <p><span className="t-red">$</span> cat role.txt</p>
          <p className="t-pur">{profile.role} — {profile.headline}</p>
          <p className="hide-sm"><span className="t-red">$</span> echo $LOCATION</p>
          <p className="hide-sm t-dim">{profile.location}</p>
        </Panel>

        <Panel p={p} range={WINDOWS.sobre}>
          <p className="t-tag">// sobre.tsx</p>
          <ul className="s-stats">
            {stats.map((s) => (
              <li key={s.label}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </li>
            ))}
          </ul>
          <dl className="s-facts hide-sm">
            {aboutFacts.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        </Panel>

        <Panel p={p} range={WINDOWS.stack}>
          <p className="t-tag">// stack.json</p>
          <ul className="s-chips">
            {frontend.map((s) => (
              <li key={s.name}>
                {s.logo && <img src={s.logo} alt="" width="16" height="16" loading="lazy" />}
                {s.name}
              </li>
            ))}
          </ul>
          <ul className="s-chips s-chips--alt hide-sm">
            {[...skillGroups[1].items, ...skillGroups[3].items].map((s) => (
              <li key={s.name}>{s.name}</li>
            ))}
          </ul>
        </Panel>

        <Panel p={p} range={WINDOWS.exp}>
          <p className="t-tag">// experiencia.log</p>
          <ol className="s-timeline">
            {recent.map((e) => (
              <li key={e.company + e.period}>
                <span className="t-dim">{e.period}</span>
                <strong>{e.company}</strong>
                <span className="hide-sm">{e.role}</span>
              </li>
            ))}
          </ol>
        </Panel>

        <Panel p={p} range={WINDOWS.contato} last>
          <p className="t-tag">// contato.send()</p>
          <p className="t-big">Vamos construir algo rápido?</p>
          <p className="t-pur">{profile.availability}</p>
          <p className="t-dim">{profile.email}</p>
        </Panel>
      </div>

      <motion.div className="screen__progress" style={{ scaleX: bar }} />
    </div>
  )
}

export default function LaptopHero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const narrow = useNarrow()

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 })
  const still = useMotionValue(0.5) // modo sem movimento: notebook aberto mostrando "sobre"
  const p = reduce ? still : smooth

  const lid = useTransform(p, [0.02, 0.3], [90, -6])
  const tilt = useTransform(p, [0, 0.3, 0.6], [reduce ? 0 : 30, 12, 0])
  const scale = useTransform(p, [0, 0.3, 0.62, 1], [0.86, 1, narrow ? 1.04 : 1.2, narrow ? 1.08 : 1.34])
  const y = useTransform(p, [0, 0.22, 0.32, 0.62], narrow ? [150, 150, 0, 0] : [-10, 70, 0, 0])
  const introOpacity = useTransform(p, [0, 0.12, 0.2], [1, 1, 0])
  const introY = useTransform(p, [0, 0.2], [0, -60])
  const hintOpacity = useTransform(p, [0, 0.06], [1, 0])

  return (
    <section
      id="inicio"
      ref={ref}
      className={`laptop ${reduce ? 'is-static' : ''}`}
      aria-label={`Apresentação de ${profile.name}`}
    >
      <div className="laptop__sticky">
        <motion.div className="laptop__intro" style={reduce ? undefined : { opacity: introOpacity, y: introY }}>
          <p className="laptop__eyebrow">
            <span className="laptop__dot" aria-hidden="true" /> {profile.availability}
          </p>
          <h1 className="laptop__title">
            Olá, eu sou <span className="gradient-text">{profile.name}</span>
          </h1>
          <p className="laptop__sub">
            {profile.role} · <span className="purple">{profile.headline}</span>
          </p>
          <p className="laptop__tagline">{profile.tagline}</p>
          <div className="laptop__actions">
            <a href="#contato" className="btn btn--primary">
              Vamos conversar <FontAwesomeIcon icon={faArrowRight} />
            </a>
            <a href={profile.cv} download className="btn btn--ghost">
              <FontAwesomeIcon icon={faFileArrowDown} /> Baixar currículo
            </a>
          </div>
        </motion.div>

        <div className="laptop__stage">
          <div className="laptop__glow" aria-hidden="true" />
          {!reduce && CHIPS.map((c) => <FloatingChip key={c.label} p={p} chip={c} />)}
          <motion.div className="laptop__scene" style={{ rotateX: tilt, scale, y }}>
            <motion.div className="laptop__lid" style={{ rotateX: lid }}>
              <div className="laptop__face laptop__face--screen">
                <span className="laptop__cam" aria-hidden="true" />
                <Screen p={p} />
                <span className="laptop__glare" aria-hidden="true" />
              </div>
              <div className="laptop__face laptop__face--back">
                <img src={logo} alt="" width="64" height="64" />
              </div>
            </motion.div>
            <div className="laptop__base">
              <div className="laptop__keys" />
              <div className="laptop__pad" />
            </div>
            <div className="laptop__lip" />
            <div className="laptop__shadow" aria-hidden="true" />
          </motion.div>
        </div>

        <motion.p className="laptop__hint" style={{ opacity: hintOpacity }} aria-hidden="true">
          role para abrir ↓
        </motion.p>
      </div>
    </section>
  )
}
