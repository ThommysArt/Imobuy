"use client"

import Link from "next/link"
import Image from "next/image"
import { AnimatedLink } from "@/components/animated-link"
import { InteractiveHoverButton } from "@/components/interactive-hover-button"
import { useState, useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useTranslations } from "next-intl"

gsap.registerPlugin(ScrollTrigger)

export function Header() {
  const t = useTranslations("navigation")
  const tHeader = useTranslations("header")
  const tButton = useTranslations("common.button")
  const tAria = useTranslations("common.aria")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null)

  useEffect(() => {
    // Only run on home page (check if pathname is just locale or locale/)
    if (typeof window === "undefined") return
    
    const pathname = window.location.pathname
    // Check if we're on the home page (e.g., /en, /fr, /en/, /fr/, or just /)
    const isHomePage = pathname === "/" || /^\/[a-z]{2}\/?$/.test(pathname)
    
    if (!isHomePage) {
      // Show header immediately on other pages
      if (headerRef.current) {
        gsap.set(headerRef.current, { 
          y: 0,
          opacity: 1, 
          pointerEvents: "auto" 
        })
      }
      return
    }

    if (!headerRef.current) return

    // Hide header initially - slide it up above viewport
    gsap.set(headerRef.current, { 
      y: "-100%",
      opacity: 1, 
      pointerEvents: "none" 
    })

    // Wait for hero section to be in DOM
    const checkHero = setInterval(() => {
      const heroSection = document.querySelector('[data-hero-section]')
      if (heroSection) {
        clearInterval(checkHero)
        
        // Create ScrollTrigger to show header after hero is scrolled past
        scrollTriggerRef.current = ScrollTrigger.create({
          trigger: heroSection,
          start: "bottom top",
          end: "bottom top",
          onEnter: () => {
            gsap.to(headerRef.current, {
              y: 0,
              pointerEvents: "auto",
              duration: 0.5,
              ease: "power3.out",
            })
          },
          onLeaveBack: () => {
            gsap.to(headerRef.current, {
              y: "-100%",
              pointerEvents: "none",
              duration: 0.5,
              ease: "power3.in",
            })
          },
        })
      }
    }, 100)

    return () => {
      clearInterval(checkHero)
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill()
        scrollTriggerRef.current = null
      }
    }
  }, [])

  const navItems = [
    { label: t("home"), href: "/" },
    { label: t("listings"), href: "/listings" },
    { label: t("services"), href: "/services" },
    { label: t("about"), href: "/about" },
    { label: t("news"), href: "/news" },
    { label: t("contact"), href: "/contact" },
  ]

  return (
    <header ref={headerRef} className="fixed top-0 left-0 right-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-border" style={{ transform: 'translateY(-100%)' }}>
      <div className="px-4 sm:px-[2vw] py-4 sm:py-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 sm:gap-3">
          <Image
            src="/IMOBUY.svg"
            alt={tHeader("logoAlt")}
            width={32}
            height={32}
            className="w-6 h-6 sm:w-8 sm:h-8"
          />
          <span className="text-xl sm:text-2xl font-bold tracking-tight">
            Imobuy
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => (
            <AnimatedLink key={item.href} href={item.href} className="text-sm font-medium">
              {item.label}
            </AnimatedLink>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/contact" className="hidden sm:flex">
            <InteractiveHoverButton className="tracking-tight uppercase text-xs sm:text-sm">
              {tButton("getInTouch")}
            </InteractiveHoverButton>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2"
            aria-label={tAria("toggleMenu")}
          >
            <div className="w-6 h-6 flex flex-col justify-center gap-1.5">
              <span
                className={`block h-0.5 w-full bg-foreground transition-all ${
                  isMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-full bg-foreground transition-all ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-full bg-foreground transition-all ${
                  isMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="lg:hidden border-t border-border bg-white">
          <div className="px-4 py-6 flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-lg font-medium hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
              <InteractiveHoverButton className="mt-4 tracking-tight uppercase text-sm">
                {tButton("getInTouch")}
              </InteractiveHoverButton>
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}

