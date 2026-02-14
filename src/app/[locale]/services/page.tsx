import { services } from "@/data/services"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { InteractiveHoverButton } from "../_components/interactive-hover-button"
import Link from "next/link"
import { getTranslations } from "next-intl/server"

export async function generateMetadata() {
  const t = await getTranslations("metadata.services")
  return {
    title: t("title"),
    description: t("description"),
  }
}

export default async function ServicesPage() {
  const t = await getTranslations("services")
  const tCommon = await getTranslations("common.button")
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="px-4 sm:px-[2vw] pt-24 sm:pt-32 pb-16 sm:pb-[10vh] bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            {t("title")}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl font-normal tracking-tight text-muted-foreground">
            {t("subtitle")}
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="px-4 sm:px-[2vw] py-16 sm:py-[10vh]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service) => (
              <Card key={service.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="text-5xl mb-4">{service.icon}</div>
                  <CardTitle className="text-2xl sm:text-3xl">{service.title}</CardTitle>
                  <CardDescription className="text-base sm:text-lg mt-2">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm sm:text-base text-muted-foreground">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="mr-2 text-primary">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Service Details Sections */}
      <section className="px-4 sm:px-[2vw] py-16 sm:py-[10vh] bg-muted/30">
        <div className="max-w-6xl mx-auto space-y-16">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6">
              {t("landSales.title")}
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-4">
              {t("landSales.desc")}
            </p>
          </div>

          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6">
              {t("propertyManagement.title")}
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-4">
              {t("propertyManagement.desc")}
            </p>
          </div>

          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6">
              {t("consulting.title")}
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-4">
              {t("consulting.desc")}
            </p>
          </div>

          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6">
              {t("investmentAdvisory.title")}
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-4">
              {t("investmentAdvisory.desc")}
            </p>
          </div>

          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6">
              {t("legalAssistance.title")}
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-4">
              {t("legalAssistance.desc")}
            </p>
          </div>

          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6">
              {t("afterSale.title")}
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-4">
              {t("afterSale.desc")}
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-[2vw] py-16 sm:py-[10vh]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6">
            {t("cta.title")}
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8">
            {t("cta.subtitle")}
          </p>
          <Link href="/contact">
            <InteractiveHoverButton className="tracking-tight uppercase text-xs sm:text-sm">
              {tCommon("getInTouch")}
            </InteractiveHoverButton>
          </Link>
        </div>
      </section>
    </div>
  )
}

