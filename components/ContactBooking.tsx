"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import BookingModal from "@/components/BookingModal";
import { BOOKING_LABEL } from "@/lib/site";

/**
 * Lit `?rdv=1` pour ouvrir la modale à l'arrivée sur la page. Isolé dans son
 * propre composant enveloppé de <Suspense> : useSearchParams sortirait sinon la
 * page Contact du rendu statique.
 */
function RdvParam({ onOuvrir }: { onOuvrir: () => void }) {
  const searchParams = useSearchParams();
  const demande = searchParams.get("rdv") === "1";

  useEffect(() => {
    if (demande) onOuvrir();
  }, [demande, onOuvrir]);

  return null;
}

/**
 * Encart « Vous préférez en parler de vive voix ? » de la page Contact, dont le
 * bouton ouvre le calendrier zcal en modale (components/BookingModal).
 */
export default function ContactBooking() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const ouvrir = useCallback(() => setOpen(true), []);

  const fermer = useCallback(() => {
    setOpen(false);
    // Retire ?rdv=1 pour que la modale ne se rouvre pas au retour arrière.
    router.replace("/contact", { scroll: false });
  }, [router]);

  return (
    <>
      <Suspense fallback={null}>
        <RdvParam onOuvrir={ouvrir} />
      </Suspense>

      <div className="mt-10 rounded-2xl border border-creme/10 bg-[#100D08] p-6">
        <p className="font-dmSans text-sm text-creme/80">
          Vous préférez en parler de vive voix ?
        </p>
        <button
          type="button"
          onClick={ouvrir}
          className="mt-5 w-fit rounded-full border border-or/40 px-6 py-2.5 font-dmSans text-xs font-bold uppercase tracking-widest text-creme transition-colors duration-300 hover:border-or hover:text-or"
        >
          {BOOKING_LABEL}
        </button>
        <p className="mt-3 font-dmSans text-xs text-creme/60">
          30 min en visio, sans engagement
        </p>
      </div>

      <BookingModal open={open} onClose={fermer} />
    </>
  );
}
