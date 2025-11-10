"use client"

import type React from "react"

import { useInView } from "framer-motion"
import { motion, type MotionProps } from "framer-motion"
import { useRef } from "react"

interface RevealProps extends MotionProps {
  children: React.ReactNode
  variants?: any
  className?: string
  retrigger?: boolean
  amount?: number | "all" | "some"
}

export default function Reveal({
  children,
  variants,
  className = "",
  retrigger = false,
  amount = 0.5,
  ...props
}: RevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: !retrigger,
    amount: amount as any,
  })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      variants={variants}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}
