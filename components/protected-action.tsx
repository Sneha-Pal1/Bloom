"use client"

import { useAuth } from "./auth-context"
import type { ReactNode } from "react"

interface ProtectedActionProps {
  children: ReactNode
  fallback?: ReactNode
  requireAuth?: boolean
  authModalTab?: "login" | "signup"
}

export function ProtectedAction({
  children,
  fallback,
  requireAuth = true,
  authModalTab = "login",
}: ProtectedActionProps) {
  const { isAuthenticated, setShowAuthModal, setAuthModalTab } = useAuth()

  if (!requireAuth || isAuthenticated) {
    return <>{children}</>
  }

  const handleClick = () => {
    setAuthModalTab(authModalTab)
    setShowAuthModal(true)
  }

  if (fallback) {
    return <div onClick={handleClick}>{fallback}</div>
  }

  return <div onClick={handleClick}>{children}</div>
}
