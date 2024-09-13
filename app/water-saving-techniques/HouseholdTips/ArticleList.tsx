import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

type Article = {
  id: string
  title: string
  content: string
  created_at: string
}

export function ArticleList({ articles }: { articles: Article[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <Card key={article.id}>
          <CardHeader>
            <CardTitle>{article.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{article.content.substring(0, 100)}...</p>
            <Link
              href={`/water-saving-techniques/householdtips/${article.id}`}
              className="text-primary hover:underline mt-2 inline-block"
            >
              Read More
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}