/**
 * Contenu réel du portfolio, source unique pour toutes les sections.
 * Zéro lorem : tout vient du parcours de Quentin.
 */

export type DisciplineId = "uxui" | "research" | "graphisme" | "video"

export type Discipline = {
  id: DisciplineId
  name: string
  /** Phrase courte (tuile du méga-menu). */
  desc: string
  /** Sous-titre de la page /discipline/:id. */
  intro: string
  /** Deux covers montrées dans la grande carte du méga-menu (au survol). */
  covers: [string, string]
}

export type Project = {
  id: string
  num: string
  title: string
  role: string
  year: string
  desc: string
  image: string | null
  imageAlt: string
  tags: string[]
  /** Disciplines auxquelles le projet appartient (pages /discipline/:id). */
  disciplines: DisciplineId[]
  /** Route du cas d'étude (la carte devient cliquable si présent). */
  href?: string
}

export const PROJECTS: Project[] = [
  {
    id: "musthane",
    num: "01",
    title: "Musthane",
    href: "/projets/musthane",
    role: "UX Research · Refonte navigation",
    year: "2025",
    desc: "Refondre la navigation d'un industriel B2B : 100+ produits, 4 logiques contradictoires, une seule évidence à la fin.",
    image: "/work/musthane-hero.webp",
    imageAlt: "Refonte de la navigation Musthane affichée sur MacBook",
    tags: ["Arborescence", "Tests utilisateurs", "Mega-menu"],
    disciplines: ["uxui", "research"],
  },
  {
    id: "research",
    num: "02",
    title: "Concerts 18-25",
    href: "/projets/research",
    role: "UX Research",
    year: "2025",
    desc: "Comment les 18-25 ans découvrent leurs concerts ? Sept entretiens, quatre insights, un brief retourné.",
    image: null,
    imageAlt: "",
    tags: ["Entretiens", "Insights", "Synthèse"],
    disciplines: ["research"],
  },
  {
    id: "ink",
    num: "03",
    title: "INK",
    href: "/projets/ink",
    role: "Identité · Hackathon 48h",
    year: "2024",
    desc: "Une marque de résistance née en 48h de hackathon. Deux identités opposées, un univers complet. 2ᵉ place.",
    image: "/work/ink-hero.webp",
    imageAlt: "INK, identité dystopique rouge et noir",
    tags: ["Branding", "Direction artistique", "2ᵉ place"],
    disciplines: ["uxui", "graphisme"],
  },
  {
    id: "lina",
    num: "04",
    title: "LINA",
    href: "/projets/lina",
    role: "UI Design · Sprint 3 jours",
    year: "2024",
    desc: "Repenser la découverte en librairie indépendante. Refonte desktop et système d'icônes, en trois jours.",
    image: "/work/lina-cover.png",
    imageAlt: "LINA, Librairies Indépendantes, identité orange",
    tags: ["UI Design", "Iconographie", "Sprint"],
    disciplines: ["uxui"],
  },
  {
    id: "happyjob",
    num: "05",
    title: "Happy Job",
    href: "/projets/happyjob",
    role: "Graphic Design · Stage 2 mois",
    year: "2026",
    desc: "Deux mois de stage en graphic design : campagnes de recrutement saisonnières pour un réseau d'agences.",
    image: "/work/happyjob-affiche.webp",
    imageAlt: "Affiche Happy Job, emplois saisonniers toute l'année",
    tags: ["Campagnes", "Print", "Multi-agences"],
    disciplines: ["graphisme"],
  },
  {
    id: "metal-access",
    num: "06",
    title: "Metal Access",
    href: "/projets/metal-access",
    role: "UX/UI Design & Dév · Sprint équipe",
    year: "2026",
    desc: "Rendre les festivals metal accessibles aux personnes en situation de handicap : plateforme, outil d'audit et signalétique. UX/UI de toutes les maquettes + développement.",
    image: "/work/metal-access/ma-cover.webp",
    imageAlt: "Metal Access, l'accessibilité au cœur du festival",
    tags: ["Accessibilité", "Design system", "Signalétique"],
    disciplines: ["uxui", "research"],
  },
]

/** Disciplines, source unique pour le méga-menu et les pages /discipline/:id. */
export const DISCIPLINES: Discipline[] = [
  {
    id: "uxui",
    name: "UX/UI Design",
    desc: "Interfaces, apps, refontes, de la recherche au design system.",
    intro: "De la recherche à l'interface : refontes, apps et design systems.",
    covers: ["/work/ink-cover-card.png", "/work/lina-cover.png"],
  },
  {
    id: "research",
    name: "UX Research",
    desc: "Entretiens, tests, synthèse. Comprendre avant de dessiner.",
    intro: "Comprendre avant de dessiner. Entretiens, tests et synthèses qui orientent les décisions.",
    covers: ["/work/musthane-hero.webp", "/work/metal-access/ma-cover.webp"],
  },
  {
    id: "graphisme",
    name: "Graphisme & Identité",
    desc: "Direction artistique, identités de marque, print, affiches.",
    intro: "Identités de marque, direction artistique et print. Le fond autant que la forme.",
    covers: ["/work/ink-cover-card.png", "/work/happyjob-affiche.webp"],
  },
  {
    id: "video",
    name: "Montage vidéo",
    desc: "Contenu vidéo pour réseaux et campagnes. Montage, rythme.",
    intro: "Montage et rythme pour les réseaux et les campagnes.",
    covers: ["/work/video/amv-knk.webp", "/work/video/come-closer.webp"],
  },
]

/** Projets rattachés à une discipline (ordre du portfolio conservé). */
export function projectsByDiscipline(id: DisciplineId): Project[] {
  return PROJECTS.filter((p) => p.disciplines.includes(id))
}

export const SKILLS = [
  {
    name: "UX Research",
    desc: "Entretiens, tests d'usabilité, analyse comportementale.",
  },
  {
    name: "UI Design",
    desc: "Design systems, interfaces hi-fi, maquettage responsive.",
  },
  {
    name: "Prototypage",
    desc: "Micro-interactions, parcours fluides, tests utilisateurs.",
  },
  {
    name: "Design Systems",
    desc: "Tokens, bibliothèques de composants, documentation.",
  },
  {
    name: "UX Audit",
    desc: "Études heuristiques, analyse de frictions, optimisations.",
  },
  {
    name: "Design Graphique",
    desc: "Direction artistique, identité visuelle, typographie.",
  },
]

export const TIMELINE = [
  {
    year: "2026",
    role: "Graphic Designer, Stage",
    company: "Happy Job · Bordeaux",
    desc: "Campagnes de recrutement saisonnières pour le réseau d'agences, gestion des assets créatifs, coordination multi-agences.",
  },
  {
    year: "2023–2024",
    role: "Direction artistique social media",
    company: "EVA · Bordeaux",
    desc: "Création de contenu vidéo et graphique, stratégie visuelle pour les campagnes social media.",
  },
  {
    year: "2022–2025",
    role: "Diplôme Concepteur UI",
    company: "ECV · Bordeaux",
    desc: "Trois ans de formation : UX research, prototypage, design systems. Diplômé en 2025, en route vers le M2.",
  },
  {
    year: "2022",
    role: "Identités visuelles & print",
    company: "Yumie · Bordeaux",
    desc: "Cohérence graphique de marques : déclinaisons logo, papeterie, signalétique.",
  },
]

export const CONTACT = {
  email: "quentinsingama974@gmail.com",
  linkedin: "https://www.linkedin.com/in/quentin-singama-1b36b31b9",
  location: "Bordeaux, France",
  status: "Disponible en alternance, septembre 2026",
  formation: "M2 UX/UI · ECV Bordeaux",
}
