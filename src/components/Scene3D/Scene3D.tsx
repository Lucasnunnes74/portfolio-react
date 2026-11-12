import { Component, useEffect, useMemo, useRef, useState } from 'react'
import type { ErrorInfo, ReactNode } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  CatmullRomCurve3,
  Color,
  DoubleSide,
  IcosahedronGeometry,
  InstancedMesh,
  MathUtils,
  Matrix4,
  Object3D,
  PlaneGeometry,
  Points,
  Quaternion,
  SRGBColorSpace,
  TorusGeometry,
  TorusKnotGeometry,
  Vector3,
} from 'three'
import './Scene3D.css'

/* ---------- paleta ---------- */
const RED = new Color('#ff2d55')
const VIOLET = new Color('#7c3aed')
const PURPLE = new Color('#a78bfa')
const PALETTE = [RED, VIOLET, PURPLE]

/* ---------- gating ---------- */
interface NetworkInformationLike {
  saveData?: boolean
}

function canRenderScene(): boolean {
  if (typeof window === 'undefined') return false
  const nav = navigator as Navigator & { connection?: NetworkInformationLike }
  if (nav.connection?.saveData) return false
  if (navigator.hardwareConcurrency !== undefined && navigator.hardwareConcurrency <= 2) return false
  try {
    const c = document.createElement('canvas')
    const gl = c.getContext('webgl2') ?? c.getContext('webgl')
    if (!gl) return false
    gl.getExtension('WEBGL_lose_context')?.loseContext()
    return true
  } catch {
    return false
  }
}

/* ---------- util ---------- */
function mulberry32(seed: number): () => number {
  let a = seed
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function softSprite(): CanvasTexture {
  const c = document.createElement('canvas')
  c.width = c.height = 64
  const ctx = c.getContext('2d')
  if (ctx) {
    const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
    g.addColorStop(0, 'rgba(255,255,255,1)')
    g.addColorStop(0.25, 'rgba(255,255,255,0.55)')
    g.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, 64, 64)
  }
  const tex = new CanvasTexture(c)
  tex.colorSpace = SRGBColorSpace
  return tex
}

function pick(rnd: () => number): Color {
  return PALETTE[Math.floor(rnd() * 3)]
}

/** Caminho da câmera (z negativo = profundidade). */
const PATH = new CatmullRomCurve3(
  [
    new Vector3(0, 0, 10),
    new Vector3(2, 0.6, -18),
    new Vector3(-2, 0, -44),
    new Vector3(0, 1.2, -72),
    new Vector3(3, 2.4, -98),
    new Vector3(-1, 1, -126),
    new Vector3(1, 0, -154),
    new Vector3(0, 0, -184),
  ],
  false,
  'catmullrom',
  0.5,
)

interface Shared {
  p: number // progresso suavizado 0..1
  target: number
  px: number
  py: number
  tx: number
  ty: number
}

const SHARED: Shared = { p: 0, target: 0, px: 0, py: 0, tx: 0, ty: 0 }
const TMP_POS = new Vector3()
const TMP_TAN = new Vector3()
const TMP_LOOK = new Vector3()

interface Opts {
  mobile: boolean
  reduced: boolean
}

/* ---------- rig de câmera ---------- */
function Rig({ opts }: { opts: Opts }) {
  const invalidate = useThree((s) => s.invalidate)
  const fine = useMemo(() => window.matchMedia('(pointer: fine)').matches, [])

  useEffect(() => {
    const s = SHARED
    const read = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      s.target = max > 0 ? MathUtils.clamp(window.scrollY / max, 0, 1) : 0
      if (opts.reduced) invalidate()
    }
    const move = (e: PointerEvent) => {
      s.tx = (e.clientX / window.innerWidth) * 2 - 1
      s.ty = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    read()
    window.addEventListener('scroll', read, { passive: true })
    window.addEventListener('resize', read, { passive: true })
    if (fine && !opts.reduced) window.addEventListener('pointermove', move, { passive: true })
    return () => {
      window.removeEventListener('scroll', read)
      window.removeEventListener('resize', read)
      window.removeEventListener('pointermove', move)
    }
  }, [opts.reduced, invalidate, fine])

  useFrame((state, delta) => {
    const s = SHARED
    const pos = TMP_POS
    const tan = TMP_TAN
    const look = TMP_LOOK
    const dt = Math.min(delta, 0.05)
    if (opts.reduced) {
      s.p = s.target
      s.px = 0
      s.py = 0
    } else {
      s.p += (s.target - s.p) * (1 - Math.exp(-dt * 3.2))
      s.px += (s.tx - s.px) * (1 - Math.exp(-dt * 2.5))
      s.py += (s.ty - s.py) * (1 - Math.exp(-dt * 2.5))
    }
    const t = MathUtils.clamp(s.p, 0, 0.999)
    PATH.getPointAt(t, pos)
    PATH.getTangentAt(t, tan)
    look.copy(pos).addScaledVector(tan, 12)
    pos.x += s.px * 0.9
    pos.y += s.py * 0.6
    const cam = state.camera
    cam.position.copy(pos)
    cam.lookAt(look)
    cam.rotateZ(Math.sin(t * 9) * 0.05)
  })
  return null
}

/* ---------- campo global de partículas ---------- */
function DataField({ opts, sprite }: { opts: Opts; sprite: CanvasTexture }) {
  const geo = useMemo(() => {
    const n = opts.mobile ? 900 : 2200
    const rnd = mulberry32(7)
    const pos = new Float32Array(n * 3)
    const col = new Float32Array(n * 3)
    const c = new Vector3()
    const tmp = new Color()
    for (let i = 0; i < n; i++) {
      PATH.getPointAt(rnd(), c)
      const a = rnd() * Math.PI * 2
      const r = 4 + Math.pow(rnd(), 0.7) * 26
      pos[i * 3] = c.x + Math.cos(a) * r
      pos[i * 3 + 1] = c.y + Math.sin(a) * r * 0.7
      pos[i * 3 + 2] = c.z + (rnd() - 0.5) * 8
      tmp.copy(pick(rnd)).multiplyScalar(0.35 + rnd() * 0.5)
      col.set([tmp.r, tmp.g, tmp.b], i * 3)
    }
    const g = new BufferGeometry()
    g.setAttribute('position', new BufferAttribute(pos, 3))
    g.setAttribute('color', new BufferAttribute(col, 3))
    return g
  }, [opts.mobile])

  return (
    <points geometry={geo} frustumCulled={false}>
      <pointsMaterial
        map={sprite}
        size={0.35}
        vertexColors
        transparent
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </points>
  )
}

/* ---------- 1. poliedros wireframe ---------- */
function Polyhedron({ opts }: { opts: Opts }) {
  const outer = useRef<Object3D>(null)
  const inner = useRef<Object3D>(null)
  const at = useMemo(() => PATH.getPointAt(0.075).add(new Vector3(6.5, 1.2, 0)), [])
  const ico = useMemo(() => new IcosahedronGeometry(3.2, 1), [])
  const knot = useMemo(() => new TorusKnotGeometry(1.5, 0.4, opts.mobile ? 48 : 80, 8), [opts.mobile])

  useFrame((state) => {
    if (opts.reduced || !outer.current || !inner.current) return
    const t = state.clock.elapsedTime
    outer.current.rotation.set(t * 0.12, t * 0.2, 0)
    inner.current.rotation.set(-t * 0.3, t * 0.18, t * 0.1)
  })

  return (
    <group position={at}>
      <mesh ref={outer} geometry={ico}>
        <meshBasicMaterial color="#ff2d55" wireframe transparent opacity={0.55} blending={AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh ref={inner} geometry={knot}>
        <meshBasicMaterial color="#a78bfa" wireframe transparent opacity={0.4} blending={AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  )
}

/* ---------- 2. túnel de anéis + code rain ---------- */
interface RainDrop {
  x: number
  z: number
  cy: number
  y: number
  v: number
  len: number
}

function Tunnel({ opts }: { opts: Opts }) {
  const ringsRef = useRef<InstancedMesh>(null)
  const rainRef = useRef<InstancedMesh>(null)
  const ringCount = opts.mobile ? 14 : 22
  const rainCount = opts.mobile ? 70 : 170

  const ringGeo = useMemo(() => new TorusGeometry(1, 0.012, 6, 56, 4.6), [])
  const rainGeo = useMemo(() => new PlaneGeometry(0.05, 1), [])

  const ringData = useMemo(() => {
    const rnd = mulberry32(21)
    const p = new Vector3()
    const tg = new Vector3()
    return Array.from({ length: ringCount }, (_, i) => {
      const t = 0.215 + (0.22 * i) / ringCount
      PATH.getPointAt(t, p)
      PATH.getTangentAt(t, tg)
      return {
        pos: p.clone(),
        look: p.clone().add(tg),
        r: 4.5 + rnd() * 2.2,
        speed: (rnd() < 0.5 ? -1 : 1) * (0.2 + rnd() * 0.5),
        phase: rnd() * 6.28,
      }
    })
  }, [ringCount])

  const rainInit = useMemo<RainDrop[]>(() => {
    const rnd = mulberry32(33)
    const p = new Vector3()
    return Array.from({ length: rainCount }, () => {
      PATH.getPointAt(0.2 + rnd() * 0.26, p)
      const a = rnd() * Math.PI * 2
      const r = 2.8 + rnd() * 7
      return {
        x: p.x + Math.cos(a) * r,
        z: p.z + Math.sin(a) * r,
        cy: p.y,
        y: (rnd() - 0.5) * 22,
        v: 3 + rnd() * 7,
        len: 0.8 + rnd() * 2.6,
      }
    })
  }, [rainCount])

  const dummy = useMemo(() => new Object3D(), [])
  const qLocal = useMemo(() => new Quaternion(), [])
  const zAxis = useMemo(() => new Vector3(0, 0, 1), [])

  useEffect(() => {
    const rings = ringsRef.current
    const rainM = rainRef.current
    if (!rings || !rainM) return
    const rnd = mulberry32(5)
    const c = new Color()
    ringData.forEach((_, i) => {
      c.copy(PALETTE[i % 3]).multiplyScalar(0.9)
      rings.setColorAt(i, c)
    })
    if (rings.instanceColor) rings.instanceColor.needsUpdate = true
    for (let i = 0; i < rainCount; i++) {
      c.copy(pick(rnd)).multiplyScalar(0.25 + rnd() * 0.45)
      rainM.setColorAt(i, c)
    }
    if (rainM.instanceColor) rainM.instanceColor.needsUpdate = true
    ringData.forEach((d, i) => {
      dummy.position.copy(d.pos)
      dummy.lookAt(d.look)
      dummy.rotateZ(d.phase)
      dummy.scale.setScalar(d.r)
      dummy.updateMatrix()
      rings.setMatrixAt(i, dummy.matrix)
    })
    rings.instanceMatrix.needsUpdate = true
    rainInit.forEach((d, i) => {
      dummy.position.set(d.x, d.cy + d.y, d.z)
      dummy.rotation.set(0, 0, 0)
      dummy.scale.set(1, d.len, 1)
      dummy.updateMatrix()
      rainM.setMatrixAt(i, dummy.matrix)
    })
    rainM.instanceMatrix.needsUpdate = true
  }, [ringData, rainInit, rainCount, dummy])

  // cópia mutável das gotas (mantida fora do estado do React)
  const drops = useRef<RainDrop[] | null>(null)

  useFrame((state, delta) => {
    if (opts.reduced) return
    const rings = ringsRef.current
    const rainM = rainRef.current
    if (!rings || !rainM) return
    drops.current ??= rainInit.map((d) => ({ ...d }))
    const t = state.clock.elapsedTime
    const dt = Math.min(delta, 0.05)
    for (let i = 0; i < ringData.length; i++) {
      const d = ringData[i]
      dummy.position.copy(d.pos)
      dummy.lookAt(d.look)
      qLocal.setFromAxisAngle(zAxis, d.phase + t * d.speed)
      dummy.quaternion.multiply(qLocal)
      dummy.scale.setScalar(d.r * (1 + Math.sin(t * 1.2 + i) * 0.03))
      dummy.updateMatrix()
      rings.setMatrixAt(i, dummy.matrix)
    }
    rings.instanceMatrix.needsUpdate = true
    const list = drops.current
    for (let i = 0; i < list.length; i++) {
      const d = list[i]
      d.y -= d.v * dt
      if (d.y < -11) d.y = 11
      dummy.position.set(d.x, d.cy + d.y, d.z)
      dummy.rotation.set(0, 0, 0)
      dummy.scale.set(1, d.len, 1)
      dummy.updateMatrix()
      rainM.setMatrixAt(i, dummy.matrix)
    }
    rainM.instanceMatrix.needsUpdate = true
  })

  return (
    <>
      <instancedMesh ref={ringsRef} args={[ringGeo, undefined, ringCount]} frustumCulled={false}>
        <meshBasicMaterial transparent opacity={0.6} blending={AdditiveBlending} depthWrite={false} />
      </instancedMesh>
      <instancedMesh ref={rainRef} args={[rainGeo, undefined, rainCount]} frustumCulled={false}>
        <meshBasicMaterial transparent opacity={0.7} blending={AdditiveBlending} depthWrite={false} side={DoubleSide} />
      </instancedMesh>
    </>
  )
}

/* ---------- 3. terreno de pontos ondulando ---------- */
function waveTerrain(attr: BufferAttribute, n: number, t: number) {
  const a = attr.array as Float32Array
  for (let i = 0; i < n * n; i++) {
    const x = a[i * 3]
    const z = a[i * 3 + 2]
    a[i * 3 + 1] =
      Math.sin(x * 0.22 + t * 0.9) * 1.3 +
      Math.cos(z * 0.27 + t * 0.7) * 1.2 +
      Math.sin((x + z) * 0.12 - t * 0.5) * 1.6
  }
  attr.needsUpdate = true
}

function Terrain({ opts, sprite }: { opts: Opts; sprite: CanvasTexture }) {
  const ref = useRef<Points>(null)
  const n = opts.mobile ? 34 : 56

  const { geo, center } = useMemo(() => {
    const sx = 2.1
    const sz = 1.9
    const c = PATH.getPointAt(0.52)
    const pos = new Float32Array(n * n * 3)
    const col = new Float32Array(n * n * 3)
    const tmp = new Color()
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        const k = (i * n + j) * 3
        pos[k] = (i - n / 2) * sx
        pos[k + 2] = (j - n / 2) * sz
        const f = j / (n - 1)
        tmp.copy(VIOLET).lerp(f > 0.5 ? RED : PURPLE, Math.abs(f - 0.5) * 1.6).multiplyScalar(0.7)
        col.set([tmp.r, tmp.g, tmp.b], k)
      }
    }
    const g = new BufferGeometry()
    const posAttr = new BufferAttribute(pos, 3)
    g.setAttribute('position', posAttr)
    g.setAttribute('color', new BufferAttribute(col, 3))
    waveTerrain(posAttr, n, 0)
    return { geo: g, center: new Vector3(c.x, c.y - 7, c.z) }
  }, [n])

  useFrame((state) => {
    if (opts.reduced || !ref.current) return
    waveTerrain(ref.current.geometry.getAttribute('position') as BufferAttribute, n, state.clock.elapsedTime)
  })

  return (
    <points ref={ref} geometry={geo} position={center} frustumCulled={false}>
      <pointsMaterial
        map={sprite}
        size={0.42}
        vertexColors
        transparent
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </points>
  )
}

/* ---------- 4. painéis flutuantes tipo code cards ---------- */
function Panels({ opts }: { opts: Opts }) {
  const fillRef = useRef<InstancedMesh>(null)
  const group = useRef<Object3D>(null)
  const count = opts.mobile ? 9 : 15
  const fillGeo = useMemo(() => new PlaneGeometry(3.2, 2.2), [])

  const { lines, mats } = useMemo(() => {
    const rnd = mulberry32(99)
    const m: Matrix4[] = []
    const seg: number[] = []
    const colr: number[] = []
    const p = new Vector3()
    const o = new Object3D()
    const a = new Vector3()
    const b = new Vector3()
    const w = 1.6
    const h = 1.1
    const push = (x0: number, y0: number, x1: number, y1: number, c: Color) => {
      a.set(x0, y0, 0).applyMatrix4(o.matrix)
      b.set(x1, y1, 0).applyMatrix4(o.matrix)
      seg.push(a.x, a.y, a.z, b.x, b.y, b.z)
      colr.push(c.r, c.g, c.b, c.r, c.g, c.b)
    }
    const tint = new Color()
    const dim = new Color()
    for (let i = 0; i < count; i++) {
      const t = 0.62 + (0.2 * i) / count
      PATH.getPointAt(t, p)
      const side = i % 2 === 0 ? 1 : -1
      o.position.set(p.x + side * (4.2 + rnd() * 4.5), p.y + (rnd() - 0.5) * 7, p.z + (rnd() - 0.5) * 4)
      o.rotation.set((rnd() - 0.5) * 0.3, -side * (0.35 + rnd() * 0.4), (rnd() - 0.5) * 0.15)
      o.scale.setScalar(0.8 + rnd() * 0.7)
      o.updateMatrix()
      m.push(o.matrix.clone())
      tint.copy(pick(rnd)).multiplyScalar(0.9)
      dim.copy(tint).multiplyScalar(0.7)
      push(-w, -h, w, -h, tint)
      push(w, -h, w, h, tint)
      push(w, h, -w, h, tint)
      push(-w, h, -w, -h, tint)
      push(-w, h - 0.28, w, h - 0.28, tint)
      for (let l = 0; l < 6; l++) {
        const x0 = (rnd() < 0.4 ? 0.35 : 0) - 1.25
        const y = h - 0.6 - l * 0.28
        push(x0, y, x0 + 0.5 + rnd() * 1.7, y, dim)
      }
    }
    const g = new BufferGeometry()
    g.setAttribute('position', new BufferAttribute(new Float32Array(seg), 3))
    g.setAttribute('color', new BufferAttribute(new Float32Array(colr), 3))
    return { lines: g, mats: m }
  }, [count])

  useEffect(() => {
    const f = fillRef.current
    if (!f) return
    mats.forEach((mx, i) => f.setMatrixAt(i, mx))
    f.instanceMatrix.needsUpdate = true
  }, [mats])

  useFrame((state) => {
    if (opts.reduced || !group.current) return
    const t = state.clock.elapsedTime
    group.current.position.y = Math.sin(t * 0.6) * 0.5
    group.current.rotation.y = Math.sin(t * 0.25) * 0.03
  })

  return (
    <group ref={group}>
      <instancedMesh ref={fillRef} args={[fillGeo, undefined, count]} frustumCulled={false}>
        <meshBasicMaterial color="#7c3aed" transparent opacity={0.06} blending={AdditiveBlending} depthWrite={false} side={DoubleSide} />
      </instancedMesh>
      <lineSegments geometry={lines} frustumCulled={false}>
        <lineBasicMaterial vertexColors transparent opacity={0.85} blending={AdditiveBlending} depthWrite={false} />
      </lineSegments>
    </group>
  )
}

/* ---------- 5. núcleo ---------- */
function Core({ opts, sprite }: { opts: Opts; sprite: CanvasTexture }) {
  const root = useRef<Object3D>(null)
  const grp = useRef<Object3D>(null)
  const shell = useRef<Points>(null)
  const wire = useRef<Object3D>(null)
  const solid = useRef<Object3D>(null)

  const at = useMemo(() => PATH.getPointAt(1).addScaledVector(PATH.getTangentAt(1), 26), [])
  const ico = useMemo(() => new IcosahedronGeometry(2.4, 1), [])
  const ico2 = useMemo(() => new IcosahedronGeometry(3.6, 2), [])
  const geo = useMemo(() => {
    const n = opts.mobile ? 350 : 800
    const rnd = mulberry32(1234)
    const pos = new Float32Array(n * 3)
    const col = new Float32Array(n * 3)
    const tmp = new Color()
    const v = new Vector3()
    for (let i = 0; i < n; i++) {
      v.set(rnd() - 0.5, rnd() - 0.5, rnd() - 0.5).normalize().multiplyScalar(5 + Math.pow(rnd(), 1.5) * 14)
      pos.set([v.x, v.y * 0.6, v.z], i * 3)
      tmp.copy(pick(rnd)).multiplyScalar(0.5 + rnd() * 0.5)
      col.set([tmp.r, tmp.g, tmp.b], i * 3)
    }
    const g = new BufferGeometry()
    g.setAttribute('position', new BufferAttribute(pos, 3))
    g.setAttribute('color', new BufferAttribute(col, 3))
    return g
  }, [opts.mobile])
  const glowGeo = useMemo(() => {
    const g = new BufferGeometry()
    g.setAttribute('position', new BufferAttribute(new Float32Array([0, 0, 0]), 3))
    return g
  }, [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (root.current) root.current.visible = SHARED.p > 0.55
    const k = MathUtils.smoothstep(SHARED.p, 0.78, 1)
    if (shell.current) {
      // converge: a casca de partículas contrai ao se aproximar do final
      shell.current.scale.setScalar(1.7 - k * 1.1)
      if (!opts.reduced) shell.current.rotation.y = t * 0.15
    }
    if (grp.current) grp.current.scale.setScalar(0.6 + k * 0.6 + (opts.reduced ? 0 : Math.sin(t * 2) * 0.03))
    if (!opts.reduced) {
      if (wire.current) wire.current.rotation.set(t * 0.2, t * 0.3, 0)
      if (solid.current) solid.current.rotation.set(-t * 0.25, t * 0.15, 0)
    }
  })

  return (
    <group ref={root} position={at} visible={false}>
      <points geometry={glowGeo} frustumCulled={false}>
        <pointsMaterial map={sprite} size={24} color="#ff2d55" transparent opacity={0.55} depthWrite={false} blending={AdditiveBlending} />
      </points>
      <points geometry={glowGeo} frustumCulled={false}>
        <pointsMaterial map={sprite} size={9} color="#ffd1dc" transparent opacity={0.8} depthWrite={false} blending={AdditiveBlending} />
      </points>
      <group ref={grp}>
        <mesh ref={solid} geometry={ico}>
          <meshBasicMaterial color="#ff2d55" transparent opacity={0.75} blending={AdditiveBlending} depthWrite={false} />
        </mesh>
        <mesh ref={wire} geometry={ico2}>
          <meshBasicMaterial color="#a78bfa" wireframe transparent opacity={0.6} blending={AdditiveBlending} depthWrite={false} />
        </mesh>
      </group>
      <points ref={shell} geometry={geo} frustumCulled={false}>
        <pointsMaterial map={sprite} size={0.5} vertexColors transparent depthWrite={false} blending={AdditiveBlending} />
      </points>
    </group>
  )
}

/* ---------- cena ---------- */
function World({ opts }: { opts: Opts }) {
  const sprite = useMemo(() => softSprite(), [])
  useEffect(() => () => sprite.dispose(), [sprite])
  return (
    <>
      <fog attach="fog" args={['#000000', 6, 62]} />
      <Rig opts={opts} />
      <DataField opts={opts} sprite={sprite} />
      <Polyhedron opts={opts} />
      <Tunnel opts={opts} />
      <Terrain opts={opts} sprite={sprite} />
      <Panels opts={opts} />
      <Core opts={opts} sprite={sprite} />
    </>
  )
}

/* ---------- error boundary ---------- */
class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    if (import.meta.env.DEV) console.warn('Scene3D desativada:', error, info.componentStack)
  }
  render() {
    return this.state.failed ? null : this.props.children
  }
}

export default function Scene3D() {
  const [enabled] = useState(canRenderScene)
  const opts = useMemo<Opts>(
    () => ({
      mobile: window.matchMedia('(max-width: 700px)').matches,
      reduced: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    }),
    [],
  )
  const [visible, setVisible] = useState(() => !document.hidden)

  useEffect(() => {
    const onVis = () => setVisible(!document.hidden)
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  if (!enabled) return null

  return (
    <SceneBoundary>
      <div className="scene3d" aria-hidden="true">
        <Canvas
          frameloop={opts.reduced ? 'demand' : visible ? 'always' : 'never'}
          dpr={[1, 1.5]}
          gl={{ antialias: false, alpha: true, powerPreference: 'high-performance', stencil: false }}
          camera={{ fov: 62, near: 0.1, far: 120, position: [0, 0, 10] }}
          onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
        >
          <World opts={opts} />
        </Canvas>
      </div>
    </SceneBoundary>
  )
}
