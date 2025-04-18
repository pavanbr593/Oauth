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

const formSchema = z
  .object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

export function SignUpForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isTypingPassword, setIsTypingPassword] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isFocused, setIsFocused] = useState<string | null>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const confirmPasswordRef = useRef<HTMLInputElement>(null)
  const { theme } = useTheme()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  // Track password field focus
  useEffect(() => {
    const passwordInput = passwordRef.current
    const confirmPasswordInput = confirmPasswordRef.current
    if (!passwordInput || !confirmPasswordInput) return

    const handlePasswordFocus = () => {
      setIsTypingPassword(true)
      setIsFocused("password")
    }

    const handleConfirmPasswordFocus = () => {
      setIsTypingPassword(true)
      setIsFocused("confirmPassword")
    }

    const handleBlur = () => {
      // Only set to false if neither password field is focused
      if (document.activeElement !== passwordInput && document.activeElement !== confirmPasswordInput) {
        setIsTypingPassword(false)
        setIsFocused(null)
      }
    }

    const handleKeyDown = () => setIsTypingPassword(true)

    passwordInput.addEventListener("focus", handlePasswordFocus)
    passwordInput.addEventListener("blur", handleBlur)
    passwordInput.addEventListener("keydown", handleKeyDown)

    confirmPasswordInput.addEventListener("focus", handleConfirmPasswordFocus)
    confirmPasswordInput.addEventListener("blur", handleBlur)
    confirmPasswordInput.addEventListener("keydown", handleKeyDown)

    return () => {
      passwordInput.removeEventListener("focus", handlePasswordFocus)
      passwordInput.removeEventListener("blur", handleBlur)
      passwordInput.removeEventListener("keydown", handleKeyDown)

      confirmPasswordInput.removeEventListener("focus", handleConfirmPasswordFocus)
      confirmPasswordInput.removeEventListener("blur", handleBlur)
      confirmPasswordInput.removeEventListener("keydown", handleKeyDown)
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
      // This would be replaced with your actual registration logic
      console.log("Signup values:", values)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // On successful registration, redirect to dashboard
      router.push("/dashboard")
    } catch (error) {
      console.error("Signup failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-center mb-6">
        <AnimatedAvatar isTypingPassword={isTypingPassword} isClicking={isClicking} />
      </div>

      <SocialButtons mode="signup" />

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
            name="name"
            render={({ field }) => (
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="transform-gpu">
                <FormItem
                  className={`animate-fade-in rounded-lg transition-all duration-300 ${
                    isFocused === "name" ? "bg-amber-50 dark:bg-amber-950/50 shadow-md" : ""
                  }`}
                  style={{ animationDelay: "100ms" }}
                >
                  <FormLabel className="font-bold text-foreground">Full Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John Doe"
                      autoComplete="name"
                      className="input-animation input-light input-dark border-2 py-6 text-base font-medium transition-all duration-300 focus:ring-4 focus:ring-amber-300 dark:focus:ring-amber-700 focus:scale-[1.01]"
                      {...field}
                      onFocus={() => setIsFocused("name")}
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
            name="email"
            render={({ field }) => (
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="transform-gpu">
                <FormItem
                  className={`animate-fade-in rounded-lg transition-all duration-300 ${
                    isFocused === "email" ? "bg-amber-50 dark:bg-amber-950/50 shadow-md" : ""
                  }`}
                  style={{ animationDelay: "200ms" }}
                >
                  <FormLabel className="font-bold text-foreground">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="name@example.com"
                      type="email"
                      autoComplete="email"
                      className="input-animation input-light input-dark border-2 py-6 text-base font-medium transition-all duration-300 focus:ring-4 focus:ring-amber-300 dark:focus:ring-amber-700 focus:scale-[1.01]"
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
                    isFocused === "password" ? "bg-amber-50 dark:bg-amber-950/50 shadow-md" : ""
                  }`}
                  style={{ animationDelay: "300ms" }}
                >
                  <FormLabel className="font-bold text-foreground">Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="••••••••"
                      type="password"
                      autoComplete="new-password"
                      className="input-animation input-light input-dark border-2 py-6 text-base font-medium transition-all duration-300 focus:ring-4 focus:ring-amber-300 dark:focus:ring-amber-700 focus:scale-[1.01]"
                      {...field}
                      ref={passwordRef}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </motion.div>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="transform-gpu">
                <FormItem
                  className={`animate-fade-in rounded-lg transition-all duration-300 ${
                    isFocused === "confirmPassword" ? "bg-amber-50 dark:bg-amber-950/50 shadow-md" : ""
                  }`}
                  style={{ animationDelay: "400ms" }}
                >
                  <FormLabel className="font-bold text-foreground">Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="••••••••"
                      type="password"
                      autoComplete="new-password"
                      className="input-animation input-light input-dark border-2 py-6 text-base font-medium transition-all duration-300 focus:ring-4 focus:ring-amber-300 dark:focus:ring-amber-700 focus:scale-[1.01]"
                      {...field}
                      ref={confirmPasswordRef}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </motion.div>
            )}
          />
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="transform-gpu">
            <Button
              type="submit"
              className="w-full gradient-amber animate-gradient py-6 text-lg font-bold tracking-wide transition-all duration-500 hover:shadow-lg animate-fade-in transform-gpu"
              style={{ animationDelay: "500ms" }}
              disabled={isLoading}
              onMouseDown={handleButtonMouseDown}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <Icons.spinner className="mr-2 h-5 w-5 animate-spin" />
                  Creating account...
                </span>
              ) : (
                "Create account"
              )}
            </Button>
          </motion.div>
        </form>
      </Form>
    </div>
  )
}
