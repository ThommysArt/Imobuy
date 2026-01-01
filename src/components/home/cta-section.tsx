"use client"

import { InteractiveHoverButton } from "@/components/interactive-hover-button"
import { InteractiveHoverButtonLight } from "@/components/interactive-hover-button-light"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="h-full w-full px-4 sm:px-[2vw] py-16 sm:py-[10vh] relative bg-primary text-primary-foreground">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 sm:mb-6">
          Ready to Find Your Dream Property?
        </h2>
        <p className="text-lg sm:text-xl md:text-2xl font-normal tracking-tight mb-8 sm:mb-12 opacity-90 max-w-2xl mx-auto">
          Get in touch with our team today and let us help you find the perfect property or assist with your real estate needs.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/contact">
            <InteractiveHoverButtonLight 
              className="tracking-tight uppercase text-xs sm:text-sm" 
            >
              Schedule a Visit
            </InteractiveHoverButtonLight>
          </Link>
          <Link href="/properties">
            <InteractiveHoverButton 
              className="tracking-tight uppercase text-xs sm:text-sm bg-transparent border-2 border-white text-white hover:bg-white/10" 
            >
              Browse Properties
            </InteractiveHoverButton>
          </Link>
        </div>
      </div>
    </section>
  )
}

