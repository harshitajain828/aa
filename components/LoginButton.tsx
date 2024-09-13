'use client'

import { Button } from "@/components/ui/button"
import { useAuth } from '@/contexts/AuthContext'

export function LoginButton() {
  const { openModal } = useAuth()

  return (
    <Button onClick={openModal} variant="ghost">
      Login
    </Button>
  )
}