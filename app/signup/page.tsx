import type { Metadata } from "next"
import Link from "next/link"
import { SignUpForm } from "@/components/auth/signup-form"
import { AnimatedBackground } from "@/components/animated-background"

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create a new account",
}

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <AnimatedBackground />

      <div className="w-full max-w-md space-y-8 z-10">
        <div className="text-center">
          <div className="animate-float mb-4 inline-block rounded-full bg-white/90 p-4 shadow-lg">
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
              className="text-teal-500"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <h1 className="animate-fade-in text-4xl font-extrabold tracking-tight text-gray-900 drop-shadow-md">
            Join Our Community
          </h1>
          <p className="animate-fade-in mt-3 text-lg text-gray-700 font-medium drop-shadow-sm">
            "Begin your adventure with us today and transform tomorrow"
          </p>
          <p className="animate-fade-in mt-2 text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-bold text-teal-500 transition-all duration-300 hover:text-teal-600 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
        <div
          className="animate-fade-in rounded-xl bg-white/95 p-8 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:shadow-teal-100"
          style={{
            transform: "perspective(1000px) rotateX(0deg)",
            transformStyle: "preserve-3d",
          }}
        >
          <SignUpForm />
        </div>
      </div>
    </div>
  )
}
