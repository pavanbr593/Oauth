"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AnimatedBackground } from "@/components/animated-background"
import { LoginForm } from "@/components/auth/login-form"
import { SignUpForm } from "@/components/auth/signup-form"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

export default function AuthPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login")
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 overflow-hidden">
      <AnimatedBackground />

      <div className="w-full max-w-6xl z-10">
        <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
          {/* Left side - Welcome message */}
          <motion.div
            className="w-full md:w-1/2 text-center md:text-left space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="animate-float inline-block rounded-full bg-background/90 p-4 shadow-lg dark:shadow-sky-900/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
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
            <h1
              className={`text-5xl font-extrabold tracking-tight ${theme === "dark" ? "text-white" : "text-gradient-blue"} drop-shadow-md`}
            >
              {activeTab === "login" ? "Welcome Back!" : "Join Our Community"}
            </h1>
            <p className="text-xl text-foreground/80 font-medium drop-shadow-sm max-w-md mx-auto md:mx-0">
              {activeTab === "login"
                ? "Unlock your digital journey with a single click"
                : "Begin your adventure with us today and transform tomorrow"}
            </p>
            <div className="hidden md:block">
              <p className="text-foreground/70 mb-4">Experience our enhanced authentication system</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="card-light card-dark rounded-lg p-4 shadow-md transform-gpu hover:scale-105 hover:rotate-1 transition-all duration-300 border border-blue-100 dark:border-sky-900 hover:border-blue-300 dark:hover:border-sky-700">
                  <h3 className="font-bold text-blue-700 dark:text-sky-400">Secure Login</h3>
                  <p className="text-sm text-foreground/70">Multi-factor authentication for your security</p>
                </div>
                <div className="card-light card-dark rounded-lg p-4 shadow-md transform-gpu hover:scale-105 hover:rotate-1 transition-all duration-300 border border-amber-100 dark:border-amber-900 hover:border-amber-300 dark:hover:border-amber-700">
                  <h3 className="font-bold text-amber-600 dark:text-amber-400">Social Integration</h3>
                  <p className="text-sm text-foreground/70">Connect with your favorite platforms</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right side - Auth forms */}
          <motion.div
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div
              className="card-light card-dark rounded-xl shadow-2xl overflow-hidden transform-gpu hover:shadow-xl transition-all duration-500 animate-subtle-pulse"
              style={{
                transform: "perspective(1000px) rotateY(0deg)",
                transformStyle: "preserve-3d",
              }}
            >
              {/* Tabs */}
              <div className="flex border-b-2 border-gray-100 dark:border-gray-800">
                <button
                  className={`w-1/2 py-4 text-center font-bold text-lg transition-all duration-300 ${
                    activeTab === "login"
                      ? "bg-blue-50 dark:bg-sky-950/50 text-blue-600 dark:text-sky-400 border-b-2 border-blue-500 dark:border-sky-500"
                      : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  }`}
                  onClick={() => setActiveTab("login")}
                >
                  Login
                </button>
                <button
                  className={`w-1/2 py-4 text-center font-bold text-lg transition-all duration-300 ${
                    activeTab === "signup"
                      ? "bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border-b-2 border-amber-500 dark:border-amber-500"
                      : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  }`}
                  onClick={() => setActiveTab("signup")}
                >
                  Sign Up
                </button>
              </div>

              {/* Form container */}
              <div className="p-8">{activeTab === "login" ? <LoginForm /> : <SignUpForm />}</div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
