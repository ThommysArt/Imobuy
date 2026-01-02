import { testimonials } from "@/data/testimonials"
import { Card, CardContent } from "@/components/ui/card"
import { getTranslations } from "next-intl/server"

export async function generateMetadata() {
  const t = await getTranslations("metadata.testimonials")
  return {
    title: t("title"),
    description: t("description"),
  }
}

export default async function TestimonialsPage() {
  const t = await getTranslations("testimonials")
  const tLabel = await getTranslations("common.label")
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="px-4 sm:px-[2vw] py-16 sm:py-[10vh] bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            {t("title")}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl font-normal tracking-tight text-muted-foreground">
            {t("subtitle")}
          </p>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="px-4 sm:px-[2vw] py-16 sm:py-[10vh]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="h-full">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <span key={i} className="text-yellow-400 text-lg">★</span>
                    ))}
                  </div>
                  <p className="text-base sm:text-lg font-normal tracking-tight mb-6 text-muted-foreground italic">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <p className="font-semibold text-lg sm:text-xl mb-1">
                      {testimonial.name}
                    </p>
                    <p className="text-sm sm:text-base text-muted-foreground">
                      {testimonial.role}
                      {testimonial.company && `, ${testimonial.company}`}
                    </p>
                    {testimonial.propertyType && (
                      <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                        {tLabel("property")}: {testimonial.propertyType}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="px-4 sm:px-[2vw] py-16 sm:py-[10vh] bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-12 text-center">
            {t("successStories")}
          </h2>
          <div className="space-y-8">
            <Card>
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-semibold mb-4">
                  {t("story1.title")}
                </h3>
                <p className="text-base sm:text-lg text-muted-foreground mb-4">
                  {t("story1.content")}
                </p>
                <p className="text-sm font-medium">{t("story1.author")}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-semibold mb-4">
                  {t("story2.title")}
                </h3>
                <p className="text-base sm:text-lg text-muted-foreground mb-4">
                  {t("story2.content")}
                </p>
                <p className="text-sm font-medium">{t("story2.author")}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}

