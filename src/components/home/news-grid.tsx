"use client"

import { news } from "@/data/news"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { InteractiveHoverButton } from "@/components/interactive-hover-button"
import { useTranslations } from "next-intl"

export function NewsGrid() {
  const t = useTranslations("home.news")
  const tNews = useTranslations("news")
  const tButton = useTranslations("common.button")
  const latestNews = news.slice(0, 3)

  const getCategoryColor = (category: string) => {
    const colors = {
      news: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      project: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      insight: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      announcement: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    }
    return colors[category as keyof typeof colors] || colors.news
  }

  return (
    <section className="h-full w-full px-4 sm:px-[2vw] py-16 sm:py-[10vh] relative bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 sm:mb-12">
          <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tighter leading-[1] uppercase mb-4">
            {t("title")}
          </p>
          <p className="text-lg sm:text-xl font-normal tracking-tight text-muted-foreground max-w-2xl">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-8 sm:mt-12">
          {latestNews.map((article) => (
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
                      {tNews(`category.${article.category}`)}
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

        <div className="flex justify-center mt-8 sm:mt-12">
          <Link href="/news">
            <InteractiveHoverButton className="tracking-tight uppercase text-xs sm:text-sm">
              {t("viewAll")}
            </InteractiveHoverButton>
          </Link>
        </div>
      </div>
    </section>
  )
}

