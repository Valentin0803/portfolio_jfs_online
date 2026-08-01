# Refonte visuelle JFS Visual — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Appliquer la refonte visuelle validée (spec `docs/superpowers/specs/2026-08-01-refonte-visuelle-design.md`) au site `portfolio_jfs_online` : nouvelle identité (charcoal/or/crème, Unbounded/DM Sans), nouvelle section Offres (Atelier du Réel en avant), Showreel sur la page Réalisations, et conversion de la page d'accueil en Server Component (SEO).

**Architecture:** Chaque tâche touche un ou plusieurs fichiers Next.js App Router existants. Pas de nouvelle dépendance requise (Unbounded/DM Sans via `next/font/google`, déjà utilisé pour League Spartan). Le repo n'a pas de suite de tests automatisés — chaque tâche se vérifie manuellement via `npm run dev` (visuel) ou `npm run build` (compilation), pas de cycle TDD classique.

**Tech Stack:** Next.js 15 (App Router), React 18, TypeScript, Tailwind v3, `next/font/google`.

## Global Constraints

- Palette : charcoal `#0A0907`, or `#C9A24B`, crème `#F3EDE1` (spec §1) — exposés comme `charcoal`/`or`/`creme` dans `tailwind.config.ts`.
- Typographie : `Unbounded` 700/800 pour titres/wordmark, `DM Sans` 400–700 pour corps/UI (spec §1).
- Le prix de l'offre "Journée Contenu" reste affiché `"À partir de ~800€"` — jamais un chiffre ferme tant que le tarif n'est pas validé (spec §2).
- **Ce repo est le repo de production : ne pas `git push`, ne pas déployer.** Tout le travail de ce plan reste local (commits locaux uniquement) jusqu'à nouvel ordre explicite de l'utilisateur.
- Le site sera visuellement incohérent (mélange ancien/nouveau design) entre certaines tâches — c'est attendu, ne pas s'inquiéter d'un rendu à moitié réhabillé avant la fin du plan.
- Aucune tâche de ce plan ne modifie `app/contact/page.tsx`, `app/cgv/*`, `app/mentionsLegales/*`, `app/politiqueDeConfidentialite/*` — hors scope de la spec (contenu légal, pas de reskin prévu dans cette itération).

---

## Task 1: Design tokens & primitives (fondation)

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`
- Modify: `components/ui/card.tsx`

**Interfaces:**
- Produces: classes Tailwind `bg-charcoal`/`text-charcoal`/`border-charcoal`, `bg-or`/`text-or`/`border-or`, `bg-creme`/`text-creme`/`border-creme`, `font-unbounded`, `font-dmSans` — utilisées par toutes les tâches suivantes.

- [ ] **Step 1: Remplacer les couleurs dans `tailwind.config.ts`**

```ts
// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: "#0A0907",
        or: "#C9A24B",
        creme: "#F3EDE1",
      },
      fontFamily: {
        unbounded: ["var(--font-unbounded)"],
        dmSans: ["var(--font-dmSans)"],
      },
      keyframes: {
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        scroll: "scroll 50s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
```

Les clés `jaune`, `gris`, `akira`, `leagueSpartan` disparaissent volontairement : tant que les tâches suivantes n'ont pas remplacé leurs usages, les classes correspondantes ne généreront simplement plus de style (pas d'erreur de build, juste un rendu non stylé sur les fichiers pas encore traités — normal jusqu'à la Task 8).

- [ ] **Step 2: Remplacer les polices et nettoyer `next/head` dans `app/layout.tsx`**

```tsx
// app/layout.tsx
import { Unbounded, DM_Sans } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "@next/third-parties/google";

const unbounded = Unbounded({
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  variable: "--font-unbounded",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dmSans",
});

export const metadata = {
  title: "JFS Visual",
  description:
    "De la captation d’événement sur terre ou dans les airs, à la présentation de votre entreprise en passant par la photographie événementielle nous saurons réaliser votre projet.",
  icons: {
    icon: [
      {
        rel: "icon",
        url: "/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        rel: "icon",
        url: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        rel: "icon",
        url: "/favicon-48x48.png",
        sizes: "48x48",
        type: "image/png",
      },
      {
        rel: "icon",
        url: "/favicon-64x64.png",
        sizes: "64x64",
        type: "image/png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${unbounded.variable} ${dmSans.variable} dark`}
      suppressHydrationWarning
    >
      <body>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID!} />
        <SpeedInsights />
        <Analytics />
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
```

Deux corrections bundlées ici (Phase 0 de la roadmap technique, même fichier donc pas de sens de les traiter à part) :
- `next/head` (`<Head>`) supprimé — redondant avec `export const metadata`, qui gère déjà `<title>`, la description et les favicons.
- `GoogleAnalytics gaId` utilise maintenant `process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` au lieu de la valeur codée en dur `"G-BYDD8ELGMN"`. Vérifie que `.env` contient bien cette variable avec la bonne valeur avant de tester (elle y était déjà d'après l'audit initial).

- [ ] **Step 3: Mettre à jour `app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: #0a0907;
  --foreground: #f3ede1;
}
@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0907;
    --foreground: #f3ede1;
  }
}

html {
  scroll-behavior: smooth;
}

@layer utilities {
  .mask-fade {
    mask-image: linear-gradient(
      to right,
      transparent 10%,
      black 25%,
      black 75%,
      transparent 90%
    );
  }
}

body {
  color: var(--foreground);
  background: var(--background);
  font-family: var(--font-dmSans), Arial, Helvetica, sans-serif;
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}

.spanMask {
  color: #0a0907;
  background-color: #c9a24b;
  width: 100%;
  height: 100%;

  position: absolute;
  clip-path: polygon(0 50%, 100% 50%, 100% 50%, 0 50%);
  transform-origin: center;
  transition: all cubic-bezier(0.1, 0.5, 0.5, 1) 0.4s;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.titreService {
  color: rgba(255, 255, 255, 0.2);
  background: linear-gradient(to right, #ffffff, #ffffff) no-repeat;
  -webkit-background-clip: text;
  background-clip: text;
  background-size: 0%;
  transition: background-size cubic-bezier(0.1, 0.5, 0.5, 1) 0.5s;
}

.titreService:hover > .spanMask {
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
}
```

Changements : `--background`/`--foreground` alignés sur charcoal/crème, `.spanMask` recoloré (était `#ffee53`/`#0d0d0d`), ajout de `scroll-behavior: smooth` (utilisé par les nouveaux liens d'ancrage sans JS de la Task 4), `body` utilise `--font-dmSans` par défaut. La classe `.leagueSpartan` (utilitaire CSS, différente de la classe Tailwind `font-leagueSpartan`) est supprimée car plus référencée nulle part après ce plan — vérifiée par `grep -rn "leagueSpartan\"" components app` en Task 8.

- [ ] **Step 4: Teinter `components/ui/card.tsx` (fond neutre → charcoal)**

```tsx
// components/ui/card.tsx:13 — dans Card, remplacer :
"max-w-sm w-full mx-auto p-8 rounded-xl border border-[rgba(255,255,255,0.10)] dark:bg-[rgba(40,40,40,0.70)] bg-gray-100 shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset] group",
// par :
"max-w-sm w-full mx-auto p-8 rounded-xl border border-[rgba(255,255,255,0.10)] dark:bg-[rgba(20,18,14,0.7)] bg-gray-100 shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset] group",
```

Seule cette ligne change (`CardTitle`, `CardDescription`, `CardSkeletonContainer`, `Container` restent identiques — couleurs déjà neutres, pas liées à l'ancien token `jaune`/`gris`).

- [ ] **Step 5: Vérification manuelle**

```bash
npm run dev
```

Ouvre `http://localhost:3000` — le fond doit être charcoal (pas de changement visuel flagrant attendu ailleurs, les composants ne sont pas encore reskinés). Vérifie dans la console navigateur qu'il n'y a pas d'erreur liée aux fonts ou à `process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID`.

- [ ] **Step 6: Commit**

```bash
git add tailwind.config.ts app/layout.tsx app/globals.css components/ui/card.tsx
git commit -m "feat: nouveaux design tokens (charcoal/or/creme, Unbounded/DM Sans)"
```

---

## Task 2: Section Offres (nouveau composant, remplace le Tarifs.tsx orphelin)

**Découverte de l'audit :** `components/Tarifs.tsx` existe mais n'est importé nulle part dans `app/page.tsx` — c'est du code mort, le site actuel n'affiche aucune tarification. On le supprime et on le remplace par un vrai composant Offres branché sur la page.

**Files:**
- Create: `components/Offres.tsx`
- Delete: `components/Tarifs.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `Card`, `CardTitle`, `CardDescription` de `components/ui/card.tsx` (Task 1).
- Produces: section `id="Offres"`, consommée par le lien de nav ajouté en Task 3.

- [ ] **Step 1: Supprimer le composant orphelin**

```bash
git rm components/Tarifs.tsx
```

- [ ] **Step 2: Créer `components/Offres.tsx`**

```tsx
import Link from "next/link";
import { Card, CardTitle, CardDescription } from "./ui/card";

export const Offres = () => {
  return (
    <section id="Offres" className="my-10 lg:my-24">
      <div className="mx-10 lg:mx-36 mb-10">
        <h2 className="font-unbounded font-bold text-or text-3xl mb-4">
          Nos offres
        </h2>
        <p className="font-dmSans text-creme/80 text-lg max-w-2xl">
          De l&apos;accompagnement continu pour agences immobilières aux
          prestations ponctuelles, une offre pour chaque besoin.
        </p>
      </div>

      <div className="grid lg:grid-cols-[1.6fr_1fr] gap-6 mx-10 lg:mx-36">
        <div className="rounded-2xl border border-or/40 bg-gradient-to-br from-or/10 to-white/[0.02] p-8 flex flex-col">
          <span className="inline-block w-fit px-3 py-1 rounded-full bg-or text-charcoal font-dmSans font-bold text-xs uppercase tracking-widest mb-4">
            Offre phare
          </span>
          <h3 className="font-unbounded font-bold text-creme text-2xl mb-3">
            L&apos;Atelier du Réel
          </h3>
          <p className="font-dmSans text-creme/80 text-base mb-6">
            Contenu vidéo continu pour agences immobilières, sur 6 mois :
            scripts, tournage, drone, montage, gestion administrative des
            vols incluse, suivi collaboratif via Notion et WhatsApp.
          </p>
          <div className="font-unbounded font-bold text-or text-2xl mt-auto mb-6">
            2 100€ HT/mois
          </div>
          <Link href="#Contact" className="w-fit">
            <button className="px-8 py-3 rounded-full font-dmSans font-bold text-sm uppercase tracking-widest bg-or text-charcoal border border-or hover:bg-charcoal hover:text-or transition-colors duration-300">
              Prendre rendez-vous
            </button>
          </Link>
        </div>

        <div className="flex flex-col gap-6">
          <Card className="dark:bg-[rgba(20,18,14,0.7)] border-white/10">
            <CardTitle className="font-dmSans font-bold text-creme text-base bg-white/5">
              Journée Contenu
            </CardTitle>
            <CardDescription className="text-creme/70">
              1h de préparation/trajet, 2h de tournage, 5h de post-production
              : 5 contenus courts livrés. Ouvert à tous les secteurs.
            </CardDescription>
            <div className="font-unbounded font-bold text-or text-lg mt-4">
              À partir de ~800€
            </div>
          </Card>
          <Card className="dark:bg-[rgba(20,18,14,0.7)] border-white/10">
            <CardTitle className="font-dmSans font-bold text-creme text-base bg-white/5">
              Sur mesure
            </CardTitle>
            <CardDescription className="text-creme/70">
              Vidéo d&apos;entreprise, événementiel, drone à la demande.
              Chaque projet fait l&apos;objet d&apos;un devis dédié.
            </CardDescription>
            <div className="font-unbounded font-bold text-or text-lg mt-4">
              Devis
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Offres;
```

Le bouton "Prendre rendez-vous" est un lien d'ancrage simple (`#Contact`, pas de `onClick`/JS) — le composant reste un Server Component, cohérent avec l'objectif SEO de la Task 9.

- [ ] **Step 3: Brancher `Offres` dans `app/page.tsx`**

```tsx
// app/page.tsx
"use client";
import FaqSection from "@/components/FaqSection";
import Hero from "@/components/Hero";
import NosServicesSection from "@/components/NosServicesSection";
import { Team } from "@/components/Team";
import { Process } from "@/components/Process";
import { Contact } from "@/components/Contact";
import { PiedPage } from "@/components/PiedPage";
import { Projects } from "@/components/Projets";
import { BandeauLogo } from "@/components/BandeauLogo";
import { Offres } from "@/components/Offres";

export default function Home() {
  return (
    <div>
      <Hero />
      <BandeauLogo />
      <Offres />
      <Projects />
      <NosServicesSection />
      <Process />
      <Team />
      <FaqSection />
      <Contact />
      <PiedPage />
    </div>
  );
}
```

(`"use client"` reste en tête pour l'instant — retiré en Task 9.)

- [ ] **Step 4: Vérification manuelle**

```bash
npm run dev
```

Va sur `http://localhost:3000#Offres` (ou scrolle) : la section "Nos offres" doit s'afficher avec la carte Atelier du Réel mise en avant et les 2 cartes secondaires. Clique "Prendre rendez-vous" → doit scroller jusqu'à `#Contact`.

- [ ] **Step 5: Commit**

```bash
git add components/Offres.tsx app/page.tsx
git commit -m "feat: nouvelle section Offres (Atelier du Réel + Journée Contenu + Sur Mesure), suppression de Tarifs.tsx (code mort)"
```

---

## Task 3: Nav.tsx — reskin + lien vers Offres

**Files:**
- Modify: `components/Nav.tsx`

**Note :** le logo actuel est un pictogramme SVG (pas un wordmark texte) — les mockups du brainstorming visuel montraient un wordmark "JFS VISUAL" en Unbounded, mais ce fichier n'avait pas été vu à ce moment-là. Ce plan recolore le pictogramme existant sans le remplacer par du texte ; ajouter un wordmark texte à côté est une option à valider séparément avec Valentin si souhaité — non fait ici pour ne pas décider à sa place.

- [ ] **Step 1: Remplacer `components/Nav.tsx`**

```tsx
"use client";
import Link from "next/link";

function Nav() {
  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    sectionId: string
  ) => {
    e.preventDefault();
    document.querySelector(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <header className="nav flex fixed items-start z-30">
      <div className="logo ml-5 mt-10 lg:mt-10 lg:ml-10 hover:size-[90%] ">
        <Link href="/" className="">
          <svg
            width="111"
            height="61"
            viewBox="0 0 111 81"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-14 h-12 fill-white duration-300 hover:fill-or hover:size-16"
          >
            <path d="M1.00348 6.08414C1.00348 9.44432 3.6871 12.1683 6.99752 12.1683H38.6845C41.9949 12.1683 44.6786 14.8922 44.6786 18.2524V60.2573C44.6786 62.4592 43.5075 64.4895 41.6148 65.5653C38.7706 67.1817 33.4457 68.9247 23.7059 68.9247C11.0495 68.9247 1 63.8857 1 56.7531L1.00286 72.0231C1.00332 74.4583 2.43484 76.6557 4.63955 77.6161C8.2351 79.1823 14.9851 81 26.9491 81C52.6171 81 56.5396 68.775 56.9085 64.1229C56.9204 63.9732 57.002 57.867 57 57.7168L56.2038 4.96349C56.1672 2.26396 54.0036 0.0935371 51.3438 0.088257L7.00925 1.19264e-05C3.69425 -0.00657883 1.00348 2.71932 1.00348 6.08414Z" />
            <path d="M105.48 5.61664e-05H62.5203C60.0059 5.61664e-05 57.9747 2.08661 58.0002 4.64338L58.7073 76.45C58.7324 78.9703 60.7488 81 63.2274 81H65.4799C68.0086 81 70.0455 78.8907 69.9995 76.3197L69.5044 47.6806C69.4588 45.1318 71.4616 43.032 73.9682 43.0006L79.5418 42.8894C82.0164 42.8584 84.0064 40.8097 84.0064 38.2931V35.1661C84.0064 32.6274 81.9825 30.5694 79.486 30.5694H74.0677C71.5733 30.5694 69.5503 28.5148 69.5473 25.9783L69.5374 17.6092C69.5344 15.0684 71.5591 13.007 74.0577 13.007H105.48C107.976 13.007 110 10.949 110 8.41032V4.59668C110 2.05801 107.976 5.61664e-05 105.48 5.61664e-05Z" />
            <path d="M43 43.6511C42.6244 44.193 42.2485 44.7279 41.8706 45.2546C41.8441 45.2915 41.8186 45.3293 41.7943 45.3676C39.7578 48.5752 37.1352 50.6808 35.0891 51.9163C33.4539 52.9142 30.7799 53.4102 27.0863 53.4102C23.3927 53.4102 20.1128 52.5407 17.2367 50.7958C13.9568 48.806 12.312 45.1938 12.312 39.9652C12.312 35.2385 14.1588 31.7488 17.8523 29.5079C20.5921 27.8507 23.8922 26.8815 27.764 26.6038C29.1176 26.5067 30.1643 25.3936 30.1643 24.0568V20.5559C30.1643 19.0921 28.9175 17.9226 27.4337 18.004C20.7803 18.3689 14.919 20.0886 9.84957 23.1589C3.2896 27.1446 0 32.9977 0 40.7121C0 47.9365 2.87606 53.2876 8.61837 56.7714C14.3703 60.2611 21.1419 62 28.9331 62C34.7041 62 39.393 61.0153 43 59.046L43 43.6511Z" />
            <path d="M101.722 20.1852C95.9529 16.7304 88.9463 15 80.6931 15C77.1978 15 73.968 15.4347 71 16.3023V27.9616C71.9639 27.0602 72.9267 26.32 73.8895 25.7407C76.3636 24.2592 79.4561 23.5185 83.1672 23.5185C86.4723 23.5185 89.7679 24.5081 93.0633 26.4814C97.19 28.9525 99.2484 32.7777 99.2484 37.9628C99.2484 43.6458 96.9869 47.8413 92.4448 50.5554C89.5348 52.3031 85.012 53.2746 78.8833 53.4779C77.4787 53.5245 76.3636 54.6434 76.3636 56.0098V59.4661C76.3636 60.8965 77.5813 62.0413 79.052 61.9989C88.0476 61.7394 94.9883 60.1486 99.8669 57.222C107.289 52.7776 111 46.4813 111 38.3332C111 29.9421 107.907 23.8889 101.722 20.1852Z" />
          </svg>
        </Link>
      </div>
      <div className="">
        <ul className="font-dmSans flex flex-col fixed  text-sm lg:right-10 md:right-10 right-5 top-5 mt-5">
          <li>
            <a
              href="#APropos"
              onClick={(e) => handleScroll(e, "#APropos")}
              className="hover:text-or duration-300"
            >
              À PROPOS
            </a>
          </li>
          <li>
            <a
              href="#Offres"
              onClick={(e) => handleScroll(e, "#Offres")}
              className="hover:text-or duration-300"
            >
              OFFRES
            </a>
          </li>
          <li>
            <a
              href="#NotreTravail"
              onClick={(e) => handleScroll(e, "#NotreTravail")}
              className="hover:text-or duration-300"
            >
              NOTRE TRAVAIL
            </a>
          </li>
          <li>
            <a
              href="#NosServices"
              onClick={(e) => handleScroll(e, "#NosServices")}
              className="hover:text-or duration-300"
            >
              NOS SERVICES
            </a>
          </li>

          <li>
            <a
              href="#Contact"
              onClick={(e) => handleScroll(e, "#Contact")}
              className="hover:text-or duration-300"
            >
              CONTACT
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Nav;
```

- [ ] **Step 2: Vérification manuelle**

`npm run dev` — le lien "OFFRES" doit apparaître dans la nav et scroller vers la section créée en Task 2. Les liens doivent passer en or (pas jaune) au survol.

- [ ] **Step 3: Commit**

```bash
git add components/Nav.tsx
git commit -m "feat: reskin Nav (charcoal/or) + lien vers la section Offres"
```

---

## Task 4: Hero.tsx — reskin + nouveau message

**Files:**
- Modify: `components/Hero.tsx`

Le message valide pendant le brainstorming visuel (comparatif A/B) remplace le texte générique actuel. Le bouton "Prenez rendez-vous" (lien externe zcal) est remplacé par un lien d'ancrage vers `#Offres` — le zcal reste accessible depuis la section Contact, on évite juste de diluer le CTA du hero. Reste un Server Component (aucun `onClick`/hook ajouté).

- [ ] **Step 1: Remplacer `components/Hero.tsx`**

```tsx
import { TextGenerateEffect } from "./ui/text-generate-effect";
import Link from "next/link";
import VimeoPlayer from "./VimeoPlayer";

export const Hero = () => {
  const words =
    "Production vidéo premium pour agences immobilières — tournage, montage, drone, gestion administrative incluse. Niveau de production au-dessus du standard français.";
  return (
    <section
      id="APropos"
      className="gap-10 px-5 pb-10 pt-44 lg:pt-20 lg:px-28 lg:mb-24 "
    >
      <div className="content-center items-center px-5 my-auto lg:mx-14 sm:mx-1 lg:order-1">
        <div className="text-center">
          <div className="pb-10 h-3/4">
            <h1 className="font-unbounded font-extrabold text-2xl lg:text-4xl tracking-[.02em] text-creme">
              Du contenu vidéo qui <span className="text-or">vend vos biens</span> avant
              la visite.
            </h1>
            <div>
              <TextGenerateEffect
                words={words}
                className=" text-3xl pt-5 font-dmSans font-thin text-creme"
              />
            </div>
          </div>
          <div className="w-2/3 mx-auto">
            <VimeoPlayer
              videoId="1062779681" // Remplace par l'ID de ta vidéo
              autoplay={true}
              muted={false}
              controls={true}
              loop={true}
              className="rounded-lg"
            />
          </div>
          <div className="pt-12">
            <Link href="#Offres">
              <button className="px-12 py-4 rounded-full bg-or font-dmSans font-bold border-or border text-charcoal tracking-widest uppercase transform hover:scale-105 hover:bg-charcoal hover:border-or hover:text-or transition-colors duration-500">
                Découvrir l&apos;Atelier du Réel
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Hero;
```

- [ ] **Step 2: Vérification manuelle**

`npm run dev` — vérifie le nouveau titre, la couleur or sur "vend vos biens", et que le bouton scrolle vers `#Offres`.

- [ ] **Step 3: Commit**

```bash
git add components/Hero.tsx
git commit -m "feat: reskin Hero + nouveau message (positionnement immo premium)"
```

---

## Task 5: Projets.tsx — Showreel + reskin

**Files:**
- Modify: `components/Projets.tsx`

Ajoute un bloc showreel en tête de section (vidéo en boucle, muette), au-dessus du carrousel de projets existant — direction validée pendant le brainstorming visuel. Le showreel réutilise temporairement l'ID vidéo du Hero ; il faudra le remplacer par un montage dédié (pas un sujet de code, à traiter côté production).

- [ ] **Step 1: Modifier `components/Projets.tsx`**

```tsx
// components/Projets.tsx:1-21 — remplacer par :
import { Card, Carousel } from "@/components/ui/apple-cards-carousel";
import { Gallery } from "./ui/gallery";
import { GalleryCS } from "./ui/gallery-cs";
import VimeoPlayer from "./VimeoPlayer";
import YouTubePlayer from "./YoutubePlayer";
import Image from "next/image";
import photoStadeRenACar from "@/public/projects/RENT_A_CAR/photostade.png";

export const Projects = () => {
  const cards = dataCarousel.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));
  return (
    <div id="NotreTravail" className="w-full h-full py-10 ">
      <h2 className="font-dmSans font-bold top-0 text-or text-3xl ml-10 mb-5 lg:ml-36">
        Nos Projets
      </h2>
      <div className="mx-10 mb-10 lg:mx-36 rounded-xl overflow-hidden">
        <VimeoPlayer
          videoId="1062779681" // TODO Valentin : remplacer par l'ID du showreel dédié une fois monté
          autoplay={true}
          muted={true}
          controls={false}
          loop={true}
          className="rounded-xl"
        />
      </div>
      <Carousel items={cards} />
    </div>
  );
};
```

Le reste du fichier (`const dataCarousel = [...]`, lignes 23–140 dans la version actuelle) ne change pas — copie-le tel quel après ce bloc.

- [ ] **Step 2: Vérification manuelle**

`npm run dev` — la section "Nos Projets" doit maintenant afficher un showreel en boucle au-dessus du carrousel existant.

- [ ] **Step 3: Commit**

```bash
git add components/Projets.tsx
git commit -m "feat: ajout du showreel en tête de la section Réalisations + reskin"
```

---

## Task 6: Team, Footer, PiedPage, BandeauLogo — reskin

**Files:**
- Modify: `components/Team.tsx`
- Modify: `components/Footer.tsx`
- Modify: `components/PiedPage.tsx`
- Modify: `components/BandeauLogo.tsx`

(`components/CarrouselLogo.tsx` ne contient aucune référence à l'ancien design system — aucun changement nécessaire.)

- [ ] **Step 1: Remplacer `components/Team.tsx`**

```tsx
import Lucas from "@/public/team/Lucas.jpg";
import Martin from "@/public/team/Martin.jpg";
import Valentin from "@/public/team/Valentin.jpg";
import { DirectionAwareHover } from "./ui/direction-aware-hover";

export const Team = () => {
  return (
    <div className="mt-10 lg:my-20">
      <h2 className="font-unbounded font-bold text-or text-3xl ml-10 pb-10 lg:mx-32 lg:my-24 ">
        Notre équipe
      </h2>
      <div className="flex justify-center space-x-3">
        <DirectionAwareHover
          imageUrl={Valentin}
          className="w-auto h-96 lg:h-[900px]"
        >
          <p className="font-bold text-4xl">CHARLOT Valentin</p>
          <p className="font-dmSans text-or text-xl tracking-[.25em]">
            Vidéaste & pilote de drone
          </p>
        </DirectionAwareHover>
        <DirectionAwareHover
          imageUrl={Martin}
          className="w-auto h-96 lg:h-[900px]"
        >
          <p className="font-bold text-4xl">RIBOT Martin</p>
          <p className="font-dmSans text-or text-xl tracking-[.25em]">
            Chargé de production
          </p>

          <p className="font-dmSans text-creme text-l tracking-[.25em]">
            tel : 07.81.10.37.21
          </p>
        </DirectionAwareHover>
        <DirectionAwareHover
          imageUrl={Lucas}
          className="w-auto h-96 lg:h-[900px] max-h-[1000px]"
        >
          <p className="font-bold text-4xl">MOREL Lucas</p>
          <p className="font-dmSans text-or text-xl tracking-[.25em]">
            Vidéaste & pilote de drone
          </p>
        </DirectionAwareHover>
      </div>
    </div>
  );
};
```

- [ ] **Step 2: Remplacer `components/Footer.tsx`**

```tsx
import Link from "next/link";
import Magnetic from "./Magnetic";

function Footer() {
  return (
    <footer className="z-50 fixed bottom-10 left-10 h-fit justify-between cursor-pointer hidden lg:grid">
      <div className="">
        <Magnetic>
          <Link href="https://www.instagram.com/jfsvisual/" target="_blank">
            <svg
              className="m-5 fill-white hover:fill-or hover:transition hover:duration-200"
              width="23"
              height="23"
              viewBox="0 0 28 28"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 4C0 1.79083 1.79086 0 4 0H24C26.2091 0 28 1.79083 28 4V24C28 26.2092 26.2091 28 24 28H4C1.79086 28 0 26.2092 0 24V4ZM21.875 14C21.875 18.3492 18.3492 21.875 14 21.875C9.65076 21.875 6.125 18.3492 6.125 14C6.125 9.65076 9.65076 6.125 14 6.125C18.3492 6.125 21.875 9.65076 21.875 14ZM23.5 7C24.8807 7 26 5.88074 26 4.5C26 3.11926 24.8807 2 23.5 2C22.1193 2 21 3.11926 21 4.5C21 5.88074 22.1193 7 23.5 7Z"
              />
            </svg>
          </Link>
        </Magnetic>
      </div>
      <div>
        <Magnetic>
          <Link
            href="https://www.linkedin.com/company/jfs-visual/posts/?feedView=all&viewAsMember=true"
            target="_blank"
          >
            <svg
              className="m-5 fill-white hover:fill-or hover:transition hover:duration-200"
              width="23"
              height="23"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0.4 20V7.2H3.5125V20H0.4ZM1.9625 4.575C1.62083 4.575 1.30417 4.49167 1.0125 4.325C0.729167 4.15 0.5 3.92083 0.325 3.6375C0.158333 3.34583 0.0750001 3.025 0.0750001 2.675C0.0750001 2.33333 0.158333 2.02083 0.325 1.7375C0.5 1.45417 0.729167 1.22917 1.0125 1.0625C1.30417 0.887499 1.625 0.8 1.9625 0.8C2.3125 0.8 2.625 0.887499 2.9 1.0625C3.18333 1.22917 3.40833 1.45417 3.575 1.7375C3.75 2.02083 3.8375 2.33333 3.8375 2.675C3.8375 3.025 3.75 3.34583 3.575 3.6375C3.40833 3.92083 3.18333 4.15 2.9 4.325C2.625 4.49167 2.3125 4.575 1.9625 4.575ZM7.34707 20V7.2H10.4596V8.7375C10.9012 8.17083 11.4887 7.70833 12.2221 7.35C12.9637 6.98333 13.8096 6.8 14.7596 6.8C15.7429 6.8 16.6012 7.0125 17.3346 7.4375C18.0762 7.85417 18.6512 8.44583 19.0596 9.2125C19.4679 9.97917 19.6721 10.8875 19.6721 11.9375V20H16.5596V12.5875C16.5596 11.5208 16.2929 10.7 15.7596 10.125C15.2346 9.54167 14.5054 9.25 13.5721 9.25C12.9304 9.25 12.3762 9.38333 11.9096 9.65C11.4429 9.90833 11.0846 10.2583 10.8346 10.7C10.5846 11.1333 10.4596 11.6167 10.4596 12.15V20H7.34707Z" />
            </svg>
          </Link>
        </Magnetic>
      </div>
      <div>
        <Magnetic>
          <Link
            target="_blank"
            href="https://www.tiktok.com/@jfs_visual?is_from_webapp=1&sender_device=pc"
          >
            <svg
              className="m-5 fill-white hover:fill-or hover:transition hover:duration-200"
              width="22"
              height="27"
              viewBox="0 0 19 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M13.4118 0H9.5V18C9.5 18.5455 8.38235 19.6364 7.26471 19.6364C6.14706 19.6364 4.47059 19.0909 4.47059 16.9091C4.47059 14.7273 5.77451 14.5455 6.70588 14.1818V10.3636C2.79412 10.3636 0 13.0909 0 16.9091C0 19.0909 1.67647 24 7.26471 24C12.8529 24 13.9706 19.6364 13.9706 18V9.27273C14.5294 10.9091 16.7647 11.4545 19 11.4545V7.09091C16.2059 7.09091 13.4118 3.27273 13.4118 0Z" />
            </svg>
          </Link>
        </Magnetic>
      </div>
      <div>
        <Magnetic>
          <Link target="_blank" href="https://www.youtube.com/@jfsvisual8964">
            <svg
              className="m-5 fill-white hover:fill-or hover:transition hover:duration-200"
              width="16"
              height="19"
              viewBox="0 0 13 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 6.26795C13.3333 7.03775 13.3333 8.96225 12 9.73205L3 14.9282C1.66667 15.698 -7.31543e-07 14.7358 -6.64245e-07 13.1962L-2.09983e-07 2.80385C-1.42685e-07 1.26425 1.66667 0.301995 3 1.0718L12 6.26795Z" />
            </svg>
          </Link>
        </Magnetic>
      </div>
    </footer>
  );
}

export default Footer;
```

- [ ] **Step 3: Remplacer `components/PiedPage.tsx`**

```tsx
import Link from "next/link";

export const PiedPage = () => {
  return (
    <div className="font-dmSans text-or flex flex-col gap-3 mx-5 my-10 lg:mx-36">
      <span>
        <Link
          className="hover:text-creme hover:size-5/6 duration-150"
          href="/mentionsLegales"
        >
          Mentions Légales
        </Link>
      </span>
      <span>
        <Link
          className="hover:text-creme hover:size-5/6 duration-150"
          href="/cgv"
        >
          Conditions de ventes générales
        </Link>
      </span>
      <span>
        <Link
          className="hover:text-creme hover:size-5/6 duration-150"
          href="/politiqueDeConfidentialite"
        >
          Politique de confidentialité
        </Link>
      </span>
    </div>
  );
};
```

- [ ] **Step 4: Remplacer `components/BandeauLogo.tsx`**

```tsx
import CarrouselLogo from "./CarrouselLogo";

export const BandeauLogo = () => {
  const logos = [
    "/img/logo/webp/Kunkel_Palettes_Bois_Logo.webp",
    "/img/logo/webp/cescop.webp",
    "/img/logo/webp/combatStress.webp",
    "/img/logo/webp/logo-acs.webp",
    "/img/logo/webp/ccasCenon.webp",
    "/img/logo/webp/logo-artso.webp",
    "/img/logo/webp/logo-cotral.webp",
    "/img/logo/webp/Rent-a-car.webp",
    "/img/logo/webp/aritsan-artipole.webp",
  ];
  return (
    <div className="mask-fade">
      <h2 className="text-center text-2xl font-bold font-dmSans mb-4 text-creme">
        Ils nous ont fait confiance
      </h2>
      <CarrouselLogo logos={logos} />
    </div>
  );
};
```

- [ ] **Step 5: Vérification manuelle**

`npm run dev` — vérifie Équipe (texte or), Footer (icônes réseaux sociaux passent en or au survol), pied de page (liens légaux), bandeau logos (titre en crème).

- [ ] **Step 6: Commit**

```bash
git add components/Team.tsx components/Footer.tsx components/PiedPage.tsx components/BandeauLogo.tsx
git commit -m "feat: reskin Équipe, Footer, pied de page, bandeau logos"
```

---

## Task 7: Contact + FaqSection — reskin (+ ajout `"use client"` sur FaqSection)

**Files:**
- Modify: `components/Contact.tsx`
- Modify: `components/FaqSection.tsx`

`FaqSection.tsx` utilise `useState`/`onClick` mais n'a pas de directive `"use client"` — ça fonctionne aujourd'hui uniquement parce que `app/page.tsx` est lui-même `"use client"` (tout son sous-arbre est donc déjà côté client). Il faut l'ajouter maintenant, avant la Task 9, sinon le build cassera dès que `"use client"` sera retiré de `app/page.tsx`.

- [ ] **Step 1: Remplacer `components/Contact.tsx`**

```tsx
import Link from "next/link";

export const Contact = () => {
  return (
    <section
      id="Contact"
      className="font-dmSans grid grid-cols-1 lg:grid-cols-3 gap-4 place-content-center bg-charcoal border-t border-white/5 h-fit px-5 py-5 lg:px-36 lg:py-auto"
    >
      <div className="flex flex-col justify-center content-center">
        <h2 className="font-unbounded text-creme">Nous contacter</h2>
        <span className="text-xl text-creme/80">
          Vous souhaitez en savoir plus sur nos méthodes de travail et nos
          services ?
        </span>
      </div>
      <div className="flex flex-col mx-auto lg:content-center lg:justify-between">
        <Link href="/contact">
          <button className="flex gap-4 px-12 py-4 rounded-full bg-or font-bold border-or border text-charcoal tracking-widest uppercase transform hover:scale-105 hover:bg-charcoal hover:border-or hover:text-or transition-colors duration-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              />
            </svg>
            Envoyez un mail
          </button>
        </Link>
      </div>
      <div className="flex flex-col mx-auto lg:content-center lg:justify-between">
        <Link href="https://zcal.co/martin-ribot/30min" target="_blank">
          <button className="flex gap-4 px-12 py-4 rounded-full bg-or font-bold border-or border text-charcoal tracking-widest uppercase transform hover:scale-105 hover:bg-charcoal hover:border-or hover:text-or transition-colors duration-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
              />
            </svg>
            Prenez rendez-vous
          </button>
        </Link>
      </div>
    </section>
  );
};
```

- [ ] **Step 2: Remplacer `components/FaqSection.tsx`**

```tsx
"use client";
import { motion } from "framer-motion";
import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "Proposez-vous des services de drone pour la capture aérienne ?",
    answer:
      "Nous offrons des prestations de prises de vue aérienne avec des drones stabilisés comme le Mavic, ainsi qu'avec des drones FPV pour des captures dynamiques et immersives. Nous proposons également nos services de télépilotage de drone en tant que prestataire pour d'autres sociétés de production.",
  },
  {
    question:
      "Est-il nécessaire d'obtenir des autorisations spécifiques pour filmer avec un drone ?",
    answer:
      "Oui, il est souvent nécessaire d'obtenir des autorisations spécifiques pour filmer avec un drone, en fonction de la zone de vol et du type d'événement. Certaines zones, comme les espaces publics, les zones urbaines ou les sites sensibles, nécessitent des démarches administratives et des autorisations de la part des autorités compétentes. En tant que professionnels certifiés, nous nous chargeons de gérer ces aspects pour vous assurer un tournage en toute conformité avec la réglementation en vigueur.",
  },
  {
    question: "Aidez-vous à élaborer le script et le storyboard ?",
    answer:
      "Oui, nous offrons un accompagnement complet dans l'élaboration du script et du storyboard. Nous travaillons en étroite collaboration avec vous pour comprendre vos besoins, définir le message clé à transmettre, et concevoir un scénario visuel qui reflète votre vision. Cela nous permet d'assurer une cohérence artistique et technique tout au long du projet.",
  },
  {
    question: "Combien de temps prend la post-production d'une vidéo ?",
    answer:
      "La durée de la post-production dépend de plusieurs facteurs, tels que la complexité du projet, la durée de la vidéo, le nombre d'effets spéciaux ou d'animations à intégrer, et les révisions demandées. En général, cela peut varier de quelques jours à plusieurs semaines. Nous discutons toujours des délais dès le début du projet pour vous fournir un calendrier adapté à vos besoins.",
  },
];

export const FaqSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  return (
    <div className="w-full mx-auto mb-10">
      <h2 className="font-unbounded font-bold text-or text-3xl my-10 mx-10 lg:mx-36">
        FAQ
      </h2>
      {faqData.map((item, index) => (
        <div key={index} className="mb-4">
          <div className="line min-h-[1px] bg-white opacity-50"></div>
          <button
            className="w-full text-left flex justify-between items-center py-2 px-10 lg:px-36 text-lg font-dmSans text-creme focus:outline-none"
            onClick={() => toggleAccordion(index)}
          >
            <span>{item.question}</span>
            <span>{activeIndex === index ? "-" : "+"}</span>
          </button>
          <motion.div
            key={index}
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: activeIndex === index ? "auto" : 0,
              opacity: activeIndex === index ? 1 : 0,
            }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.4 },
              opacity: { duration: 0.2 },
            }}
            className="overflow-hidden"
          >
            <div className="font-dmSans text-creme/80 mx-10 pl-4 pr-4 pb-2 lg:mx-44">
              {item.answer}
            </div>
          </motion.div>
        </div>
      ))}
      <div className="line min-h-[1px] bg-white opacity-50"></div>
    </div>
  );
};

export default FaqSection;
```

- [ ] **Step 3: Vérification manuelle**

`npm run dev` — Contact (fond charcoal, boutons or), FAQ (titre or, accordéon toujours fonctionnel).

- [ ] **Step 4: Commit**

```bash
git add components/Contact.tsx components/FaqSection.tsx
git commit -m "feat: reskin Contact + FAQ, ajout use client manquant sur FaqSection"
```

---

## Task 8: Process, Services (mask hover), NosServicesSection — reskin

**Files:**
- Modify: `components/Process.tsx`
- Modify: `components/ui/Services.tsx`
- Modify: `components/NosServicesSection.tsx`

- [ ] **Step 1: Modifier `components/Process.tsx`**

```tsx
// Remplacer ligne 7 :
<section className="md:grid-cols-1 pb-10 pt-10 bg-[#918C79]">
// par :
<section className="md:grid-cols-1 pb-10 pt-10 bg-charcoal border-y border-white/5">

// Remplacer ligne 9 :
<h2 className="font-leagueSpartan top-0 text-white text-center text-4xl mx-10 mb-10 lg:mx-40">
// par :
<h2 className="font-unbounded font-bold top-0 text-creme text-center text-4xl mx-10 mb-10 lg:mx-40">

// Remplacer ligne 12 :
<p className="font-leagueSpartan lg:mx-52 xl:mx-80 md:mx-20 mx-5 mb-10">
// par :
<p className="font-dmSans text-creme/80 lg:mx-52 xl:mx-80 md:mx-20 mx-5 mb-10">

// Remplacer ligne 24 :
<div className="hidden mx-auto w-2/3 border-[rgba(255,255,255,0.10)] dark:bg-gris bg-gray-100 shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset] rounded-xl px-10 py-10 lg:block ">
// par :
<div className="hidden mx-auto w-2/3 border-[rgba(255,255,255,0.10)] dark:bg-charcoal bg-gray-100 shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset] rounded-xl px-10 py-10 lg:block ">
```

Chaque occurrence de `font-leagueSpartan font-bold text-3xl mt-4` (titres "Démarrage", "Pré-production", "Production", "Post-production et livraison") devient `font-unbounded font-bold text-3xl mt-4 text-creme` — 4 occurrences, aux lignes actuelles 38, 57, 79, 99. Le reste du fichier (badges `Étape N`, listes `Step`, `ImageDescription`) ne change pas — ces couleurs sont déjà neutres.

- [ ] **Step 2: Modifier `components/ui/Services.tsx`**

```tsx
// Remplacer ligne 34 :
className="titreService flex items-center relative h-full w-full font-akira text-xl"
// par :
className="titreService flex items-center relative h-full w-full font-unbounded text-xl"

// Remplacer ligne 40 :
<p className="flex bg-jaune font-leagueSpartan text-black text-base px-5 lg:px-10">
// par :
<p className="flex bg-or font-dmSans text-charcoal text-base px-5 lg:px-10">
```

- [ ] **Step 3: Modifier `components/NosServicesSection.tsx`**

```tsx
// Remplacer ligne 12 :
<h2 className="font-body top-0 text-jaune text-3xl ml-10 mb-5 lg:mb-20 lg:ml-36 ">
// par :
<h2 className="font-unbounded font-bold top-0 text-or text-3xl ml-10 mb-5 lg:mb-20 lg:ml-36 ">
```

- [ ] **Step 4: Vérifier qu'aucune référence à l'ancien design system ne subsiste**

```bash
grep -rn "font-akira\|font-leagueSpartan\|font-body\|bg-jaune\|text-jaune\|border-jaune\|fill-jaune\|dark:bg-gris\|bg-gris" components app
```

Expected: aucun résultat (sauf éventuellement dans des fichiers hors scope explicitement listés dans les Global Constraints — vérifie que tout résultat restant est bien dans `app/contact`, `app/cgv`, `app/mentionsLegales` ou `app/politiqueDeConfidentialite`).

- [ ] **Step 5: Vérification manuelle**

`npm run dev` — section Process (fond charcoal), effet de reveal au survol des titres "Nos Services" (texte or sur fond charcoal au lieu de jaune sur noir).

- [ ] **Step 6: Commit**

```bash
git add components/Process.tsx components/ui/Services.tsx components/NosServicesSection.tsx
git commit -m "feat: reskin Process, effet de reveal Services, titre NosServicesSection"
```

---

## Task 9: SEO — conversion de `app/page.tsx` en Server Component

**Files:**
- Modify: `app/page.tsx`

Dernière tâche du plan : maintenant que tous les composants enfants sont finalisés, on retire `"use client"` de la page d'accueil pour qu'elle soit rendue côté serveur (objectif SEO de la Phase 1 de la roadmap technique). D'après l'audit des directives `"use client"` du repo (Task de vérification ci-dessous), tous les composants qui utilisent des hooks ou des event handlers directs (`Nav`, `NosServicesSection`, `Process`, `FaqSection` depuis la Task 7, et les composants `ui/*` déjà clients) ont déjà leur propre directive — `Home` peut donc redevenir un Server Component sans rien casser.

- [ ] **Step 1: Retirer `"use client"` de `app/page.tsx`**

```tsx
// app/page.tsx
import FaqSection from "@/components/FaqSection";
import Hero from "@/components/Hero";
import NosServicesSection from "@/components/NosServicesSection";
import { Team } from "@/components/Team";
import { Process } from "@/components/Process";
import { Contact } from "@/components/Contact";
import { PiedPage } from "@/components/PiedPage";
import { Projects } from "@/components/Projets";
import { BandeauLogo } from "@/components/BandeauLogo";
import { Offres } from "@/components/Offres";

export default function Home() {
  return (
    <div>
      <Hero />
      <BandeauLogo />
      <Offres />
      <Projects />
      <NosServicesSection />
      <Process />
      <Team />
      <FaqSection />
      <Contact />
      <PiedPage />
    </div>
  );
}
```

(Seule la ligne `"use client";` disparaît — tout le reste est identique à la Task 2.)

- [ ] **Step 2: Vérifier que le build passe**

```bash
npm run build
```

Expected: build réussi, aucune erreur du type "You're importing a component that needs useState/useEffect/onClick. It only works in a Client Component". Si une erreur pointe vers un fichier précis, ajoute `"use client"` en tête de ce fichier — ça veut dire qu'un composant a été manqué dans l'audit initial.

- [ ] **Step 3: Vérifier que le HTML est bien rendu côté serveur**

```bash
npm run dev
# dans un autre terminal :
curl -s http://localhost:3000 | grep -o "Du contenu vidéo qui"
```

Expected: le texte du H1 apparaît dans le HTML brut retourné par `curl` (preuve que le contenu n'attend plus l'hydratation JS pour exister — c'est exactement ce que corrige cette tâche).

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "fix: convertir la page d'accueil en Server Component pour le SEO (retrait de use client)"
```

---

## Self-review

- [x] Palette (spec §1) : appliquée dans `tailwind.config.ts` (Task 1) et propagée à tous les composants touchés (Tasks 2–8).
- [x] Typographie (spec §1) : Unbounded/DM Sans remplacent Akira/League Spartan partout (vérifié par grep en Task 8).
- [x] Structure des offres "phare + secondaires" (spec §2) : Task 2, avec prix Journée Contenu non figé.
- [x] Showreel + liste (spec §3) : Task 5.
- [x] Nav/Équipe/FAQ/Contact/BandeauLogo réhabillés (spec §4) : Tasks 3, 6, 7.
- [x] Volet technique — tokens, fonts, `next/head`, GA env var, retrait `"use client"` (spec §5) : Tasks 1 et 9.
- [x] Hors scope respecté : pages légales et `/contact` non touchées, prix Journée Contenu non figé, pas de nouvelle dépendance de test ajoutée.
- [x] Pas de push/déploiement dans ce plan (contrainte globale rappelée dans chaque étape de commit — jamais de `git push`).
