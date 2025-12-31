"use client"

import React, { useEffect } from 'react'
import { AnimatedLink } from '@/components/animated-link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import StudioSection from "./studio-section";

gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
  const heroRef = React.useRef<HTMLDivElement>(null)
  const shadeRef = React.useRef<HTMLDivElement>(null)
  const scrollTriggerRef = React.useRef<ScrollTrigger | null>(null)

  useEffect(() => {
    // Text animations
    gsap.set(".hero-text", { opacity: 0, y: 100 })
    gsap.to(".hero-text", { opacity: 1, y: 0, duration: 1, delay: 1.5,  ease: "power1.inOut" })

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
        // Use gsap.set for performance, avoid creating new tweens on every scroll
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
  }, [heroRef, shadeRef, scrollTriggerRef])

  return (
    <div ref={heroRef} className='relative h-full w-full'>
      <div className='sticky top-0 left-0 w-full h-screen'>
        <div  className='relative h-screen w-full text-white'>
          <div className='absolute top-0 left-0 w-full px-4 sm:px-[2vw] py-4 sm:py-[2vh] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0'>
            <h1 className='hero-text text-2xl sm:text-3xl md:text-4xl lg:text-[4rem] font-medium tracking-tight'>
              MA Architects
            </h1>
            <div className='hero-text flex flex-wrap items-center gap-x-2 font-medium tracking-tight uppercase text-sm sm:text-base'>
              <AnimatedLink href='#'>
                Works
              </AnimatedLink>
              ,
              <AnimatedLink href='#'>
                Studio
              </AnimatedLink>
              ,
              <AnimatedLink href='#'>
                Gallery
              </AnimatedLink>
            </div>
            <div className='hidden sm:block' />
          </div>
          <img 
            src="https://t90qbbxdsu.ufs.sh/f/JpRsMSGdnCqMctG8PGokA6FD8U43BuqQxg2Z51WaXvbOmpHr" 
            alt="hero image"
            className='relative h-full w-full object-cover -z-20' 
          />
          <div className='hero-text absolute bottom-0 left-0 w-full px-4 sm:px-[2vw] py-4 sm:py-[2vh] flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 sm:gap-0'>
            <p className="font-medium tracking-tight leading-tight text-lg sm:text-xl md:text-2xl lg:text-[2rem] max-w-2xl">
              Our architectural vision embraces bold, timeless structures,
              graceful simplicity, and a harmonious connection
              with lasting beauty and balance.
            </p>
            <span className='hidden sm:block text-white text-sm font-medium uppercase tracking-tight'>
              [Scroll down]
            </span>
          </div>
          <div ref={shadeRef} className='absolute inset-0 bg-black/80 opacity-20 -z-10' />
        </div>
      </div>

      <StudioSection />
    </div>
  )
}

export default Hero