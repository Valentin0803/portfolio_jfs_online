import Link from "next/link";
import { WHATSAPP_LABEL, WHATSAPP_URL } from "@/lib/site";

export const Contact = () => {
  return (
    <section
      id="Contact"
      className="font-dmSans text-center bg-charcoal border-t border-white/5 py-24 lg:py-40 px-6"
    >
      <h2 className="font-unbounded font-bold text-3xl lg:text-6xl text-creme max-w-[16ch] mx-auto mb-5 leading-tight">
        Vous souhaitez en savoir plus ?
      </h2>
      <p className="text-creme/65 max-w-[46ch] mx-auto mb-11">
        Nos méthodes de travail, nos services, ou juste discuter de votre
        projet.
      </p>
      <div className="flex flex-col items-center">
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
          <span className="flex gap-3 items-center px-9 py-[18px] rounded-full bg-or font-bold text-xs tracking-[0.1em] uppercase border-or border text-charcoal transform hover:scale-105 hover:bg-charcoal hover:border-or hover:text-or transition-colors duration-500">
            {WHATSAPP_LABEL}
          </span>
        </a>
        <p className="text-xs text-creme/60 mt-4">
          Un premier échange, sans engagement
        </p>
        <Link
          href="/contact"
          className="mt-6 text-sm text-creme/70 underline underline-offset-4 hover:text-or transition-colors duration-300"
        >
          ou écrivez-nous via le formulaire
        </Link>
      </div>
    </section>
  );
};
