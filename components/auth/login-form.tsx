"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { motion } from "@/components/ui/motion"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SocialButtons } from "@/components/auth/social-buttons"
import { Icons } from "@/components/icons"
import { AnimatedAvatar } from "@/components/animated-avatar"

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
})

export function LoginForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isTypingPassword, setIsTypingPassword] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isFocused, setIsFocused] = useState<string | null>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const { theme } = useTheme()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  // Track password field focus and typing
  useEffect(() => {
    const passwordInput = passwordRef.current
    if (!passwordInput) return

    const handleFocus = () => {
      setIsTypingPassword(true)
      setIsFocused("password")
    }

    const handleBlur = () => {
      setIsTypingPassword(false)
      setIsFocused(null)
    }

    const handleKeyDown = () => setIsTypingPassword(true)

    passwordInput.addEventListener("focus", handleFocus)
    passwordInput.addEventListener("blur", handleBlur)
    passwordInput.addEventListener("keydown", handleKeyDown)

    return () => {
      passwordInput.removeEventListener("focus", handleFocus)
      passwordInput.removeEventListener("blur", handleBlur)
      passwordInput.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  // Track button clicks
  const handleButtonMouseDown = () => {
    setIsClicking(true)
  }

  const handleButtonMouseUp = () => {
    setIsClicking(false)
  }

  useEffect(() => {
    document.addEventListener("mouseup", handleButtonMouseUp)
    return () => {
      document.removeEventListener("mouseup", handleButtonMouseUp)
    }
  }, [])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      // This would be replaced with your actual authentication logic
      console.log("Login values:", values)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // On successful login, redirect to dashboard
      router.push("/dashboard")
    } catch (error) {
      console.error("Login failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-center mb-6">
        <AnimatedAvatar isTypingPassword={isTypingPassword} isClicking={isClicking} />
      </div>

      <SocialButtons mode="login" />

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t-2 border-gray-100 dark:border-gray-800" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-foreground/60 font-bold">Or continue with</span>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="transform-gpu">
                <FormItem
                  className={`animate-fade-in rounded-lg transition-all duration-300 ${
                    isFocused === "email" ? "bg-blue-50 dark:bg-sky-950/50 shadow-md" : ""
                  }`}
                  style={{ animationDelay: "100ms" }}
                >
                  <FormLabel className="font-bold text-foreground">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="name@example.com"
                      type="email"
                      autoComplete="email"
                      className="input-animation input-light input-dark border-2 py-6 text-base font-medium transition-all duration-300 focus:ring-4 focus:ring-blue-300 dark:focus:ring-sky-700 focus:scale-[1.01]"
                      {...field}
                      onFocus={() => setIsFocused("email")}
                      onBlur={() => setIsFocused(null)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </motion.div>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="transform-gpu">
                <FormItem
                  className={`animate-fade-in rounded-lg transition-all duration-300 ${
                    isFocused === "password" ? "bg-blue-50 dark:bg-sky-950/50 shadow-md" : ""
                  }`}
                  style={{ animationDelay: "200ms" }}
                >
                  <FormLabel className="font-bold text-foreground">Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="••••••••"
                      type="password"
                      autoComplete="current-password"
                      className="input-animation input-light input-dark border-2 py-6 text-base font-medium transition-all duration-300 focus:ring-4 focus:ring-blue-300 dark:focus:ring-sky-700 focus:scale-[1.01]"
                      {...field}
                      ref={passwordRef}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </motion.div>
            )}
          />
          <div className="flex items-center justify-end animate-fade-in" style={{ animationDelay: "300ms" }}>
            <Button
              variant="link"
              className="px-0 font-bold text-blue-600 dark:text-sky-400 hover:text-blue-700 dark:hover:text-sky-300 hover:underline transition-all duration-300"
              type="button"
            >
              Forgot password?
            </Button>
          </div>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="transform-gpu">
            <Button
              type="submit"
              className="w-full gradient-blue animate-gradient py-6 text-lg font-bold tracking-wide transition-all duration-500 hover:shadow-lg animate-fade-in transform-gpu"
              style={{ animationDelay: "400ms" }}
              disabled={isLoading}
              onMouseDown={handleButtonMouseDown}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <Icons.spinner className="mr-2 h-5 w-5 animate-spin" />
                  Signing in...
                </span>
              ) : (
                "Sign in"
              )}
            </Button>
          </motion.div>
        </form>
      </Form>
    </div>
  )
}
