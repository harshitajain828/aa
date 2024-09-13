'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export function NewArticleButton() {
  const router = useRouter()

  return (
    <Button onClick={() => router.push('/water-saving-techniques/householdtips/new')}>
      Create New Article
    </Button>
  )
}