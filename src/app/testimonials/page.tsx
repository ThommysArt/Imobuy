import { testimonials } from "@/data/testimonials"
import { Card, CardContent } from "@/components/ui/card"

export const metadata = {
  title: "Testimonials - Imobuy Real Estate",
  description: "Read what our clients say about their experience with Imobuy.",
}

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="px-4 sm:px-[2vw] py-16 sm:py-[10vh] bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            Client Testimonials
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl font-normal tracking-tight text-muted-foreground">
            Hear from our satisfied clients about their experience with Imobuy
          </p>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="px-4 sm:px-[2vw] py-16 sm:py-[10vh]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="h-full">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <span key={i} className="text-yellow-400 text-lg">★</span>
                    ))}
                  </div>
                  <p className="text-base sm:text-lg font-normal tracking-tight mb-6 text-muted-foreground italic">
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
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="px-4 sm:px-[2vw] py-16 sm:py-[10vh] bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-12 text-center">
            Success Stories
          </h2>
          <div className="space-y-8">
            <Card>
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-semibold mb-4">
                  From First-Time Buyer to Property Owner
                </h3>
                <p className="text-base sm:text-lg text-muted-foreground mb-4">
                  "As a first-time buyer, I was overwhelmed by the process. Imobuy's team guided me through every step, from finding the right property to completing all legal documentation. Their transparency and support made what seemed impossible, possible."
                </p>
                <p className="text-sm font-medium">— Min-jun Lee, First-time Buyer</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-semibold mb-4">
                  Successful Investment Portfolio
                </h3>
                <p className="text-base sm:text-lg text-muted-foreground mb-4">
                  "Imobuy's investment advisory helped me build a diverse real estate portfolio. Their market insights and strategic recommendations have resulted in excellent returns. I couldn't be happier with their service."
                </p>
                <p className="text-sm font-medium">— James Park, Investor</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}

