"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BOOKING_LABEL, BOOKING_URL } from "@/lib/site";

// Page portant le calendrier : BOOKING_URL contient une query, il ne peut pas
// être comparé directement au pathname.
const PAGE_RENDEZ_VOUS = "/contact";

// Seuil de déclenchement hors page d'accueil : quelques dizaines de pixels
// suffisent, ces pages n'ont pas de hero plein écran.
const SEUIL_PAR_DEFAUT = 120;

/**
 * Pilule de prise de rendez-vous ancrée en bas de l'écran, mobile et tablette
 * uniquement (`lg:hidden`, le desktop garde la CTA de la navigation).
 *
 * Elle n'apparaît qu'une fois le hero dépassé pour ne pas concurrencer la
 * vidéo d'accueil, et reste masquée sur /contact où la prise de rendez-vous est
 * déjà accessible dans la page.
 */
export default function MobileCta() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  const surRendezVous = pathname === PAGE_RENDEZ_VOUS;
  const surAccueil = pathname === "/";

  useEffect(() => {
    if (surRendezVous) {
      setVisible(false);
      return;
    }

    let frame = 0;

    const evaluer = () => {
      frame = 0;
      // Sur l'accueil on attend d'avoir quitté le hero (80 % de la fenêtre),
      // ailleurs un simple début de défilement suffit.
      const seuil = surAccueil
        ? window.innerHeight * 0.8
        : SEUIL_PAR_DEFAUT;
      setVisible(window.scrollY > seuil);
    };

    const planifier = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(evaluer);
    };

    evaluer();
    window.addEventListener("scroll", planifier, { passive: true });
    window.addEventListener("resize", planifier);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", planifier);
      window.removeEventListener("resize", planifier);
    };
  }, [surAccueil, surRendezVous]);

  if (surRendezVous) return null;

  return (
    <div
      className="pointer-events-none fixed inset-x-4 z-40 lg:hidden"
      // Safe area iOS : la pilule reste au-dessus de la barre d'accueil.
      style={{ bottom: "calc(1rem + env(safe-area-inset-bottom))" }}
    >
      <Link
        href={BOOKING_URL}
        aria-hidden={!visible}
        tabIndex={visible ? 0 : -1}
        className={`flex h-[52px] items-center justify-center gap-2.5 rounded-full bg-or px-6 font-dmSans text-xs font-bold uppercase tracking-[0.1em] text-charcoal shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-[transform,opacity] duration-300 ease-out motion-reduce:transition-none ${
          visible
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-[200%] opacity-0"
        }`}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="shrink-0"
        >
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M3 10h18M8 3v4M16 3v4" />
        </svg>
        {BOOKING_LABEL}
      </Link>
    </div>
  );
}
