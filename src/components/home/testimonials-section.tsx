"use client"

import { useState } from "react"
import { testimonials } from "@/data/testimonials"
import { TextParallax } from "@/components/text-parallax"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useTranslations } from "next-intl"

export function TestimonialsSection() {
  const t = useTranslations("home.testimonials")
  const tTestimonial = useTranslations("testimonials")
  const tLabel = useTranslations("common.label")
  const tPlaceholder = useTranslations("common.placeholder")
  const tButton = useTranslations("common.button")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    company: "",
    content: "",
    rating: 5,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Testimonial submitted:", formData)
    alert(tTestimonial("form.success"))
    setFormData({
      name: "",
      email: "",
      role: "",
      company: "",
      content: "",
      rating: 5,
    })
    setIsDialogOpen(false)
  }
  return (
    <section className="min-h-screen h-full w-full relative bg-white pt-8 sm:pt-[10vh] pb-16 sm:pb-[10vh] overflow-x-hidden">
      <TextParallax
        text={t("title")}
        className="h-[15vw] sm:h-[10vw] w-full"
        directions={["right"]}
        leftOffsets={["-60%"]}
        phraseClassName='text-[8vw] sm:text-[5vw] font-semibold tracking-tighter'
        blockClassName='h-[7.5vw] sm:h-[5vw] bg-neutral-200/40'
      />
      <TextParallax
        text={t("subtitle")}
        className="h-[15vw] sm:h-[10vw] w-full -mt-[7.5vw] sm:-mt-[5vw]"
        directions={["left"]}
        leftOffsets={["-20%"]}
        phraseClassName='text-[8vw] sm:text-[5vw] font-semibold tracking-tighter'
        blockClassName='h-[7.5vw] sm:h-[5vw] bg-neutral-200/40'
      />

      <div className="px-4 sm:px-6 md:px-8 lg:px-[2vw] mt-8 sm:mt-[10vh]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 sm:mb-12">
            <span className='font-semibold tracking-tight mb-4 uppercase text-sm sm:text-base text-muted-foreground'>
              {t("whatClientsSay")}
            </span>
          </div>

          <Carousel className="w-full">
            <CarouselContent className="-ml-2 md:-ml-4 py-4">
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="h-full cursor-grab active:cursor-grabbing select-none">
                    <CardContent className="p-6 sm:p-8">
                      <div className="flex items-center gap-1 mb-4">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <span key={i} className="text-yellow-400">★</span>
                        ))}
                      </div>
                      <p className="text-base sm:text-lg font-normal tracking-tight mb-6 text-muted-foreground select-none">
                        "{testimonial.content}"
                      </p>
                      <div>
                        <p className="font-semibold text-lg sm:text-xl mb-1 select-none">
                          {testimonial.name}
                        </p>
                        <p className="text-sm sm:text-base text-muted-foreground select-none">
                          {testimonial.role}
                          {testimonial.company && `, ${testimonial.company}`}
                        </p>
                        {testimonial.propertyType && (
                          <p className="text-xs sm:text-sm text-muted-foreground mt-1 select-none">
                            {tLabel("property")}: {testimonial.propertyType}
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

          <div className="mt-8 sm:mt-12 flex justify-center">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger render={<Button variant="outline" className="tracking-tight uppercase text-xs sm:text-sm" />}>
                {tButton("submitTestimonial")}
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>{tTestimonial("form.title")}</DialogTitle>
                  <DialogDescription>
                    {tTestimonial("form.description")}
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                  <FieldGroup className="space-y-4">
                    <Field>
                      <FieldLabel htmlFor="testimonial-name">{tLabel("name")} *</FieldLabel>
                      <Input
                        id="testimonial-name"
                        placeholder={tPlaceholder("name")}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="testimonial-email">{tLabel("email")} *</FieldLabel>
                      <Input
                        id="testimonial-email"
                        type="email"
                        placeholder={tPlaceholder("email")}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="testimonial-role">{tLabel("role")}</FieldLabel>
                      <Input
                        id="testimonial-role"
                        placeholder={tPlaceholder("role")}
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="testimonial-company">{tLabel("company")}</FieldLabel>
                      <Input
                        id="testimonial-company"
                        placeholder={tPlaceholder("company")}
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="testimonial-content">{tLabel("message")} *</FieldLabel>
                      <Textarea
                        id="testimonial-content"
                        placeholder={tPlaceholder("testimonial")}
                        rows={5}
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        required
                      />
                    </Field>
                  </FieldGroup>
                  <DialogFooter className="mt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsDialogOpen(false)}
                    >
                      {tButton("cancel")}
                    </Button>
                    <Button type="submit">
                      {tButton("submit")}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </section>
  )
}

