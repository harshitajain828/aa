'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

type ArticleProps = {
  id: string
}

export function Article({ id }: ArticleProps) {
  const [article, setArticle] = useState<{ title: string; content: string } | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState('')
  const { user } = useAuth()

  useEffect(() => {
    fetchArticle()
  }, [id])

  const fetchArticle = async () => {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching article:', error)
    } else {
      setArticle(data)
      setEditedContent(data.content)
    }
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = async () => {
    const { error } = await supabase
      .from('articles')
      .update({ content: editedContent })
      .eq('id', id)

    if (error) {
      console.error('Error updating article:', error)
    } else {
      setIsEditing(false)
      fetchArticle()
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditedContent(article?.content || '')
  }

  if (!article) return <div>Loading...</div>

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">{article.title}</h1>
      {isEditing ? (
        <>
          <Textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            rows={10}
          />
          <div className="space-x-4">
            <Button onClick={handleSave}>Save</Button>
            <Button onClick={handleCancel} variant="outline">Cancel</Button>
          </div>
        </>
      ) : (
        <>
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
          {user && (
            <Button onClick={handleEdit}>Edit</Button>
          )}
        </>
      )}
    </div>
  )
}