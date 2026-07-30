"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

const EXPO = [0.16, 1, 0.3, 1] as const;

export default function FadeIn({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.95, delay, ease: EXPO }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
