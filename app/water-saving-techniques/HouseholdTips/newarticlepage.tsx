'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import dynamic from 'next/dynamic'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const MDEditor = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default),
  { ssr: false }
)

export default function NewArticle() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handlePublish = async () => {
    const { data, error } = await supabase
      .from('articles')
      .insert([
        { title, content, category: 'household_tips' },
      ])

    if (error) {
      console.error('Error publishing article:', error)
    } else {
      router.push('/water-saving-techniques/householdtips')
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Write New Article</h1>
      <Input
        type="text"
        placeholder="Article Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="text-xl font-semibold"
      />
      <MDEditor
        value={content}
        onChange={(value) => setContent(value || '')}
        preview="edit"
      />
      <div className="flex justify-end space-x-4">
        <Button variant="outline" onClick={() => router.back()}>Cancel</Button>
        <Button onClick={handlePublish}>Publish</Button>
      </div>
    </div>
  )
}