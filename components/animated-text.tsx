"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import type { JSX } from "react"

interface AnimatedTextProps {
  text: string
  className?: string
  once?: boolean
  delay?: number
  duration?: number
  staggerChildren?: number
  tag?: keyof JSX.IntrinsicElements
}

export function AnimatedText({
  text,
  className,
  once = true,
  delay = 0,
  duration = 0.05,
  staggerChildren = 0.03,
  tag = "p",
}: AnimatedTextProps) {
  const words = text.split(" ")

  // Variants for the container
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren: delay * i,
      },
    }),
  }

  // Variants for each word
  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  }

  const Tag = tag as any

  return (
    <motion.div
      style={{ overflow: "hidden" }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      className={cn("inline-block", className)}
    >
      <Tag className="inline">
        {words.map((word, index) => (
          <motion.span key={index} variants={child} className="inline-block mr-1 whitespace-nowrap">
            {word}
          </motion.span>
        ))}
      </Tag>
    </motion.div>
  )
}
