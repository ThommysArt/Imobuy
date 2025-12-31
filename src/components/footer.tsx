import { AnimatedLink } from '@/components/animated-link'
import Link from 'next/link'
import React from 'react'

export function Footer() {
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Properties", href: "/properties" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "News", href: "/news" },
    { label: "Contact", href: "/contact" },
  ]

  const quickLinks = [
    { label: "Land for Sale", href: "/properties?type=land" },
    { label: "Residential Properties", href: "/properties?type=house" },
    { label: "Commercial Properties", href: "/properties?type=commercial" },
    { label: "Investment Opportunities", href: "/properties?featured=true" },
  ]

  return (
    <footer className='w-full h-full bg-white border-t border-border'>
      <div className='px-4 sm:px-[2vw] pt-8 sm:pt-[5vh] mb-8 sm:mb-[15vh] grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8'>
        <div className='flex flex-col w-full h-full'>
          <h3 className='text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4'>
            Imobuy
          </h3>
          <p className="text-base sm:text-lg font-normal tracking-tight text-muted-foreground">
            Bringing customers and sellers/agents closer to facilitate sales and transparency for houses, apartments, parcels, and more.
          </p>
        </div>

        <div className='flex flex-col w-full h-full'>
          <span className='font-semibold tracking-tight mb-4 uppercase text-sm sm:text-base'>[Navigation]</span>
          <ul className='text-xl sm:text-2xl font-medium tracking-tight space-y-2'>
            {navItems.map((nav) => (
              <li key={nav.href} className='w-full overflow-hidden flex items-center'>
                <AnimatedLink href={nav.href} className=''>
                  {nav.label}
                </AnimatedLink>
              </li>
            ))}
          </ul>
        </div>

        <div className='flex flex-col gap-4'>
          <span className='font-semibold tracking-tight mb-2 uppercase text-sm sm:text-base'>[Quick Links]</span>
          <ul className='space-y-2'>
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className='text-sm sm:text-base font-normal tracking-tight hover:text-primary transition-colors'>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          
          <span className='font-semibold tracking-tight mb-2 uppercase mt-6 sm:mt-10 text-sm sm:text-base'>[Contact]</span>
          <p className="text-sm sm:text-base font-normal tracking-tight text-muted-foreground">
            A: 123 Real Estate Avenue, Seoul, South Korea <br />
            E: contact@imobuy.com <br />
            P: +82 2 1234 5678 <br />
            H: Monday to Friday, 9:00am - 6:00pm
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-4 sm:px-[2vw] py-6 border-t border-border text-xs sm:text-sm font-semibold tracking-tight">
        <span className='flex flex-col gap-1 leading-none'>
          <span>© 2025 Imobuy. All rights reserved.</span>
        </span>
        <span className="flex gap-3 sm:gap-4">
          <AnimatedLink href='#'>
            Twitter
          </AnimatedLink>
          <AnimatedLink href='#'>
            Instagram
          </AnimatedLink>
          <AnimatedLink href='#'>
            LinkedIn
          </AnimatedLink>
        </span>
        <span className='flex flex-col gap-1 leading-none text-muted-foreground'>
          <Link href='/resources' className='hover:text-foreground transition-colors'>
            Privacy Policy
          </Link>
          <Link href='/resources' className='hover:text-foreground transition-colors'>
            Terms of Service
          </Link>
        </span>
      </div>
    </footer>
  )
}

