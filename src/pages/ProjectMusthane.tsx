import * as React from "react"
import { Link } from "react-router-dom"
import { Reveal } from "@/src/components/ui/Reveal"
import { Tag } from "@/src/components/ui/Tag"
import { Label } from "@/src/components/ui/Label"

export function ProjectMusthane() {
  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="w-full pt-20">
      {/* HERO */}
      <section className="py-20 md:py-32 bg-bg relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Reveal>
            <div className="flex flex-wrap gap-2 mb-8">
              <Tag>UX Audit</Tag>
              <Tag>SEO</Tag>
              <Tag>Heuristiques</Tag>
              <Tag>Arborescence</Tag>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold font-display tracking-tight text-t1 mb-8 max-w-4xl">
              Audit UX & SEO complet du site industriel Musthane
            </h1>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-border-color mb-16">
              <div>
                <Label className="mb-2 block">Rôle</Label>
                <p className="font-medium text-t1">UX/SEO Auditor</p>
              </div>
              <div>
                <Label className="mb-2 block">Durée</Label>
                <p className="font-medium text-t1">5 semaines</p>
              </div>
              <div>
                <Label className="mb-2 block">Outils</Label>
                <p className="font-medium text-t1">Figma, grilles heuristiques, SEMrush</p>
              </div>
              <div>
                <Label className="mb-2 block">Année</Label>
                <p className="font-medium text-t1">2025</p>
              </div>
            </div>
          </Reveal>
          
          <Reveal delay={0.2}>
            <div className="w-full aspect-[21/9] bg-[#04342C] rounded-2xl overflow-hidden border border-border-color">
              <img 
                src="https://picsum.photos/seed/musthane/800/600" 
                alt="Hero Musthane" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-20 bg-bg-surf">
        <div className="max-w-4xl mx-auto px-6 space-y-24">
          
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">1. Le contexte</h2>
            <div className="prose prose-invert prose-lg max-w-none text-t2">
              <p>
                Musthane est une entreprise industrielle spécialisée dans les systèmes gonflables B2B. Leur site web présentait des problèmes de navigation, ce qui impactait négativement la conversion et le référencement naturel.
              </p>
              <p>
                L'objectif de cet audit était d'identifier les points de friction dans l'expérience utilisateur et les opportunités d'amélioration SEO pour augmenter le trafic qualifié et les demandes de devis.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">2. Findings UX</h2>
            <div className="prose prose-invert prose-lg max-w-none text-t2 mb-12">
              <p>
                J'ai réalisé une évaluation heuristique basée sur les principes de Bastien et Scapin. Voici les 6 problèmes principaux identifiés :
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li><strong>Critique :</strong> La navigation principale est confuse, avec des catégories qui se chevauchent.</li>
                <li><strong>Critique :</strong> Les formulaires de contact sont trop longs et dissuadent la conversion.</li>
                <li><strong>Majeur :</strong> Le moteur de recherche interne ne gère pas les fautes de frappe.</li>
                <li><strong>Majeur :</strong> Les fiches produits manquent d'informations techniques claires.</li>
                <li><strong>Mineur :</strong> Le contraste des textes sur certains boutons est insuffisant.</li>
                <li><strong>Mineur :</strong> Les temps de chargement des images sont trop longs sur mobile.</li>
              </ul>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="w-full aspect-[16/9] bg-[#04342C] rounded-xl overflow-hidden border border-border-color">
                  <img src={`https://picsum.photos/seed/screenshot${i}/1000/562`} alt={`Screenshot annoté ${i}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">3. Arborescence</h2>
            <div className="prose prose-invert prose-lg max-w-none text-t2 mb-12">
              <p>
                La refonte de l'arborescence était une priorité pour simplifier la navigation et améliorer le maillage interne pour le SEO.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-t1 mb-4 text-center">Avant (Problèmes)</h3>
                <div className="w-full aspect-[4/3] bg-bg-el rounded-xl overflow-hidden border border-border-color">
                  <img src="https://picsum.photos/seed/arbo_avant/800/600" alt="Arborescence actuelle" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-t1 mb-4 text-center">Après (Recommandée)</h3>
                <div className="w-full aspect-[4/3] bg-bg-el rounded-xl overflow-hidden border border-border-color">
                  <img src="https://picsum.photos/seed/arbo_apres/800/600" alt="Arborescence recommandée" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">4. Recommandations SEO</h2>
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-c5 flex items-center justify-center text-white font-bold shrink-0 mt-1">1</div>
                <div>
                  <h3 className="text-xl font-bold text-t1 mb-2">Meta tags</h3>
                  <p className="text-t2">Optimiser les balises title et meta description pour inclure les mots-clés stratégiques et inciter au clic.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-c5 flex items-center justify-center text-white font-bold shrink-0 mt-1">2</div>
                <div>
                  <h3 className="text-xl font-bold text-t1 mb-2">WebP</h3>
                  <p className="text-t2">Convertir toutes les images au format WebP pour réduire le poids des pages et améliorer les Core Web Vitals.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-c5 flex items-center justify-center text-white font-bold shrink-0 mt-1">3</div>
                <div>
                  <h3 className="text-xl font-bold text-t1 mb-2">URLs canoniques</h3>
                  <p className="text-t2">Mettre en place des balises canonical pour éviter le contenu dupliqué généré par les filtres de recherche.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-c5 flex items-center justify-center text-white font-bold shrink-0 mt-1">4</div>
                <div>
                  <h3 className="text-xl font-bold text-t1 mb-2">Pillar pages</h3>
                  <p className="text-t2">Créer des pages piliers pour regrouper le contenu par thématique et renforcer l'autorité sémantique du site.</p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">5. Réflexion</h2>
            <div className="prose prose-invert prose-lg max-w-none text-t2">
              <p>
                Cet audit m'a fait prendre conscience de l'importance du contexte métier. Les recommandations UX doivent toujours être alignées avec les objectifs commerciaux de l'entreprise.
              </p>
              <p>
                L'utilisation d'une matrice sévérité × effort m'a permis de prioriser les recommandations et de proposer un plan d'action réaliste et actionnable pour l'équipe de développement.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* NEXT PROJECT */}
      <section className="py-24 bg-bg border-t border-border-color text-center">
        <Reveal>
          <Label className="mb-4 block">PROJET SUIVANT</Label>
          <Link to="/lina" className="inline-block group">
            <h2 className="text-4xl md:text-6xl font-bold font-display text-t1 group-hover:text-p4 transition-colors">
              LINA - Refonte UX/UI →
            </h2>
          </Link>
        </Reveal>
      </section>
    </div>
  )
}
