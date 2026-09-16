"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import type { VideoAsset } from "@/lib/media";

/** Délai d'inactivité au bout duquel la barre de contrôles s'efface en lecture. */
const AUTO_HIDE_MS = 2500;
/** Saut appliqué par les flèches gauche et droite. */
const SEEK_STEP_SEC = 5;
/** Durée d'affichage du message « 4K indisponible ». */
const NOTICE_MS = 3200;

/** mm:ss, et mmm:ss au-delà de cent minutes, sans jamais afficher NaN. */
const formatTime = (value: number): string => {
  if (!Number.isFinite(value) || value < 0) return "0:00";
  const total = Math.floor(value);
  const minutes = Math.floor(total / 60);
  const seconds = total % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const iconProps = {
  "aria-hidden": true,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const PlayIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg {...iconProps} className={className}>
    <path d="M8 5.5v13l11-6.5z" fill="currentColor" stroke="none" />
  </svg>
);

const PauseIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg {...iconProps} className={className}>
    <rect x="7" y="5" width="3.5" height="14" rx="1" fill="currentColor" stroke="none" />
    <rect x="13.5" y="5" width="3.5" height="14" rx="1" fill="currentColor" stroke="none" />
  </svg>
);

const SoundOffIcon = () => (
  <svg {...iconProps} className="h-4 w-4">
    <path d="M11 5 6 9H3v6h3l5 4z" />
    <line x1="16" y1="9" x2="22" y2="15" />
    <line x1="22" y1="9" x2="16" y2="15" />
  </svg>
);

const SoundOnIcon = () => (
  <svg {...iconProps} className="h-4 w-4">
    <path d="M11 5 6 9H3v6h3l5 4z" />
    <path d="M15.5 8.5a5 5 0 0 1 0 7" />
    <path d="M18.5 5.5a9 9 0 0 1 0 13" />
  </svg>
);

const GearIcon = () => (
  <svg {...iconProps} className="h-4 w-4">
    <circle cx="12" cy="12" r="3" />
    <path d="M12 3.5v2M12 18.5v2M20.5 12h-2M5.5 12h-2M17.9 6.1l-1.4 1.4M7.5 16.5l-1.4 1.4M17.9 17.9l-1.4-1.4M7.5 7.5 6.1 6.1" />
  </svg>
);

const FullscreenIcon = ({ active }: { active: boolean }) =>
  active ? (
    <svg {...iconProps} className="h-4 w-4">
      <path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5" />
    </svg>
  ) : (
    <svg {...iconProps} className="h-4 w-4">
      <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
    </svg>
  );

/** Élément de vidéo enrichi des méthodes plein écran propres à iOS et à Safari. */
type VideoElementWithFullscreen = HTMLVideoElement & {
  webkitEnterFullscreen?: () => void;
};

type ConnectionWithSaveData = { saveData?: boolean };

export interface VideoPlayerProps {
  asset: VideoAsset;
  className?: string;
  /** Démarre la lecture en muet dès le montage. Désactivé par défaut. */
  autoPlayMuted?: boolean;
}

/**
 * Lecteur vidéo maison, sans dépendance : balise <video> native (le bucket R2
 * répond aux requêtes Range, la recherche fonctionne donc telle quelle) et
 * contrôles dessinés à la charte JFS.
 */
export const VideoPlayer = ({
  asset,
  className,
  autoPlayMuted = false,
}: VideoPlayerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const noticeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  /** Position et état de lecture à restaurer après un changement de source. */
  const restoreRef = useRef<{ time: number; playing: boolean } | null>(null);
  /** Qualité d'où l'on vient, pour y revenir si la nouvelle source échoue. */
  const previousQuality = useRef<number | null>(null);
  const loadedSrc = useRef<string | null>(null);

  const menuId = useId();

  const [qualityIndex, setQualityIndex] = useState(0);
  const [saveData, setSaveData] = useState(false);
  const [hasStarted, setHasStarted] = useState(autoPlayMuted);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(autoPlayMuted);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(asset.dureeSec ?? 0);
  const [bufferedEnd, setBufferedEnd] = useState(0);
  const [isBuffering, setIsBuffering] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);
  const [isScrubbing, setIsScrubbing] = useState(false);

  // En mode économie de données, la 4K n'est même pas proposée : on ne va pas
  // faire télécharger 877 Mo à quelqu'un qui demande l'inverse.
  const sources = saveData ? asset.sources.slice(0, 1) : asset.sources;
  const safeIndex = Math.min(qualityIndex, sources.length - 1);
  const activeSource = sources[safeIndex] ?? asset.sources[0];

  useEffect(() => {
    const connection = (
      navigator as Navigator & { connection?: ConnectionWithSaveData }
    ).connection;
    if (connection?.saveData) setSaveData(true);
  }, []);

  /** Réarme la temporisation de masquage de la barre de contrôles. */
  const revealControls = useCallback(() => {
    setControlsVisible(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => {
      hideTimer.current = null;
      // On ne masque jamais des contrôles en cours d'utilisation.
      const video = videoRef.current;
      if (!video || video.paused || menuOpen || isScrubbing) return;
      setControlsVisible(false);
    }, AUTO_HIDE_MS);
  }, [isScrubbing, menuOpen]);

  useEffect(() => {
    revealControls();
    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
      if (noticeTimer.current) clearTimeout(noticeTimer.current);
    };
  }, [revealControls]);

  const showNotice = useCallback((message: string) => {
    setNotice(message);
    if (noticeTimer.current) clearTimeout(noticeTimer.current);
    noticeTimer.current = setTimeout(() => {
      noticeTimer.current = null;
      setNotice(null);
    }, NOTICE_MS);
  }, []);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    revealControls();
    if (video.paused) {
      setHasStarted(true);
      void video.play().catch(() => setHasError(true));
    } else {
      video.pause();
    }
  }, [revealControls]);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
    revealControls();
  }, [revealControls]);

  const seekBy = useCallback(
    (delta: number) => {
      const video = videoRef.current;
      if (!video || !Number.isFinite(video.duration)) return;
      video.currentTime = Math.min(
        Math.max(video.currentTime + delta, 0),
        video.duration,
      );
      revealControls();
    },
    [revealControls],
  );

  const toggleFullscreen = useCallback(() => {
    const container = containerRef.current;
    const video = videoRef.current as VideoElementWithFullscreen | null;
    if (document.fullscreenElement) {
      void document.exitFullscreen().catch(() => {});
      return;
    }
    if (container?.requestFullscreen) {
      void container.requestFullscreen().catch(() => {
        // iPhone n'autorise le plein écran que sur la balise vidéo elle-même.
        video?.webkitEnterFullscreen?.();
      });
      return;
    }
    video?.webkitEnterFullscreen?.();
  }, []);

  useEffect(() => {
    const onChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  // Changement de source : on recharge, puis on restaure position et lecture
  // dans le gestionnaire `loadedmetadata`.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (loadedSrc.current === null) {
      loadedSrc.current = activeSource.src;
      return;
    }
    if (loadedSrc.current === activeSource.src) return;
    loadedSrc.current = activeSource.src;
    video.load();
  }, [activeSource.src]);

  const changeQuality = useCallback(
    (index: number) => {
      setMenuOpen(false);
      if (index === safeIndex) return;
      const video = videoRef.current;
      previousQuality.current = safeIndex;
      restoreRef.current = {
        time: video?.currentTime ?? 0,
        playing: video ? !video.paused : false,
      };
      setHasError(false);
      setQualityIndex(index);
    },
    [safeIndex],
  );

  const handleError = useCallback(() => {
    const fallback = previousQuality.current;
    if (fallback !== null && fallback !== safeIndex) {
      previousQuality.current = null;
      showNotice(`${activeSource.label} indisponible`);
      setQualityIndex(fallback);
      return;
    }
    setHasError(true);
  }, [activeSource.label, safeIndex, showNotice]);

  const handleLoadedMetadata = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (Number.isFinite(video.duration)) setDuration(video.duration);
    const restore = restoreRef.current;
    if (!restore) return;
    restoreRef.current = null;
    try {
      video.currentTime = restore.time;
    } catch {
      // Source trop courte ou pas encore cherchable : on repart du début.
    }
    if (restore.playing) void video.play().catch(() => {});
  }, []);

  const handleProgress = useCallback(() => {
    const video = videoRef.current;
    if (!video || video.buffered.length === 0) return;
    setBufferedEnd(video.buffered.end(video.buffered.length - 1));
  }, []);

  /** Convertit une position de pointeur en temps vidéo, puis y saute. */
  const seekToPointer = useCallback((clientX: number) => {
    const track = trackRef.current;
    const video = videoRef.current;
    if (!track || !video || !Number.isFinite(video.duration)) return;
    const rect = track.getBoundingClientRect();
    if (rect.width === 0) return;
    const ratio = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
    const next = ratio * video.duration;
    video.currentTime = next;
    setCurrentTime(next);
  }, []);

  const handleTrackPointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.currentTarget.setPointerCapture(event.pointerId);
      setIsScrubbing(true);
      seekToPointer(event.clientX);
    },
    [seekToPointer],
  );

  const handleTrackPointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (!isScrubbing) return;
      seekToPointer(event.clientX);
    },
    [isScrubbing, seekToPointer],
  );

  const endScrub = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (!isScrubbing) return;
      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
      setIsScrubbing(false);
      revealControls();
    },
    [isScrubbing, revealControls],
  );

  const handleKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLDivElement>) => {
      const key = event.key;
      if (key === " " || key === "k" || key === "K") {
        event.preventDefault();
        togglePlay();
      } else if (key === "m" || key === "M") {
        event.preventDefault();
        toggleMute();
      } else if (key === "f" || key === "F") {
        event.preventDefault();
        toggleFullscreen();
      } else if (key === "ArrowRight") {
        event.preventDefault();
        seekBy(SEEK_STEP_SEC);
      } else if (key === "ArrowLeft") {
        event.preventDefault();
        seekBy(-SEEK_STEP_SEC);
      } else if (key === "Escape" && menuOpen) {
        setMenuOpen(false);
      }
    },
    [menuOpen, seekBy, toggleFullscreen, toggleMute, togglePlay],
  );

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const buffered = duration > 0 ? (bufferedEnd / duration) * 100 : 0;
  const isVertical = asset.ratio === "9/16";

  const roundButton =
    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-or/40 bg-charcoal/70 text-creme backdrop-blur transition-[color,border-color,transform] duration-200 ease-out hover:border-or hover:text-or active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-or motion-reduce:transition-none";

  return (
    <div
      ref={containerRef}
      role="group"
      aria-label="Lecteur vidéo"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onPointerMove={revealControls}
      onTouchStart={revealControls}
      className={[
        "group relative isolate overflow-hidden rounded-[2rem] border border-creme/10 bg-[#100D08] shadow-[0_24px_60px_-30px_rgba(0,0,0,0.9)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-or",
        isVertical ? "mx-auto aspect-[9/16] max-h-[85vh] w-full" : "aspect-video w-full",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <video
        ref={videoRef}
        src={activeSource.src}
        poster={asset.poster}
        playsInline
        preload="metadata"
        autoPlay={autoPlayMuted}
        muted={autoPlayMuted}
        aria-label={asset.titre}
        onClick={togglePlay}
        onPlay={() => {
          setHasStarted(true);
          setIsPlaying(true);
          revealControls();
        }}
        onPause={() => {
          setIsPlaying(false);
          setControlsVisible(true);
        }}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onDurationChange={(event) => {
          const value = event.currentTarget.duration;
          if (Number.isFinite(value)) setDuration(value);
        }}
        onLoadedMetadata={handleLoadedMetadata}
        onProgress={handleProgress}
        onWaiting={() => setIsBuffering(true)}
        onPlaying={() => setIsBuffering(false)}
        onCanPlay={() => setIsBuffering(false)}
        onEnded={() => setControlsVisible(true)}
        onError={handleError}
        className="h-full w-full cursor-pointer object-contain"
      />

      {/* Grand bouton de lecture, visible tant que rien n'a été lu. */}
      {!hasStarted && !hasError && (
        <button
          type="button"
          onClick={togglePlay}
          aria-label={`Lire la vidéo, ${asset.titre}`}
          className="absolute left-1/2 top-1/2 z-20 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-or text-charcoal shadow-[0_18px_40px_-16px_rgba(0,0,0,0.9)] transition-transform duration-200 ease-out hover:scale-[1.04] active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-or motion-reduce:transition-none"
        >
          <PlayIcon className="ml-1 h-8 w-8" />
        </button>
      )}

      {/* Anneau de chargement, discret, pendant la mise en mémoire tampon. */}
      {isBuffering && hasStarted && !hasError && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 z-20 h-9 w-9 -translate-x-1/2 -translate-y-1/2 animate-spin rounded-full border-2 border-creme/20 border-t-or"
        />
      )}

      {hasError && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-charcoal/85 px-8 text-center font-dmSans text-sm text-creme/80">
          La vidéo n&apos;a pas pu être chargée.
        </div>
      )}

      {notice && (
        <p
          role="status"
          className="pointer-events-none absolute left-1/2 top-5 z-30 -translate-x-1/2 rounded-full border border-or/40 bg-charcoal/80 px-4 py-1.5 font-dmSans text-[11px] uppercase tracking-[0.18em] text-creme/90 backdrop-blur"
        >
          {notice}
        </p>
      )}

      {/* Barre de contrôles, posée sur un dégradé pour rester lisible. */}
      <div
        className={`absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-charcoal via-charcoal/70 to-transparent px-4 pb-4 pt-12 transition-opacity duration-200 ease-out motion-reduce:transition-none ${
          controlsVisible || !isPlaying
            ? "opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div
          ref={trackRef}
          role="slider"
          tabIndex={0}
          aria-label="Progression de la vidéo"
          aria-valuemin={0}
          aria-valuemax={Math.round(duration)}
          aria-valuenow={Math.round(currentTime)}
          aria-valuetext={`${formatTime(currentTime)} sur ${formatTime(duration)}`}
          onPointerDown={handleTrackPointerDown}
          onPointerMove={handleTrackPointerMove}
          onPointerUp={endScrub}
          onPointerCancel={endScrub}
          onKeyDown={(event) => {
            if (event.key === "ArrowRight") {
              event.preventDefault();
              seekBy(SEEK_STEP_SEC);
            } else if (event.key === "ArrowLeft") {
              event.preventDefault();
              seekBy(-SEEK_STEP_SEC);
            }
          }}
          className="group/track relative flex h-4 w-full cursor-pointer touch-none items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-or"
        >
          <span className="absolute inset-x-0 h-[3px] rounded-full bg-creme/15" />
          <span
            aria-hidden="true"
            className="absolute left-0 h-[3px] rounded-full bg-creme/30"
            style={{ width: `${buffered}%` }}
          />
          <span
            aria-hidden="true"
            className="absolute left-0 h-[3px] rounded-full bg-or"
            style={{ width: `${progress}%` }}
          />
          <span
            aria-hidden="true"
            className="absolute h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-or opacity-0 transition-opacity duration-200 ease-out group-hover/track:opacity-100 group-focus-visible/track:opacity-100 motion-reduce:transition-none"
            style={{ left: `${progress}%` }}
          />
        </div>

        <div className="mt-3 flex items-center gap-2">
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? "Mettre en pause" : "Lire"}
            className={roundButton}
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>

          <span className="font-dmSans text-[11px] tabular-nums tracking-wide text-creme/70">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>

          <div className="ml-auto flex items-center gap-2">
            {/* Le curseur de volume se déplie au survol, sur pointeur fin. */}
            <div className="group/vol flex items-center">
              <button
                type="button"
                onClick={toggleMute}
                aria-label={isMuted ? "Rétablir le son" : "Couper le son"}
                className={roundButton}
              >
                {isMuted ? <SoundOffIcon /> : <SoundOnIcon />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={isMuted ? 0 : volume}
                aria-label="Volume"
                onChange={(event) => {
                  const next = Number(event.target.value);
                  const video = videoRef.current;
                  setVolume(next);
                  if (!video) return;
                  video.volume = next;
                  video.muted = next === 0;
                  setIsMuted(video.muted);
                }}
                className="ml-0 hidden h-1 w-0 cursor-pointer appearance-none rounded-full bg-creme/20 opacity-0 accent-or transition-[width,opacity,margin] duration-200 ease-out group-hover/vol:ml-2 group-hover/vol:w-16 group-hover/vol:opacity-100 group-focus-within/vol:ml-2 group-focus-within/vol:w-16 group-focus-within/vol:opacity-100 motion-reduce:transition-none sm:block"
              />
            </div>

            {sources.length > 1 && (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen((open) => !open);
                    revealControls();
                  }}
                  aria-label="Qualité de la vidéo"
                  aria-haspopup="menu"
                  aria-expanded={menuOpen}
                  aria-controls={menuId}
                  className={roundButton}
                >
                  <GearIcon />
                </button>
                {menuOpen && (
                  <div
                    id={menuId}
                    role="menu"
                    aria-label="Qualité"
                    className="absolute bottom-12 right-0 min-w-[7.5rem] origin-bottom-right rounded-2xl border border-creme/10 bg-charcoal/95 p-1.5 backdrop-blur"
                  >
                    {sources.map((source, index) => (
                      <button
                        key={source.label}
                        type="button"
                        role="menuitemradio"
                        aria-checked={index === safeIndex}
                        onClick={() => changeQuality(index)}
                        className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left font-dmSans text-xs text-creme/80 transition-colors duration-200 ease-out hover:bg-creme/5 hover:text-or focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-or motion-reduce:transition-none"
                      >
                        <span
                          aria-hidden="true"
                          className={`h-1.5 w-1.5 rounded-full ${
                            index === safeIndex ? "bg-or" : "bg-transparent"
                          }`}
                        />
                        {source.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            <button
              type="button"
              onClick={toggleFullscreen}
              aria-label={isFullscreen ? "Quitter le plein écran" : "Plein écran"}
              className={roundButton}
            >
              <FullscreenIcon active={isFullscreen} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
