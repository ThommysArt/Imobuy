"use client"

import { InteractiveHoverButton } from "./interactive-hover-button"
import { InteractiveHoverButtonLight } from "./interactive-hover-button-light"
import Link from "next/link"
import { useTranslations } from "next-intl"

export function CTASection() {
  const t = useTranslations("home.cta")
  const tButton = useTranslations("common.button")
  return (
    <section className="h-full w-full px-4 sm:px-6 md:px-8 lg:px-[2vw] py-16 sm:py-[10vh] relative bg-primary text-primary-foreground overflow-x-hidden">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 sm:mb-6">
          {t("title")}
        </h2>
        <p className="text-lg sm:text-xl md:text-2xl font-normal tracking-tight mb-8 sm:mb-12 opacity-90 max-w-2xl mx-auto">
          {t("subtitle")}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/contact">
            <InteractiveHoverButtonLight 
              className="tracking-tight uppercase text-xs sm:text-sm" 
            >
              {tButton("scheduleVisit")}
            </InteractiveHoverButtonLight>
          </Link>
          <Link href="/properties">
            <InteractiveHoverButton 
              className="tracking-tight uppercase text-xs sm:text-sm" 
            >
              {tButton("browseProperties")}
            </InteractiveHoverButton>
          </Link>
        </div>
      </div>
    </section>
  )
}
