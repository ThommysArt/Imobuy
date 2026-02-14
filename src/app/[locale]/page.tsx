import { HeroSection } from "./_components/hero-section"
import { FeaturedProperties } from "./_components/featured-properties"
import { ServicesOverview } from "./_components/services-overview"
import { TrustIndicators } from "./_components/trust-indicators"
import { TestimonialsSection } from "./_components/testimonials-section"
import { NewsGrid } from "./_components/news-grid"
import { CTASection } from "./_components/cta-section"

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
