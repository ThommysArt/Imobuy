import { HeroSection } from "@/components/home/hero-section"
import { FeaturedProperties } from "@/components/home/featured-properties"
import { ServicesOverview } from "@/components/home/services-overview"
import { TrustIndicators } from "@/components/home/trust-indicators"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { NewsGrid } from "@/components/home/news-grid"
import { CTASection } from "@/components/home/cta-section"

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
