import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'

export default async function ArticlePage({ params }: { params: { id: string } }) {
  const supabase = createServerComponentClient({ cookies })
  
  const { data: article, error } = await supabase
    .from('articles')
    .select('*')
    .eq('id', params.id)
    .single()

  if (error || !article) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{article.title}</h1>
      <div className="prose dark:prose-invert">
        <MDXRemote source={article.content} />
      </div>
    </div>
  )
}