"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useMediaQuery } from "@/hooks/use-media-query"

export function FancyLogo() {
  const [isHovered, setIsHovered] = useState(false)
  const [rotation, setRotation] = useState(0)
  const isSmallScreen = useMediaQuery("(max-width: 640px)")

  // Continuous baseball rotation animation
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 1) % 360)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  // Adjust sizes based on screen size
  const baseballSize = isSmallScreen ? 36 : 48
  const flameSize = isSmallScreen ? { width: 28, height: 36 } : { width: 36, height: 48 }
  const textClass = isSmallScreen ? "text-xl" : "text-2xl"
  const subtextClass = isSmallScreen ? "text-xs" : "text-sm"
  const marginLeft = isSmallScreen ? "ml-10" : "ml-14"

  return (
    <Link href="/" className="relative flex items-center">
      <motion.div
        className="relative flex items-center"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Background glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500 to-orange-400 blur-xl opacity-20"
          animate={{
            scale: isHovered ? [1, 1.2, 1] : [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />

        {/* Baseball */}
        <motion.div
          className="relative z-10"
          style={{ rotate: rotation }}
          animate={isHovered ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 0.5 }}
        >
          <svg
            width={baseballSize}
            height={baseballSize}
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-lg"
          >
            {/* Baseball outer circle */}
            <circle cx="24" cy="24" r="22" fill="white" stroke="#333" strokeWidth="2" />

            {/* Baseball stitches */}
            <path d="M24 2C24 2 28 8 28 16C28 24 20 28 12 28" stroke="#E11D48" strokeWidth="2" strokeLinecap="round" />
            <path
              d="M24 46C24 46 20 40 20 32C20 24 28 20 36 20"
              stroke="#E11D48"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>

        {/* Flame */}
        <motion.div
          className="absolute z-20"
          style={{ left: isSmallScreen ? "4px" : "6px", top: isSmallScreen ? "-2px" : "-2px" }}
          animate={{
            y: isHovered ? [0, -5, 0] : [0, -3, 0],
          }}
          transition={{
            duration: 1,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          <svg
            width={flameSize.width}
            height={flameSize.height}
            viewBox="0 0 36 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-lg"
          >
            <motion.path
              d="M18 0C18 0 22 9 22 18C22 22 20 25 18 27C16 29 13 30 10 29C10 29 12 31 15 32C18 33 22 32 25 30C28 28 30 24 30 18C30 9 24 1 18 0Z"
              fill="url(#flame-gradient-1)"
              animate={{
                scale: isHovered ? [1, 1.1, 1] : [1, 1.05, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
            <motion.path
              d="M19 24C19 24 22 30 22 36C22 39 21 42 19 43C17 44 14 44 12 43C12 43 14 45 17 46C20 47 23 46 25 44C27 42 28 39 28 36C28 30 24 24 19 24Z"
              fill="url(#flame-gradient-2)"
              animate={{
                scale: isHovered ? [1, 1.15, 1] : [1, 1.05, 1],
              }}
              transition={{
                duration: 1.2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                delay: 0.2,
              }}
            />
            <motion.path
              d="M16 18C16 18 13 24 13 30C13 33 14 36 16 37C18 38 21 38 24 37C24 37 22 39 19 40C16 41 13 40 11 38C9 36 8 33 8 30C8 24 12 18 16 18Z"
              fill="url(#flame-gradient-3)"
              animate={{
                scale: isHovered ? [1, 1.12, 1] : [1, 1.05, 1],
              }}
              transition={{
                duration: 1.3,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                delay: 0.4,
              }}
            />

            {/* Gradients for flame */}
            <defs>
              <linearGradient id="flame-gradient-1" x1="18" y1="0" x2="18" y2="32" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FFDD00" />
                <stop offset="1" stopColor="#FF6B00" />
              </linearGradient>
              <linearGradient id="flame-gradient-2" x1="19" y1="24" x2="19" y2="46" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FF6B00" />
                <stop offset="1" stopColor="#E11D48" />
              </linearGradient>
              <linearGradient id="flame-gradient-3" x1="16" y1="18" x2="16" y2="40" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FF6B00" />
                <stop offset="1" stopColor="#E11D48" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Text */}
        <div className={`${marginLeft} flex flex-col`}>
          <div className="flex items-center">
            <motion.span
              className={`${textClass} font-extrabold bg-gradient-to-r from-red-600 to-orange-500 text-transparent bg-clip-text`}
              animate={isHovered ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 0.5 }}
            >
              STAY HOT
            </motion.span>
          </div>
          <motion.span
            className={`${subtextClass} font-bold tracking-wider text-gray-700`}
            animate={isHovered ? { y: [0, -2, 0] } : {}}
            transition={{ duration: 0.5 }}
          >
            BASEBALL
          </motion.span>
        </div>
      </motion.div>
    </Link>
  )
}
