"use client"

import { testimonials } from "@/data/testimonials"
import { TextParallax } from "@/components/text-parallax"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"

export function TestimonialsSection() {
  return (
    <section className="min-h-screen h-full w-full relative bg-white pt-8 sm:pt-[10vh] pb-16 sm:pb-[10vh]">
      <TextParallax
        text="CLIENT TESTIMONIALS"
        className="h-[15vw] sm:h-[10vw] w-full"
        directions={["right"]}
        leftOffsets={["-60%"]}
        phraseClassName='text-[8vw] sm:text-[5vw] font-semibold tracking-tighter'
        blockClassName='h-[7.5vw] sm:h-[5vw] bg-neutral-200/40'
      />
      <TextParallax
        text="TRUSTED BY MANY"
        className="h-[15vw] sm:h-[10vw] w-full -mt-[7.5vw] sm:-mt-[5vw]"
        directions={["left"]}
        leftOffsets={["-20%"]}
        phraseClassName='text-[8vw] sm:text-[5vw] font-semibold tracking-tighter'
        blockClassName='h-[7.5vw] sm:h-[5vw] bg-neutral-200/40'
      />

      <div className="px-4 sm:px-[2vw] mt-8 sm:mt-[10vh]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 sm:mb-12">
            <span className='font-semibold tracking-tight mb-4 uppercase text-sm sm:text-base text-muted-foreground'>
              [What our clients say]
            </span>
          </div>

          <Carousel className="w-full">
            <CarouselContent className="-ml-2 md:-ml-4">
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="h-full">
                    <CardContent className="p-6 sm:p-8">
                      <div className="flex items-center gap-1 mb-4">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <span key={i} className="text-yellow-400">★</span>
                        ))}
                      </div>
                      <p className="text-base sm:text-lg font-normal tracking-tight mb-6 text-muted-foreground">
                        "{testimonial.content}"
                      </p>
                      <div>
                        <p className="font-semibold text-lg sm:text-xl mb-1">
                          {testimonial.name}
                        </p>
                        <p className="text-sm sm:text-base text-muted-foreground">
                          {testimonial.role}
                          {testimonial.company && `, ${testimonial.company}`}
                        </p>
                        {testimonial.propertyType && (
                          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                            Property: {testimonial.propertyType}
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </section>
  )
}

