import { notFound } from "next/navigation"
import { properties } from "@/data/properties"
import { PropertyGallery } from "../_components/property-gallery"
import { PropertyCard } from "../_components/property-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { InteractiveHoverButton } from "../../_components/interactive-hover-button"
import { InteractiveHoverButtonLight } from "../../_components/interactive-hover-button-light"
import { formatCurrency } from "@/lib/currency"
import Link from "next/link"
import { getTranslations } from "next-intl/server"

interface PropertyDetailPageProps {
  params: Promise<{ locale: string; id: string }>
}

export async function generateStaticParams() {
  const locales = ["en", "fr"]
  return locales.flatMap((locale) =>
    properties.map((property) => ({
      locale,
      id: property.id,
    }))
  )
}

export default async function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const { locale, id } = await params
  const property = properties.find((p) => p.id === id)

  if (!property) {
    notFound()
  }

  const t = await getTranslations({ locale, namespace: "properties.detail" })
  const tNav = await getTranslations({ locale, namespace: "navigation" })
  const tType = await getTranslations({ locale, namespace: "common.propertyType" })
  const tStatus = await getTranslations({ locale, namespace: "common.status" })
  const tLabel = await getTranslations({ locale, namespace: "common.label" })

  const formatPrice = (price: number, currency?: string) => {
    return formatCurrency(price, currency, { maximumFractionDigits: 0 })
  }

  const getTypeLabel = (type: typeof property.type) => {
    return tType(type)
  }

  const relatedProperties = properties
    .filter((p) => p.id !== property.id && (p.type === property.type || p.city === property.city))
    .slice(0, 3)

  return (
    <div className="min-h-screen">
      <div className="px-4 sm:px-[2vw] pt-24 sm:pt-32 pb-8 sm:pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-foreground">{tNav("home")}</Link>
            {" / "}
            <Link href="/properties" className="hover:text-foreground">{tNav("properties")}</Link>
            {" / "}
            <span className="text-foreground">{property.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <PropertyGallery images={property.images} title={property.title} />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                    {property.title}
                  </h1>
                  <span className="text-2xl sm:text-3xl font-bold text-primary">
                    {formatPrice(property.price, property.currency)}
                  </span>
                </div>
                <p className="text-lg sm:text-xl text-muted-foreground mb-6">
                  {property.location}, {property.city}
                </p>
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <span className="px-3 py-1 bg-muted rounded-full text-sm font-medium">
                    {getTypeLabel(property.type)}
                  </span>
                  <span className="px-3 py-1 bg-muted rounded-full text-sm font-medium">
                    {property.size}m²
                  </span>
                  {property.bedrooms && (
                    <span className="px-3 py-1 bg-muted rounded-full text-sm font-medium">
                      {property.bedrooms} {property.bedrooms > 1 ? tLabel("beds") : tLabel("bed")}
                    </span>
                  )}
                  {property.bathrooms && (
                    <span className="px-3 py-1 bg-muted rounded-full text-sm font-medium">
                      {property.bathrooms} {property.bathrooms > 1 ? tLabel("baths") : tLabel("bath")}
                    </span>
                  )}
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      property.status === "available"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : property.status === "pending"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
                    }`}
                  >
                    {tStatus(property.status)}
                  </span>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>{t("propertyDescription")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                    {property.description}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t("propertyDetails")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">{t("type")}</p>
                      <p className="text-base font-medium">{getTypeLabel(property.type)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{t("size")}</p>
                      <p className="text-base font-medium">{property.size}m²</p>
                    </div>
                    {property.bedrooms && (
                      <div>
                        <p className="text-sm text-muted-foreground">{t("bedrooms")}</p>
                        <p className="text-base font-medium">{property.bedrooms}</p>
                      </div>
                    )}
                    {property.bathrooms && (
                      <div>
                        <p className="text-sm text-muted-foreground">{t("bathrooms")}</p>
                        <p className="text-base font-medium">{property.bathrooms}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-sm text-muted-foreground">{t("location")}</p>
                      <p className="text-base font-medium">{property.location}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{t("city")}</p>
                      <p className="text-base font-medium">{property.city}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t("legalDocumentation")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-base text-muted-foreground mb-4">
                    {t("legalDescription")}
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• {t("titleVerification")}</li>
                    <li>• {t("legalCompliance")}</li>
                    <li>• {t("documentationAvailable")}</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t("contactUs")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {t("contactDescription")}
                  </p>
                  <div className="flex flex-col gap-2">
                    <Link href="/contact" className="w-full mb-2">
                      <InteractiveHoverButton className="w-full tracking-tight uppercase text-xs sm:text-sm">
                        {t("requestVisit")}
                      </InteractiveHoverButton>
                    </Link>
                    <a href="tel:+237612345678" className="w-full mb-2">
                      <InteractiveHoverButtonLight className="w-full tracking-tight uppercase text-xs sm:text-sm border border-black">
                        {t("callNow")}
                      </InteractiveHoverButtonLight>
                    </a>
                    <a href="https://wa.me/237612345678" target="_blank" rel="noopener noreferrer" className="w-full">
                      <InteractiveHoverButtonLight className="w-full tracking-tight uppercase text-xs sm:text-sm border border-black">
                        {t("whatsApp")}
                      </InteractiveHoverButtonLight>
                    </a>
                  </div>
                </CardContent>
              </Card>

              {property.coordinates && (
                <Card>
                  <CardHeader>
                    <CardTitle>{t("locationMap")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                      <p className="text-sm text-muted-foreground">{t("mapPlaceholder")}</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Related Properties */}
          {relatedProperties.length > 0 && (
            <div className="mt-16 sm:mt-20">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-8">
                {t("relatedProperties")}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {relatedProperties.map((related) => (
                  <PropertyCard key={related.id} property={related} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

