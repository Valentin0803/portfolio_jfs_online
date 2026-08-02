"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { motion } from "framer-motion";

export interface CarouselItem {
  id: number;
  title: string;
  description?: string;
}

type InfiniteItem = CarouselItem & { key: string; originalIndex: number };

/** Triplique la liste pour donner l'illusion d'un défilement infini. */
const createInfiniteItems = (originalItems: CarouselItem[]): InfiniteItem[] => {
  const items: InfiniteItem[] = [];
  for (let copy = 0; copy < 3; copy++) {
    originalItems.forEach((item, index) => {
      items.push({
        ...item,
        key: `${copy}-${item.id}`,
        originalIndex: index,
      });
    });
  }
  return items;
};

interface CarouselConfig {
  itemWidth: number;
  gap: number;
  titleClass: string;
}

/** Les titres de services sont longs (jusqu'à 29 caractères) : les créneaux
 *  sont dimensionnés en conséquence, contrairement au composant d'origine
 *  prévu pour des noms de marque courts. */
const getConfig = (width: number): CarouselConfig => {
  if (width < 640) {
    // Le titre le plus long mesure ~317px : 360 laisse une marge de sécurité
    // pour les écrans étroits et les variations de rendu de police.
    return { itemWidth: 360, gap: 40, titleClass: "text-lg" };
  }
  if (width < 1024) {
    return { itemWidth: 560, gap: 72, titleClass: "text-3xl" };
  }
  return { itemWidth: 680, gap: 100, titleClass: "text-4xl" };
};

const RulerLines = ({
  top = true,
  totalLines = 100,
}: {
  top?: boolean;
  totalLines?: number;
}) => {
  const lineSpacing = 100 / (totalLines - 1);
  const lines = [];

  for (let i = 0; i < totalLines; i++) {
    const isFifth = i % 5 === 0;
    const isCenter = i === Math.floor(totalLines / 2);

    let height = "h-3";
    let color = "bg-creme/20";

    if (isCenter) {
      height = "h-8";
      color = "bg-or";
    } else if (isFifth) {
      height = "h-4";
      color = "bg-creme/50";
    }

    lines.push(
      <div
        key={i}
        className={`absolute w-0.5 ${height} ${color} ${top ? "" : "bottom-0"}`}
        style={{ left: `${i * lineSpacing}%` }}
      />
    );
  }

  return <div className="relative w-full h-8 px-4">{lines}</div>;
};

export function RulerCarousel({
  originalItems,
}: {
  originalItems: CarouselItem[];
}) {
  const infiniteItems = useMemo(
    () => createInfiniteItems(originalItems),
    [originalItems]
  );
  const itemsPerSet = originalItems.length;

  // On démarre sur le premier élément du jeu central.
  const [activeIndex, setActiveIndex] = useState(itemsPerSet);
  const [isResetting, setIsResetting] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const onResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const config = useMemo(() => getConfig(windowWidth), [windowWidth]);

  const handleItemClick = (targetIndex: number) => {
    if (isResetting) return;
    const targetOriginalIndex = targetIndex % itemsPerSet;

    // Rejoint l'occurrence la plus proche pour éviter un long balayage.
    const candidates = [
      targetOriginalIndex,
      targetOriginalIndex + itemsPerSet,
      targetOriginalIndex + itemsPerSet * 2,
    ];
    const closest = candidates.reduce((best, index) =>
      Math.abs(index - activeIndex) < Math.abs(best - activeIndex) ? index : best
    );

    setActiveIndex(closest);
  };

  const handlePrevious = () => !isResetting && setActiveIndex((i) => i - 1);
  const handleNext = () => !isResetting && setActiveIndex((i) => i + 1);

  // Recentre silencieusement sur le jeu du milieu quand on atteint un bord.
  useEffect(() => {
    if (isResetting) return;

    if (activeIndex < itemsPerSet) {
      setIsResetting(true);
      setTimeout(() => {
        setActiveIndex((i) => i + itemsPerSet);
        setIsResetting(false);
      }, 0);
    } else if (activeIndex >= itemsPerSet * 2) {
      setIsResetting(true);
      setTimeout(() => {
        setActiveIndex((i) => i - itemsPerSet);
        setIsResetting(false);
      }, 0);
    }
  }, [activeIndex, itemsPerSet, isResetting]);

  // Navigation clavier limitée au carrousel : un listener global détournerait
  // les flèches de toute la page (scroll clavier).
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (isResetting) return;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setActiveIndex((i) => i - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      setActiveIndex((i) => i + 1);
    }
  };

  // Aligne le centre de l'élément actif sur le centre de la piste.
  // (Le composant d'origine codait ces valeurs en dur pour 9 éléments.)
  const step = config.itemWidth + config.gap;
  const trackWidth = infiniteItems.length * config.itemWidth +
    (infiniteItems.length - 1) * config.gap;
  const targetX =
    trackWidth / 2 - (activeIndex * step + config.itemWidth / 2);

  const currentPage = (activeIndex % itemsPerSet) + 1;

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      role="group"
      aria-label="Nos services"
      className="w-full flex flex-col items-center justify-center outline-none focus-visible:ring-1 focus-visible:ring-or/50 rounded-lg"
    >
      <div className="w-full flex flex-col justify-center relative">
        <RulerLines top />

        <div className="flex items-center justify-center w-full h-[140px] relative overflow-hidden">
          <motion.div
            className="flex items-center"
            style={{ gap: `${config.gap}px` }}
            animate={{ x: targetX }}
            transition={
              isResetting
                ? { duration: 0 }
                : { type: "spring", stiffness: 260, damping: 20, mass: 1 }
            }
          >
            {infiniteItems.map((item, index) => {
              const isActive = index === activeIndex;
              // Seul le jeu central est exposé aux lecteurs d'écran :
              // les deux copies ne sont là que pour l'illusion visuelle.
              const isClone = index < itemsPerSet || index >= itemsPerSet * 2;

              return (
                <motion.button
                  key={item.key}
                  onClick={() => handleItemClick(index)}
                  aria-hidden={isClone}
                  tabIndex={isClone ? -1 : 0}
                  aria-current={isActive ? "true" : undefined}
                  className={`font-unbounded font-bold ${config.titleClass} whitespace-nowrap cursor-pointer flex items-center justify-center transition-colors ${
                    isActive
                      ? "text-creme"
                      : "text-creme/40 hover:text-creme/70"
                  }`}
                  animate={{
                    scale: isActive ? 1 : 0.75,
                    opacity: isActive ? 1 : 0.4,
                  }}
                  transition={
                    isResetting
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 400, damping: 25 }
                  }
                  style={{ width: `${config.itemWidth}px` }}
                >
                  {item.title}
                </motion.button>
              );
            })}
          </motion.div>
        </div>

        <RulerLines top={false} />
      </div>

      {/* Descriptions — absentes du composant d'origine, conservées ici pour
          ne pas perdre le contenu. Toutes sont empilées dans la même cellule
          de grille : la hauteur se cale sur la plus longue (donc aucun
          décalage des boutons au changement de service, quelle que soit la
          largeur d'écran) et les cinq restent présentes dans le HTML servi,
          au lieu de la seule description active. */}
      <div className="grid w-full max-w-[60ch] mt-10 px-6">
        {originalItems.map((item, index) => {
          const isActive = index === activeIndex % itemsPerSet;
          return (
            <motion.p
              key={item.id}
              aria-hidden={!isActive}
              animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 8 }}
              transition={{ duration: 0.3 }}
              className="[grid-area:1/1] font-dmSans text-sm lg:text-base text-creme/60 leading-relaxed text-center"
            >
              {item.description}
            </motion.p>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-5 mt-10">
        <button
          onClick={handlePrevious}
          disabled={isResetting}
          className="flex items-center justify-center cursor-pointer text-or/80 hover:text-or transition-colors"
          aria-label="Service précédent"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
          >
            <polygon points="11 19 2 12 11 5 11 19" />
            <polygon points="22 19 13 12 22 5 22 19" />
          </svg>
        </button>

        <div className="flex items-center gap-2 font-dmSans text-sm">
          <span className="font-medium text-creme">{currentPage}</span>
          <span className="text-creme/40">/</span>
          <span className="text-creme/60">{itemsPerSet}</span>
        </div>

        <button
          onClick={handleNext}
          disabled={isResetting}
          className="flex items-center justify-center cursor-pointer text-or/80 hover:text-or transition-colors"
          aria-label="Service suivant"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
          >
            <polygon points="13 19 22 12 13 5 13 19" />
            <polygon points="2 19 11 12 2 5 2 19" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default RulerCarousel;
