import { lazy, Suspense } from 'react'
import Header from './components/Header/Header'
import DeferredScene from './components/Scene3D/DeferredScene'
import LaptopHero from './components/LaptopHero/LaptopHero'
import ScrollProgress from './components/ScrollProgress/ScrollProgress'
import TechMarquee from './components/TechMarquee/TechMarquee'
import { useSpotlight } from './hooks/useSpotlight'

// Seções abaixo da dobra: carregadas em chunk separado para o primeiro paint ser rápido.
const About = lazy(() => import('./components/About/About'))
const Skills = lazy(() => import('./components/Skills/Skills'))
const Experience = lazy(() => import('./components/Experience/Experience'))
const Projects = lazy(() => import('./components/Projects/Projects'))
const Education = lazy(() => import('./components/Education/Education'))
const Contact = lazy(() => import('./components/Contact/Contact'))
const Footer = lazy(() => import('./components/Footer/Footer'))

export default function App() {
  useSpotlight()
  return (
    <>
      <a href="#conteudo" className="skip-link">Pular para o conteúdo</a>
      <DeferredScene />
      <ScrollProgress />
      <Header />
      <main id="conteudo">
        <LaptopHero />
        <TechMarquee />
        <Suspense fallback={null}>
          <About />
          <div className="divider" />
          <Skills />
          <div className="divider" />
          <Experience />
          <div className="divider" />
          <Projects />
          <div className="divider" />
          <Education />
          <div className="divider" />
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  )
}
