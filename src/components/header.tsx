"use client"

import Link from "next/link"
import { AnimatedLink } from "@/components/animated-link"
import { InteractiveHoverButton } from "@/components/interactive-hover-button"
import { useState, useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null)

  useEffect(() => {
    // Only run on home page
    if (typeof window === "undefined" || window.location.pathname !== "/") {
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
    { label: "Home", href: "/" },
    { label: "Properties", href: "/properties" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "News", href: "/news" },
    { label: "Contact", href: "/contact" },
  ]

  return (
    <header ref={headerRef} className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="px-4 sm:px-[2vw] py-4 sm:py-6 flex items-center justify-between">
        <Link href="/" className="text-xl sm:text-2xl font-bold tracking-tight">
          Imobuy
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
          <InteractiveHoverButton 
            className="hidden sm:flex tracking-tight uppercase text-xs sm:text-sm"
            asChild
          >
            <Link href="/contact">Get in Touch</Link>
          </InteractiveHoverButton>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2"
            aria-label="Toggle menu"
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
            <InteractiveHoverButton 
              className="mt-4 tracking-tight uppercase text-sm"
              asChild
            >
              <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                Get in Touch
              </Link>
            </InteractiveHoverButton>
          </div>
        </nav>
      )}
    </header>
  )
}

