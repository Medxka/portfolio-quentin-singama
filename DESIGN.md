# Design

Système V3 : langage design technique (inspiré de la grammaire effortel.com — structure, composants, motion) transposé en palette chaude et accueillante. Contenu et code 100 % originaux.

## Theme

Sombre-chaud dominant. Le site ouvre et ferme sur l'espresso profond ; les sections centrales respirent sur un clair pêche. Scène : un recruteur le soir, lampe chaude, écran qui n'agresse pas — le site est une pièce éclairée à la bougie, pas un néon de bureau.

## Color

Stratégie **Committed** : l'espresso et l'abricot portent l'identité. Zéro bleu, zéro cyan.

| Token | OKLCH | Hex approx | Rôle (équivalent effortel) |
|---|---|---|---|
| `--espresso` | `oklch(0.23 0.018 55)` | `#25201A` | Surface sombre principale (était #22282A) |
| `--espresso-2` | `oklch(0.28 0.02 55)` | `#332C24` | Cartes sur sombre, nav pill |
| `--peach` | `oklch(0.93 0.045 65)` | `#F7E4CF` | Fond clair des sections (était #E4EDF1) |
| `--apricot` | `oklch(0.82 0.13 65)` | `#FFB061` | Accent primaire, CTA, chiffres (était cyan #66E8FA) |
| `--apricot-bright` | `oklch(0.87 0.11 70)` | `#FFC98F` | Hover, lueurs canvas (était #9BF7FF) |
| `--butter` | `oklch(0.95 0.055 95)` | `#FFF0BF` | Tint secondaire, tags (était lime #E3FFD1) |
| `--taupe` | `oklch(0.46 0.028 55)` | `#665A4D` | Corps de texte sur clair (était #5F6F77) |
| `--linen` | `oklch(0.92 0.018 70)` | `#F0E7DB` | Texte sur sombre (était #D5E1E7) |
| `--greige` | `oklch(0.75 0.025 60)` | `#C2B4A3` | Texte secondaire sur sombre (était #B1C5CE) |

Contrastes vérifiés : taupe/peach ≥ 6:1, linen/espresso ≥ 11:1, espresso/apricot ≥ 7:1.

## Typography

- **Display & corps** : Satoshi Variable (Fontshare, 300–900) — comme la référence.
- **Labels techniques** : Spline Sans Mono (Google Fonts) — uppercase, tracking -0.03em. Remplace Et Mono (propriétaire).

Échelle (desktop 1440, fluide en clamp) :

| Style | Taille | Poids | LH | LS |
|---|---|---|---|---|
| Display (h1/h2 hero) | clamp(2.6rem, 5.5vw, 4.1rem) | 800 | 1.1 | -0.03em |
| H3 section | clamp(2rem, 3.8vw, 3.05rem) | 800 | 1.1 | -0.03em |
| H4 carte | 1.8rem | 800 | 1.1 | -0.04em |
| H5 item | 1.16rem | 700 | 1.3 | -0.02em |
| p-large | 1.28rem | 400 | 1.5 | 0 |
| p-body | 1.16rem | 450 | 1.5 | 0 |
| p-small | 1.03rem | 400 | 1.4 | 0 |
| mono-label | 0.86rem | 400 | 1 | -0.03em, uppercase |

## Components (grammaire signature)

- **Kicker** : `( LABEL )` — parenthèses écartées en mono, texte uppercase entre elles. Un par section, c'est la grammaire du système (héritée de la référence, assumée).
- **PillButton** : radius 10px, mono uppercase ; variante `solid` (apricot, texte espresso) et `ghost` (bordure) ; chip flèche → carrée accolée qui glisse au hover.
- **Nav** : barre sticky pleine largeur espresso ; wordmark gauche, liens mono centre, CTA apricot droite.
- **DarkCard** : radius 24px, fond espresso-2, dot-grid canvas en fond, visuel projet flottant, contenu bas.
- **NumberCard** : numéro mono géant `01…05` en apricot, visuel, H4 + p-small.
- **StatPanel** : gros chiffres mono (ex. `05 PROJETS`, `2026 DISPO`) sur panneaux translucides.
- **LogoStrip** : ligne mono uppercase défilante (marquee lent) des expériences/écoles.

## Layout

- Sections pleine largeur, contenu max 1200px, padding latéral clamp(1.25rem, 4vw, 4rem).
- Alternance : hero sombre → strip clair → intro claire → projets (cartes sombres sur clair) → process sombre → parcours clair → CTA sombre → footer espresso.
- Espacement vertical généreux : clamp(6rem, 12vh, 10rem) entre sections.

## Motion

- Lenis smooth scroll (lerp 0.09) + motion/react pour les reveals.
- Canvas dot-matrix maison : horizon de points chauds dans le hero (lueur apricot qui respire), dot-grids statiques animés à la souris dans les cartes.
- Reveals : y 24px + fade, ease `[0.16, 1, 0.3, 1]`, stagger 80ms dans les listes. Contenu visible par défaut (les reveals rehaussent, ne gatent pas).
- `prefers-reduced-motion` : Lenis off, canvas figés, transitions en fondu.

## Assets

- Visuels projets : `/public/work/*.webp` (repris de la v2).
- Fonts : Satoshi via CDN Fontshare ; Spline Sans Mono via Google Fonts.
