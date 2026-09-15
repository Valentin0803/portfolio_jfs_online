"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export interface ExpandingCardItem {
  /** Surtitre affiché en or au-dessus du titre. */
  category: string;
  title: string;
  /** Chemin public de l'image de fond. */
  cover: string;
  coverAlt: string;
  /** Ligne facultative sous le titre, visible seulement sur la carte ouverte. */
  description?: string;
}

interface ExpandingCardsProps {
  items: ExpandingCardItem[];
  /** Ouvre la fiche du projet (modale gérée par le parent). */
  onOpen: (index: number) => void;
  /** Libellé du bouton de la carte ouverte. */
  cta?: string;
}

/**
 * Galerie de cartes dépliantes : la carte active occupe cinq parts de la
 * grille, les autres une seule. Desktop, la répartition se fait en colonnes ;
 * mobile, en lignes.
 */
export const ExpandingCards = ({
  items,
  onOpen,
  cta = "Voir le projet",
}: ExpandingCardsProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    const sync = () => setIsDesktop(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  const parts = items
    .map((_, index) => (index === activeIndex ? "5fr" : "1fr"))
    .join(" ");

  return (
    <ul
      className="grid h-[600px] w-full max-w-6xl gap-2 transition-[grid-template-columns,grid-template-rows] duration-500 ease-out motion-reduce:transition-none md:h-[560px]"
      style={
        isDesktop
          ? { gridTemplateColumns: parts, gridTemplateRows: "1fr" }
          : { gridTemplateRows: parts, gridTemplateColumns: "1fr" }
      }
    >
      {items.map((item, index) => {
        const isActive = index === activeIndex;

        return (
          <li
            key={item.title}
            tabIndex={0}
            data-active={isActive ? "true" : "false"}
            aria-label={`${item.title}, ${item.category}`}
            onMouseEnter={() => setActiveIndex(index)}
            onFocus={() => setActiveIndex(index)}
            onClick={() => setActiveIndex(index)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setActiveIndex(index);
              }
            }}
            className="group relative min-h-0 min-w-0 cursor-pointer overflow-hidden rounded-2xl border border-creme/10 bg-[#100D08] shadow-sm outline-none transition-colors duration-300 ease-out focus-visible:border-or/50 motion-reduce:transition-none data-[active=true]:border-or/30 md:min-w-[80px]"
          >
            <Image
              src={item.cover}
              alt={item.coverAlt}
              fill
              sizes="(min-width: 768px) 60vw, 100vw"
              className="absolute inset-0 h-full w-full scale-110 object-cover grayscale transition-all duration-300 ease-out motion-reduce:transition-none group-data-[active=true]:scale-100 group-data-[active=true]:grayscale-0"
            />

            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
            />

            <article className="absolute inset-0 flex flex-col justify-end gap-2 p-5">
              <span
                aria-hidden
                className="pointer-events-none absolute bottom-5 left-5 origin-bottom-left whitespace-nowrap font-dmSans text-sm font-light uppercase tracking-wider text-creme/80 opacity-100 transition-all duration-300 ease-out motion-reduce:transition-none group-data-[active=true]:opacity-0 md:-rotate-90"
              >
                {item.title}
              </span>

              <span className="font-dmSans text-[11px] uppercase tracking-[0.2em] text-or opacity-0 transition-all delay-75 duration-300 ease-out motion-reduce:transition-none group-data-[active=true]:opacity-100">
                {item.category}
              </span>

              <h3 className="font-unbounded text-xl font-bold text-creme opacity-0 transition-all delay-150 duration-300 ease-out motion-reduce:transition-none group-data-[active=true]:opacity-100">
                {item.title}
              </h3>

              {item.description && (
                <p className="w-full max-w-xs font-dmSans text-sm text-creme/80 opacity-0 transition-all delay-[225ms] duration-300 ease-out motion-reduce:transition-none group-data-[active=true]:opacity-100">
                  {item.description}
                </p>
              )}

              <button
                type="button"
                tabIndex={isActive ? 0 : -1}
                aria-hidden={!isActive}
                onClick={(event) => {
                  event.stopPropagation();
                  onOpen(index);
                }}
                className="pointer-events-none mt-1 w-fit rounded-full border border-or px-4 py-2 font-dmSans text-xs uppercase tracking-widest text-or opacity-0 transition-all delay-300 duration-300 ease-out hover:bg-or hover:text-charcoal focus-visible:bg-or focus-visible:text-charcoal motion-reduce:transition-none group-data-[active=true]:pointer-events-auto group-data-[active=true]:opacity-100"
              >
                {cta}
              </button>
            </article>
          </li>
        );
      })}
    </ul>
  );
};
