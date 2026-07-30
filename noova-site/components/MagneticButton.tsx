"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import type { ReactNode } from "react";
import { useRef } from "react";

// A subtle magnetic pull toward the cursor. Kept small — luxury, not gimmick.
export default function MagneticButton({
  children,
  href,
  variant = "solid",
  className = "",
}: {
  children: ReactNode;
  href: string;
  variant?: "solid" | "outline" | "ghost";
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 20, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 260, damping: 20, mass: 0.4 });

  function onMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * 0.28);
    y.set(relY * 0.28);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
  }

  const base =
    "group relative inline-flex items-center justify-center gap-3 rounded-full px-8 py-4 text-[0.78rem] uppercase tracking-wide2 transition-colors duration-500 ease-expo";
  const styles = {
    solid: "bg-ink text-paper hover:bg-cypress",
    outline: "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-paper",
    ghost: "text-ink hover:text-cypress",
  }[variant];

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={`${base} ${styles} ${className}`}
    >
      {children}
    </motion.a>
  );
}
