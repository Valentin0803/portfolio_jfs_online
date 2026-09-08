"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { BOOKING_LABEL, BOOKING_URL } from "@/lib/site";

const LINKS = [
  { label: "À propos", hash: "#APropos" },
  { label: "Offres", hash: "#Offres" },
  { label: "Réalisations", hash: "#NotreTravail" },
  { label: "Services", hash: "#NosServices" },
  { label: "Contact", hash: "#Contact" },
] as const;

function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Fond opaque + bordure dès qu'on quitte le haut de page.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
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
                <Link
                  href={BOOKING_URL}
                  onClick={() => setOpen(false)}
                  className="inline-block rounded-full border border-or bg-or px-8 py-4 font-dmSans text-xs font-bold uppercase tracking-[0.1em] text-charcoal transition-colors duration-500 hover:bg-charcoal hover:text-or"
                >
                  {BOOKING_LABEL}
                </Link>
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
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-or transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <Link
          href={BOOKING_URL}
          className="hidden rounded-full border border-or bg-or px-6 py-3 font-dmSans text-xs font-bold uppercase tracking-[0.1em] text-charcoal transition-colors duration-500 hover:bg-charcoal hover:text-or lg:inline-block"
        >
          {BOOKING_LABEL}
        </Link>

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
