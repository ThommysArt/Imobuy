"use client"

import React, { useEffect, useRef } from 'react'
import { AnimatedLink } from './animated-link'
import { InteractiveHoverButton } from './interactive-hover-button'
import { InteractiveHoverButtonLight } from './interactive-hover-button-light'
import { PropertySearch } from './property-search'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'

gsap.registerPlugin(ScrollTrigger)

export function HeroSection() {
  const t = useTranslations("home.hero")
  const tNav = useTranslations("navigation")
  const tButton = useTranslations("common.button")
  const heroRef = useRef<HTMLDivElement>(null)
  const shadeRef = useRef<HTMLDivElement>(null)
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null)

  useEffect(() => {
    // Text animations
    gsap.set(".hero-text", { opacity: 0, y: 100 })
    gsap.to(".hero-text", { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: "power1.inOut" })

    // Clean up any previous ScrollTrigger
    if (scrollTriggerRef.current) {
      scrollTriggerRef.current.kill()
      scrollTriggerRef.current = null
    }

    if (!heroRef.current || !shadeRef.current) return

    // Set initial opacity
    gsap.set(shadeRef.current, { opacity: 0.2 })

    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: heroRef.current,
      start: "top top",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        gsap.set(shadeRef.current, {
          opacity: self.progress > 0.2 ? self.progress : 0.2,
        })
      }
    })

    // Cleanup on unmount
    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill()
        scrollTriggerRef.current = null
      }
    }
  }, [])

  return (
    <div ref={heroRef} data-hero-section className='relative h-full w-full overflow-x-hidden'>
      <div className='sticky top-0 left-0 w-full h-screen'>
        <div className='relative h-screen w-full text-white overflow-x-hidden'>
          <div className='absolute top-0 left-0 w-full px-4 sm:px-6 md:px-8 lg:px-[2vw] py-4 sm:py-[2vh] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 z-20'>
            <h1 className='hero-text text-2xl sm:text-3xl md:text-4xl lg:text-[4rem] font-medium tracking-tight'>
              Imobuy
            </h1>
            <div className='hero-text flex flex-wrap items-center gap-x-2 font-medium tracking-tight uppercase text-sm sm:text-base'>
              <AnimatedLink href='/listings'>
                {tNav("listings")}
              </AnimatedLink>
              ,
              <AnimatedLink href='/services'>
                {tNav("services")}
              </AnimatedLink>
              ,
              <AnimatedLink href='/about'>
                {tNav("about")}
              </AnimatedLink>
            </div>
            <div className='hidden sm:block' />
          </div>

          {/* Hero Image - Fixed background */}
          <img 
            src="https://academic-jackal-479.convex.cloud/api/storage/e0024bc4-823f-48fa-8dce-6e2b8c72f841" 
            alt="Luxury real estate"
            className='relative h-full w-full object-cover -z-20' 
          />

          {/* Hero Content */}
          <div className='hero-text absolute bottom-0 left-0 w-full px-4 sm:px-6 md:px-8 lg:px-[2vw] py-4 sm:py-[2vh] flex flex-col gap-6 sm:gap-8 z-20'>
            <div className="max-w-3xl">
              <p className="font-medium tracking-tight leading-tight text-2xl sm:text-3xl md:text-4xl lg:text-[3rem] mb-4">
                {t("title")}
              </p>
              <p className="text-lg sm:text-xl md:text-2xl font-normal tracking-tight opacity-90 max-w-2xl">
                {t("subtitle")}
              </p>
            </div>

            {/* Property Search */}
            <div className="max-w-5xl w-full">
              <PropertySearch />
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/listings">
                <InteractiveHoverButton className="tracking-tight uppercase text-xs sm:text-sm">
                  {t("viewProperties")}
                </InteractiveHoverButton>
              </Link>
              <Link href="/contact">
                <InteractiveHoverButtonLight className="tracking-tight uppercase text-xs sm:text-sm">
                  {tButton("getInTouch")}
                </InteractiveHoverButtonLight>
              </Link>
            </div>

            <span className='hidden sm:block text-white text-sm font-medium uppercase tracking-tight opacity-70'>
              {t("scrollDown")}
            </span>
          </div>

          {/* Dimming overlay that gets darker on scroll */}
          <div ref={shadeRef} className='absolute inset-0 bg-black/80 opacity-20 -z-10' />
        </div>
      </div>
    </div>
  )
}
