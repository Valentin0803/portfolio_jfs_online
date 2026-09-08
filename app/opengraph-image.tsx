import { ImageResponse } from "next/og";

export const alt = "JFS Visual, production vidéo immobilière en Normandie et Savoie";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const CHARCOAL = "#0A0907";
const OR = "#C9A24B";
const CREME = "#F3EDE1";

/**
 * Image de partage (Open Graph / Twitter Card), 1200×630.
 *
 * Note police : on utilise la police embarquée par défaut de `next/og`.
 * Unbounded n'est pas chargée ici car Google Fonts ne sert plus que du WOFF2
 * (vérifié sur les API `css` et `css2`), format que satori, le moteur de
 * rendu de `next/og`, ne sait pas lire (« Unsupported OpenType signature
 * wOF2 »). Il faudrait embarquer un .ttf dans le dépôt pour aller plus loin.
 */
export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: CHARCOAL,
          padding: "0 96px",
          position: "relative",
        }}
      >
        {/* Halo doré discret en haut à droite */}
        <div
          style={{
            position: "absolute",
            top: -260,
            right: -180,
            width: 700,
            height: 700,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(201,162,75,0.28) 0%, rgba(201,162,75,0) 70%)",
            display: "flex",
          }}
        />

        {/* Filet doré vertical */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 14,
            background: OR,
            display: "flex",
          }}
        />

        <div
          style={{
            display: "flex",
            fontSize: 24,
            letterSpacing: 8,
            color: OR,
            marginBottom: 34,
          }}
        >
          JFS-VISUAL.FR
        </div>

        <div
          style={{
            display: "flex",
            fontWeight: 700,
            fontSize: 118,
            letterSpacing: -2,
            color: CREME,
            lineHeight: 1,
          }}
        >
          JFS&nbsp;<span style={{ color: OR }}>VISUAL</span>
        </div>

        <div
          style={{
            display: "flex",
            width: 180,
            height: 5,
            background: OR,
            margin: "44px 0",
          }}
        />

        <div
          style={{
            display: "flex",
            fontSize: 40,
            color: CREME,
            opacity: 0.85,
          }}
        >
          Production vidéo immobilière · Normandie · Savoie
        </div>
      </div>
    ),
    size,
  );
}
