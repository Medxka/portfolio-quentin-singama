import * as React from "react"
import { Link } from "react-router-dom"
import { motion, useScroll, useTransform } from "motion/react"
import { Reveal } from "@/src/components/ui/Reveal"
import { Label } from "@/src/components/ui/Label"

/* ── Amber tokens ── */
const C = {
  amber: "#F59E0B",
  amberDark: "#B45309",
  bg: "#0A0A0F",
  card: "#0D0D14",
  cardAlt: "#111118",
}

/* ── Animated divider (amber) ── */
function AmberDivider() {
  return (
    <div className="relative h-[2px] w-full my-4 overflow-hidden">
      <div className="absolute inset-0" style={{ background: `linear-gradient(to right, transparent, ${C.amber}60, transparent)` }} />
      <motion.div
        className="absolute top-0 h-full w-24"
        style={{ background: `linear-gradient(to right, transparent, ${C.amber}, transparent)` }}
        animate={{ x: ["-96px", "calc(100vw + 96px)"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 3 }}
      />
    </div>
  )
}

/* ── Terminal header ── */
function PageTerminalHeader() {
  return (
    <div className="flex items-center gap-3 px-4 py-2.5 border-b font-mono text-[10px] tracking-wider"
      style={{ backgroundColor: C.card, borderColor: C.amber + "15" }}
    >
      <div className="flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: C.amber }} />
        <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
        <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
      </div>
      <span className="text-t3/50 uppercase hidden md:inline">// MUST·2025·NAV · REFONTE NAVIGATION & ARBORESCENCE</span>
      <span
        className="ml-auto px-2 py-0.5 border rounded-sm text-[9px] uppercase tracking-[0.15em]"
        style={{ borderColor: C.amber + "50", color: C.amber }}
      >
        LIVRÉ
      </span>
    </div>
  )
}

/* ── Problem card ── */
function ProblemCard({ num, title, desc }: { num: string; title: string; desc: string }) {
  return (
    <Reveal>
      <div className="rounded-2xl border p-5 md:p-6 flex flex-col h-full"
        style={{ borderColor: C.amber + "20", backgroundColor: C.card }}
      >
        <div className="flex items-start gap-4 mb-3">
          <span className="font-display font-bold text-3xl shrink-0 leading-none" style={{ color: C.amber }}>{num}</span>
          <h3 className="text-base md:text-lg font-bold font-display text-t1 leading-snug">{title}</h3>
        </div>
        <p className="text-sm text-t2 leading-relaxed">{desc}</p>
      </div>
    </Reveal>
  )
}

/* ── Mega-menu showcase card ── */
function MegaMenuCard({ label, src, delay = 0 }: { label: string; src: string; delay?: number }) {
  return (
    <Reveal delay={delay}>
      <div className="rounded-2xl border overflow-hidden"
        style={{ borderColor: C.amber + "25", backgroundColor: C.card }}
      >
        <div className="px-4 py-2.5 border-b flex items-center gap-2" style={{ borderColor: C.amber + "20", backgroundColor: C.cardAlt }}>
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: C.amber }} />
          <span className="font-mono text-[10px] tracking-[0.15em] uppercase" style={{ color: C.amber }}>{label}</span>
        </div>
        <div className="overflow-hidden" style={{ backgroundColor: C.cardAlt }}>
          <img src={src} alt={label} className="w-full h-auto block" loading="lazy" />
        </div>
      </div>
    </Reveal>
  )
}

/* ── Compare block (before / after) ── */
function CompareBlock({ beforeImg, afterImg, beforeLabel, afterLabel }: {
  beforeImg: string; afterImg: string; beforeLabel: string; afterLabel: string
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
      <Reveal>
        <div className="rounded-2xl border overflow-hidden h-full" style={{ borderColor: "#3F3F46", backgroundColor: C.card }}>
          <div className="px-4 py-2.5 border-b flex items-center gap-2" style={{ borderColor: "#3F3F46", backgroundColor: C.cardAlt }}>
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "#EF4444" }} />
            <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-t3">{beforeLabel}</span>
          </div>
          <div className="overflow-auto max-h-[600px]" style={{ backgroundColor: "#FFFFFF" }}>
            <img src={beforeImg} alt={beforeLabel} className="w-full h-auto block" loading="lazy" />
          </div>
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <div className="rounded-2xl border overflow-hidden h-full" style={{ borderColor: C.amber + "40", backgroundColor: C.card }}>
          <div className="px-4 py-2.5 border-b flex items-center gap-2" style={{ borderColor: C.amber + "20", backgroundColor: C.cardAlt }}>
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: C.amber }} />
            <span className="font-mono text-[10px] tracking-[0.15em] uppercase" style={{ color: C.amber }}>{afterLabel}</span>
          </div>
          <div className="overflow-auto max-h-[600px]" style={{ backgroundColor: C.cardAlt }}>
            <img src={afterImg} alt={afterLabel} className="w-full h-auto block" loading="lazy" />
          </div>
        </div>
      </Reveal>
    </div>
  )
}

/* ── Main page ── */
export function ProjectMusthane() {
  const heroRef = React.useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  React.useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className="w-full" style={{ backgroundColor: C.bg }}>

      <PageTerminalHeader />

      {/* ═══════════════════════════════════════ */}
      {/* 1. HERO                                 */}
      {/* ═══════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-[85vh] flex items-center justify-center overflow-hidden" style={{ backgroundColor: C.bg }}>
        <motion.div className="absolute inset-0 z-0 pointer-events-none" style={{ opacity: heroOpacity }}>
          <div className="absolute top-[20%] right-[20%] w-[35vw] h-[35vw] max-w-[500px] max-h-[500px] rounded-full blur-[180px]"
            style={{ backgroundColor: C.amber + "08" }}
          />
        </motion.div>

        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <Reveal>
            <Label className="mb-6 block" style={{ color: C.amber }}>// REFONTE NAVIGATION & ARBORESCENCE</Label>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-display tracking-tight text-white mb-6">
              Remettre de l'ordre dans{" "}
              <span style={{ color: C.amber }}>100+ produits</span>
            </h1>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="text-base md:text-lg text-t2 mb-12 max-w-3xl mx-auto leading-relaxed">
              Musthane fabrique des solutions gonflables industrielles pour 10 secteurs (défense, BTP, pétrole, maritime…). Le site existant croise 4 systèmes de classification incompatibles. Refonte complète de l'arborescence, de la nav desktop et mobile, et d'une accueil qui guide vraiment.
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-y max-w-4xl mx-auto"
              style={{ borderColor: C.amber + "25" }}
            >
              {[
                { label: "Rôle", value: "UX Designer · Arbo & Nav" },
                { label: "Méthode", value: "Audit heuristique + refonte arborescence" },
                { label: "Durée", value: "2 jours · projet école" },
                { label: "Livrables", value: "Audit · arbo · nav desktop & mobile · accueil" },
              ].map(item => (
                <div key={item.label}>
                  <Label className="mb-2 block" style={{ color: C.amber }}>{item.label}</Label>
                  <p className="font-medium text-t1 text-sm">{item.value}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* 2. LE SITE EN L'ÉTAT                    */}
      {/* ═══════════════════════════════════════ */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <AmberDivider />
        <div className="max-w-4xl mx-auto px-6 mt-12">
          <Reveal>
            <Label className="mb-4 block" style={{ color: C.amber }}>// CONTEXTE · LE SITE EN L'ÉTAT</Label>
            <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight text-t1 mb-8 max-w-3xl">
              Quatre axes de classification <span style={{ color: C.amber }}>qui se contredisent</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="p-6 md:p-8 rounded-xl border relative overflow-hidden"
              style={{ borderColor: C.amber + "20", backgroundColor: C.card }}
            >
              <p className="text-base md:text-lg text-t2 leading-relaxed">
                Le top nav exposait simultanément <span className="text-t1 font-semibold">"Sur-mesure"</span>, <span className="text-t1 font-semibold">"Nos solutions"</span>, <span className="text-t1 font-semibold">"Votre industrie"</span> et 7 sous-marques (Mustmove, Mustlift, Muststop…). Un même réservoir était accessible par 3 chemins différents · sans que l'utilisateur sache lequel choisir.
              </p>
              <p className="text-base text-t2 leading-relaxed mt-4">
                Sur l'arborescence imprimée fournie par le client, on a annoté à la main : <span className="font-mono text-[12px]" style={{ color: C.amber }}>"n'existe pas"</span>, <span className="font-mono text-[12px]" style={{ color: C.amber }}>"pas cohérent avec l'organisation"</span>. Le diagnostic était évident dès la lecture.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-8 rounded-2xl border overflow-hidden" style={{ borderColor: "#3F3F46", backgroundColor: C.card }}>
              <div className="px-4 py-2.5 border-b flex items-center gap-2" style={{ borderColor: "#3F3F46", backgroundColor: C.cardAlt }}>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "#EF4444" }} />
                <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-t3">CAPTURE · MEGA-MENU "NOS SOLUTIONS" DU SITE ACTUEL</span>
              </div>
              <div style={{ backgroundColor: "#111118" }}>
                <img src="/musthane-old-nav.jpg" alt="Mega-menu Nos Solutions sur le site Musthane actuel · 7 sous-marques en colonnes" className="w-full h-auto block" loading="lazy" />
              </div>
              <div className="px-4 py-2.5 border-t font-mono text-[10px] text-t3/60" style={{ borderColor: "#3F3F46" }}>
                7 sous-marques en colonnes · une même solution rangée plusieurs fois · pas de hiérarchie visuelle entre les marchés.
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* 3. LES 5 PROBLÈMES                      */}
      {/* ═══════════════════════════════════════ */}
      <section className="py-20 md:py-28 relative overflow-hidden" style={{ backgroundColor: C.bg }}>
        <AmberDivider />
        <div className="max-w-6xl mx-auto px-6 mt-12">
          <Reveal>
            <Label className="mb-4 block" style={{ color: C.amber }}>// AUDIT · CE QUE LES UTILISATEURS SUBISSENT</Label>
            <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight text-t1 mb-12 max-w-3xl">
              Les <span style={{ color: C.amber }}>5 problèmes</span> majeurs identifiés
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <ProblemCard
              num="01"
              title="Quatre axes de nav qui se croisent"
              desc="Sur-mesure / Nos solutions / Votre industrie + 7 sous-marques. Le même produit est trouvable par 3 chemins différents · l'utilisateur ne sait pas où chercher."
            />
            <ProblemCard
              num="02"
              title="7 sous-marques sans logique apparente"
              desc="Mustmove, Muststore, Mustshock, Muststop, Mustbalance, Mustlift, Mustpress. Aucune explication de la logique · à quoi sert chaque marque ? Pour quel besoin ?"
            />
            <ProblemCard
              num="03"
              title="Sous-menu industries surchargé"
              desc="9 industries affichées sur 4 colonnes au survol. Cognitive overload immédiat · pas de hiérarchisation entre les marchés principaux et secondaires."
            />
            <ProblemCard
              num="04"
              title="Hero homepage flou"
              desc='"DESIGN TO MOBILITY" / "We design for tomorrow" · aucune mention claire de ce que fabrique vraiment Musthane (réservoirs, citernes, obturateurs gonflables) avant de scroller longuement.'
            />
            <ProblemCard
              num="05"
              title="Pas de hiérarchie de CTA"
              desc="Le contact est planqué dans le footer. Pour un site B2B où la conversion = demande de devis, le CTA prioritaire devrait être visible above-the-fold."
            />
            <ProblemCard
              num="+"
              title="Switcher de langue dans le footer"
              desc="FR / EN / ES coexistent mais le sélecteur est en bas de page. Sur un site B2B international, c'est un bug d'accessibilité de marché."
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* 4. NOUVELLE ARBORESCENCE                */}
      {/* ═══════════════════════════════════════ */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <AmberDivider />
        <div className="max-w-6xl mx-auto px-6 mt-12">
          <Reveal>
            <Label className="mb-4 block" style={{ color: C.amber }}>// REFONTE · ARBORESCENCE</Label>
            <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight text-t1 mb-6 max-w-3xl">
              Une seule logique : <span style={{ color: C.amber }}>par usage</span>
            </h2>
            <p className="text-base md:text-lg text-t2 max-w-3xl leading-relaxed mb-12">
              Suppression des 4 axes parallèles. Un seul point d'entrée principal · "Nos solutions" · classé par usage métier (stockage, levage, obturation…). Les sous-marques deviennent des labels secondaires sur les fiches produit, pas un système de nav. Les industries deviennent un filtre, pas un menu.
            </p>
          </Reveal>

          <CompareBlock
            beforeImg="/musthane-arbo-old.png"
            afterImg="/musthane-arbo-new.png"
            beforeLabel="AVANT · 4 AXES CROISÉS"
            afterLabel="APRÈS · 1 LOGIQUE PAR USAGE"
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* 5. NOUVELLE NAV DESKTOP                 */}
      {/* ═══════════════════════════════════════ */}
      <section className="py-20 md:py-28 relative overflow-hidden" style={{ backgroundColor: C.bg }}>
        <AmberDivider />
        <div className="max-w-6xl mx-auto px-6 mt-12">
          <Reveal>
            <Label className="mb-4 block" style={{ color: C.amber }}>// LIVRABLE · NAVIGATION DESKTOP</Label>
            <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight text-t1 mb-6 max-w-3xl">
              Cinq entrées, <span style={{ color: C.amber }}>cinq mega-menus</span>
            </h2>
            <p className="text-base md:text-lg text-t2 max-w-3xl leading-relaxed mb-12">
              Top nav réduit à 5 entrées · <span className="text-t1">Nos produits · Nos solutions · Votre industrie · Ressources · À propos</span>. Chaque entrée déploie un mega-menu groupé par usage avec visuels et descriptions courtes. Contact en CTA sticky à droite.
            </p>
          </Reveal>

          <div className="space-y-4 md:space-y-6">
            <MegaMenuCard label="MENU · NOS SOLUTIONS" src="/musthane-nav-solutions.jpg" delay={0} />
            <MegaMenuCard label="MENU · VOTRE INDUSTRIE" src="/musthane-nav-industrie.jpg" delay={0.05} />
            <MegaMenuCard label="MENU · NOS PRODUITS" src="/musthane-nav-produits.jpg" delay={0.1} />
            <MegaMenuCard label="MENU · RESSOURCES" src="/musthane-nav-ressources.jpg" delay={0.15} />
            <MegaMenuCard label="MENU · À PROPOS" src="/musthane-nav-apropos.jpg" delay={0.2} />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* 6. NAV MOBILE                           */}
      {/* ═══════════════════════════════════════ */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <AmberDivider />
        <div className="max-w-6xl mx-auto px-6 mt-12">
          <Reveal>
            <Label className="mb-4 block" style={{ color: C.amber }}>// LIVRABLE · NAVIGATION MOBILE</Label>
            <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight text-t1 mb-6 max-w-3xl">
              Drawer hiérarchisé, <span style={{ color: C.amber }}>pas un dump de liens</span>
            </h2>
            <p className="text-base md:text-lg text-t2 max-w-3xl leading-relaxed mb-12">
              Sur mobile, le burger ouvre un drawer avec accordéons par usage. Les 7 sous-marques sont reléguées en dernier (utiles aux clients existants, pas aux prospects). CTA "Devis" en bas du drawer, toujours visible.
            </p>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {[
              { label: "DRAWER · ACCUEIL", src: "/musthane-mobile-default.png" },
              { label: "NOS SOLUTIONS", src: "/musthane-mobile-solutions.png" },
              { label: "VOTRE INDUSTRIE", src: "/musthane-mobile-industrie.png" },
              { label: "NOS PRODUITS", src: "/musthane-mobile-produits.png" },
              { label: "RESSOURCES", src: "/musthane-mobile-ressources.png" },
              { label: "À PROPOS", src: "/musthane-mobile-apropos.png" },
            ].map((m, i) => (
              <Reveal key={m.src} delay={i * 0.05}>
                <div className="rounded-2xl border overflow-hidden h-full" style={{ borderColor: C.amber + "25", backgroundColor: C.card }}>
                  <div className="px-3 py-2 border-b flex items-center gap-2" style={{ borderColor: C.amber + "20", backgroundColor: C.cardAlt }}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: C.amber }} />
                    <span className="font-mono text-[9px] tracking-[0.15em] uppercase" style={{ color: C.amber }}>{m.label}</span>
                  </div>
                  <div className="overflow-hidden" style={{ backgroundColor: C.cardAlt }}>
                    <img src={m.src} alt={m.label} className="w-full h-auto block" loading="lazy" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* 7. NOUVELLE ACCUEIL                     */}
      {/* ═══════════════════════════════════════ */}
      <section className="py-20 md:py-28 relative overflow-hidden" style={{ backgroundColor: C.bg }}>
        <AmberDivider />
        <div className="max-w-6xl mx-auto px-6 mt-12">
          <Reveal>
            <Label className="mb-4 block" style={{ color: C.amber }}>// LIVRABLE · NOUVELLE ACCUEIL</Label>
            <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight text-t1 mb-6 max-w-3xl">
              Une accueil qui dit <span style={{ color: C.amber }}>ce qu'on fait</span>
            </h2>
            <p className="text-base md:text-lg text-t2 max-w-3xl leading-relaxed mb-12">
              Hero net · "Structures textiles flexibles, pour environnements extrêmes". Une gamme illustrée par cas d'usage. Mission terrain en images, conditions techniques en chiffres. CTA devis fixe en haut à droite, jamais perdu.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-2xl border overflow-hidden" style={{ borderColor: C.amber + "25", backgroundColor: C.card }}>
              <div className="px-4 py-2.5 border-b flex items-center gap-2" style={{ borderColor: C.amber + "20", backgroundColor: C.cardAlt }}>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: C.amber }} />
                <span className="font-mono text-[10px] tracking-[0.15em] uppercase" style={{ color: C.amber }}>HOMEPAGE · ÉTAT PAR DÉFAUT</span>
              </div>
              <div className="overflow-hidden" style={{ backgroundColor: C.cardAlt }}>
                <img src="/musthane-nav-default.jpg" alt="Nouvelle accueil Musthane (full)" className="w-full h-auto block" loading="lazy" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* 8. CE QUE J'EN RETIRE                   */}
      {/* ═══════════════════════════════════════ */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <AmberDivider />
        <div className="max-w-4xl mx-auto px-6 mt-12">
          <Reveal>
            <Label className="mb-4 block" style={{ color: C.amber }}>// RÉFLEXION PERSONNELLE</Label>
            <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight text-t1 mb-8 max-w-3xl">
              Ce que <span style={{ color: C.amber }}>j'ai appris</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="p-6 md:p-8 rounded-xl border"
              style={{ borderColor: C.amber + "15", backgroundColor: C.card }}
            >
              <p className="text-base text-t2 leading-relaxed">
                En 2 jours, le piège c'était d'aller trop vite vers les maquettes. J'ai pris du temps sur l'arbo et l'audit · sans ça, refaire un mega-menu propre n'aurait été qu'une couche cosmétique.
              </p>
              <p className="text-base text-t2 leading-relaxed mt-4">
                La vraie leçon · sur un site B2B avec un catalogue lourd, c'est <span className="text-t1 font-semibold">la classification</span> qui fait l'expérience, pas l'animation du menu. Quand le modèle mental de l'entreprise est cassé (4 axes contradictoires), aucun design ne le rattrape.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* NEXT PROJECT                            */}
      {/* ═══════════════════════════════════════ */}
      <section className="py-24 border-t text-center" style={{ borderColor: C.amber + "15", backgroundColor: C.bg }}>
        <Reveal>
          <Label className="mb-4 block" style={{ color: C.amber }}>PROJET SUIVANT</Label>
          <Link to="/lina" className="inline-block group">
            <h2 className="text-4xl md:text-6xl font-bold font-display text-t1 transition-colors group-hover:text-[#4F46E5]">
              LINA · Repenser la librairie indépendante →
            </h2>
          </Link>
        </Reveal>
      </section>
    </div>
  )
}
