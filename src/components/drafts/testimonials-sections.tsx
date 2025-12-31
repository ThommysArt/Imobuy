import { TextParallax } from '@/components/text-parallax'
import React from 'react'

const TestimonialsSections = () => {
  return (
    <div className='min-h-screen h-full w-full relative bg-white pt-8 sm:pt-[10vh]'>
        <TextParallax
            text="FOCUSED ON QUALITY"
            className="h-[15vw] sm:h-[10vw] w-full"
            directions={["right"]}
            leftOffsets={["-60%"]}
            phraseClassName='text-[8vw] sm:text-[5vw] font-semibold tracking-tighter'
            blockClassName='h-[7.5vw] sm:h-[5vw] bg-neutral-200/40'
          />
        <TextParallax
            text="DRIVEN BY CREATIVITY"
            className="h-[15vw] sm:h-[10vw] w-full -mt-[7.5vw] sm:-mt-[5vw]"
            directions={["left"]}
            leftOffsets={["-20%"]}
            phraseClassName='text-[8vw] sm:text-[5vw] font-semibold tracking-tighter'
            blockClassName='h-[7.5vw] sm:h-[5vw] bg-neutral-200/40'
          />
        <div className="my-8 sm:my-[10vh] grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 px-4 sm:px-[2vw]">
          <div className='flex flex-col gap-4 sm:gap-8 w-full lg:w-[80%]'>
            <span className='font-semibold tracking-tight mb-2 sm:mb-4 uppercase text-sm sm:text-base'>[What our clients say]</span>
            <p className='text-lg sm:text-xl md:text-2xl font-medium tracking-tight'>
              "Working with MA Architects was transformative. From the start, their team understood our vision, listened closely, and offered creative solutions. The process was collaborative and transparent, and our input was always valued.
              <br /><br />
              The final result exceeded our expectations—beautiful, modern, and highly functional. Our employees love the space, and we've received many compliments from clients and visitors.
              <br /><br />
              MA Architects' commitment to quality and attention to detail was clear throughout. We couldn't be happier and highly recommend them to anyone seeking a passionate, creative partner."
            </p>
            <p className='text-lg sm:text-xl md:text-2xl font-medium tracking-tight mt-8 sm:mt-[5rem]'>
              <span className="block font-semibold text-xl sm:text-2xl md:text-3xl mb-2">— Jane Park</span>
              <span className="block text-base sm:text-lg md:text-xl font-normal opacity-80">Home Owner, Harbor View Residences</span>
            </p>
          </div>

          <div className='group relative'>
            <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[40rem] overflow-hidden">
              <img
                src="https://t90qbbxdsu.ufs.sh/f/JpRsMSGdnCqMMlKjirygfx3az7MDVZEu9sIRplHi5GwjXYmd"
                alt={`testimonial`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-115"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-0 left-0 h-full w-full z-10 flex items-center justify-center">
                <img 
                  className="w-full h-full object-cover scale-0 group-hover:scale-60 transition-transform duration-500" 
                  src="https://t90qbbxdsu.ufs.sh/f/JpRsMSGdnCqMMlKjirygfx3az7MDVZEu9sIRplHi5GwjXYmd" 
                  alt="work-overlay" 
                  />
              </div>
            </div>
            <div className="w-full py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between font-medium tracking-tight gap-2 sm:gap-0">
              <span className="flex items-center gap-2 sm:gap-4 text-sm sm:text-lg drop-shadow">
                <span className="opacity-70 font-mono">[2025]</span>
                <span className="ml-1 sm:ml-2">Harbor View Residences</span>
              </span>
              <span className="opacity-80 font-mono text-sm sm:text-base">Done!</span>
            </div>
          </div>
        </div>
    </div>
  )
}

export default TestimonialsSections