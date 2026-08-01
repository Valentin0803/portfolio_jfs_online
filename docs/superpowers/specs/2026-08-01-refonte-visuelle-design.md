# Refonte visuelle — JFS Visual (portfolio_jfs_online) — Design Spec

**Date :** 2026-08-01
**Repo :** github.com/Valentin0803/portfolio_jfs_online
**Contexte business :** voir mémoire `jfs_visual_business.md` et `/Users/valentin/Documents/WORKSPACE/CLAUDE/master-prompt-jfs-visual.md`. JFS Visual est spécialisé en production vidéo pour agences immobilières (offre phare : l'Atelier du Réel, ~2 100€ HT/mois, 6 mois, client Guy Hoquet), avec une nouvelle offre plus accessible en cours de cadrage ("Journée Contenu", ~800€, ouverte à tous secteurs) et des prestations à la carte. Ambition qualité : niveau proche des standards US (référence four.horsemen.media).

Cette refonte fait partie de la **Phase 4** de la roadmap de mise à jour du site (voir `roadmap-jfsvisual.md`, envoyée séparément). Elle se mène **en même temps** que la Phase 1 (correction SEO : retrait de `"use client"` sur `app/page.tsx`) et la Phase 2 (modernisation Next/React/Tailwind), pour éviter de retravailler deux fois les mêmes composants.

**Hors scope de ce spec :** refonte de la Phase 0 (corrections rapides déjà listées dans la roadmap), collecte des chiffres de résultats clients pour les futures case studies, tarif définitif de l'offre Journée Contenu (encore en discussion avec Martin).

---

## 1. Identité visuelle

Choisie après comparaison de 4 directions (Cinéma Premium, Éditorial Lumineux, Brutalist Créatif, Aérien/Tech) puis d'un comparatif direct A/B sur un hero complet avec contenu réel — voir décisions ci-dessous.

### Palette

| Rôle | Couleur | Hex |
|---|---|---|
| Fond principal | Charcoal chaud | `#0A0907` |
| Accent | Or | `#C9A24B` |
| Texte clair / surfaces claires | Crème | `#F3EDE1` |

Remplace `jaune` (`#FFEE53`) et `gris` (`#0D0D0D`) dans `tailwind.config.ts`. Le fond reste sombre (cohérent avec l'existant `darkMode: "class"`), mais le ton passe d'un noir pur + jaune vif à un charcoal chaud + or — plus feutré, plus "cinéma" que "néon".

**Rejeté :** direction "Éditorial Lumineux" (fond clair + corail) — testée en comparatif direct avec le même contenu, jugée moins porteuse pour le positionnement premium immo. Direction "Aérien/Tech" (bleu nuit + cyan) écartée d'emblée. Direction "Brutalist" (noir/blanc + néon) écartée par crainte d'un rendu "cheap" — à reconsidérer plus tard pour des usages ponctuels (ex : un post réseaux sociaux) mais pas comme identité du site.

### Typographie

- **Titres + wordmark** : `Unbounded`, graisse 700–800. Remplace `Akira`.
- **Corps de texte / UI (nav, boutons, labels)** : `DM Sans`, graisses 400–700. Remplace `League Spartan`.
- Les deux sont disponibles sur Google Fonts, à charger via `next/font/google` (comme l'actuel `League_Spartan`) plutôt qu'en local — simplifie l'implémentation par rapport au `localFont` actuel pour Akira.

**Rejeté :** traitement serif italique (trop éditorial), grotesk sobre façon "brand agency" (moins distinctif), lockup à graisses contrastées "JFS / VISUAL" (intéressant mais moins net qu'Unbounded en pleine graisse sur les tests).

### Ton graphique

Sobre et contrasté — l'image/vidéo porte l'émotion, la typo structure l'information. Peu d'éléments décoratifs superflus. Les interactions existantes (hover reveal, GSAP, Framer Motion, parallax) sont conservées dans leur principe mais réhabillées avec la nouvelle palette — pas de refonte des mécaniques d'interaction dans ce spec, seulement leur habillage visuel.

---

## 2. Structure des offres (section "Nos Offres", remplace `components/Tarifs.tsx`)

Layout **"offre phare + secondaires"**, choisi après comparaison avec une grille à 3 cartes égales et une segmentation par audience (onglets "agence immo" / "autre projet").

- **Atelier du Réel** : carte hero mise en avant visuellement (badge "Offre phare", plus grande, fond légèrement teinté or), 2 100€ HT/mois. Description doit refléter le contenu du master prompt : suivi Notion + WhatsApp, gestion administrative des vols drone, validation via Frame.io/Reely.
- **Journée Contenu** et **Sur Mesure** : cartes secondaires, plus compactes, à côté ou en dessous de la carte hero.
  - Journée Contenu : "~1h prépa/trajet + 2h tournage + 5h post-prod → 5 contenus courts livrés". Prix affiché en `"à partir de ~800€"` tant que Martin n'a pas figé le tarif définitif — ne pas afficher un chiffre ferme.
  - Sur Mesure : corporate, événementiel, drone à la demande → "Devis".

**Rejeté :** grille à 3 cartes égales (ne signale pas que l'Atelier du Réel est l'offre phare et le moteur de revenu récurrent) ; segmentation par onglets audience (pertinente marketing-wise mais ajoute un clic, jugée pas prioritaire pour cette itération — à garder en option si les données d'usage montrent que les deux audiences se marchent dessus).

---

## 3. Réalisations (remplace `components/Projets.tsx`)

Layout **"showreel immersif + liste"**, choisi après comparaison avec une grille de miniatures classique et une présentation en case studies chiffrées.

- **Showreel** en tête de section : vidéo en boucle, muette par défaut, façon reel d'agence de production. Nécessite un montage dédié (pas un best-of généré automatiquement) — à prévoir côté production, pas côté dev.
- **Liste de projets** en dessous du showreel, format proche de l'actuel (miniatures cliquables vers Vimeo/YouTube via `VimeoPlayer`/`YoutubePlayer`).

**Évolution future (non incluse dans cette itération) :** transformer la liste en case studies avec résultats chiffrés ("vendu 12 jours après publication", "+40% de vues") — nécessite de collecter ces données auprès des clients (Guy Hoquet en premier). À reprendre une fois cette donnée disponible.

**Rejeté :** grille de miniatures pure (jugée trop générique, ne capitalise pas sur la qualité de prod visée) ; case studies chiffrées d'entrée de jeu (bonne idée mais bloquée par l'absence de données clients aujourd'hui).

---

## 4. Autres sections (pas passées par la revue visuelle — proposition par défaut)

Ces sections gardent leur contenu et leur rôle actuels ; seul l'habillage visuel change pour suivre la nouvelle identité. Si tu veux les revoir avant l'implémentation, on peut les repasser par le compagnon visuel — sinon elles sont traitées comme des adaptations directes en Phase d'implémentation.

- **Nav** (`components/Nav.tsx`) : wordmark Unbounded + liens "Réalisations / Offres / Équipe / Contact", fond charcoal, sticky.
- **Équipe** (`components/Team.tsx`) : Valentin / Martin / Lucas conservés, réhabillés dans la nouvelle palette/typo.
- **FAQ, Contact, mentions légales, CGV, politique de confidentialité** : contenu conservé, réhabillage visuel uniquement.
- **BandeauLogo / CarrouselLogo** (logos clients) : réhabillage visuel, contenu à mettre à jour séparément (Phase 3 de la roadmap).

---

## 5. Exécution technique

Cette refonte se fait dans le même mouvement que les Phases 1 et 2 de la roadmap technique (SEO + modernisation stack), pour ne pas retravailler les mêmes composants deux fois.

- **`tailwind.config.ts`** : remplacer les couleurs `jaune`/`gris` par le nouveau système (`charcoal: "#0A0907"`, `or: "#C9A24B"`, `creme: "#F3EDE1"`). Envisager la migration vers Tailwind v4 (CSS-first, `@theme`) à cette occasion plutôt qu'après coup.
- **`app/layout.tsx`** : remplacer les imports `League_Spartan`/`localFont(Akira)` par `Unbounded` et `DM_Sans` via `next/font/google`. Corriger en parallèle le problème `next/head` + `metadata` identifié dans la roadmap (Phase 0).
- **`app/page.tsx`** : retrait de `"use client"` (Phase 1 de la roadmap) à mener en même temps que la réécriture visuelle de chaque section, composant par composant.
- **Composants impactés** : `Hero.tsx`, `Nav.tsx`, `Tarifs.tsx` (→ nouvelle section Offres, structure "phare + secondaires"), `Projets.tsx` (→ Showreel + liste), `Team.tsx`, `Footer.tsx`/`PiedPage.tsx`, `BandeauLogo.tsx`/`CarrouselLogo.tsx`.
- **Composants non listés** (`FaqSection.tsx`, `Process.tsx`, `Contact.tsx`, `VimeoPlayer.tsx`, `YoutubePlayer.tsx`, `components/ui/*`) : réhabillage visuel (couleurs/typo) uniquement, pas de changement de structure prévu dans ce spec.

---

## 6. Hors scope

- Le tarif définitif de l'offre Journée Contenu (dépend de Martin).
- La collecte des données de résultats clients pour les futures case studies.
- Les Phases 0/2/3 de la roadmap technique (corrections rapides, montée de version Next/React, contenu) — traitées comme un chantier parallèle, référencées ici mais pas détaillées.
- Accessibilité et performance (Core Web Vitals) — à auditer séparément, mentionné comme non-audité dans la roadmap initiale.
