import { notFound } from "next/navigation"
import { properties } from "@/data/properties"
import { PropertyGallery } from "@/components/property-gallery"
import { PropertyCard } from "@/components/property-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { InteractiveHoverButton } from "@/components/interactive-hover-button"
import { formatCurrency } from "@/lib/currency"
import Link from "next/link"

interface PropertyDetailPageProps {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return properties.map((property) => ({
    id: property.id,
  }))
}

export default async function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const { id } = await params
  const property = properties.find((p) => p.id === id)

  if (!property) {
    notFound()
  }

  const formatPrice = (price: number, currency?: string) => {
    return formatCurrency(price, currency, { maximumFractionDigits: 0 })
  }

  const getTypeLabel = (type: typeof property.type) => {
    const labels = {
      house: "House",
      apartment: "Apartment",
      land: "Land",
      commercial: "Commercial",
    }
    return labels[type]
  }

  const relatedProperties = properties
    .filter((p) => p.id !== property.id && (p.type === property.type || p.city === property.city))
    .slice(0, 3)

  return (
    <div className="min-h-screen">
      <div className="px-4 sm:px-[2vw] py-8 sm:py-12">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-foreground">Home</Link>
            {" / "}
            <Link href="/properties" className="hover:text-foreground">Properties</Link>
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
                      {property.bedrooms} Bed{property.bedrooms > 1 ? "s" : ""}
                    </span>
                  )}
                  {property.bathrooms && (
                    <span className="px-3 py-1 bg-muted rounded-full text-sm font-medium">
                      {property.bathrooms} Bath{property.bathrooms > 1 ? "s" : ""}
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
                    {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                  </span>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Property Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                    {property.description}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Property Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Type</p>
                      <p className="text-base font-medium">{getTypeLabel(property.type)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Size</p>
                      <p className="text-base font-medium">{property.size}m²</p>
                    </div>
                    {property.bedrooms && (
                      <div>
                        <p className="text-sm text-muted-foreground">Bedrooms</p>
                        <p className="text-base font-medium">{property.bedrooms}</p>
                      </div>
                    )}
                    {property.bathrooms && (
                      <div>
                        <p className="text-sm text-muted-foreground">Bathrooms</p>
                        <p className="text-base font-medium">{property.bathrooms}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="text-base font-medium">{property.location}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">City</p>
                      <p className="text-base font-medium">{property.city}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Legal & Documentation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-base text-muted-foreground mb-4">
                    All legal documentation is verified and up to date. Our team ensures complete transparency in all transactions.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Title verification completed</li>
                    <li>• Legal compliance confirmed</li>
                    <li>• All documentation available for review</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Us</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Interested in this property? Get in touch with our team for more information or to schedule a visit.
                  </p>
                  <Link href="/contact" className="w-full">
                    <InteractiveHoverButton className="w-full tracking-tight uppercase text-xs sm:text-sm">
                      Request Visit
                    </InteractiveHoverButton>
                  </Link>
                  <a href="tel:+82212345678" className="inline-flex items-center justify-center whitespace-nowrap rounded-lg border border-border bg-background hover:bg-muted hover:text-foreground h-8 px-2.5 text-sm font-medium transition-all w-full">
                    Call Now
                  </a>
                  <a href="https://wa.me/82123456789" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center whitespace-nowrap rounded-lg border border-border bg-background hover:bg-muted hover:text-foreground h-8 px-2.5 text-sm font-medium transition-all w-full">
                    WhatsApp
                  </a>
                </CardContent>
              </Card>

              {property.coordinates && (
                <Card>
                  <CardHeader>
                    <CardTitle>Location Map</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                      <p className="text-sm text-muted-foreground">Map integration placeholder</p>
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
                Related Properties
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

