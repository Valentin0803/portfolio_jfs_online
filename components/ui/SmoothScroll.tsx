"use client";
import { ReactLenis } from "lenis/react";

function SmoothScroll({ children }: any) {
  return <ReactLenis root>{children}</ReactLenis>;
}

export default SmoothScroll;
