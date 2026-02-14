"use client"

import { TextParallax } from "./text-parallax"
import { useTranslations } from "next-intl"

export function TrustIndicators() {
  const t = useTranslations("home.trustIndicators")
  
  const indicators = [
    { number: "500+", label: t("propertiesSold") },
    { number: "1000+", label: t("happyClients") },
    { number: "15+", label: t("yearsExperience") },
    { number: "98%", label: t("satisfactionRate") },
  ]

  return (
    <section className="h-full w-full relative bg-white pt-8 sm:pt-[10vh] pb-16 sm:pb-[10vh] overflow-x-hidden">
      <TextParallax
        text={t("whyImobuy")}
        className="h-[15vw] sm:h-[10vw] w-full"
        directions={["right"]}
        leftOffsets={["-60%"]}
        phraseClassName='text-[8vw] sm:text-[5vw] font-semibold tracking-tighter'
        blockClassName='h-[7.5vw] sm:h-[5vw] bg-neutral-200/40'
      />
      <TextParallax
        text={t("trustedReliable")}
        className="h-[15vw] sm:h-[10vw] w-full -mt-[7.5vw] sm:-mt-[5vw]"
        directions={["left"]}
        leftOffsets={["-20%"]}
        phraseClassName='text-[8vw] sm:text-[5vw] font-semibold tracking-tighter'
        blockClassName='h-[7.5vw] sm:h-[5vw] bg-neutral-200/40'
      />

      <div className="px-4 sm:px-6 md:px-8 lg:px-[2vw] mt-8 sm:mt-[10vh]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {indicators.map((indicator, idx) => (
            <div key={idx} className="text-center">
              <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-primary mb-2">
                {indicator.number}
              </div>
              <div className="text-sm sm:text-base md:text-lg font-medium tracking-tight text-muted-foreground">
                {indicator.label}
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="text-center">
            <h3 className="text-xl sm:text-2xl font-semibold mb-2">{t("transparency")}</h3>
            <p className="text-sm sm:text-base text-muted-foreground">
              {t("transparencyDesc")}
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-xl sm:text-2xl font-semibold mb-2">{t("experience")}</h3>
            <p className="text-sm sm:text-base text-muted-foreground">
              {t("experienceDesc")}
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-xl sm:text-2xl font-semibold mb-2">{t("legalSecurity")}</h3>
            <p className="text-sm sm:text-base text-muted-foreground">
              {t("legalSecurityDesc")}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
