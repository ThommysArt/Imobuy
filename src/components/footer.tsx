"use client"

import { AnimatedLink } from '@/components/animated-link'
import Link from 'next/link'
import React from 'react'
import { useTranslations } from 'next-intl'

export function Footer() {
  const t = useTranslations("footer")
  const tNav = useTranslations("navigation")
  
  const navItems = [
    { label: tNav("home"), href: "/" },
    { label: tNav("properties"), href: "/properties" },
    { label: tNav("services"), href: "/services" },
    { label: tNav("about"), href: "/about" },
    { label: tNav("news"), href: "/news" },
    { label: tNav("contact"), href: "/contact" },
  ]

  const quickLinks = [
    { label: t("quickLinks.landForSale"), href: "/properties?type=land" },
    { label: t("quickLinks.residentialProperties"), href: "/properties?type=house" },
    { label: t("quickLinks.commercialProperties"), href: "/properties?type=commercial" },
    { label: t("quickLinks.investmentOpportunities"), href: "/properties?featured=true" },
  ]

  return (
    <footer className='w-full h-full bg-white border-t border-border'>
      <div className='px-4 sm:px-[2vw] pt-8 sm:pt-[5vh] mb-8 sm:mb-[15vh] grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8'>
        <div className='flex flex-col w-full h-full'>
          <h3 className='text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4'>
            Imobuy
          </h3>
          <p className="text-base sm:text-lg font-normal tracking-tight text-muted-foreground">
            {t("description")}
          </p>
        </div>

        <div className='flex flex-col w-full h-full'>
          <span className='font-semibold tracking-tight mb-4 uppercase text-sm sm:text-base'>{t("navigation")}</span>
          <ul className='text-xl sm:text-2xl font-medium tracking-tight space-y-4'>
            {navItems.map((nav) => (
              <li key={nav.href} className='flex items-center'>
                <AnimatedLink href={nav.href} className='inline-block'>
                  {nav.label}
                </AnimatedLink>
              </li>
            ))}
          </ul>
        </div>

        <div className='flex flex-col gap-4'>
          <span className='font-semibold tracking-tight mb-2 uppercase text-sm sm:text-base'>{t("quickLinksLabel")}</span>
          <ul className='space-y-2'>
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className='text-sm sm:text-base font-normal tracking-tight hover:text-primary transition-colors'>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          
          <span className='font-semibold tracking-tight mb-2 uppercase mt-6 sm:mt-10 text-sm sm:text-base'>{t("contact")}</span>
          <p className="text-sm sm:text-base font-normal tracking-tight text-muted-foreground whitespace-pre-line">
            {t("address")} <br />
            {t("email")} <br />
            {t("phone")} <br />
            {t("hours")}
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-4 sm:px-[2vw] py-6 border-t border-border text-xs sm:text-sm font-semibold tracking-tight">
        <span className='flex flex-col gap-1 leading-none'>
          <span>{t("copyright")}</span>
        </span>
        <span className="flex gap-3 sm:gap-4">
          <AnimatedLink href='#'>
            Twitter
          </AnimatedLink>
          <AnimatedLink href='#'>
            Instagram
          </AnimatedLink>
          <AnimatedLink href='#'>
            LinkedIn
          </AnimatedLink>
        </span>
        <span className='flex flex-col gap-1 leading-none text-muted-foreground'>
          <Link href='/resources' className='hover:text-foreground transition-colors'>
            {t("privacyPolicy")}
          </Link>
          <Link href='/resources' className='hover:text-foreground transition-colors'>
            {t("termsOfService")}
          </Link>
        </span>
      </div>
    </footer>
  )
}

