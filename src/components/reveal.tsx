"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  // Visible in server-rendered HTML and when JavaScript is unavailable.
  return <motion.div className={className} initial={false} whileInView={reduced ? undefined : { y: [12, 0] }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.6, ease: "easeOut" }}>{children}</motion.div>;
}
