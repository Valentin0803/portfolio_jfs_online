"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { WHATSAPP_LABEL, WHATSAPP_URL } from "@/lib/site";

// Le contact WhatsApp est déjà visible sur la page Contact.
const PAGE_CONTACT = "/contact";

// Seuil de déclenchement hors page d'accueil : quelques dizaines de pixels
// suffisent, ces pages n'ont pas de hero plein écran.
const SEUIL_PAR_DEFAUT = 120;

/**
 * Pilule de contact WhatsApp ancrée en bas de l'écran, mobile et tablette
 * uniquement (`lg:hidden`, le desktop garde la CTA de la navigation).
 *
 * Elle n'apparaît qu'une fois le hero dépassé pour ne pas concurrencer la
 * vidéo d'accueil, et reste masquée sur /contact où le contact WhatsApp est
 * déjà accessible dans la page.
 */
export default function MobileCta() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  const surContact = pathname === PAGE_CONTACT;
  const surAccueil = pathname === "/";

  useEffect(() => {
    if (surContact) {
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
  }, [surAccueil, surContact]);

  if (surContact) return null;

  return (
    <div
      className="pointer-events-none fixed inset-x-4 z-40 lg:hidden"
      // Safe area iOS : la pilule reste au-dessus de la barre d'accueil.
      style={{ bottom: "calc(1rem + env(safe-area-inset-bottom))" }}
    >
      <a
        href={WHATSAPP_URL}
        aria-hidden={!visible}
        tabIndex={visible ? 0 : -1}
        className={`flex h-[52px] items-center justify-center gap-2.5 rounded-full bg-or px-6 font-dmSans text-xs font-bold uppercase tracking-[0.1em] text-charcoal shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-[transform,opacity] duration-300 ease-out motion-reduce:transition-none ${
          visible
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-[200%] opacity-0"
        }`}
       target="_blank" rel="noopener noreferrer">
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
          <path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5H4l-3 2 2-6a8.5 8.5 0 1 1 18-4.5Z" />
        </svg>
        {WHATSAPP_LABEL}
      </a>
    </div>
  );
}
