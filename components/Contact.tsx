import Link from "next/link";
import { CONTACT_LABEL, CONTACT_URL } from "@/lib/site";

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
        <Link href={CONTACT_URL} className="btn-primary">
          {CONTACT_LABEL}
        </Link>
      </div>
    </section>
  );
};
