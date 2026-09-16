import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import ContactWhatsApp from "@/components/ContactWhatsApp";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez JFS Visual pour un devis de production vidéo, photo ou drone dédiée aux agences immobilières en Normandie et en Savoie, ou échangez avec Martin sur WhatsApp, sans engagement.",
  alternates: {
    canonical: "/contact",
  },
};

// Coordonnées reprises telles quelles des mentions légales (app/mentionsLegales).
const EMAIL = "jfsvisual@gmail.com";

export default function Contact() {
  return (
    <main className="px-5 pb-20 pt-28 sm:px-8 lg:pb-28 lg:pt-32">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 border-b border-creme/15 pb-8 lg:mb-12">
          <p className="mb-4 font-dmSans text-xs uppercase tracking-[0.2em] text-or">Contact</p>
          <h1 className="font-unbounded text-3xl font-bold leading-tight text-creme sm:text-4xl lg:text-5xl">Parlons de votre projet.</h1>
          <p className="mt-4 max-w-2xl font-dmSans text-base leading-relaxed text-creme/75">Un premier échange pour comprendre vos besoins. Par message ou via le formulaire, choisissez ce qui vous convient.</p>
        </header>
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-12">
          <aside className="min-w-0">
            <ContactWhatsApp />
            <div className="mt-8 px-1">
              <h2 className="font-dmSans text-sm font-bold text-creme">Nos coordonnées</h2>
              <dl className="mt-4 space-y-4 font-dmSans text-sm">
                <div><dt className="mb-1 text-creme/60">E-mail</dt><dd><a href={`mailto:${EMAIL}`} className="text-creme hover:text-or">{EMAIL}</a></dd></div>
                <div className="border-t border-creme/10 pt-4"><dt className="mb-1 text-creme/60">Où nous trouver</dt><dd className="leading-relaxed text-creme/85">Caen · Normandie<br />Aix-les-Bains · Savoie</dd></div>
              </dl>
            </div>
          </aside>
          <div className="min-w-0"><ContactForm /></div>
        </div>
      </div>
    </main>
  );
}
