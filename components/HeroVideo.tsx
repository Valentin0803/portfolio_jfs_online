"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Zoom appliqué au cadre de l'iframe Vimeo.
 *
 * Le showreel est masterisé en cinémascope (~2.39:1) : les bandes noires sont
 * incrustées dans l'image elle-même : sur une source 1920x1080, le contenu
 * utile ne fait que 1920x816, avec 132 px de noir en haut et en bas. Ce léger
 * agrandissement rogne ces bandes pour que la vidéo remplisse le hero.
 * À réajuster si l'on change de vidéo ou de format de master (1.32 les
 * supprimerait totalement, au prix d'un recadrage plus agressif).
 */
const HERO_VIDEO_ZOOM = 1.33;

const VIMEO_ORIGIN = "https://player.vimeo.com";
/**
 * `autopause=0` empêche Vimeo de mettre le showreel en pause quand un autre
 * lecteur Vimeo démarre ailleurs ; `playsinline=1` évite le passage en plein
 * écran forcé sur iOS.
 */
const VIMEO_SRC = `${VIMEO_ORIGIN}/video/1062779681?autoplay=1&muted=1&controls=0&loop=1&background=1&autopause=0&playsinline=1`;

/** Événements du lecteur auxquels on s'abonne pour savoir que l'image tourne. */
const WATCHED_EVENTS = ["play", "playing", "timeupdate", "pause"] as const;

/**
 * Délai au-delà duquel on affiche la vidéo même sans confirmation du lecteur.
 * Vimeo peut très bien lire le showreel sans qu'aucun événement ne nous
 * parvienne (abonnement perdu, lecture démarrée avant nous) : mieux vaut une
 * vidéo affichée sans accusé de réception qu'un hero définitivement figé.
 */
const REVEAL_FALLBACK_MS = 2500;

/**
 * Voile sombre posé au-dessus de la vidéo : garantit la lisibilité du titre.
 * Quand le visiteur active le son, il vient regarder Valentin parler, on
 * allège alors le voile pour laisser respirer l'image.
 */
const GRADIENT_MUTED =
  "linear-gradient(180deg, rgba(10,9,7,0.5) 0%, rgba(10,9,7,0.55) 55%, rgba(10,9,7,0.97) 100%)";
const GRADIENT_UNMUTED =
  "linear-gradient(180deg, rgba(10,9,7,0.3) 0%, rgba(10,9,7,0.4) 55%, rgba(10,9,7,0.95) 100%)";

/**
 * Fond vidéo du hero. Reste invisible tant que le lecteur Vimeo n'a pas
 * confirmé la lecture : si Vimeo tarde, est bloqué ou renvoie sa page
 * d'erreur, seule l'image de secours placée derrière reste visible.
 */
export const HeroVideo = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const fallbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasRelaunched = useRef(false);

  const send = useCallback((message: Record<string, unknown>) => {
    const player = iframeRef.current?.contentWindow;
    if (!player) return;
    player.postMessage(JSON.stringify(message), VIMEO_ORIGIN);
  }, []);

  /**
   * Le lecteur ignore toute commande reçue avant d'être prêt : on s'abonne
   * donc à la fois au `load` de l'iframe et au message `ready`, quitte à
   * envoyer l'abonnement deux fois, c'est sans effet de bord.
   */
  const subscribe = useCallback(() => {
    for (const value of WATCHED_EVENTS) {
      send({ method: "addEventListener", value });
    }
  }, [send]);

  const reveal = useCallback(() => {
    if (fallbackTimer.current) {
      clearTimeout(fallbackTimer.current);
      fallbackTimer.current = null;
    }
    setIsPlaying(true);
  }, []);

  const armFallback = useCallback(() => {
    if (fallbackTimer.current) clearTimeout(fallbackTimer.current);
    fallbackTimer.current = setTimeout(() => {
      fallbackTimer.current = null;
      setIsPlaying(true);
    }, REVEAL_FALLBACK_MS);
  }, []);

  const handleLoad = useCallback(() => {
    subscribe();
    armFallback();
  }, [armFallback, subscribe]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== VIMEO_ORIGIN) return;

      // Vimeo envoie tantôt une chaîne JSON, tantôt un objet déjà désérialisé.
      let payload: unknown = event.data;
      if (typeof payload === "string") {
        try {
          payload = JSON.parse(payload);
        } catch {
          return;
        }
      }

      const name = (payload as { event?: unknown } | null)?.event;
      if (name === "ready") {
        subscribe();
        return;
      }
      // `timeupdate` prouve que l'image défile même si le `play` nous a échappé.
      if (name === "play" || name === "playing" || name === "timeupdate") {
        reveal();
        return;
      }
      // Pause subie (autopause, onglet en arrière-plan) : on relance une fois.
      if (name === "pause" && !hasRelaunched.current) {
        hasRelaunched.current = true;
        send({ method: "play" });
      }
    };

    window.addEventListener("message", handleMessage);
    // Après un remontage (fast refresh), l'iframe est déjà chargée : le `load`
    // ne repassera pas, on retente donc l'abonnement et on réarme le filet.
    subscribe();
    armFallback();

    return () => {
      window.removeEventListener("message", handleMessage);
      if (fallbackTimer.current) {
        clearTimeout(fallbackTimer.current);
        fallbackTimer.current = null;
      }
    };
  }, [armFallback, reveal, send, subscribe]);

  /**
   * L'autoplay ne fonctionne que muet : le son ne peut donc être rétabli que
   * sur un geste explicite du visiteur.
   */
  const toggleSound = useCallback(() => {
    const nextMuted = !isMuted;
    send({ method: "setMuted", value: nextMuted });
    if (!nextMuted) {
      send({ method: "setVolume", value: 1 });
    }
    // Certains lecteurs marquent une pause en sortant du mode muet : on relance
    // systématiquement pour que l'image ne se fige jamais sur un clic « Son ».
    send({ method: "play" });
    setIsMuted(nextMuted);
  }, [isMuted, send]);

  return (
    <>
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          width: "100vw",
          height: "56.25vw",
          minHeight: "100vh",
          minWidth: "177.78vh",
          left: "50%",
          top: "50%",
          transform: `translate(-50%, -50%) scale(${HERO_VIDEO_ZOOM})`,
          position: "absolute",
        }}
      >
        <iframe
          ref={iframeRef}
          onLoad={handleLoad}
          src={VIMEO_SRC}
          className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${
            isPlaying ? "opacity-100" : "opacity-0"
          }`}
          frameBorder="0"
          allow="autoplay; fullscreen"
          title="JFS Visual, showreel"
        ></iframe>
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none transition-[background] duration-700"
        style={{ background: isMuted ? GRADIENT_MUTED : GRADIENT_UNMUTED }}
      ></div>

      {/* Bas de hero, côté droit : hors de portée du « Scroll » centré et des
          icônes sociales fixées à gauche, y compris sur mobile où on le
          remonte au-dessus de l'indicateur de scroll. */}
      <button
        type="button"
        onClick={toggleSound}
        aria-label={isMuted ? "Activer le son" : "Couper le son"}
        className={`group absolute bottom-24 right-5 z-20 flex items-center gap-3 transition-opacity duration-700 sm:bottom-10 sm:right-10 ${
          isPlaying ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <span className="hidden font-dmSans text-[11px] tracking-[0.2em] uppercase text-creme/60 transition-colors duration-300 group-hover:text-or sm:inline">
          Son
        </span>
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-or/40 bg-charcoal/70 text-creme backdrop-blur transition-colors duration-300 group-hover:border-or group-hover:text-or">
          {isMuted ? (
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="M11 5 6 9H3v6h3l5 4z" />
              <line x1="16" y1="9" x2="22" y2="15" />
              <line x1="22" y1="9" x2="16" y2="15" />
            </svg>
          ) : (
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="M11 5 6 9H3v6h3l5 4z" />
              <path d="M15.5 8.5a5 5 0 0 1 0 7" />
              <path d="M18.5 5.5a9 9 0 0 1 0 13" />
            </svg>
          )}
        </span>
      </button>
    </>
  );
};

export default HeroVideo;
