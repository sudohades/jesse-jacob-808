"use client";

import { motion, type Variants } from "framer-motion";
import { type ReactNode } from "react";

interface FadeInUpProps {
  children:    ReactNode;
  delay?:      number;
  duration?:   number;
  className?:  string;
  once?:       boolean;
  amount?:     number;
}

const variants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show:   { opacity: 1, y: 0 },
};

export function FadeInUp({
  children,
  delay    = 0,
  duration = 0.55,
  className,
  once     = true,
  amount   = 0.2,
}: FadeInUpProps) {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.22, 0.61, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Stagger wrapper — children should each be FadeInUp items or other motion elements */
export function StaggerContainer({
  children,
  stagger    = 0.08,
  delayStart = 0,
  className,
}: {
  children:    ReactNode;
  stagger?:    number;
  delayStart?: number;
  className?:  string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: stagger, delayChildren: delayStart },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
