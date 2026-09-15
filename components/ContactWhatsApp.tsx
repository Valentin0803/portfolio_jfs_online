import Image from "next/image";
import martin from "@/public/team/Martin.jpg";
import { WHATSAPP_LABEL, WHATSAPP_URL } from "@/lib/site";

export default function ContactWhatsApp() {
  return (
    <section aria-labelledby="whatsapp-heading" className="rounded-2xl border border-[#25D366]/25 bg-[#25D366]/5 p-6 sm:p-7">
      <p className="mb-5 font-dmSans text-xs font-medium uppercase tracking-[0.15em] text-[#25D366]">Par message</p>
      <div className="flex items-center gap-4">
        <Image src={martin} alt="Martin Ribot" width={56} height={56} className="h-14 w-14 shrink-0 rounded-full object-cover object-top" />
        <div>
          <h2 id="whatsapp-heading" className="font-unbounded text-lg font-bold text-creme">Écrivez à Martin</h2>
          <p className="mt-1 font-dmSans text-sm text-creme/65">Votre contact chez JFS Visual</p>
        </div>
      </div>
      <p className="mt-5 font-dmSans text-base leading-relaxed text-creme/80">Une question ou une idée à partager ? Commencez la conversation sur WhatsApp.</p>
      <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="mt-6 flex w-full items-center justify-center rounded-full border border-[#25D366] bg-[#25D366] px-4 py-3.5 text-center font-dmSans text-sm font-bold text-charcoal transition-colors hover:bg-transparent hover:text-[#25D366]">
        {WHATSAPP_LABEL} <span aria-hidden="true" className="ml-2">↗</span>
      </a>
      <p className="mt-3 text-center font-dmSans text-xs text-creme/65">07 81 10 37 21 · Sans engagement</p>
    </section>
  );
}
