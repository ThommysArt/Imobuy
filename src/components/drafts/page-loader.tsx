"use client"

import React from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const PageLoader = () => {
    const loaderRef = React.useRef<HTMLDivElement>(null)
    const barRef = React.useRef<HTMLDivElement>(null)

    useGSAP(()=>{
        gsap.to(barRef.current, {
            width: '100%',
            duration: 1.5,
            ease: 'expo.inOut',
            onComplete: () => {
                gsap.to(loaderRef.current, {
                    opacity: 0,
                    duration: 0.5,
                    ease: 'expo.in',
                    zIndex: -100
                })
            }
        })
    }, [])

  return (
    <div ref={loaderRef} className='h-screen w-screen z-[9999] fixed top-0 left-0 opacity-100'>
        <div className='relative w-full h-full bg-black text-white'>
            <div ref={barRef} className='absolute top-0 left-0 w-0 h-[0.4rem] bg-white'/>
            <div className='absolute bottom-0 left-0 flex items-end gap-6 sm:gap-10 lg:gap-16 p-4 sm:p-[2vw]'>
                <span className='text-6xl sm:text-8xl md:text-10xl lg:text-12xl xl:text-[16rem] font-bold tracking-tight leading-[0.8] p-0 m-0 text-left'>
                    MA
                </span>
                <span className='hidden sm:block text-lg sm:text-xl md:text-2xl font-medium tracking-tight py-3 sm:py-6'>[Architecture and Consultation Studio]</span>
            </div>
        </div>
    </div>
  )
}

export default PageLoader