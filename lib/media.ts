// Médias lourds (films, posters) servis depuis un bucket Cloudflare R2 public.
// Le bucket répond aux requêtes Range (206), la balise <video> native peut donc
// lire et chercher dans le fichier sans lecteur tiers.

/** Racine publique du bucket R2, sans barre oblique finale. */
export const MEDIA_BASE_URL =
  "https://pub-97534147431e4106b6ac17dbea8e4874.r2.dev";

/** Construit l'URL absolue d'un média du bucket à partir de son chemin. */
export function mediaUrl(path: string): string {
  return `${MEDIA_BASE_URL}/${path.replace(/^\/+/, "")}`;
}

/** Un encodage disponible pour une même vidéo, proposé dans le sélecteur de qualité. */
export type VideoSource = {
  /** Libellé affiché dans le menu qualité. */
  label: "1080p" | "4K" | string;
  src: string;
  width: number;
  height: number;
  /** Débit indicatif, utile pour documenter le poids d'une option. */
  bitrateMbps?: number;
};

/** Une vidéo du site, avec son poster et ses encodages. */
export type VideoAsset = {
  slug: string;
  titre: string;
  poster: string;
  ratio: "9/16" | "16/9";
  /** Première source = qualité par défaut, jamais la 4K. */
  sources: VideoSource[];
  dureeSec?: number;
};

/**
 * « 50 ans Boubet », film vertical 2160x3840, 25 fps, H.264 AAC.
 * La 4K est déclarée mais pas encore déposée sur le bucket : le lecteur doit
 * savoir revenir au 1080p si la source répond en erreur.
 */
export const boubetVideo: VideoAsset = {
  slug: "boubet-50-ans",
  titre: "50 ans Boubet",
  poster: mediaUrl("boubet-50-ans-poster.jpg"),
  ratio: "9/16",
  sources: [
    {
      label: "1080p",
      src: mediaUrl("boubet-50-ans-1080p.mp4"),
      width: 1080,
      height: 1920,
      bitrateMbps: 5.5,
    },
    {
      label: "4K",
      src: mediaUrl("boubet-50-ans-4k.mp4"),
      width: 2160,
      height: 3840,
      bitrateMbps: 35,
    },
  ],
  dureeSec: 200,
};
