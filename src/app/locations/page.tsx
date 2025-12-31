import { locations } from "@/data/locations"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/lib/currency"
import Link from "next/link"

export const metadata = {
  title: "Locations - Imobuy Real Estate",
  description: "Explore our service areas and available properties by location.",
}

export default function LocationsPage() {
  const formatPrice = (price: number) => {
    return formatCurrency(price, "XAF", { maximumFractionDigits: 0 })
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="px-4 sm:px-[2vw] py-16 sm:py-[10vh] bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            Our Locations
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl font-normal tracking-tight text-muted-foreground">
            Explore our service areas and available properties across different locations
          </p>
        </div>
      </section>

      {/* Locations Grid */}
      <section className="px-4 sm:px-[2vw] py-16 sm:py-[10vh]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {locations.map((location) => (
              <Card key={location.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-2xl sm:text-3xl">{location.name}</CardTitle>
                  <CardDescription className="text-base sm:text-lg">
                    {location.city}, {location.region}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm sm:text-base text-muted-foreground">
                    {location.description}
                  </p>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div>
                      <p className="text-xs sm:text-sm text-muted-foreground">Properties</p>
                      <p className="text-lg sm:text-xl font-semibold">{location.propertyCount}</p>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-muted-foreground">Avg. Price</p>
                      <p className="text-lg sm:text-xl font-semibold">{formatPrice(location.averagePrice)}</p>
                    </div>
                  </div>
                  <Link
                    href={`/properties?city=${location.city}`}
                    className="block text-center text-sm sm:text-base font-medium text-primary hover:underline"
                  >
                    View Properties →
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Map Overview */}
      <section className="px-4 sm:px-[2vw] py-16 sm:py-[10vh] bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-8 text-center">
            Map Overview
          </h2>
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
            <p className="text-sm sm:text-base text-muted-foreground">
              Interactive map integration placeholder
            </p>
          </div>
        </div>
      </section>

      {/* Local Investment Insights */}
      <section className="px-4 sm:px-[2vw] py-16 sm:py-[10vh]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-8 text-center">
            Local Investment Insights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {locations.slice(0, 4).map((location) => (
              <Card key={location.id}>
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl">{location.name} Market</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm sm:text-base text-muted-foreground mb-4">
                    The {location.name} area offers excellent investment opportunities with strong market fundamentals and growth potential. Average property prices are competitive, making it an attractive option for both residential and commercial investments.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Growing property values</li>
                    <li>• Strong rental demand</li>
                    <li>• Excellent connectivity</li>
                    <li>• Development potential</li>
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

