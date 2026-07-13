/**
 * Contenu réel du portfolio — source unique pour toutes les sections.
 * Zéro lorem : tout vient du parcours de Quentin.
 */

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
  },
  {
    id: "research",
    num: "02",
    title: "Concerts 18-25",
    role: "UX Research",
    year: "2025",
    desc: "Comment les 18-25 ans découvrent leurs concerts ? Sept entretiens, quatre insights, un brief retourné.",
    image: null,
    imageAlt: "",
    tags: ["Entretiens", "Insights", "Synthèse"],
  },
  {
    id: "ink",
    num: "03",
    title: "INK",
    role: "Identité · Hackathon 48h",
    year: "2024",
    desc: "Une marque de résistance née en 48h de hackathon. Deux identités opposées, un univers complet. 2ᵉ place.",
    image: "/work/ink-hero.webp",
    imageAlt: "INK, identité dystopique rouge et noir",
    tags: ["Branding", "Direction artistique", "2ᵉ place"],
  },
  {
    id: "lina",
    num: "04",
    title: "LINA",
    role: "UI Design · Sprint 3 jours",
    year: "2024",
    desc: "Repenser la découverte en librairie indépendante. Refonte desktop et système d'icônes, en trois jours.",
    image: "/work/lina-cover.png",
    imageAlt: "LINA — Librairies Indépendantes, identité orange",
    tags: ["UI Design", "Iconographie", "Sprint"],
  },
  {
    id: "happyjob",
    num: "05",
    title: "Happy Job",
    role: "Graphic Design · Stage 2 mois",
    year: "2026",
    desc: "Deux mois de stage en graphic design : campagnes de recrutement saisonnières pour un réseau d'agences.",
    image: "/work/happyjob-affiche.webp",
    imageAlt: "Affiche Happy Job — emplois saisonniers toute l'année",
    tags: ["Campagnes", "Print", "Multi-agences"],
  },
]

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
    role: "Graphic Designer — Stage",
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
  email: "quentinlouis97400@gmail.com",
  linkedin: "https://www.linkedin.com/in/quentin-singama",
  location: "Bordeaux, France",
  status: "Disponible en alternance — septembre 2026",
  formation: "M2 UX/UI · ECV Bordeaux",
}
