"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AnimatedBackground } from "../components/animated-background";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <AnimatedBackground />
      <div className="relative mx-auto max-w-md space-y-8 px-4 py-12 text-center z-10">
        <motion.div
          className="animate-float-slow"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="mb-6 inline-block rounded-full bg-background/90 p-6 shadow-xl dark:shadow-sky-900/20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="60"
              height="60"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-blue-500 dark:text-sky-400"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </div>
        </motion.div>

        <motion.h1
          className="text-5xl font-extrabold tracking-tight text-gradient-blue sm:text-6xl drop-shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Secure & Seamless Access
        </motion.h1>

        <motion.p
          className="text-xl text-foreground/80 font-medium drop-shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Your journey to digital excellence begins with a single login
        </motion.p>

        <motion.div
          className="flex flex-col space-y-4 sm:flex-row sm:space-x-6 sm:space-y-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="transform-gpu"
          >
            <Button
              asChild
              size="lg"
              className="group relative overflow-hidden gradient-blue animate-gradient py-7 text-lg font-bold tracking-wide transition-all duration-500 hover:shadow-lg w-full sm:w-auto"
            >
              <Link href="/auth">
                <span className="relative z-10">Get Started</span>
                <span className="absolute bottom-0 left-0 h-1 w-0 bg-white transition-all duration-500 group-hover:w-full"></span>
              </Link>
            </Button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="transform-gpu"
          >
            <Button
              asChild
              size="lg"
              variant="outline"
              className="group relative overflow-hidden border-2 border-amber-500 dark:border-amber-400 py-7 text-lg font-bold tracking-wide text-amber-600 dark:text-amber-400 transition-all duration-500 hover:border-amber-600 dark:hover:border-amber-500 hover:text-amber-700 dark:hover:text-amber-300 hover:shadow-lg w-full sm:w-auto"
            >
              <Link href="/auth">
                <span className="relative z-10">Learn More</span>
                <span className="absolute bottom-0 left-0 h-1 w-0 bg-amber-500 dark:bg-amber-400 transition-all duration-500 group-hover:w-full"></span>
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
