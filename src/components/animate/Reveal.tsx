"use client";
import { motion, useAnimation, useInView, type Variants, type HTMLMotionProps } from "framer-motion";
import { useEffect, useRef } from "react";

interface RevealProps extends HTMLMotionProps<"div"> {
  variants?: Variants;
  amount?: number;       // Qué tanto del elemento debe entrar al viewport (0–1)
  margin?: string;       // Margen de activación tipo CSS ("-10% 0px")
  once?: boolean;        // Si true, solo anima la primera vez
  retrigger?: boolean;   // Si true, re-anima cada vez que entra/sale
}

export default function Reveal({
  children,
  className,
  variants,
  amount = 0.25,
  margin = "-10% 0px -10% 0px",
  once = false,
  retrigger = true,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const controls = useAnimation();

  const inView = useInView(ref, {
    amount,
    once,
    // fix del tipo MarginType para TypeScript
    margin: margin as unknown as any,
  });

  useEffect(() => {
    if (inView) {
      controls.start("show");
    } else if (retrigger) {
      controls.start("hidden");
    }
  }, [inView, retrigger, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
