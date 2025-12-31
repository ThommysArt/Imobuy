import { services } from "@/data/services"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { InteractiveHoverButton } from "@/components/interactive-hover-button"
import Link from "next/link"

export const metadata = {
  title: "Services - Imobuy Real Estate",
  description: "Comprehensive real estate services including land sales, property management, consulting, and more.",
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="px-4 sm:px-[2vw] py-16 sm:py-[10vh] bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            Our Services
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl font-normal tracking-tight text-muted-foreground">
            Comprehensive real estate solutions tailored to your needs
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="px-4 sm:px-[2vw] py-16 sm:py-[10vh]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service) => (
              <Card key={service.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="text-5xl mb-4">{service.icon}</div>
                  <CardTitle className="text-2xl sm:text-3xl">{service.title}</CardTitle>
                  <CardDescription className="text-base sm:text-lg mt-2">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm sm:text-base text-muted-foreground">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="mr-2 text-primary">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Service Details Sections */}
      <section className="px-4 sm:px-[2vw] py-16 sm:py-[10vh] bg-muted/30">
        <div className="max-w-6xl mx-auto space-y-16">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Land Sales & Acquisition
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-4">
              Our expert team assists clients in buying and selling land parcels with comprehensive support including land valuation, market analysis, legal documentation, and negotiation assistance. We ensure all transactions are transparent and legally secure.
            </p>
          </div>

          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Property Management
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-4">
              Full-service property management covering rentals, maintenance coordination, tenant screening and relations, and comprehensive financial reporting. We handle all aspects so you don't have to.
            </p>
          </div>

          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Real Estate Consulting
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-4">
              Professional consulting services to help you make informed real estate investment decisions. Our team provides investment analysis, market research, portfolio optimization, and risk assessment.
            </p>
          </div>

          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Investment Advisory
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-4">
              Strategic investment advice tailored to your financial goals and risk tolerance. We provide ROI analysis, market trends, investment strategies, and portfolio diversification recommendations.
            </p>
          </div>

          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Legal Assistance & Documentation
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-4">
              Full legal support for all real estate transactions including contract review, title verification, legal compliance, and dispute resolution. We ensure all documentation is in order.
            </p>
          </div>

          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6">
              After-Sale Support
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-4">
              Ongoing support after your purchase to ensure a smooth transition and satisfaction. We provide post-purchase assistance, warranty support, maintenance referrals, and ongoing consultation.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-[2vw] py-16 sm:py-[10vh]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8">
            Contact us today to learn more about how we can help with your real estate needs.
          </p>
          <Link href="/contact">
            <InteractiveHoverButton className="tracking-tight uppercase text-xs sm:text-sm">
              Get in Touch
            </InteractiveHoverButton>
          </Link>
        </div>
      </section>
    </div>
  )
}

