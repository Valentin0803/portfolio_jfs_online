"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Fine barre or collée en haut de la fenêtre, dont la largeur suit la
 * progression du scroll. On anime `scaleX` (origine à gauche) plutôt que la
 * largeur : c'est composité par le GPU, donc fluide et sans reflow.
 */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 40,
    restDelta: 0.001,
  });

  // Sur une page qui ne défile pas, la barre n'a rien à raconter.
  const [scrollable, setScrollable] = useState(false);

  useEffect(() => {
    const update = () =>
      setScrollable(
        document.documentElement.scrollHeight - window.innerHeight > 1
      );
    update();
    window.addEventListener("resize", update);
    const observer = new ResizeObserver(update);
    observer.observe(document.documentElement);
    return () => {
      window.removeEventListener("resize", update);
      observer.disconnect();
    };
  }, []);

  if (!scrollable) return null;

  return (
    <motion.div
      aria-hidden
      style={{ scaleX: progress }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-or"
    />
  );
}

export default ScrollProgress;
