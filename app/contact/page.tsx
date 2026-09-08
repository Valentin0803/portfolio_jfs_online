import type { Metadata } from "next";
import Link from "next/link";
import { BOOKING_LABEL, BOOKING_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez JFS Visual pour un devis de production vidéo, photo ou drone dédiée aux agences immobilières en Normandie.",
  alternates: {
    canonical: "/contact",
  },
};

// Coordonnées reprises telles quelles des mentions légales (app/mentionsLegales).
const TELEPHONE = "+33602344339";
const TELEPHONE_AFFICHE = "+33 6 02 34 43 39";
const EMAIL = "jfsvisual@gmail.com";

// Classes communes aux champs du formulaire.
const CHAMP =
  "w-full rounded-xl border border-creme/15 bg-charcoal px-4 py-3 font-dmSans text-sm text-creme placeholder:text-creme/30 focus:border-or focus:outline-none focus:ring-2 focus:ring-or/30";
const LABEL =
  "mb-2 block font-dmSans text-xs uppercase tracking-[0.2em] text-creme/60";

export default function Contact() {
  return (
    // La marge basse dégage le bouton d'envoi de la pilule rendez-vous fixe
    // affichée en mobile (voir components/MobileCta).
    <section className="px-6 pt-32 pb-32 lg:pt-40 lg:pb-32">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 lg:flex-row lg:items-start lg:gap-16">
        <div className="lg:w-5/12">
          <div className="mb-5 font-dmSans text-xs uppercase tracking-[0.25em] text-or">
            Contact
          </div>
          <h1 className="font-unbounded text-3xl font-bold leading-tight text-creme lg:text-5xl">
            Parlons de votre projet
          </h1>
          <p className="mt-7 max-w-[46ch] font-dmSans text-base text-creme/70">
            Décrivez-nous votre agence et ce que vous aimeriez montrer : nous
            revenons vers vous sous 48 h avec une proposition claire et un devis
            gratuit.
          </p>

          <div className="mt-10 flex flex-col gap-4 font-dmSans text-sm">
            <a
              href={`tel:${TELEPHONE}`}
              className="w-fit text-creme transition-colors duration-300 hover:text-or"
            >
              {TELEPHONE_AFFICHE}
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="w-fit text-creme transition-colors duration-300 hover:text-or"
            >
              {EMAIL}
            </a>
            <span className="text-creme/60">Caen · Normandie</span>
          </div>

          <div className="mt-10 rounded-2xl border border-creme/10 bg-[#100D08] p-6">
            <p className="font-dmSans text-sm text-creme/80">
              Vous préférez en parler de vive voix ?
            </p>
            <Link href={BOOKING_URL} className="mt-5 inline-block w-fit">
              <button className="rounded-full border border-or/40 px-6 py-2.5 font-dmSans text-xs font-bold uppercase tracking-widest text-creme transition-colors duration-300 hover:border-or hover:text-or">
                {BOOKING_LABEL}
              </button>
            </Link>
            <p className="mt-3 font-dmSans text-xs text-creme/60">
              30 min en visio, sans engagement
            </p>
          </div>
        </div>

        <div className="lg:w-7/12">
          <form
            action="https://api.web3forms.com/submit"
            method="POST"
            className="rounded-[2rem] border border-creme/10 bg-[#100D08] p-6 sm:p-10"
          >
            <input
              type="hidden"
              name="access_key"
              value="805924a7-d418-4dab-8b62-dc64d3227d9a"
            />
            <input
              type="hidden"
              name="redirect"
              value="https://web3forms.com/success"
            />
            {/* Piège anti-spam recommandé par Web3Forms : invisible pour les
                humains, rempli par les robots. */}
            <input
              type="checkbox"
              name="botcheck"
              className="hidden"
              style={{ display: "none" }}
              tabIndex={-1}
              aria-hidden="true"
            />

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="nom" className={LABEL}>
                  Nom
                </label>
                <input
                  id="nom"
                  name="nom"
                  type="text"
                  autoComplete="family-name"
                  className={CHAMP}
                />
              </div>

              <div>
                <label htmlFor="prenom" className={LABEL}>
                  Prénom
                </label>
                <input
                  id="prenom"
                  name="prenom"
                  type="text"
                  autoComplete="given-name"
                  className={CHAMP}
                />
              </div>

              <div>
                <label htmlFor="email" className={LABEL}>
                  E-mail <span className="text-or">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="vous@agence.fr"
                  className={CHAMP}
                  required
                />
              </div>

              <div>
                <label htmlFor="societe" className={LABEL}>
                  Société
                </label>
                <input
                  id="societe"
                  name="societe"
                  type="text"
                  autoComplete="organization"
                  className={CHAMP}
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="phone" className={LABEL}>
                  Téléphone <span className="text-or">*</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  pattern="^(\+33|0)[1-9](\d{2}){4}$"
                  placeholder="06 12 34 56 78"
                  className={CHAMP}
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="message" className={LABEL}>
                  Message <span className="text-or">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Votre agence, vos besoins, vos délais…"
                  className={CHAMP}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-8 flex items-center gap-2 rounded-full border border-or bg-or px-9 py-4 font-dmSans text-xs font-bold uppercase tracking-widest text-charcoal transition-colors duration-300 hover:bg-charcoal hover:text-or"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                />
              </svg>
              Envoyer
            </button>

            <p className="mt-4 font-dmSans text-xs text-creme/40">
              Vos données ne servent qu&apos;à vous répondre —{" "}
              <Link
                href="/politiqueDeConfidentialite"
                className="underline underline-offset-4 transition-colors duration-300 hover:text-or"
              >
                politique de confidentialité
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
