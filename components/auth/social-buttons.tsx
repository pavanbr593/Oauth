"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { GoogleAccountsModal } from "./google-accounts-modal"
import { GitHubAccountsModal } from "./github-accounts-modal"

interface SocialButtonsProps {
  mode: "login" | "signup"
}

export function SocialButtons({ mode }: SocialButtonsProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<string | null>(null)
  const [showGoogleModal, setShowGoogleModal] = useState(false)
  const [showGitHubModal, setShowGitHubModal] = useState(false)

  const handleSocialAuth = async (provider: string) => {
    if (provider === "google") {
      setShowGoogleModal(true)
      return
    }

    if (provider === "github") {
      setShowGitHubModal(true)
      return
    }

    setIsLoading(provider)

    try {
      // This would be replaced with your actual social auth logic
      console.log(`Authenticating with ${provider}`)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // On successful auth, redirect would happen
      router.push("/dashboard")
    } catch (error) {
      console.error(`${provider} auth failed:`, error)
    } finally {
      setIsLoading(null)
    }
  }

  const handleGoogleAccountSelect = async (email: string) => {
    setShowGoogleModal(false)
    setIsLoading("google")

    try {
      console.log(`Signing in with Google account: ${email}`)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // On successful auth, redirect would happen
      router.push("/dashboard")
    } catch (error) {
      console.error("Google auth failed:", error)
    } finally {
      setIsLoading(null)
    }
  }

  const handleGitHubAccountSelect = async (username: string) => {
    setShowGitHubModal(false)
    setIsLoading("github")

    try {
      console.log(`Signing in with GitHub account: ${username}`)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // On successful auth, redirect would happen
      router.push("/dashboard")
    } catch (error) {
      console.error("GitHub auth failed:", error)
    } finally {
      setIsLoading(null)
    }
  }

  const actionText = mode === "login" ? "Sign in" : "Sign up"

  return (
    <div className="grid gap-3">
      <Button
        variant="outline"
        onClick={() => handleSocialAuth("google")}
        disabled={isLoading !== null}
        className="group relative overflow-hidden border-2 py-6 transition-all duration-300 hover:border-blue-500 dark:hover:border-sky-500 hover:text-blue-500 dark:hover:text-sky-400 hover:shadow-lg hover:shadow-blue-100 dark:hover:shadow-sky-900/20 active:scale-95"
      >
        <div className="absolute inset-0 w-0 bg-blue-50 dark:bg-sky-950/50 transition-all duration-500 ease-out group-hover:w-full"></div>
        <Icons.google className="mr-2 h-6 w-6 text-black dark:text-white transition-transform duration-300 group-hover:scale-110" />
        <span className="relative text-base font-extrabold">{actionText} with Google</span>
        {isLoading === "google" && <Icons.spinner className="ml-2 h-5 w-5 animate-spin" />}
      </Button>

      <Button
        variant="outline"
        onClick={() => handleSocialAuth("facebook")}
        disabled={isLoading !== null}
        className="group relative overflow-hidden border-2 py-6 transition-all duration-300 hover:border-blue-500 dark:hover:border-sky-500 hover:text-blue-500 dark:hover:text-sky-400 hover:shadow-lg hover:shadow-blue-100 dark:hover:shadow-sky-900/20 active:scale-95"
      >
        <div className="absolute inset-0 w-0 bg-blue-50 dark:bg-sky-950/50 transition-all duration-500 ease-out group-hover:w-full"></div>
        <Icons.facebook className="mr-2 h-6 w-6 text-black dark:text-white transition-transform duration-300 group-hover:scale-110" />
        <span className="relative text-base font-extrabold">{actionText} with Facebook</span>
        {isLoading === "facebook" && <Icons.spinner className="ml-2 h-5 w-5 animate-spin" />}
      </Button>

      <Button
        variant="outline"
        onClick={() => handleSocialAuth("github")}
        disabled={isLoading !== null}
        className="group relative overflow-hidden border-2 py-6 transition-all duration-300 hover:border-gray-800 dark:hover:border-gray-300 hover:text-gray-800 dark:hover:text-gray-300 hover:shadow-lg hover:shadow-gray-100 dark:hover:shadow-gray-900/20 active:scale-95"
      >
        <div className="absolute inset-0 w-0 bg-gray-50 dark:bg-gray-900/50 transition-all duration-500 ease-out group-hover:w-full"></div>
        <Icons.github className="mr-2 h-6 w-6 text-black dark:text-white transition-transform duration-300 group-hover:scale-110" />
        <span className="relative text-base font-extrabold">{actionText} with GitHub</span>
        {isLoading === "github" && <Icons.spinner className="ml-2 h-5 w-5 animate-spin" />}
      </Button>

      <Button
        variant="outline"
        onClick={() => handleSocialAuth("apple")}
        disabled={isLoading !== null}
        className="group relative overflow-hidden border-2 py-6 transition-all duration-300 hover:border-gray-800 dark:hover:border-gray-300 hover:text-gray-800 dark:hover:text-gray-300 hover:shadow-lg hover:shadow-gray-100 dark:hover:shadow-gray-900/20 active:scale-95"
      >
        <div className="absolute inset-0 w-0 bg-gray-50 dark:bg-gray-900/50 transition-all duration-500 ease-out group-hover:w-full"></div>
        <Icons.apple className="mr-2 h-6 w-6 text-black dark:text-white transition-transform duration-300 group-hover:scale-110" />
        <span className="relative text-base font-extrabold">{actionText} with Apple</span>
        {isLoading === "apple" && <Icons.spinner className="ml-2 h-5 w-5 animate-spin" />}
      </Button>

      <GoogleAccountsModal
        isOpen={showGoogleModal}
        onClose={() => setShowGoogleModal(false)}
        onSelect={handleGoogleAccountSelect}
      />

      <GitHubAccountsModal
        isOpen={showGitHubModal}
        onClose={() => setShowGitHubModal(false)}
        onSelect={handleGitHubAccountSelect}
      />
    </div>
  )
}
