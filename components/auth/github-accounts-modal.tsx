"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

interface GitHubAccountsModalProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (username: string) => void
}

export function GitHubAccountsModal({ isOpen, onClose, onSelect }: GitHubAccountsModalProps) {
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const accounts = [
    {
      username: "johndoe",
      name: "John Doe",
      avatar: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
    },
    {
      username: "janesmith",
      name: "Jane Smith",
      avatar: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
    },
    { username: "add_new", name: "Sign in with another account", isAdd: true },
  ]

  const handleSelect = async (username: string) => {
    setSelectedAccount(username)
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsLoading(false)
    onSelect(username)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div
        className="w-full max-w-md transform rounded-xl bg-white p-6 shadow-2xl transition-all duration-500 animate-fade-in"
        style={{ transform: "perspective(1000px) rotateX(0deg)" }}
      >
        <div className="mb-6 flex justify-center">
          <Icons.github className="h-8 w-8 text-gray-800" />
        </div>

        <h2 className="mb-6 text-center text-2xl font-bold">Sign in to GitHub</h2>

        <div className="space-y-4">
          {accounts.map((account) => (
            <div
              key={account.username}
              className={`group flex cursor-pointer items-center rounded-lg border-2 p-4 transition-all duration-300 hover:border-gray-800 hover:bg-gray-50 ${
                selectedAccount === account.username ? "border-gray-800 bg-gray-50" : "border-gray-200"
              }`}
              onClick={() => handleSelect(account.username)}
            >
              <div className="mr-4 flex-shrink-0">
                {account.isAdd ? (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-800 group-hover:bg-gray-800 group-hover:text-white">
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
                  <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-800">
                    <img
                      src={account.avatar || "/placeholder.svg"}
                      alt={account.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
              </div>
              <div>
                <div className="font-bold text-gray-800">{account.name}</div>
                {!account.isAdd && <div className="text-sm text-gray-500">@{account.username}</div>}
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
            className="bg-gray-800 font-bold transition-all duration-300 hover:bg-gray-900 hover:scale-105"
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
