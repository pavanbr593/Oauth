"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

interface GoogleAccountsModalProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (email: string) => void
}

export function GoogleAccountsModal({ isOpen, onClose, onSelect }: GoogleAccountsModalProps) {
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const accounts = [
    { email: "john.doe@gmail.com", name: "John Doe" },
    { email: "jane.smith@gmail.com", name: "Jane Smith" },
    { email: "add.new@account.com", name: "Use another account", isAdd: true },
  ]

  const handleSelect = async (email: string) => {
    setSelectedAccount(email)
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsLoading(false)
    onSelect(email)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div
        className="w-full max-w-md transform rounded-xl bg-white p-6 shadow-2xl transition-all duration-500 animate-fade-in"
        style={{ transform: "perspective(1000px) rotateX(0deg)" }}
      >
        <div className="mb-6 flex justify-center">
          <Icons.google className="h-8 w-8 text-gray-800" />
        </div>

        <h2 className="mb-6 text-center text-2xl font-bold">Choose an account</h2>

        <div className="space-y-4">
          {accounts.map((account) => (
            <div
              key={account.email}
              className={`group flex cursor-pointer items-center rounded-lg border-2 p-4 transition-all duration-300 hover:border-blue-500 hover:bg-blue-50 ${
                selectedAccount === account.email ? "border-blue-500 bg-blue-50" : "border-gray-200"
              }`}
              onClick={() => handleSelect(account.email)}
            >
              <div className="mr-4 flex-shrink-0">
                {account.isAdd ? (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-500 group-hover:bg-blue-500 group-hover:text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </div>
                ) : (
                  <div className="h-10 w-10 overflow-hidden rounded-full bg-gradient-to-br from-blue-400 to-purple-400 text-white">
                    <div className="flex h-full w-full items-center justify-center font-bold">
                      {account.name.charAt(0)}
                    </div>
                  </div>
                )}
              </div>
              <div>
                <div className="font-bold text-gray-800">{account.name}</div>
                <div className="text-sm text-gray-500">{account.email}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-between">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-2 font-bold transition-all duration-300 hover:scale-105"
          >
            Cancel
          </Button>

          <Button
            onClick={() => selectedAccount && handleSelect(selectedAccount)}
            disabled={!selectedAccount || isLoading}
            className="bg-blue-500 font-bold transition-all duration-300 hover:bg-blue-600 hover:scale-105"
          >
            {isLoading ? (
              <span className="flex items-center">
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </span>
            ) : (
              "Continue"
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
