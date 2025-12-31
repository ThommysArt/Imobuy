"use client"

import { InteractiveHoverButton } from '@/components/interactive-hover-button'
import React from 'react'

interface Work {
    title: string
    year: number
    image: string
}

const WORKS: Work[] = [
    {
        title: "Skyline Pavilion",
        year: 2024,
        image: "https://t90qbbxdsu.ufs.sh/f/JpRsMSGdnCqMNuCtvfjsgmVGX7IWDwJnxAb8Ot1EjTNzKBZa"
    },
    {
        title: "Harbor View Residences",
        year: 2025,
        image: "https://t90qbbxdsu.ufs.sh/f/JpRsMSGdnCqMMlKjirygfx3az7MDVZEu9sIRplHi5GwjXYmd"
    },
    {
        title: "Aurora Cultural Center",
        year: 2024,
        image: "https://t90qbbxdsu.ufs.sh/f/JpRsMSGdnCqMBnubV0HESQjHZwfBMhxU7d19ARNJn4aIKu5P"
    },
    {
        title: "Verdant Office Complex",
        year: 2023,
        image: "https://t90qbbxdsu.ufs.sh/f/JpRsMSGdnCqMTT0E0quLQvoXwgdktf8reY7nu4Vqpz6iRWxm"
    },
    {
        title: "Cascade Art Museum",
        year: 2025,
        image: "https://t90qbbxdsu.ufs.sh/f/JpRsMSGdnCqMctG8PGokA6FD8U43BuqQxg2Z51WaXvbOmpHr"
    },
    {
        title: "Lakeside Innovation Hub",
        year: 2023,
        image: "https://t90qbbxdsu.ufs.sh/f/JpRsMSGdnCqMB2x2AbHESQjHZwfBMhxU7d19ARNJn4aIKu5P"
    }
]

const WorksSection = () => {
  return (
    <section className="h-full w-full px-4 sm:px-[2vw] py-4 sm:py-[2vh] pt-16 sm:pt-[20vh] relative select-none overflow-hidden bg-white">
        <p className="text-4xl sm:text-6xl md:text-8xl lg:text-[10em] max-w-5xl font-medium tracking-tighter leading-[1] uppercase pointer-events-none">
            Featured Works
        </p>
        <div
          className="
            mt-8 sm:mt-[5vh] w-full
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            gap-8
            auto-rows-[minmax(200px,1fr)]
          "
        >
          <WorkCard id={0} work={WORKS[0]} className='sm:col-span-2 md:col-span-2 md:row-span-1' />
          <WorkCard id={1} work={WORKS[1]} />
          <WorkCard id={2} work={WORKS[2]} />
          <WorkCard id={3} work={WORKS[3]} className='sm:col-span-2 md:col-span-2 md:row-span-1' />
          <WorkCard id={4} work={WORKS[4]} className='sm:col-span-2 md:col-span-2 md:row-span-1' />
          <WorkCard id={5} work={WORKS[5]} />
        </div>
        <div className="flex justify-center mt-8 sm:mt-[5rem]">
          <InteractiveHoverButton className="tracking-tighter uppercase text-xs sm:text-sm">
            View all works
          </InteractiveHoverButton>
        </div>
    </section>
  )
}

export const WorkCard = ({ id, work, className }: { id: number, work: Work; className?: string }) => {
  return (
    <div className={`md:col-span-1 md:row-span-1 flex flex-col justify-end overflow-hidden group relative ${className}`}>
      <div className="relative w-full h-full md:h-[40rem] overflow-hidden">
        <img
          src={work.image}
          alt={`work-${work.title}`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-115"
        />
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-0 left-0 h-full w-full z-10 flex items-center justify-center">
          <img 
            className="w-full h-full object-cover scale-0 group-hover:scale-60 transition-transform duration-500" 
            src={work.image} 
            alt="work-overlay" 
            />
        </div>
      </div>
      <div className="w-full py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between font-medium tracking-tight gap-2 sm:gap-0">
        <span className="flex items-center gap-2 sm:gap-4 text-sm sm:text-lg drop-shadow">
          <span className="opacity-70 font-mono">[0{id+1}]</span>
          <span className="ml-1 sm:ml-2">{work.title}</span>
        </span>
        <span className="opacity-80 font-mono text-sm sm:text-base">{work.year}</span>
      </div>
    </div>
  )
}

export default WorksSection