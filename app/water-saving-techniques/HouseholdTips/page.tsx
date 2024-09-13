import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { ArticleList } from './ArticleList'
import { NewArticleButton } from './NewArticleButton'

export default async function HouseholdTips() {
  const supabase = createServerComponentClient({ cookies })
  
  const { data: articles, error } = await supabase
    .from('articles')
    .select('*')
    .eq('category', 'household_tips')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching articles:', error)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Household Water-Saving Tips</h1>
      <p className="text-muted-foreground">
        Discover practical ways to conserve water in your home and reduce your water bill.
      </p>
      {articles && articles.length > 0 ? (
        <ArticleList articles={articles} />
      ) : (
        <div className="text-center">
          <p className="mb-4">No articles found. Would you like to create one?</p>
          <NewArticleButton />
        </div>
      )}
    </div>
  )
}