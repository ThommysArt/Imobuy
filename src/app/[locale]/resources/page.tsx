import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"

export const metadata = {
  title: "Resources - Imobuy Real Estate",
  description: "Educational resources, guides, FAQs, and downloadable documents for real estate transactions.",
}

export default function ResourcesPage() {
  const faqs = [
    {
      question: "What documents do I need to buy a property?",
      answer: "You'll typically need identification documents, proof of income, bank statements, and any pre-approval letters from lenders. Our team will guide you through all required documentation.",
    },
    {
      question: "How long does the property buying process take?",
      answer: "The process typically takes 30-60 days from offer acceptance to closing, depending on financing, inspections, and legal requirements. We work to expedite the process while ensuring all steps are completed properly.",
    },
    {
      question: "Do you help with property financing?",
      answer: "Yes, we work with trusted lenders and can help connect you with financing options. We also provide guidance on mortgage pre-approval and loan applications.",
    },
    {
      question: "What is included in your property management services?",
      answer: "Our property management services include tenant screening, rent collection, maintenance coordination, property inspections, financial reporting, and legal compliance support.",
    },
    {
      question: "How do you ensure legal security in transactions?",
      answer: "We conduct thorough title verification, legal compliance checks, contract review, and work with qualified legal professionals to ensure all transactions are secure and compliant with regulations.",
    },
    {
      question: "Can you help with property valuation?",
      answer: "Yes, we provide comprehensive property valuation services including market analysis, comparative market analysis (CMA), and investment value assessments.",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="px-4 sm:px-[2vw] py-16 sm:py-[10vh] bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            Resources
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl font-normal tracking-tight text-muted-foreground">
            Educational resources and guides to help you navigate the real estate process
          </p>
        </div>
      </section>

      {/* Buying Guide */}
      <section className="px-4 sm:px-[2vw] py-16 sm:py-[10vh]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-8">
            Buying Guide
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl">Step 1: Preparation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm sm:text-base text-muted-foreground mb-4">
                  Before you start looking, determine your budget, get pre-approved for a mortgage, and identify your must-haves and nice-to-haves.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Assess your financial situation</li>
                  <li>• Get mortgage pre-approval</li>
                  <li>• Define your property requirements</li>
                  <li>• Research neighborhoods</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl">Step 2: Property Search</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm sm:text-base text-muted-foreground mb-4">
                  Use our platform to search for properties, attend viewings, and work with our agents to find the perfect match.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Browse available properties</li>
                  <li>• Schedule property viewings</li>
                  <li>• Evaluate properties</li>
                  <li>• Compare options</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl">Step 3: Making an Offer</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm sm:text-base text-muted-foreground mb-4">
                  Once you find the right property, we'll help you make a competitive offer and negotiate terms.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Determine offer price</li>
                  <li>• Include conditions and contingencies</li>
                  <li>• Submit offer</li>
                  <li>• Negotiate terms</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl">Step 4: Closing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm sm:text-base text-muted-foreground mb-4">
                  Finalize financing, complete inspections, review legal documents, and close the transaction.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Property inspection</li>
                  <li>• Finalize financing</li>
                  <li>• Review legal documents</li>
                  <li>• Complete transaction</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Land Ownership Process */}
      <section className="px-4 sm:px-[2vw] py-16 sm:py-[10vh] bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-8">
            Land Ownership Process
          </h2>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl">1. Land Identification</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Identify suitable land parcels based on your requirements, location preferences, and budget. Our team helps you find the perfect plot.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl">2. Due Diligence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Conduct thorough due diligence including title verification, zoning checks, environmental assessments, and legal compliance review.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl">3. Purchase Agreement</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Negotiate and sign a purchase agreement with all terms and conditions clearly defined. Our legal team ensures all documentation is in order.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl">4. Title Transfer</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Complete the title transfer process, register the property in your name, and obtain all necessary certificates and documentation.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="px-4 sm:px-[2vw] py-16 sm:py-[10vh]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-8">
            Frequently Asked Questions
          </h2>
          <Accordion className="w-full">
            {faqs.map((faq, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Downloadable Documents */}
      <section className="px-4 sm:px-[2vw] py-16 sm:py-[10vh] bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-8 text-center">
            Downloadable Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              { title: "Buyer's Guide", description: "Complete guide for property buyers" },
              { title: "Seller's Guide", description: "Complete guide for property sellers" },
              { title: "Investment Guide", description: "Real estate investment strategies" },
              { title: "Legal Documents", description: "Sample contracts and forms" },
              { title: "Market Report 2025", description: "Annual market analysis report" },
              { title: "Property Checklist", description: "Property viewing checklist" },
            ].map((resource, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">{resource.title}</CardTitle>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="#" className="text-sm font-medium text-primary hover:underline">
                    Download PDF →
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Legal & Policy */}
      <section className="px-4 sm:px-[2vw] py-16 sm:py-[10vh]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-8 text-center">
            Legal & Policy Documents
          </h2>
          <div className="space-y-4">
            {["Privacy Policy", "Terms of Service", "Cookie Policy", "Refund Policy"].map((doc, idx) => (
              <Card key={idx}>
                <CardContent className="p-6 flex items-center justify-between">
                  <span className="text-base sm:text-lg font-medium">{doc}</span>
                  <Link href="#" className="text-sm font-medium text-primary hover:underline">
                    View →
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

