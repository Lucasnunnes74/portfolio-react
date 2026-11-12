import angular from '../assets/imagens/angular.webp'
import bootstrap from '../assets/imagens/bootstrap.webp'
import css from '../assets/imagens/css.webp'
import html from '../assets/imagens/html.webp'
import javascript from '../assets/imagens/javascript.webp'
import php from '../assets/imagens/php.webp'
import phpmyadmin from '../assets/imagens/phpmyadmin.webp'
import python from '../assets/imagens/python.webp'
import react from '../assets/imagens/react.webp'
import tailwind from '../assets/imagens/tailwind.webp'
import typescript from '../assets/imagens/typescript.webp'
import type {
  CertificationItem,
  EducationItem,
  ExperienceItem,
  NavItem,
  ProjectItem,
  SkillGroup,
  SoftSkill,
  Stat,
} from '../types'

export const SITE_URL = 'https://lucas-santos-da-silva.com'

export const profile = {
  name: 'Lucas Santos',
  fullName: 'Lucas Santos da Silva',
  role: 'Desenvolvedor Front-end',
  headline: 'React · Next.js · TypeScript',
  location: 'Itapevi, São Paulo — Brasil',
  email: 'lucasnunnes74@gmail.com',
  phone: '+55 11 98198-4265',
  whatsapp: 'https://wa.me/5511981984265',
  linkedin: 'https://www.linkedin.com/in/lucas-santos-da-silva/',
  github: 'https://github.com/Lucasnunnes74',
  cv: '/cv-lucas-santos.pdf',
  availability: 'Aberto a vagas de Front-end · Remoto ou híbrido em SP',
  tagline:
    'Desenvolvo interfaces rápidas, acessíveis e otimizadas para busca, com React, Next.js e TypeScript, apoiado em 5 anos de código em produção.',
}

export const navItems: NavItem[] = [
  { label: 'Sobre', href: '#sobre' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experiência', href: '#experiencia' },
  { label: 'Projetos', href: '#projetos' },
  { label: 'Formação', href: '#formacao' },
  { label: 'Contato', href: '#contato' },
]

export const stats: Stat[] = [
  { value: '5+', label: 'anos em desenvolvimento web' },
  { value: 'Jr → Ref.', label: 'evolução até referência técnica do time' },
  { value: 'SSR/SSG', label: 'Next.js com foco em SEO e performance' },
]

export const aboutParagraphs: string[] = [
  'Sou desenvolvedor web há 5 anos, com experiência principal em React, Next.js, PHP, JavaScript, HTML/CSS e MySQL.',
  'No Grupo Ideal Trends e na WSI World, desenvolvi e mantive sites e sistemas web em produção: integração com APIs REST, SEO técnico, otimização de performance (Core Web Vitals), ferramentas internas e automações com n8n. Evoluí de júnior até ser referência técnica do time, apoiando colegas e participando de reuniões técnicas com clientes.',
  'Com React, configurei e mantive projetos React/Next.js de clientes e iniciei um e-commerce com React, Next.js e TypeScript, usando SSR/SSG para SEO. Também me aprofundo com estudos e projetos próprios: TypeScript, componentização, hooks, renderização no servidor e consumo de APIs REST.',
  'Levo para um time React uma base sólida de web (HTML semântico, CSS, JavaScript, HTTP), experiência com código em produção e prazos reais, e facilidade para aprender rápido.',
]

export const aboutFacts: { label: string; value: string }[] = [
  { label: 'Localização', value: 'Itapevi, SP' },
  { label: 'Foco atual', value: 'React · Next.js · TypeScript' },
  { label: 'Idiomas', value: 'Português (nativo) · Inglês (profissional)' },
  { label: 'Busco', value: 'Front-end · Remoto/Híbrido' },
]

export const skillGroups: SkillGroup[] = [
  {
    title: 'Front-end',
    description: 'Interfaces componentizadas, semânticas e performáticas.',
    items: [
      { name: 'React', logo: react },
      { name: 'Next.js' },
      { name: 'TypeScript', logo: typescript },
      { name: 'JavaScript', logo: javascript },
      { name: 'Vite' },
      { name: 'Tailwind', logo: tailwind },
      { name: 'HTML5', logo: html },
      { name: 'CSS3', logo: css },
      { name: 'Bootstrap', logo: bootstrap },
      { name: 'Angular', logo: angular },
    ],
  },
  {
    title: 'SEO & Performance',
    description: 'Visibilidade orgânica e experiência de carregamento.',
    items: [
      { name: 'SEO técnico' },
      { name: 'SEO on-page' },
      { name: 'Core Web Vitals' },
      { name: 'SSR / SSG' },
      { name: 'Open Graph & dados estruturados' },
      { name: 'Acessibilidade' },
    ],
  },
  {
    title: 'Back-end & Dados',
    description: 'Integração com serviços, APIs e bancos de dados.',
    items: [
      { name: 'Node.js' },
      { name: 'PHP', logo: php },
      { name: 'Python', logo: python },
      { name: 'MySQL', logo: phpmyadmin },
      { name: 'APIs REST' },
      { name: 'SQL Server' },
    ],
  },
  {
    title: 'Automação & Infra',
    description: 'Fluxos automatizados e infraestrutura web.',
    items: [
      { name: 'n8n' },
      { name: 'Docker' },
      { name: 'Coolify' },
      { name: 'Cloudflare' },
      { name: 'Servidores VPS' },
      { name: 'DNS & Cache' },
    ],
  },
]

export const experiences: ExperienceItem[] = [
  {
    period: 'Out 2026 — Atual',
    duration: '2 meses',
    role: 'Desenvolvedor Web / Front-end (autônomo)',
    company: 'LivON (projeto próprio)',
    location: 'Remoto',
    current: true,
    summary:
      'Projeto próprio, em fase inicial, em que desenvolvo sites e automações para negócios, com foco em front-end moderno.',
    highlights: [
      'Portfólio profissional do jogador Renan Victor: React + TypeScript + Vite, CSS mobile-first, acessibilidade e dados atualizados via API (SofaScore) com cache em servidor Node próprio, Docker e deploy em VPS',
      'Portfólio profissional da Hellen Almeida (analista de logística): React + TypeScript + Vite, SEO com Open Graph e dados estruturados, navegação por teclado e contraste AA',
      'Meu próprio portfólio, migrado de WordPress para React + TypeScript + Vite, com deploy em Docker e Coolify',
      'Automação de atendimento no WhatsApp com n8n e integração de formulários de contato via webhook',
    ],
  },
  {
    period: 'Fev 2026 — Ago 2026',
    duration: '7 meses',
    role: 'Desenvolvedor Front-end / Web Performance',
    company: 'WSI World',
    location: 'São Paulo, Brasil',
    summary:
      'Aplicações web com React, Next.js e TypeScript e landing pages com PHP, JavaScript e HTML/CSS, com foco em SEO técnico, acessibilidade e Core Web Vitals.',
    highlights: [
      'Desenvolvi um e-commerce em React, Next.js e TypeScript, com componentes reutilizáveis e renderização no servidor (SSR/SSG) para SEO, com foco em performance e segurança',
      'Criei automações e integrações com n8n: webhooks para captação de leads e fluxos de atendimento via WhatsApp',
      'Gerenciei infraestrutura web: DNS, cache e segurança via Cloudflare, e administração de servidores VPS',
    ],
  },
  {
    period: 'Jul 2021 — Nov 2025',
    duration: '4 anos e 5 meses',
    role: 'Desenvolvedor Web / Front-end',
    company: 'Grupo Ideal Trends',
    location: 'São Paulo, Brasil',
    summary:
      'Sites e sistemas web para clientes com foco em React, Next.js e SEO técnico, integrados a serviços back-end em PHP e Python. Também JavaScript, HTML5/CSS3, Bootstrap e Tailwind.',
    highlights: [
      'Configurei e executei projetos React e Next.js de clientes (dependências, ambiente local e build) para replicação e manutenção, com foco em SEO',
      'Implementei SEO on-page e técnico e otimizei a performance (Core Web Vitals) em sites de clientes',
      'Criei ferramentas internas de automação e validação de processos, aumentando a produtividade e a padronização do time',
      'Modelei e mantive bancos MySQL via phpMyAdmin, com otimização de consultas',
      'Evoluí de júnior até referência técnica: triagem de demandas, mentoria a outros devs e reuniões técnicas com clientes',
    ],
  },
  {
    period: 'Dez 2019 — Dez 2020',
    duration: '1 ano e 1 mês',
    role: 'Assistente de Helpdesk',
    company: 'Celcoin',
    location: 'Barueri, SP',
    summary: 'Suporte técnico e funcional a sistemas internos e clientes.',
    highlights: [
      'Atendimento direto, esclarecimento de dúvidas e acompanhamento de incidentes',
      'Analisei logs de aplicações e sistemas para identificar falhas e apoiar a resolução de erros operacionais',
      'Executei consultas em SQL Server para análise de dados e investigação de incidentes',
      'Apoiei times com C# e HTML5 na validação de telas e análise de comportamentos do sistema',
      'Desenvolvi integrações com APIs e conexões em Python para automação das demandas do time',
      'Criei apresentações e relatórios no Pacote Office para comunicar resultados e análises técnicas',
    ],
  },
]

export const projects: ProjectItem[] = [
  {
    title: 'Portfólio do atleta Renan Victor',
    context: 'LivON · 2026',
    description:
      'Site profissional mobile-first com dados atualizados via API (SofaScore), cache em servidor Node próprio, Docker e deploy em VPS.',
    tech: ['React', 'TypeScript', 'Vite', 'Node.js', 'Docker'],
  },
  {
    title: 'Portfólio da Hellen Almeida',
    context: 'LivON · 2026',
    description:
      'Portfólio de analista de logística com SEO (Open Graph e dados estruturados), navegação por teclado e contraste AA.',
    tech: ['React', 'TypeScript', 'Vite', 'SEO', 'Acessibilidade'],
  },
  {
    title: 'E-commerce com Next.js',
    context: 'WSI World · 2026',
    description:
      'Loja virtual com componentes reutilizáveis e renderização no servidor (SSR/SSG) para SEO, priorizando performance e segurança.',
    tech: ['React', 'Next.js', 'TypeScript', 'SSR/SSG'],
  },
  {
    title: 'Automação de leads e atendimento',
    context: 'WSI World / LivON · 2026',
    description:
      'Webhooks para captação de leads, formulários de contato e fluxos de atendimento no WhatsApp, automatizados com n8n.',
    tech: ['n8n', 'Webhooks', 'WhatsApp', 'APIs REST'],
  },
  {
    title: 'Ferramentas internas de validação',
    context: 'Grupo Ideal Trends · 2021–2025',
    description:
      'Plataformas internas para automação e validação de processos, aumentando a produtividade e a padronização do time.',
    tech: ['PHP', 'JavaScript', 'Python', 'MySQL'],
  },
]

export const education: EducationItem[] = [
  {
    institution: 'Universidade Paulista (UNIP)',
    course: 'Análise e Desenvolvimento de Sistemas',
    period: '2019 — 2020',
  },
  {
    institution: 'ITB',
    course: 'Técnico em Information Technology',
    period: '2016 — 2018',
  },
  {
    institution: 'Wizard by Pearson',
    course: 'Inglês',
    period: 'Jul 2025 — Jul 2026',
  },
  {
    institution: 'Projov',
    course: 'Curso profissionalizante',
    period: '2018 — 2019',
  },
]

export const certifications: CertificationItem[] = [
  { title: 'Curso completo de APIs com Node.js, Express + MongoDB, SQL' },
  { title: 'Angular 19 — Curso Completo do Iniciante ao Avançado (2026)' },
  { title: 'Automação Inteligente com n8n — Completo para Iniciantes' },
]

export const softSkills: SoftSkill[] = [
  { title: 'Comunicação objetiva', text: 'traduzo conceitos técnicos de forma clara, inclusive com clientes.' },
  { title: 'Colaboração', text: 'apoio e oriento colegas, contribuindo de verdade para o time.' },
  { title: 'Aprendizado rápido', text: 'absorvo novas tecnologias e entrego em prazos reais.' },
  { title: 'Organização', text: 'faço triagem de demandas e mantenho tarefas bem estruturadas.' },
]
