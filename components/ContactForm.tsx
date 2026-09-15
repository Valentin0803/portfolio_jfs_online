"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { WHATSAPP_URL } from "@/lib/site";
import { submitContact } from "@/lib/contact-submit";

// Classes communes aux champs du formulaire.
const CHAMP =
  "w-full rounded-xl border border-creme/25 bg-[#24221E] px-4 py-3 font-dmSans text-base text-creme placeholder:text-creme/50 focus:border-or focus:outline-none focus:ring-2 focus:ring-or/30";
const LABEL =
  "mb-2 block font-dmSans text-sm font-medium text-creme/90";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const [error, setError] = useState("");
  const inFlight = useRef(false);
  const confirmation = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (status === "success") confirmation.current?.focus();
  }, [status]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    inFlight.current = true;
    setError("");
    setStatus("sending");
    try {
      await submitContact(data);
      form.reset();
      setStatus("success");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "L’envoi n’a pas pu être confirmé.");
      setStatus("error");
    } finally {
      inFlight.current = false;
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-or/30 bg-[#171510] p-6 sm:p-8">
        <span aria-hidden="true" className="mb-8 flex h-14 w-14 items-center justify-center rounded-full bg-or/15 text-3xl text-or">✓</span>
        <p className="mb-4 font-dmSans text-xs uppercase tracking-[0.2em] text-or">Merci pour votre confiance</p>
        <h2 ref={confirmation} tabIndex={-1} className="font-unbounded text-2xl font-bold leading-tight text-creme outline-none sm:text-3xl">Votre message a bien été envoyé.</h2>
        <p className="mt-5 font-dmSans text-base leading-relaxed text-creme/75">Nous revenons vers vous sous 48 h pour échanger sur votre projet.</p>
        <Link href="/#NotreTravail" className="mt-8 inline-block rounded-full border border-or bg-or px-6 py-3 font-dmSans text-xs font-bold uppercase tracking-widest text-charcoal transition-colors hover:bg-transparent hover:text-or">Découvrir nos réalisations</Link>
        <button type="button" onClick={() => setStatus("idle")} className="mt-6 block font-dmSans text-sm text-creme/70 underline underline-offset-4 hover:text-or">Envoyer un autre message</button>
      </div>
    );
  }

  return (
          <form
            onSubmit={handleSubmit}
            aria-busy={status === "sending"}
            className="rounded-2xl border border-creme/15 bg-[#171510] p-6 sm:p-8"
          >
            <div className="mb-7 border-b border-creme/15 pb-6">
              <h2 className="font-unbounded text-xl font-bold text-creme sm:text-2xl">Décrivez votre projet</h2>
              <p className="mt-2 font-dmSans text-sm leading-relaxed text-creme/75">Réponse sous 48 h · Devis gratuit, sans engagement</p>
              <p className="mt-3 font-dmSans text-xs text-creme/60">Les champs marqués d’un * sont obligatoires.</p>
            </div>
            <input
              type="hidden"
              name="access_key"
              value="805924a7-d418-4dab-8b62-dc64d3227d9a"
            />
            <input type="hidden" name="subject" value="Nouveau projet depuis le site JFS Visual" />
            <input type="hidden" name="from_name" value="JFS Visual" />
            <fieldset disabled={!ready || status === "sending"} className="m-0 min-w-0 border-0 p-0">
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

            <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">
              <div>
                <label htmlFor="nom" className={LABEL}>
                  Nom <span className="text-or">*</span>
                </label>
                <input
                  id="nom"
                  name="nom"
                  type="text"
                  autoComplete="family-name"
                  required
                  className={CHAMP}
                />
              </div>

              <div>
                <label htmlFor="prenom" className={LABEL}>
                  Prénom <span className="text-or">*</span>
                </label>
                <input
                  id="prenom"
                  name="prenom"
                  type="text"
                  autoComplete="given-name"
                  required
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
                  placeholder="vous@entreprise.fr"
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

              <div>
                <label htmlFor="phone" className={LABEL}>
                  Téléphone <span className="text-or">*</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  pattern={"(?:\\+33|0)[1-9](?:[ .\\-]?[0-9]{2}){4}"}
                  title="Numéro français, par exemple 06 12 34 56 78 ou +33612345678"
                  placeholder="06 12 34 56 78"
                  className={CHAMP}
                  required
                />
              </div>

              <div>
                <label htmlFor="secteur" className={LABEL}>
                  Secteur d’activité
                </label>
                <select
                  id="secteur"
                  name="secteur"
                  defaultValue=""
                  className={CHAMP}
                >
                  <option value="" disabled>Choisir un secteur</option>
                  <option value="Industrie">Industrie</option>
                  <option value="Agence Immobilière">Agence Immobilière</option>
                  <option value="PME">PME</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="message" className={LABEL}>
                  Message <span className="text-or">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Votre activité, vos besoins, vos délais…"
                  className={CHAMP}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full border border-or bg-or px-9 py-4 font-dmSans text-xs font-bold uppercase tracking-widest text-charcoal transition-colors duration-300 hover:bg-charcoal hover:text-or disabled:cursor-wait disabled:opacity-60"
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
              {status === "sending" ? "Envoi en cours…" : "Envoyer mon message"}
            </button>

            </fieldset>
            <div aria-live="polite" aria-atomic="true">
              {status === "sending" && <p className="mt-4 font-dmSans text-sm text-creme/70">Votre message est en cours d’envoi.</p>}
            </div>
            {status === "error" && (
              <div role="alert" className="mt-5 rounded-xl border border-red-400/30 bg-red-400/5 p-4 font-dmSans text-sm leading-relaxed text-creme">
                <p>{error}</p>
                <p className="mt-2 text-creme/70">Vos informations sont conservées. Vous pouvez réessayer ou <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-or underline underline-offset-4">nous écrire sur WhatsApp</a>.</p>
              </div>
            )}
            <noscript><p className="mt-4 font-dmSans text-sm text-creme">Activez JavaScript pour utiliser ce formulaire, ou écrivez-nous à <a href="mailto:jfsvisual@gmail.com" className="underline">jfsvisual@gmail.com</a>.</p></noscript>
            <p className="mt-4 font-dmSans text-xs text-creme/65">
              Vos données ne servent qu&apos;à vous répondre :{" "}
              <Link
                href="/politiqueDeConfidentialite"
                className="underline underline-offset-4 transition-colors duration-300 hover:text-or"
              >
                politique de confidentialité
              </Link>
            </p>
          </form>
  );
}
