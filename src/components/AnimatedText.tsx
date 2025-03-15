"use client";

import { motion } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";

interface AnimatedTextProps {
  text: string;
  className?: string;
  once?: boolean;
}

export function AnimatedText({ text, className = "", once = false }: AnimatedTextProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 12, stiffness: 100 },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: { type: "spring", damping: 12, stiffness: 100 },
    },
  };

  if (!isClient) return <div className={className}>{text}</div>;

  return (
    <motion.div
      style={{ overflow: "hidden", display: "flex", flexWrap: "wrap" }}
      variants={container}
      initial="hidden"
      animate="visible"
      className={className}
      whileInView={once ? "visible" : undefined}
      viewport={once ? { once: true } : undefined}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={child}
          style={{ marginRight: "0.25em", display: "inline-block" }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}

interface AnimatedHeadingProps {
  children: ReactNode;
  className?: string;
  size?: "h1" | "h2" | "h3";
  once?: boolean;
}

export function AnimatedHeading({ children, className = "", size = "h1", once = false }: AnimatedHeadingProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const baseClasses = {
    h1: "text-4xl md:text-5xl lg:text-6xl font-bold",
    h2: "text-3xl md:text-4xl font-bold",
    h3: "text-2xl md:text-3xl font-semibold",
  };

  if (!isClient) return <div className={`${baseClasses[size]} ${className}`}>{children}</div>;

  if (typeof children === "string") {
    return <AnimatedText text={children} className={`${baseClasses[size]} ${className}`} once={once} />;
  }

  return (
    <motion.div
      className={`${baseClasses[size]} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileInView={once ? { opacity: 1, y: 0 } : undefined}
      viewport={once ? { once: true } : undefined}
    >
      {children}
    </motion.div>
  );
}
