"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ZcalWidget from "@/components/ZcalWidget";

type BookingModalProps = {
  open: boolean;
  onClose: () => void;
};

/**
 * Calendrier zcal présenté en fenêtre modale par-dessus la page Contact.
 * Le ZcalWidget n'est monté que lorsque la modale est ouverte : il réinjecte
 * lui-même le script d'embed à chaque nouveau montage (voir ZcalWidget), ce qui
 * garantit un seul calendrier après fermeture puis réouverture.
 */
export default function BookingModal({ open, onClose }: BookingModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Scroll du body bloqué pendant l'ouverture, fermeture à Escape et focus
  // envoyé sur le bouton fermer.
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          onClick={onClose}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-charcoal/85 p-4 backdrop-blur-sm sm:p-6"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-modal-titre"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] w-[92vw] max-w-2xl overflow-y-auto rounded-[2rem] border border-creme/10 bg-[#100D08] p-4 sm:p-6"
          >
            <button
              type="button"
              ref={closeButtonRef}
              onClick={onClose}
              aria-label="Fermer"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-creme transition-colors duration-200 hover:bg-or hover:text-charcoal"
            >
              ✕
            </button>

            <div className="pr-12">
              <div className="mb-4 font-dmSans text-xs uppercase tracking-[0.25em] text-or">
                Rendez-vous
              </div>
              <h2
                id="booking-modal-titre"
                className="font-unbounded text-2xl font-bold leading-tight text-creme"
              >
                Réservons 30 minutes
              </h2>
              <p className="mt-3 font-dmSans text-sm text-creme/70">
                Visio avec Martin, sans engagement
              </p>
            </div>

            {/* Le widget zcal impose son fond blanc : on l'enveloppe pour
                arrondir ses angles sur le fond sombre du panneau. */}
            <div className="mt-6 overflow-hidden rounded-2xl bg-creme">
              <ZcalWidget />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
