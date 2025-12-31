import { HeroSection } from "@/components/hero-section"
import { FeaturedProperties } from "@/components/featured-properties"
import { ServicesOverview } from "@/components/services-overview"
import { TrustIndicators } from "@/components/trust-indicators"
import { TestimonialsSection } from "@/components/testimonials-section"
import { NewsGrid } from "@/components/news-grid"
import { CTASection } from "@/components/cta-section"

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedProperties />
      <ServicesOverview />
      <TrustIndicators />
      <TestimonialsSection />
      <NewsGrid />
      <CTASection />
    </>
  )
}
