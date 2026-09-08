"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Zoom appliqué au cadre de l'iframe Vimeo.
 *
 * Le showreel est masterisé en cinémascope (~2.39:1) : les bandes noires sont
 * incrustées dans l'image elle-même — sur une source 1920x1080, le contenu
 * utile ne fait que 1920x816, avec 132 px de noir en haut et en bas. Ce léger
 * agrandissement rogne ces bandes pour que la vidéo remplisse le hero.
 * À réajuster si l'on change de vidéo ou de format de master (1.32 les
 * supprimerait totalement, au prix d'un recadrage plus agressif).
 */
const HERO_VIDEO_ZOOM = 1.15;

const VIMEO_ORIGIN = "https://player.vimeo.com";
const VIMEO_SRC = `${VIMEO_ORIGIN}/video/1062779681?autoplay=1&muted=1&controls=0&loop=1&background=1`;

/**
 * Fond vidéo du hero. Reste invisible tant que le lecteur Vimeo n'a pas
 * confirmé la lecture : si Vimeo tarde, est bloqué ou renvoie sa page
 * d'erreur, seule l'image de secours placée derrière reste visible.
 */
export const HeroVideo = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Une fois l'iframe chargée, on s'abonne aux événements du lecteur.
  const handleLoad = useCallback(() => {
    const player = iframeRef.current?.contentWindow;
    if (!player) return;
    for (const value of ["play", "playing"]) {
      player.postMessage(
        JSON.stringify({ method: "addEventListener", value }),
        VIMEO_ORIGIN
      );
    }
  }, []);

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
      if (name === "play" || name === "playing") {
        setIsPlaying(true);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
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
        title="JFS Visual — showreel"
      ></iframe>
    </div>
  );
};

export default HeroVideo;
