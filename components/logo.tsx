"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 font-bold text-xl">
      <motion.div className="relative flex items-center" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <motion.div
          className="absolute -z-10"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-red-600"
          >
            <path
              d="M20 5C12.268 5 6 11.268 6 19C6 26.732 12.268 33 20 33C27.732 33 34 26.732 34 19C34 11.268 27.732 5 20 5Z"
              fill="currentColor"
              fillOpacity="0.2"
            />
            <path
              d="M20 0C8.954 0 0 8.954 0 20C0 31.046 8.954 40 20 40C31.046 40 40 31.046 40 20C40 8.954 31.046 0 20 0ZM20 35C11.716 35 5 28.284 5 20C5 11.716 11.716 5 20 5C28.284 5 35 11.716 35 20C35 28.284 28.284 35 20 35Z"
              fill="currentColor"
            />
            <path
              d="M28 20C28 24.418 24.418 28 20 28C15.582 28 12 24.418 12 20C12 15.582 15.582 12 20 12C24.418 12 28 15.582 28 20Z"
              fill="currentColor"
            />
            <path
              d="M23 10L25 7M17 10L15 7M23 30L25 33M17 30L15 33M10 17L7 15M10 23L7 25M30 17L33 15M30 23L33 25"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>
        <motion.div
          className="ml-2"
          initial={{ rotate: 0 }}
          animate={{ rotate: [0, 5, 0, -5, 0] }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}
        >
          <svg
            width="24"
            height="32"
            viewBox="0 0 24 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-orange-500"
          >
            <path
              d="M12 0C12 0 15 6 15 12C15 14.5 14 16.5 12 18C10 19.5 7 20 4 19C4 19 6 21 9 22C12 23 15.5 22.5 18 20.5C20.5 18.5 22 15 22 11C22 6 19 1 12 0Z"
              fill="currentColor"
            />
            <path
              d="M13 16C13 16 16 20 16 24C16 26 15 28 13 29C11 30 8.5 30 6 29C6 29 8 31 11 32C14 33 17 32 19 30C21 28 22 25 22 22C22 18 19 14 13 16Z"
              fill="currentColor"
            />
            <path
              d="M10 12C10 12 7 16 7 20C7 22 8 24 10 25C12 26 14.5 26 17 25C17 25 15 27 12 28C9 29 6 28 4 26C2 24 1 21 1 18C1 14 4 10 10 12Z"
              fill="currentColor"
            />
          </svg>
        </motion.div>
        <span className="text-red-600 ml-2">STAY</span>
        <span className="ml-1">HOT</span>
        <span className="ml-1 text-gray-700">BASEBALL</span>
      </motion.div>
    </Link>
  )
}
