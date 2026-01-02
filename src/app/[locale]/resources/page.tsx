import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"
import { getTranslations } from "next-intl/server"

export async function generateMetadata() {
  const t = await getTranslations("metadata.resources")
  return {
    title: t("title"),
    description: t("description"),
  }
}

export default async function ResourcesPage() {
  const t = await getTranslations("resources")
  
  const faqs = [
    {
      question: t("faq.q1"),
      answer: t("faq.a1"),
    },
    {
      question: t("faq.q2"),
      answer: t("faq.a2"),
    },
    {
      question: t("faq.q3"),
      answer: t("faq.a3"),
    },
    {
      question: t("faq.q4"),
      answer: t("faq.a4"),
    },
    {
      question: t("faq.q5"),
      answer: t("faq.a5"),
    },
    {
      question: t("faq.q6"),
      answer: t("faq.a6"),
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="px-4 sm:px-[2vw] py-16 sm:py-[10vh] bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            {t("title")}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl font-normal tracking-tight text-muted-foreground">
            {t("subtitle")}
          </p>
        </div>
      </section>

      {/* Buying Guide */}
      <section className="px-4 sm:px-[2vw] py-16 sm:py-[10vh]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-8">
            {t("buyingGuide")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl">{t("step1.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm sm:text-base text-muted-foreground mb-4">
                  {t("step1.desc")}
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• {t("step1.item1")}</li>
                  <li>• {t("step1.item2")}</li>
                  <li>• {t("step1.item3")}</li>
                  <li>• {t("step1.item4")}</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl">{t("step2.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm sm:text-base text-muted-foreground mb-4">
                  {t("step2.desc")}
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• {t("step2.item1")}</li>
                  <li>• {t("step2.item2")}</li>
                  <li>• {t("step2.item3")}</li>
                  <li>• {t("step2.item4")}</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl">{t("step3.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm sm:text-base text-muted-foreground mb-4">
                  {t("step3.desc")}
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• {t("step3.item1")}</li>
                  <li>• {t("step3.item2")}</li>
                  <li>• {t("step3.item3")}</li>
                  <li>• {t("step3.item4")}</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl">{t("step4.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm sm:text-base text-muted-foreground mb-4">
                  {t("step4.desc")}
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• {t("step4.item1")}</li>
                  <li>• {t("step4.item2")}</li>
                  <li>• {t("step4.item3")}</li>
                  <li>• {t("step4.item4")}</li>
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
            {t("landOwnership.title")}
          </h2>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl">{t("landOwnership.step1.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm sm:text-base text-muted-foreground">
                  {t("landOwnership.step1.desc")}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl">{t("landOwnership.step2.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm sm:text-base text-muted-foreground">
                  {t("landOwnership.step2.desc")}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl">{t("landOwnership.step3.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm sm:text-base text-muted-foreground">
                  {t("landOwnership.step3.desc")}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl">{t("landOwnership.step4.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm sm:text-base text-muted-foreground">
                  {t("landOwnership.step4.desc")}
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
            {t("faq.title")}
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
            {t("downloads.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              { title: t("downloads.buyersGuide.title"), description: t("downloads.buyersGuide.desc") },
              { title: t("downloads.sellersGuide.title"), description: t("downloads.sellersGuide.desc") },
              { title: t("downloads.investmentGuide.title"), description: t("downloads.investmentGuide.desc") },
              { title: t("downloads.legalDocuments.title"), description: t("downloads.legalDocuments.desc") },
              { title: t("downloads.marketReport.title"), description: t("downloads.marketReport.desc") },
              { title: t("downloads.checklist.title"), description: t("downloads.checklist.desc") },
            ].map((resource, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">{resource.title}</CardTitle>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="#" className="text-sm font-medium text-primary hover:underline">
                    {t("downloads.downloadPdf")}
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
            {t("legal.title")}
          </h2>
          <div className="space-y-4">
            {["Privacy Policy", "Terms of Service", "Cookie Policy", "Refund Policy"].map((doc, idx) => (
              <Card key={idx}>
                <CardContent className="p-6 flex items-center justify-between">
                  <span className="text-base sm:text-lg font-medium">{doc}</span>
                  <Link href="#" className="text-sm font-medium text-primary hover:underline">
                    {t("legal.view")}
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

