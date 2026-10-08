export interface NavItem {
  label: string
  href: string
}

export interface SkillItem {
  name: string
  logo?: string
}

export interface SkillGroup {
  title: string
  description: string
  items: SkillItem[]
}

export interface ExperienceItem {
  period: string
  duration: string
  role: string
  company: string
  location: string
  summary?: string
  highlights: string[]
  current?: boolean
}

export interface ProjectItem {
  title: string
  context: string
  description: string
  tech: string[]
  href?: string
}

export interface EducationItem {
  institution: string
  course: string
  period: string
}

export interface SoftSkill {
  title: string
  text: string
}

export interface Stat {
  value: string
  label: string
}
