import Image from "next/image";
import martin from "@/public/team/Martin.jpg";
import { WHATSAPP_LABEL, WHATSAPP_URL } from "@/lib/site";
import { GlowButton } from "@/components/ui/glow-button";

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
      <div className="mt-6 flex justify-center">
        <GlowButton
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          label={WHATSAPP_LABEL}
          className="font-dmSans text-sm"
          icon={
            <svg aria-hidden="true" viewBox="0 0 32 32" className="h-5 w-5 fill-current">
              <path d="M16.004 3C8.833 3 3 8.83 3 16a12.9 12.9 0 0 0 1.93 6.8L3 29l6.39-1.87A13 13 0 1 0 16.004 3Zm0 23.6a10.6 10.6 0 0 1-5.4-1.48l-.39-.23-3.79 1.11 1.14-3.7-.25-.4A10.6 10.6 0 1 1 16.004 26.6Zm5.83-7.95c-.32-.16-1.89-.93-2.18-1.04-.29-.1-.5-.16-.72.16-.21.32-.82 1.04-1.01 1.25-.18.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.9-1.78-2.22-.18-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.18.21-.32.32-.53.1-.21.05-.4-.03-.56-.08-.16-.72-1.73-.98-2.37-.26-.62-.52-.54-.72-.55h-.61c-.21 0-.56.08-.85.4-.29.32-1.12 1.09-1.12 2.66s1.15 3.09 1.31 3.3c.16.21 2.26 3.45 5.47 4.84.76.33 1.36.53 1.82.68.77.24 1.46.21 2.01.13.61-.09 1.89-.77 2.16-1.52.27-.75.27-1.39.19-1.52-.08-.13-.29-.21-.61-.37Z" />
            </svg>
          }
        />
      </div>
      <p className="mt-3 text-center font-dmSans text-xs text-creme/65">07 81 10 37 21 · Sans engagement</p>
    </section>
  );
}
