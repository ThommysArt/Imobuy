"use client"

import React, { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { InteractiveHoverButton } from "@/components/interactive-hover-button"

const IMAGES: string[] = [
  "https://t90qbbxdsu.ufs.sh/f/JpRsMSGdnCqMjYqAol1VBiL8TcW0ERz6XuFSMNg2Cye7Amxa",
  "https://t90qbbxdsu.ufs.sh/f/JpRsMSGdnCqMH68tnw3HG0ZpYbguqe9RlOh5ixtkvXAfdWUr",
  "https://t90qbbxdsu.ufs.sh/f/JpRsMSGdnCqMUasvt7eFaAVy6xbi81Mqd0L3cCXGwmnpOlo9",
  "https://t90qbbxdsu.ufs.sh/f/JpRsMSGdnCqMgRzW2D2NPhSkJ7M4IXyqvUzlo3HEs6eRc9A0",
  "https://t90qbbxdsu.ufs.sh/f/JpRsMSGdnCqMmquEKcYOTN1dGzoDqLW8pMyRjXPwIFKEi5ag",
  "https://t90qbbxdsu.ufs.sh/f/JpRsMSGdnCqM3ggR3aftnGuOavBIQlDSMJWVkLNgfK15j4dh",
  "https://t90qbbxdsu.ufs.sh/f/JpRsMSGdnCqMaj8gwamQjbFSZRU1ygfiWJ0VBd4hsXTtxPqo"
]

export default function StudioSection() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const followerRef = useRef<HTMLDivElement | null>(null)
  const animationRef = useRef<gsap.core.Tween | null>(null)

  const pos = useRef<number>(0)
  const bounds = useRef<{ min: number; max: number }>({ min: 0, max: 0 })
  const isPointerDown = useRef<boolean>(false)
  const startX = useRef<number>(0)
  const prevPointerX = useRef<number>(0)
  const lastPositions = useRef<Array<{ x: number; t: number }>>([])

  const [ready, setReady] = useState(false)

  useEffect(() => {
    const calc = () => {
      const container = containerRef.current
      const track = trackRef.current
      if (!container || !track) return
      const cw = container.clientWidth
      const tw = track.scrollWidth
      const maxTranslate = Math.min(0, cw - tw)
      bounds.current = { min: maxTranslate, max: 0 }
      pos.current = Math.max(maxTranslate, Math.min(0, pos.current))
      gsap.set(track, { x: pos.current })
      setReady(true)
    }

    const timeout = setTimeout(calc, 120)
    const ro = new ResizeObserver(calc)
    if (containerRef.current) ro.observe(containerRef.current)
    window.addEventListener('resize', calc)

    return () => {
      clearTimeout(timeout)
      window.removeEventListener('resize', calc)
      ro.disconnect()
    }
  }, [])

  // follower follows mouse — quickSetter for performance
  useEffect(() => {
    const follower = followerRef.current
    if (!follower) return
    const setX = gsap.quickSetter(follower, 'x', 'px')
    const setY = gsap.quickSetter(follower, 'y', 'px')

    const move = (e: MouseEvent) => {
      // offset so it doesn't hide the pointer
      const x = e.clientX - 22
      const y = e.clientY - 22
      setX(x)
      setY(y)
    }

    const container = containerRef.current
    if (!container) return
    container.addEventListener('mousemove', move)

    return () => container.removeEventListener('mousemove', move)
  }, [])

  // Drag handlers: attach pointerdown to the track (so images won't block)
  useEffect(() => {
    const track = trackRef.current
    const container = containerRef.current
    if (!track || !container) return

    const getEventX = (e: PointerEvent | TouchEvent | MouseEvent) => {
      if ('touches' in e && e.touches.length) return e.touches[0].clientX
      // @ts-ignore
      return (e as MouseEvent).clientX
    }

    const onPointerDown = (e: PointerEvent) => {
      isPointerDown.current = true
      startX.current = getEventX(e)
      prevPointerX.current = startX.current
      lastPositions.current = [{ x: startX.current, t: performance.now() }]
      if (animationRef.current) animationRef.current.kill && animationRef.current.kill()
      try { track.setPointerCapture((e as PointerEvent).pointerId) } catch {}
      container.style.cursor = 'grabbing'
      // show follower immediately on pointerdown (helpful for touch emulation)
      const follower = followerRef.current
      if (follower) gsap.to(follower, { autoAlpha: 1, scale: 1, duration: 0.18, ease: 'power2.out' })
    }

    const onPointerMove = (e: PointerEvent) => {
      if (!isPointerDown.current) return
      const x = getEventX(e)
      const dx = x - prevPointerX.current
      prevPointerX.current = x
      pos.current = pos.current + dx
      // add soft overscroll area
      pos.current = Math.max(bounds.current.min - 250, Math.min(bounds.current.max + 250, pos.current))
      gsap.set(track, { x: pos.current })
      lastPositions.current.push({ x, t: performance.now() })
      if (lastPositions.current.length > 12) lastPositions.current.shift()
    }

    const onPointerUp = (e?: PointerEvent) => {
      if (!isPointerDown.current) return
      isPointerDown.current = false
      container.style.cursor = 'grab'
      // estimate velocity
      const arr = lastPositions.current
      if (arr.length >= 2) {
        const first = arr[0]
        const last = arr[arr.length - 1]
        const v = (last.x - first.x) / (last.t - first.t || 1)
        const velocity = v * 1000
        const target = Math.round(pos.current + velocity * 0.35)
        const clamped = Math.max(bounds.current.min, Math.min(bounds.current.max, target))
        const duration = Math.min(1.4, Math.max(0.35, Math.abs(velocity) / 3000))
        animationRef.current = gsap.to(track, { x: clamped, duration, ease: 'power3.out' })
        pos.current = clamped
      } else {
        // if no velocity, snap back inside bounds if overscrolled
        if (pos.current > bounds.current.max) {
          animationRef.current = gsap.to(track, { x: bounds.current.max, duration: 0.45, ease: 'power3.out' })
          pos.current = bounds.current.max
        }
        if (pos.current < bounds.current.min) {
          animationRef.current = gsap.to(track, { x: bounds.current.min, duration: 0.45, ease: 'power3.out' })
          pos.current = bounds.current.min
        }
      }

      lastPositions.current = []
      // hide follower after release
      const follower = followerRef.current
      if (follower) gsap.to(follower, { autoAlpha: 0, scale: 0.9, duration: 0.2, ease: 'power2.in', delay: 0.15 })
      try { track.releasePointerCapture && track.releasePointerCapture((e as PointerEvent)?.pointerId) } catch {}
    }

    // Attach listeners
    track.addEventListener('pointerdown', onPointerDown as EventListener)
    window.addEventListener('pointermove', onPointerMove as EventListener)
    window.addEventListener('pointerup', onPointerUp as EventListener)
    window.addEventListener('pointercancel', onPointerUp as EventListener)

    // default cursor
    container.style.cursor = 'grab'

    return () => {
      track.removeEventListener('pointerdown', onPointerDown as EventListener)
      window.removeEventListener('pointermove', onPointerMove as EventListener)
      window.removeEventListener('pointerup', onPointerUp as EventListener)
      window.removeEventListener('pointercancel', onPointerUp as EventListener)
    }
  }, [ready])

  // follower show/hide on pointer enter/leave (works better than mouseenter when children cover area)
  useEffect(() => {
    const container = containerRef.current
    const follower = followerRef.current
    if (!container || !follower) return

    const show = () => gsap.to(follower, { autoAlpha: 1, scale: 1, duration: 0.18, ease: 'power2.out' })
    const hide = () => gsap.to(follower, { autoAlpha: 0, scale: 0.9, duration: 0.14, ease: 'power2.in' })

    container.addEventListener('pointerenter', show)
    container.addEventListener('pointerleave', hide)

    return () => {
      container.removeEventListener('pointerenter', show)
      container.removeEventListener('pointerleave', hide)
    }
  }, [])

  return (
    <section
      ref={containerRef}
      className="h-full w-full relative select-none overflow-hidden bg-white pt-[10vh]"
    >
      <p className="px-4 sm:px-[2vw] py-4 sm:py-[2vh] text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[8rem] font-medium tracking-tighter leading-[1] uppercase pointer-events-none">
        Design, Build <br /> and Deliver
      </p>

      {/* follower - the round "Drag" indicator that follows the mouse */}
      <div
        ref={followerRef}
        className="fixed w-12 h-12 rounded-full bg-black/90 text-white flex items-center justify-center text-xs font-medium z-50"
        style={{ transform: 'translate3d(-9999px, -9999px, 0)', pointerEvents: 'none', opacity: 0 }}
        aria-hidden
      >
        Drag
      </div>

      {/* carousel track */}
      <div className="mt-8 sm:mt-[5vh]">
        <div className="relative w-full overflow-hidden">
          <div
            ref={trackRef}
            className="flex gap-3 sm:gap-6 mx-3 sm:mx-6 items-center will-change-transform py-3 sm:py-6"
            style={{ touchAction: 'pan-y' }}
          >
            {IMAGES.map((src, i) => (
              <div key={i} className="flex-shrink-0 w-[70vw] sm:w-[45vw] md:w-[35vw] lg:w-[28vw]">
                <div className="overflow-hidden">
                  <img
                    src={src}
                    alt={`carousel-${i}`}
                    className="w-full h-[40vh] sm:h-[46vh] md:h-[52vh] lg:h-[60vh] object-cover block pointer-events-none"
                    onLoad={() => {
                      const event = new Event('resize')
                      window.dispatchEvent(event)
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <span className="sr-only">Draggable carousel. Click and drag or swipe to scroll.</span>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 mt-8 sm:mt-[10vh]">
        <p className="text-lg sm:text-xl md:text-2xl font-medium tracking-tight">
          At MA Architects, we believe in the power of design to transform spaces into inspiring environments. Our approach is rooted in thoughtful planning, careful execution, and a deep understanding of how buildings can enhance people's lives.
          We are a team of architects, designers, and engineers who are passionate about creating spaces that are not only beautiful but also functional and sustainable.
        </p>
        <p className="text-lg sm:text-xl md:text-2xl font-medium tracking-tight mt-8 sm:mt-[5rem]">
          Our projects are a reflection of our commitment to excellence and our passion for creating spaces that are not only beautiful but also functional and sustainable.
          We are committed to delivering projects that are not only beautiful but also functional and sustainable.
        </p>
        <div className="flex justify-center mt-8 sm:mt-[5rem]">
          <InteractiveHoverButton className="tracking-tight uppercase text-sm sm:text-base">
            Learn more about our studio
          </InteractiveHoverButton>
        </div>
      </div>
    </section>
  )
}
