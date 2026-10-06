"use client";

import { useEffect, useId, useRef, useState } from "react";
import { reseaux } from "@/lib/socials";

export default function SocialMenu({ mobile = false }: { mobile?: boolean }) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    const outside = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
    };
  }, [open]);

  return (
    <div ref={root} className="relative" onBlur={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget as Node)) setOpen(false);
    }}>
      <button ref={button} type="button" aria-expanded={open} aria-controls={id}
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-2 text-creme/85 transition-colors hover:text-or focus-visible:outline-or ${mobile ? "font-unbounded text-2xl font-bold" : "py-2 font-dmSans text-sm"}`}>
        Nos réseaux
        <svg aria-hidden="true" viewBox="0 0 16 16" className={`h-4 w-4 transition-transform motion-reduce:transition-none ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m4 6 4 4 4-4" /></svg>
      </button>
      <ul id={id} hidden={!open} className={mobile ? "mt-4 grid grid-cols-2 gap-2" : "absolute right-0 top-full mt-3 w-56 rounded-2xl border border-creme/15 bg-[#171510] p-2 shadow-xl"}>
        {reseaux.map((network) => (
          <li key={network.href}>
            <a href={network.href} target="_blank" rel="noopener noreferrer" aria-label={`${network.label} (nouvel onglet)`}
              className="flex min-h-11 items-center gap-3 rounded-xl px-3 py-3 font-dmSans text-sm text-creme/85 transition-colors hover:bg-creme/10 hover:text-or focus-visible:outline-or">
              <svg aria-hidden="true" viewBox={network.viewBox} className="h-4 w-4 shrink-0 fill-current"><path fillRule="evenodd" clipRule="evenodd" d={network.path} /></svg>
              {network.label.replace("JFS Visual sur ", "")}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
