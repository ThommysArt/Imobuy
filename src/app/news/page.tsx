import { news } from "@/data/news"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export const metadata = {
  title: "News & Insights - Imobuy Real Estate",
  description: "Stay updated with the latest real estate news, market insights, and company announcements.",
}

export default function NewsPage() {
  const getCategoryColor = (category: string) => {
    const colors = {
      news: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      project: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      insight: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      announcement: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    }
    return colors[category as keyof typeof colors] || colors.news
  }

  const categories = ["all", "news", "project", "insight", "announcement"] as const

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="px-4 sm:px-[2vw] pt-24 sm:pt-32 pb-16 sm:pb-[10vh] bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            News & Insights
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl font-normal tracking-tight text-muted-foreground">
            Stay updated with the latest real estate trends, market insights, and company announcements
          </p>
        </div>
      </section>

      {/* News Grid */}
      <section className="px-4 sm:px-[2vw] py-16 sm:py-[10vh]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {news.map((article) => (
              <Link key={article.id} href={`/news/${article.id}`}>
                <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden group">
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <Badge className={`absolute top-4 left-4 ${getCategoryColor(article.category)}`}>
                      {article.category}
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl sm:text-2xl line-clamp-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {article.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{article.author}</span>
                      <span>{new Date(article.date).toLocaleDateString()}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

