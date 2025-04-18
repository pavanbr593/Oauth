import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-rose-100 to-teal-100 p-4 overflow-hidden">
      <div className="relative z-10 w-full max-w-md rounded-xl bg-white/90 p-8 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:shadow-lg">
        <div className="mb-6 flex justify-center">
          <div className="animate-pulse-slow rounded-full bg-gradient-to-r from-rose-400 to-teal-400 p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2v4" />
              <path d="M12 18v4" />
              <path d="m4.93 4.93 2.83 2.83" />
              <path d="m16.24 16.24 2.83 2.83" />
              <path d="M2 12h4" />
              <path d="M18 12h4" />
              <path d="m4.93 19.07 2.83-2.83" />
              <path d="m16.24 7.76 2.83-2.83" />
            </svg>
          </div>
        </div>
        <h1 className="animate-fade-in mb-6 text-center text-3xl font-extrabold tracking-tight text-gray-900">
          Welcome to Your Dashboard
        </h1>
        <p className="animate-fade-in mb-8 text-center text-lg text-gray-600">
          "Your journey has just begun. Explore the possibilities that await you!"
        </p>
        <div className="animate-fade-in space-y-4">
          <Button
            asChild
            className="w-full bg-gradient-to-r from-rose-500 to-teal-500 py-6 text-lg font-bold tracking-wide transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
          >
            <Link href="/profile">View Profile</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="w-full border-2 py-6 text-lg font-bold tracking-wide transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
          >
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="animate-float absolute -top-20 -left-20 h-40 w-40 rounded-full bg-rose-300/20"></div>
        <div className="animate-float-slow absolute top-1/4 -right-20 h-60 w-60 rounded-full bg-teal-300/20"></div>
        <div className="animate-float-slower absolute bottom-1/4 -left-10 h-20 w-20 rounded-full bg-rose-300/20"></div>
        <div className="animate-float absolute -bottom-20 right-1/3 h-40 w-40 rounded-full bg-teal-300/20"></div>
      </div>
    </div>
  )
}
