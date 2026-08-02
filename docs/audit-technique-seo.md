# Audit technique & SEO — JFS Visual

**Date :** 2026-08-02
**Branche auditée :** `refonte-visuelle` (commit `c7b6e74`)
**Méthode :** vérifications exécutées sur le code réel (build, lint, `npm audit`, `npm outdated`, HTML servi par le serveur, console navigateur). Chaque constat ci-dessous a été vérifié, pas déduit.

---

## Verdict en une ligne

La base est saine (bundle léger, hiérarchie HTML correcte, rendu serveur fonctionnel depuis la refonte), mais **trois choses bloquent une mise en production sereine** : une vulnérabilité critique dans Next.js, l'absence totale de balises de partage social (rédhibitoire pour une boîte visuelle), et 4 pages qui partagent le même titre aux yeux de Google.

---

## 1. Sécurité — à traiter en premier

### 🔴 Vulnérabilité critique dans Next.js (impacte la production)

`npm audit` remonte **27 vulnérabilités : 1 critique, 18 hautes, 6 modérées, 2 faibles.**

La critique est dans **Next.js lui-même** : *"Next.js Allows a Denial of Service (DoS) with Server Actions"*. Le site étant déployé sur Vercel, elle concerne le site en ligne, pas seulement l'environnement de dev. Corrigée par une montée de version de Next.

**Nuance importante :** la grande majorité des 18 « hautes » sont dans l'outillage de développement (chaîne ESLint, `glob`, `cross-spawn`, `brace-expansion`…). Ces paquets ne sont **pas expédiés au navigateur** — leur risque réel est très faible pour un site vitrine. Ne pas se laisser impressionner par le chiffre brut : **c'est la ligne `next` qui compte.**

### 🟡 `.env` versionné dans git

Le fichier est suivi par git et contient l'ID Google Analytics. Ce n'est **pas une fuite** — un ID GA est public par nature (visible dans le code source de n'importe quel site). Mais le jour où une vraie clé API y est ajoutée (Vimeo, formulaire, CRM…), elle partirait sur GitHub sans avertissement. À convertir en `.env.local` (déjà couvert par le `.gitignore`) avant d'ajouter le moindre secret.

---

## 2. Dépendances — beaucoup de poids mort

### Retard de versions

| Paquet | Actuel | Dernier | Écart |
|---|---|---|---|
| `next` | 15.0.2 | 16.2.12 | **2 majeures** |
| `react` / `react-dom` | 18.3.1 | 19.2.8 | 1 majeure |
| `tailwindcss` | 3.4.11 | 4.3.3 | 1 majeure |
| `eslint-config-next` | **14.2.10** | 16.2.12 | **désynchronisé de `next`** |

Le cas `eslint-config-next` est le plus parlant : il est resté en 14.x quand le projet est passé à Next 15. Les règles de lint récentes (notamment celles liées aux Core Web Vitals) ne sont donc pas appliquées.

### ~10 dépendances totalement inutilisées

Vérifié par recherche d'import sur l'ensemble du code applicatif — **zéro utilisation** :

- `three`, `@react-three/fiber`, `@types/three` (moteur 3D, très lourd)
- `@tsparticles/engine`, `@tsparticles/react`, `@tsparticles/slim`
- `video.js`
- `uuid`
- `nextjs-google-analytics` (remplacé par `@next/third-parties`, jamais désinstallé)
- `gsap`, `@gsap/react` — devenus inutiles quand la section Services est passée en liste statique lors de la refonte

Et deux autres utilisées **uniquement par des composants orphelins** (voir §3) : `lenis`, `@tabler/icons-react`.

**À quel point c'est grave :** ces paquets ne sont pas importés, donc **ils ne partent pas dans le bundle envoyé au navigateur** — la performance du site n'en souffre pas. Le coût est ailleurs : temps d'installation, poids de `node_modules`, bruit dans `npm audit`, et friction à chaque montée de version. C'est de l'hygiène, pas une urgence.

---

## 3. Qualité de code

### 8 composants orphelins (jamais importés)

| Fichier | Origine |
|---|---|
| `components/ui/apple-cards-carousel.tsx` | remplacé par le nouveau carrousel lors de la refonte |
| `components/ui/text-generate-effect.tsx` | remplacé lors de la réécriture du Hero |
| `components/ui/direction-aware-hover.tsx` | remplacé lors de la réécriture de l'Équipe |
| `components/ui/Parralax.tsx` | orphelin **avant** la refonte (noter la faute dans le nom du fichier) |
| `components/ui/SmoothScroll.tsx` | orphelin avant la refonte (c'est lui qui tirait `lenis`) |
| `components/ui/flip-words.tsx` | orphelin avant la refonte |
| `components/ui/parallax-scroll.tsx` | orphelin avant la refonte |
| `components/ui/checkIcon.tsx` | orphelin avant la refonte |

Les 3 premiers sont le résidu normal de la refonte ; les 5 suivants traînaient déjà.

### Lint : il fonctionne, et il est quasi propre

L'erreur `Failed to load config "next/core-web-vitals"` visible à chaque build **n'est pas un bug du projet** — c'est un artefact de mon environnement de travail (le worktree git est imbriqué dans le repo, et ESLint remontait l'arborescence jusqu'à une copie du projet sans `node_modules`). Ajout de `"root": true` dans `.eslintrc.json` pour couper cette remontée.

Une fois corrigé, le lint tourne et ne remonte **qu'un seul avertissement sur tout le projet** :

```
./components/ui/carousel-07.tsx:205
Using `<img>` could result in slower LCP and higher bandwidth.
Consider using `<Image />` from `next/image`.
```

C'est du code que j'ai introduit avec le nouveau carrousel — à corriger.

### Petites scories de configuration

- `tsconfig.json` : `"video.d.ts"` répété **4 fois** dans `include` (sans effet, mais révélateur d'un copier-coller)
- `next.config.mjs` : `images.domains` est déprécié depuis Next 14 → remplacer par `images.remotePatterns`
- `next.config.mjs` : le hack webpack `file-loader` pour servir des `.mp4/.webm` ne sert plus à rien — toutes les vidéos passent par Vimeo/YouTube

---

## 4. SEO — le plus gros chantier

### Ce qui est déjà bon ✅

- **Rendu côté serveur fonctionnel** — le contenu est dans le HTML initial, indexable sans exécution de JavaScript (c'était le gros défaut corrigé pendant la refonte)
- **Un seul `<h1>`**, hiérarchie `h1 → h2 → h3` cohérente sur toute la page
- `lang="fr"` correctement déclaré
- Meta description à jour et alignée sur le positionnement immobilier
- Favicons complets (16/32/48/64px)

### Ce qui manque ❌

**Aucune balise Open Graph ni Twitter Card.**
Vérifié dans le HTML réellement servi : rien. Concrètement, quand quelqu'un partage jfsvisual.fr sur LinkedIn, WhatsApp ou Slack, **le lien apparaît sans image, sans titre formaté**. Pour une entreprise dont le métier est l'image, c'est le point le plus dommageable de tout cet audit — et l'un des plus rapides à corriger.

**Les 4 pages partagent le même titre et la même description.**
`/`, `/contact`, `/cgv`, `/mentionsLegales` et `/politiqueDeConfidentialite` héritent toutes du `metadata` du layout racine. Google voit cinq pages intitulées « JFS Visual » avec le même descriptif — c'est du contenu dupliqué, qui dilue le référencement.

**Le titre est trop générique.**
`<title>JFS Visual</title>` ne contient ni métier, ni localisation. Quelqu'un qui cherche « vidéaste immobilier Caen » n'a aucune chance de tomber dessus. Piste : `JFS Visual — Production vidéo pour agences immobilières | Normandie`.

**Pas de `sitemap.xml`, pas de `robots.txt`.**
Next.js App Router les génère nativement (`app/sitemap.ts`, `app/robots.ts`). Absents tous les deux.

**Pas de données structurées (JSON-LD).**
Aucun schéma `LocalBusiness` / `Organization`. C'est précisément ce qui alimente le SEO local (le « près de chez moi ») et les résultats enrichis de Google. Pour une boîte ancrée en Normandie qui cible des agences par ville, c'est un manque stratégique.

**Pas de `metadataBase` ni d'URL canonique.**
Sans `metadataBase`, les futures images Open Graph en chemin relatif ne se résoudront pas correctement.

---

## 5. Performance

**Le hero dépend entièrement d'un tiers, sans filet.**
La vidéo de fond est une iframe Vimeo en autoplay, **sans image de secours (`poster`)**. Tant que le lecteur Vimeo n'a pas chargé, le premier écran est **noir**. C'est le contenu le plus visible du site, et il est à la merci de la latence d'un service externe.

**Aucun `preconnect` vers `player.vimeo.com`.**
Le navigateur paie la résolution DNS + la négociation TLS au dernier moment, alors qu'une ligne dans le layout permettrait de l'anticiper.

**`Team.tsx` : `fill` sans attribut `sizes`.**
Next.js ne sait pas quelle largeur l'image occupera et sert donc la variante la plus large quelle que soit la taille de l'écran. Trois portraits en pleine hauteur → gaspillage de bande passante notable sur mobile.

**Le bundle, lui, est sain :** 20,2 kB pour la page d'accueil, 166 kB de JS au premier chargement. C'est bon, rien à signaler.

---

## 6. Accessibilité

Le lint `jsx-a11y` ne remonte rien, mais un point m'a échappé au lint et mérite attention :

**`alt=""` sur les galeries photo** (`components/ui/gallery.tsx`, `gallery-cs.tsx`).
Un alt vide indique à un lecteur d'écran « image purement décorative, ignore-la ». Or ce sont les photos de vos réalisations Cotral Lab et Combat Stress — du **contenu**, pas de la décoration. Elles devraient être décrites (bénéfice accessibilité **et** SEO images).

---

## 7. Erreur d'hydratation React (dev)

Une erreur apparaît dans la console en développement : un décalage sur `<body style={{}}>` entre le rendu serveur et le rendu client.

**Ce que j'ai vérifié :** aucun code applicatif ne manipule `document.body.style`. Le seul fichier qui le faisait (`apple-cards-carousel.tsx`) est désormais orphelin, donc non inclus dans le bundle — et l'erreur persiste malgré tout.

**Conclusion :** la cause est extérieure au projet (extension de navigateur, ou artefact de l'environnement de prévisualisation). React n'émet cet avertissement qu'en développement — il n'apparaît pas en production. **À reconfirmer dans un navigateur propre, sans extension, avant de s'en inquiéter.**

---

## Plan d'action priorisé

### P1 — Avant toute mise en production
1. **Monter Next.js de version** → corrige la vulnérabilité critique (DoS)
2. **Ajouter les balises Open Graph + Twitter Card** avec une image dédiée 1200×630 → impact business immédiat sur chaque partage
3. **Donner un `metadata` propre à chaque page** (`/contact`, `/cgv`, `/mentionsLegales`, `/politiqueDeConfidentialite`) et enrichir le titre de la page d'accueil

### P2 — Dans la foulée
4. `app/sitemap.ts` + `app/robots.ts`
5. Données structurées JSON-LD `LocalBusiness` (nom, adresse, zone desservie, réseaux) → SEO local
6. Image `poster` sur le hero + `preconnect` vers Vimeo → plus de premier écran noir
7. `sizes` sur les portraits de l'Équipe ; `<img>` → `next/image` dans le carrousel
8. Alt descriptifs sur les galeries photo

### P3 — Hygiène, sans urgence
9. Désinstaller les ~10 dépendances inutilisées + supprimer les 8 composants orphelins
10. Aligner `eslint-config-next` sur la version de Next
11. `images.remotePatterns` au lieu de `images.domains` ; supprimer le hack webpack `file-loader`
12. Nettoyer le `tsconfig.json` (`video.d.ts` × 4)
13. Migrations React 19 et Tailwind 4 (chantiers à part entière, à planifier)

---

## Ce que je n'ai pas pu mesurer

- **Core Web Vitals réels** (LCP, INP, CLS) — nécessitent le site en ligne, pas un serveur local. Les données Vercel Speed Insights, déjà installé, doivent contenir l'historique.
- **Positionnement actuel sur Google** — demande un accès à la Search Console.
- **Comportement réel du hero sur connexion lente / mobile** — à tester sur un vrai appareil.
