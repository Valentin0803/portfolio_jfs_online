"use client";

import { useEffect } from "react";
import Script from "next/script";
import { ZCAL_INVITE_URL } from "@/lib/site";

const ZCAL_EMBED_SRC = "https://static.zcal.co/embed/v1/embed.js";

// embed.js s'initialise via `window.zcal = window.zcal || (…)` : une fois la
// variable posée, une seconde exécution du script est court-circuitée et le
// scan des `.zcal-inline-widget` n'a jamais lieu. next/script ne rejoue donc
// rien lors d'une navigation client. Au-delà du premier montage, on supprime
// `window.zcal` et on réinjecte le script (avec un cache-buster) pour forcer
// un nouveau scan.
let scriptAlreadyLoaded = false;

export default function ZcalWidget() {
  useEffect(() => {
    if (!scriptAlreadyLoaded) {
      scriptAlreadyLoaded = true;
      return;
    }

    const globalWindow = window as Window & { zcal?: unknown };
    delete globalWindow.zcal;

    const script = document.createElement("script");
    script.src = `${ZCAL_EMBED_SRC}?remount=${Date.now()}`;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      script.remove();
      delete globalWindow.zcal;
    };
  }, []);

  return (
    <>
      <div className="zcal-inline-widget">
        <a
          href={ZCAL_INVITE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="block px-6 py-4 text-center font-dmSans text-sm font-bold uppercase tracking-[0.1em] text-charcoal underline underline-offset-4"
        >
          Ouvrir le calendrier
        </a>
      </div>
      <Script src={ZCAL_EMBED_SRC} strategy="afterInteractive" />
    </>
  );
}
