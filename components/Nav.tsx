"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { WHATSAPP_LABEL, WHATSAPP_URL } from "@/lib/site";

const LINKS = [
  { label: "Immobilier", hash: "#Immobilier" },
  { label: "Entreprises", hash: "#NotreTravail" },
  { label: "Votre projet", hash: "#Accompagnement" },
  { label: "L’équipe", hash: "#APropos" },
  { label: "Contact", hash: "#Contact" },
] as const;

// Sur l'accueil, le CTA de la barre attend d'être bien engagé dans le scroll
// pour ne pas doubler celui du hero. 200 px : la barre a déjà pris son fond
// charcoal (40 px), donc le bouton apparaît sur un aplat et non sur la vidéo.
const CTA_SCROLL_THRESHOLD = 200;

function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const whatsappColors = pathname === "/contact"
    ? "border-[#25D366] bg-[#25D366] hover:text-[#25D366]"
    : "border-or bg-or hover:text-or";
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [open, setOpen] = useState(false);

  // Fond opaque + bordure dès qu'on quitte le haut de page ; le CTA de la
  // barre n'apparaît qu'un peu plus bas (le hero a déjà le sien).
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      setPastHero(window.scrollY > CTA_SCROLL_THRESHOLD);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Menu mobile : scroll du body bloqué + fermeture à Escape.
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  // Sur la page d'accueil les ancres défilent en douceur ; ailleurs on laisse
  // Next router naviguer vers "/#Section".
  const handleAnchor = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, hash: string) => {
      setOpen(false);
      if (!isHome) return;
      e.preventDefault();
      document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
    },
    [isHome]
  );

  const hrefFor = (hash: string) => (isHome ? hash : `/${hash}`);

  // Ailleurs que sur l'accueil, le CTA est visible en permanence.
  const ctaVisible = !isHome || pastHero;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Panneau mobile placé avant la barre pour que le burger reste au-dessus. */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 bg-charcoal lg:hidden"
          >
            <nav className="flex h-full flex-col justify-center gap-6 px-6 pb-16">
              {LINKS.map((link, i) => (
                <motion.div
                  key={link.hash}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.06 * i, ease: "easeOut" }}
                >
                  <a
                    href={hrefFor(link.hash)}
                    onClick={(e) => handleAnchor(e, link.hash)}
                    className="font-unbounded text-3xl font-bold text-creme transition-colors duration-300 hover:text-or"
                  >
                    {link.label}
                  </a>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.36, ease: "easeOut" }}
                className="mt-6"
              >
                <a
                  href={WHATSAPP_URL}
                  onClick={() => setOpen(false)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-block rounded-full border px-8 py-4 font-dmSans text-xs font-bold uppercase tracking-[0.1em] text-charcoal transition-colors duration-500 hover:bg-charcoal ${whatsappColors}`}
                >
                  {WHATSAPP_LABEL}
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className={`relative flex h-16 items-center justify-between px-6 transition-all duration-300 lg:h-[72px] lg:px-10 ${
          scrolled && !open
            ? "border-b border-creme/10 bg-charcoal/80 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="font-unbounded text-lg font-extrabold tracking-wide text-creme transition-colors duration-300 hover:text-or lg:text-xl"
        >
          JFS VISUAL
        </Link>

        <nav className="hidden items-center gap-9 lg:flex">
          {LINKS.map((link) => (
            <a
              key={link.hash}
              href={hrefFor(link.hash)}
              onClick={(e) => handleAnchor(e, link.hash)}
              className="group relative font-dmSans text-sm text-creme/85 transition-colors duration-300 hover:text-creme"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#25D366] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* L'espace reste réservé (opacité seule) pour ne pas décaler les liens. */}
        <a
          href={WHATSAPP_URL}
          aria-hidden={!ctaVisible}
          tabIndex={ctaVisible ? undefined : -1}
          className={`hidden rounded-full border px-6 py-3 font-dmSans text-xs font-bold uppercase tracking-[0.1em] text-charcoal transition-all duration-300 hover:bg-charcoal lg:inline-block ${whatsappColors} ${
            ctaVisible
              ? "translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-1 opacity-0"
          }`}
         target="_blank" rel="noopener noreferrer">
          {WHATSAPP_LABEL}
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          className="relative h-10 w-10 lg:hidden"
        >
          <span
            className={`absolute left-1/2 block h-px w-6 -translate-x-1/2 bg-creme transition-all duration-300 ${
              open ? "top-1/2 rotate-45" : "top-[15px]"
            }`}
          />
          <span
            className={`absolute left-1/2 block h-px w-6 -translate-x-1/2 bg-creme transition-all duration-300 ${
              open ? "top-1/2 -rotate-45" : "top-[25px]"
            }`}
          />
        </button>
      </div>
    </header>
  );
}

export default Nav;
