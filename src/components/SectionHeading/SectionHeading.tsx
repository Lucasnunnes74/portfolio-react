import type { ReactNode } from 'react'
import './SectionHeading.css'

interface Props {
  tag: string
  children: ReactNode
  subtitle?: string
}

export default function SectionHeading({ tag, children, subtitle }: Props) {
  return (
    <div className="heading">
      <span className="heading__tag">{`// ${tag}`}</span>
      <h2 className="heading__title">{children}</h2>
      {subtitle && <p className="heading__sub">{subtitle}</p>}
    </div>
  )
}
