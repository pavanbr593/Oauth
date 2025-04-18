"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"

interface AnimatedAvatarProps {
  isTypingPassword?: boolean
  isClicking?: boolean
}

export function AnimatedAvatar({ isTypingPassword = false, isClicking = false }: AnimatedAvatarProps) {
  const [blinking, setBlinking] = useState(false)
  const [eyesClosed, setEyesClosed] = useState(false)
  const { theme } = useTheme()

  // Random blinking
  useEffect(() => {
    const blinkInterval = setInterval(
      () => {
        if (!isTypingPassword && !isClicking) {
          setBlinking(true)
          setTimeout(() => setBlinking(false), 200)
        }
      },
      Math.random() * 3000 + 2000,
    )

    return () => clearInterval(blinkInterval)
  }, [isTypingPassword, isClicking])

  // Close eyes when typing password or clicking
  useEffect(() => {
    if (isTypingPassword || isClicking) {
      setEyesClosed(true)
    } else {
      setEyesClosed(false)
    }
  }, [isTypingPassword, isClicking])

  return (
    <div className="relative h-24 w-24 overflow-hidden rounded-full bg-gradient-to-br from-blue-200 to-sky-200 dark:from-blue-600 dark:to-sky-600 shadow-xl transition-all duration-500 hover:scale-110 transform-gpu animate-border-glow">
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Face */}
        <div className="relative h-16 w-16 rounded-full bg-yellow-100 dark:bg-amber-200 shadow-inner">
          {/* Eyes */}
          <div className="absolute left-3 top-5 transition-all duration-300">
            {eyesClosed ? (
              <div className="h-0.5 w-2.5 rounded-full bg-gray-800 mt-1.5"></div>
            ) : (
              <div className={`h-2.5 w-2.5 rounded-full bg-gray-800 ${blinking ? "h-0.5 mt-1.5" : ""}`}></div>
            )}
          </div>
          <div className="absolute right-3 top-5 transition-all duration-300">
            {eyesClosed ? (
              <div className="h-0.5 w-2.5 rounded-full bg-gray-800 mt-1.5"></div>
            ) : (
              <div className={`h-2.5 w-2.5 rounded-full bg-gray-800 ${blinking ? "h-0.5 mt-1.5" : ""}`}></div>
            )}
          </div>

          {/* Smile - changes to straight line when eyes closed */}
          <div
            className={`absolute bottom-4 left-1/2 h-2 w-8 -translate-x-1/2 transition-all duration-300 ${
              eyesClosed ? "border-b-2 border-gray-800 rounded-none" : "border-b-2 border-gray-800 rounded-b-full"
            }`}
          />

          {/* Typing animation */}
          {isTypingPassword && (
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-bold text-gray-800 dark:text-white">
              <span className="typing-animation">typing...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
