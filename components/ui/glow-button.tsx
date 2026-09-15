"use client";

import { forwardRef, useState, type AnchorHTMLAttributes, type ReactNode } from "react";

interface GlowButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Texte du bouton. */
  label: string;
  /** Icône affichée après le texte (SVG inline). */
  icon?: ReactNode;
}

/**
 * Lien en forme de bouton entouré d'un halo lumineux qui tourne lentement,
 * s'intensifie au survol et se contracte brièvement au clic.
 * Les styles vivent dans app/globals.css (classe .glow-btn).
 */
export const GlowButton = forwardRef<HTMLAnchorElement, GlowButtonProps>(
  ({ label, icon, className = "", onClick, ...rest }, ref) => {
    const [clicked, setClicked] = useState(false);

    return (
      <a
        ref={ref}
        {...rest}
        className={`glow-btn ${className}`.trim()}
        data-state={clicked ? "clicked" : undefined}
        onClick={(event) => {
          setClicked(true);
          setTimeout(() => setClicked(false), 200);
          onClick?.(event);
        }}
      >
        <span className="relative z-10 flex items-center justify-center gap-2.5">
          {label}
          {icon}
        </span>
      </a>
    );
  }
);

GlowButton.displayName = "GlowButton";
