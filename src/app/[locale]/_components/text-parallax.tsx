"use client"

import React, { useRef, useLayoutEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { cn } from "@/lib/utils"

gsap.registerPlugin(ScrollTrigger)

export type ParallaxDirection = "left" | "right"

export interface TextParallaxProps {
  text: string
  className?: string
  rowClassName?: string
  phraseClassName?: string
  blockClassName?: string
  directions?: ParallaxDirection[]
  leftOffsets?: string[]
  scrollTarget?: string
}

function Phrase({ text, phraseClassName, blockClassName }: { text: string; phraseClassName?: string; blockClassName?: string }) {
  return (
    <div className={cn("inline-flex items-center gap-5 px-5 text-[7.5vw] m-0 leading-none text-foreground font-bold", phraseClassName)}>
      <p>{text}</p>
      <span className={cn("flex-shrink-0 h-[7.5vw] aspect-[4/2] rounded-full bg-muted/40", blockClassName)} />
    </div>
  )
}

export function TextParallax({
  text,
  className,
  rowClassName,
  phraseClassName,
  blockClassName,
  directions = ["left", "right", "left"],
  leftOffsets = ["-50%", "-30%", "-70%"],
  scrollTarget,
}: TextParallaxProps) {
  const rowsRef = useRef<(HTMLDivElement | null)[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Clear any existing ScrollTriggers
    ScrollTrigger.getAll().forEach(t => t.kill())

    // Wait for DOM to be ready
    const timer = setTimeout(() => {
      const scrollElement = scrollTarget ? document.querySelector(scrollTarget) : window

      rowsRef.current.forEach((row, index) => {
        if (!row || index >= directions.length) return
        
        const direction = directions[index]
        const isLeft = direction === "left"
        
        // Much larger movement for visible effect
        const moveDistance = window.innerWidth * 0.5
        
        gsap.fromTo(row, 
          {
            x: isLeft ? moveDistance : -moveDistance,
          },
          {
            x: isLeft ? -moveDistance : moveDistance,
            ease: "none",
            scrollTrigger: {
              trigger: container,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
              scroller: scrollElement,
              markers: false, // Set to true for debugging
              onUpdate: (self) => {
                // Debug log - remove after testing
                // console.log(`Row ${index}: progress ${self.progress}`)
              }
            }
          }
        )
      })

      // Refresh ScrollTrigger after setup
      ScrollTrigger.refresh()
    }, 100)

    return () => {
      clearTimeout(timer)
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [directions, scrollTarget, text])

  return (
    <div 
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
    >
      {directions.map((direction, i) => (
        <div
          key={`parallax-row-${i}`}
          ref={(el) => {
            rowsRef.current[i] = el
          }}
          className={cn("absolute whitespace-nowrap will-change-transform", rowClassName)}
          style={{ 
            top: `${25 + i * 25}%`, // Distribute rows evenly: 25%, 50%, 75%
            left: leftOffsets[i] ?? "0%",
            transform: 'translateY(-50%)', // Center each row vertically
          }}
        >
          {/* Create enough repetitions for seamless scrolling */}
          {Array.from({ length: 6 }).map((_, idx) => (
            <Phrase 
              key={`phrase-${i}-${idx}`} 
              text={text} 
              phraseClassName={phraseClassName} 
              blockClassName={blockClassName} 
            />
          ))}
        </div>
      ))}
    </div>
  )
}
