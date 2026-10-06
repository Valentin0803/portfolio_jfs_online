import Link from "next/link";

const liensLegaux = [
  { href: "/mentionsLegales", label: "Mentions Légales" },
  { href: "/cgv", label: "Conditions de ventes générales" },
  { href: "/politiqueDeConfidentialite", label: "Politique de confidentialité" },
];

import { reseaux } from "@/lib/socials";

export const PiedPage = () => {
  const annee = new Date().getFullYear();

  return (
    <footer className="border-t border-creme/10 pb-12">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
          <div>
            <p className="font-unbounded font-extrabold text-creme text-lg">
              JFS VISUAL
            </p>
            <p className="font-dmSans text-xs text-creme/50 mt-1">
              Production vidéo &amp; drone · Caen · Aix-les-Bains
            </p>
          </div>

          <nav
            aria-label="Liens légaux"
            className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-8"
          >
            {liensLegaux.map((lien) => (
              <Link
                key={lien.href}
                href={lien.href}
                className="font-dmSans text-sm text-creme/60 hover:text-or duration-150"
              >
                {lien.label}
              </Link>
            ))}
          </nav>

          <ul className="flex items-center gap-5">
            {reseaux.map((reseau) => (
              <li key={reseau.href}>
                <Link
                  href={reseau.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={reseau.label}
                  className="block text-creme/70 hover:text-or duration-150"
                >
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    className="fill-current"
                    width="20"
                    height="20"
                    viewBox={reseau.viewBox}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d={reseau.path}
                    />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <p className="font-dmSans text-xs text-creme/40 mt-10">
          © {annee} JFS Visual
        </p>
      </div>
    </footer>
  );
};
