"use client";
import { motion } from "framer-motion";
import { MouseEvent, ReactNode, useRef, useState } from "react";

interface FramerProps {
  children: ReactNode;
}

interface Position {
  x: number;
  y: number;
}

export default function Framer({ children }: FramerProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });

  const handleMouse = (e: MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    if (ref.current) {
      const { height, width, left, top } = ref.current.getBoundingClientRect();
      const middleX = clientX - (left + width / 2);
      const middleY = clientY - (top + height / 2);
      setPosition({ x: middleX, y: middleY });
    }
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;
  return (
    <motion.div
      style={{ position: "relative" }}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 100, damping: 15, mass: 0.8 }}
    >
      {children}
    </motion.div>
  );
}
