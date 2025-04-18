import type { Metadata } from "next"
import Link from "next/link"
import { LoginForm } from "@/components/auth/login-form"
import { AnimatedBackground } from "@/components/animated-background"

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
}

export default function LoginPage() {
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
              className="text-rose-500"
            >
              <path d="M12 2a10 10 0 1 0 10 10H12V2Z" />
              <path d="M12 12 2.1 12.5" />
              <path d="M8.5 8.5 2.1 12.5" />
              <path d="M12 17a5 5 0 0 0 5-5" />
              <path d="M12 12v5" />
            </svg>
          </div>
          <h1 className="animate-fade-in text-4xl font-extrabold tracking-tight text-gray-900 drop-shadow-md">
            Welcome Back!
          </h1>
          <p className="animate-fade-in mt-3 text-lg text-gray-700 font-medium drop-shadow-sm">
            "Unlock your digital journey with a single click"
          </p>
          <p className="animate-fade-in mt-2 text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="font-bold text-rose-500 transition-all duration-300 hover:text-rose-600 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
        <div
          className="animate-fade-in rounded-xl bg-white/95 p-8 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:shadow-rose-100"
          style={{
            transform: "perspective(1000px) rotateX(0deg)",
            transformStyle: "preserve-3d",
          }}
        >
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
