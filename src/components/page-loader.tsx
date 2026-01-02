"use client"

import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

export function PageLoader() {
  const loaderRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!loaderRef.current || !barRef.current) return

    // Animate progress bar
    gsap.to(barRef.current, {
      width: '100%',
      duration: 1.5,
      ease: 'expo.inOut',
      onComplete: () => {
        // Fade out loader
        gsap.to(loaderRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: 'expo.in',
          onComplete: () => {
            // Hide loader completely
            if (loaderRef.current) {
              loaderRef.current.style.pointerEvents = 'none'
              loaderRef.current.style.zIndex = '-100'
            }
          }
        })
      }
    })
  }, [])

  return (
    <div 
      ref={loaderRef} 
      className='h-screen w-screen z-9999 fixed top-0 left-0 opacity-100 bg-white text-black'
    >
      <div className='relative w-full h-full'>
        {/* Progress bar */}
        <div 
          ref={barRef} 
          className='absolute top-0 left-0 w-0 h-[0.4rem] bg-black'
        />
        
        {/* Content */}
        <div className='absolute bottom-0 left-0 flex items-end gap-6 sm:gap-10 lg:gap-16 p-4 sm:p-[2vw]'>
          <span className='text-6xl sm:text-8xl md:text-10xl lg:text-12xl xl:text-[16rem] font-bold tracking-tight leading-[0.8] p-0 m-0 text-left text-black'>
            Imobuy
          </span>
          <span className='hidden sm:block text-lg sm:text-xl md:text-2xl font-medium tracking-tight py-3 sm:py-6 text-muted-foreground'>
            [Real Estate Platform]
          </span>
        </div>
      </div>
    </div>
  )
}

