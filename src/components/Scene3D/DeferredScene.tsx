import { lazy, Suspense, useEffect, useState } from 'react'

const Scene3D = lazy(() => import('./Scene3D'))

/** Monta o fundo 3D só quando o navegador estiver ocioso, para não atrasar o primeiro paint. */
export default function DeferredScene() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(() => setReady(true), { timeout: 2500 })
      return () => window.cancelIdleCallback(id)
    }
    const t = window.setTimeout(() => setReady(true), 1200)
    return () => window.clearTimeout(t)
  }, [])

  return ready ? (
    <Suspense fallback={null}>
      <Scene3D />
    </Suspense>
  ) : null
}
