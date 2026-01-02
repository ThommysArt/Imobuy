"use client"

import Link from 'next/link'
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'

// Note: SplitText is a premium GSAP plugin
// Import it if you have access:
// import { SplitText } from "gsap/SplitText"
// gsap.registerPlugin(SplitText)

interface AnimatedLinkProps {
    href: string
    children: string
    className?: string
} 

export const AnimatedLink: React.FC<AnimatedLinkProps> = ({ href, children, className }) => {
    const ref = useRef<HTMLAnchorElement | null>(null)
    const textRef = useRef<HTMLSpanElement | null>(null)
    const tlRef = useRef<gsap.core.Timeline | null>(null)
    const splitRef = useRef<any>(null) // SplitText instance
  
    useEffect(() => {
      if (!ref.current || !textRef.current) return

      const underline = ref.current.querySelector('.underline')
      if (!underline) return

      // Check if SplitText is available (premium plugin)
      // @ts-ignore - SplitText may not be in types
      const SplitText = (typeof window !== 'undefined' && (window as any).SplitText) 
        ? (window as any).SplitText 
        : null

      if (!SplitText) {
        // Fallback: manually split text into characters
        const text = textRef.current.textContent || ''
        const chars: HTMLElement[] = []
        const textContent = text.split('')
        
        textRef.current.innerHTML = ''
        textContent.forEach((char, i) => {
          const span = document.createElement('span')
          span.className = 'char'
          span.style.display = 'inline-block'
          span.textContent = char === ' ' ? '\u00A0' : char
          textRef.current?.appendChild(span)
          chars.push(span)
        })

        // Set initial states
        gsap.set(chars, { y: 0 })
        gsap.set(underline, { width: 0 })

        // Create timeline
        const tl = gsap.timeline({ paused: true })

        // Animate chars up with stagger
        tl.to(chars, {
          y: -10,
          duration: 0.4,
          ease: 'power3.out',
          stagger: {
            amount: 0.2,
            from: "start"
          }
        }, 0)

        // Animate underline
        tl.to(underline, {
          width: '100%',
          duration: 0.3,
          ease: 'power2.out'
        }, 0)

        tlRef.current = tl

        const handleMouseEnter = () => {
          if (tlRef.current) {
            tlRef.current.play()
          }
        }

        const handleMouseLeave = () => {
          if (tlRef.current) {
            tlRef.current.reverse()
          }
        }

        ref.current.addEventListener('mouseenter', handleMouseEnter)
        ref.current.addEventListener('mouseleave', handleMouseLeave)

        return () => {
          if (ref.current) {
            ref.current.removeEventListener('mouseenter', handleMouseEnter)
            ref.current.removeEventListener('mouseleave', handleMouseLeave)
          }
          if (tlRef.current) {
            tlRef.current.kill()
            tlRef.current = null
          }
        }
      } else {
        // Use actual GSAP SplitText plugin with SplitText.create()
        // @ts-ignore
        const split = SplitText.create(textRef.current, { 
          type: "chars"
        })
        splitRef.current = split

        const chars = split.chars
        if (!chars || chars.length === 0) return

        // Set initial states
        gsap.set(chars, { y: 0 })
        gsap.set(underline, { width: 0 })

        // Create timeline
        const tl = gsap.timeline({ paused: true })

        // Animate chars up with stagger
        tl.to(chars, {
          y: -100,
          duration: 0.4,
          ease: 'power3.out',
          stagger: {
            amount: 0.2,
            from: "start"
          }
        }, 0)

        // Animate underline
        tl.to(underline, {
          width: '100%',
          duration: 0.3,
          ease: 'power2.out'
        }, 0)

        tlRef.current = tl

        const handleMouseEnter = () => {
          if (tlRef.current) {
            tlRef.current.play()
          }
        }

        const handleMouseLeave = () => {
          if (tlRef.current) {
            tlRef.current.reverse()
          }
        }

        ref.current.addEventListener('mouseenter', handleMouseEnter)
        ref.current.addEventListener('mouseleave', handleMouseLeave)

        return () => {
          if (ref.current) {
            ref.current.removeEventListener('mouseenter', handleMouseEnter)
            ref.current.removeEventListener('mouseleave', handleMouseLeave)
          }
          if (splitRef.current && splitRef.current.revert) {
            splitRef.current.revert()
          }
          if (tlRef.current) {
            tlRef.current.kill()
            tlRef.current = null
          }
        }
      }
    }, [children])
  
    return (
      <Link href={href} ref={ref} className={`${className}`}>
        <span className='relative inline-block overflow-visible pt-[100px] -mt-[100px]'>
          <span ref={textRef} className='inline-flex whitespace-nowrap'>
            {children}
          </span>
          <span className='underline absolute bottom-0 left-0 w-0 h-px bg-current' />
        </span>
      </Link>
    )
  }
