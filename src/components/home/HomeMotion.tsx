"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

type MotionSectionProps = {
  children: ReactNode;
  className?: string;
  hero?: boolean;
};

type MotionRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right";
};

const easing = [0.16, 1, 0.3, 1] as const;

export function MotionSection({
  children,
  className,
  hero = false
}: MotionSectionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      className={className}
      initial={
        reduceMotion
          ? false
          : { opacity: 0, y: hero ? 0 : 42, filter: "blur(10px)" }
      }
      animate={hero && !reduceMotion ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
      whileInView={
        !hero && !reduceMotion
          ? { opacity: 1, y: 0, filter: "blur(0px)" }
          : undefined
      }
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: hero ? 1.1 : 0.9, ease: easing }}
    >
      {children}
    </motion.section>
  );
}

export function MotionReveal({
  children,
  className,
  delay = 0,
  direction = "up"
}: MotionRevealProps) {
  const reduceMotion = useReducedMotion();
  const offset =
    direction === "left"
      ? { x: -32, y: 0 }
      : direction === "right"
        ? { x: 32, y: 0 }
        : { x: 0, y: 28 };

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { ...offset, opacity: 0 }}
      whileInView={reduceMotion ? undefined : { x: 0, y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay, ease: easing }}
    >
      {children}
    </motion.div>
  );
}
