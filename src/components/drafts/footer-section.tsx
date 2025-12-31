import { AnimatedLink } from '@/components/animated-link'
import Link from 'next/link'
import React from 'react'

const FooterSection = () => {
  return (
    <div className='w-full h-full bg-white'>
        <p className='text-4xl sm:text-6xl md:text-8xl lg:text-10xl xl:text-[12em] font-medium tracking-tight px-4 sm:px-[2vw]'>
            MA Architects
        </p>
        <div className='border-t px-4 sm:px-[2vw] pt-8 sm:pt-[5vh] mb-8 sm:mb-[15vh] grid grid-cols-1 lg:grid-cols-3 h-full gap-6 sm:gap-8'>
            <div className='flex flex-col w-full h-full'>
                <div className='w-full sm:w-[80%] h-[30vh] sm:h-[45vh] px-2 sm:px-4 aspect-[4/5] overflow-hidden'>
                    <img
                        src="https://t90qbbxdsu.ufs.sh/f/JpRsMSGdnCqMH68tnw3HG0ZpYbguqe9RlOh5ixtkvXAfdWUr"
                        alt="footer image"
                        className='h-full w-full object-cover'
                        />
                </div>
                <span className='text-6xl sm:text-8xl md:text-10xl lg:text-12xl xl:text-[16rem] font-bold tracking-tight leading-[0.8] p-0 m-0 text-left'>MA</span>
            </div>
            <div className='flex flex-col w-full h-full'>
                <span className='font-semibold tracking-tight mb-2 sm:mb-4 uppercase text-sm sm:text-base'>[Navigation]</span>
                <ul className='text-2xl sm:text-3xl md:text-4xl lg:text-[3.5em] font-medium tracking-tight'>
                    {["Home", "Works", "Studio", "Gallery", "Contact"].map((nav, i)=>(
                        <li key={i} className='w-full h-[1.2em] overflow-hidden flex items-center'>
                            <AnimatedLink href="#" className=''>
                                {nav}
                            </AnimatedLink>
                        </li>
                    ))}
                </ul>
            </div>

            <div className='flex flex-col gap-3 sm:gap-4'>
                <span className='font-semibold tracking-tight mb-2 sm:mb-4 uppercase text-sm sm:text-base'>[Studio]</span>
                <p className="text-base sm:text-lg md:text-xl font-normal tracking-tight">
                    At MA Architects, we believe in the power of design to transform spaces into inspiring environments. Our approach is rooted in thoughtful planning, careful execution, and a deep understanding of how buildings can enhance people's lives.
                </p>
                <span className='font-semibold tracking-tight mb-2 sm:mb-4 uppercase mt-6 sm:mt-10 text-sm sm:text-base'>[Info]</span>
                <p className="text-sm sm:text-base md:text-xl font-normal tracking-tighter">
                    A: 22/45 Hanyang-daero, Seongdong-gu, Seoul, South Korea <br />
                    E: contact@maarchitects.com <br />
                    P: 73 4838 2937 <br />
                    H: Monday to Friday, 9:00am - 5:00pm
                </p>
            </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-4 sm:px-[2vw] py-4 text-xs sm:text-[0.9rem] font-semibold tracking-tight uppercase">
            <span className='flex flex-col gap-1 sm:gap-[4px] leading-none'>
                <span>© 2025 MA Architects</span>
                <span>Get the template at <Link href='https://reframe-ui.vercel.app/templates' target='_blank' className='underline'>reframe/ui</Link></span>
            </span>
            <span className="flex gap-3 sm:gap-4">
                <AnimatedLink href='https://x.com/ThommysArt'>
                    Twitter
                </AnimatedLink>
                <AnimatedLink href='https://instagram.com/thommysart21'>
                    Instagram
                </AnimatedLink>
            </span>
            <span className='flex flex-col gap-1 sm:gap-[4px] leading-none'>
                <span>
                    Made by <Link href='https://keabouthomson.vercel.app' target='_blank' className='underline'>ThommysArt</Link>
                </span>
                <span>
                    Inspired by <Link href='https://www.oharchitecture.com.au/' target='_blank' className='underline'>OH Architecture</Link>
                </span>
            </span>
        </div>
    </div>
  )
}

export default FooterSection