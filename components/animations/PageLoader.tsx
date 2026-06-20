"use client";

import { motion, type Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 0,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

const dotVariants: Variants = {
  hidden: { scale: 0.8, opacity: 0.5 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.4,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut",
    },
  },
};

const pathVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      duration: 1.5,
      ease: "easeInOut",
    },
  },
};

export function PageLoader() {

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(8,8,8,0.95)] backdrop-blur-xl"
    >
      <div className="relative flex items-center gap-4">
        {/* Terminal icon animation */}
        <motion.svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[var(--accent-primary)]"
          initial="hidden"
          animate="visible"
        >
          <motion.path
            d="M4 17l6-6-6-6"
            variants={pathVariants}
          />
          <motion.path
            d="M12 19h8"
            variants={pathVariants}
            transition={{ delay: 0.2 }}
          />
        </motion.svg>

        {/* Loading dots */}
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              variants={dotVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: i * 0.15 }}
              className="w-2 h-2 rounded-full bg-[var(--accent-secondary)]"
            />
          ))}
        </div>
      </div>

      {/* Loading text */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="absolute bottom-20 font-mono text-[0.7rem] text-[var(--text-muted)] tracking-wider"
      >
        systemctl start loading.service
      </motion.div>
    </motion.div>
  );
}
