"use client";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import { ReactNode, useRef } from "react";

interface ParallaxProps {
  children: ReactNode;
  image: StaticImageData;
  className?: string;
}

export const Parallax: React.FC<ParallaxProps> = ({
  children,
  image,
  className,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", ["10%"]]);
  return (
    <section className="relative h-96 overflow-hidden mb-40" ref={ref}>
      <motion.div className="absolute" style={{ top: y }}>
        <Image
          src={image}
          width={1000}
          height={1000}
          alt="parralax"
          className={cn("absolute", className)}
        />
        {children}
      </motion.div>
    </section>
  );
};
