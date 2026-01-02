"use client"

import { services } from "@/data/services"
import { InteractiveHoverButton } from "@/components/interactive-hover-button"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useTranslations } from "next-intl"

export function ServicesOverview() {
  const t = useTranslations("home.services")
  const tButton = useTranslations("common.button")
  return (
    <section className="h-full w-full px-4 sm:px-[2vw] py-16 sm:py-[10vh] relative bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 sm:mb-12 text-center">
          <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tighter leading-[1] uppercase mb-4">
            {t("title")}
          </p>
          <p className="text-lg sm:text-xl font-normal tracking-tight text-muted-foreground max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-8 sm:mt-12">
          {services.map((service) => (
            <Card key={service.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-4">{service.icon}</div>
                <CardTitle className="text-xl sm:text-2xl">{service.title}</CardTitle>
                <CardDescription className="text-base mt-2">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-center mt-8 sm:mt-12">
          <Link href="/services">
            <InteractiveHoverButton className="tracking-tight uppercase text-xs sm:text-sm">
              {t("learnMore")}
            </InteractiveHoverButton>
          </Link>
        </div>
      </div>
    </section>
  )
}

