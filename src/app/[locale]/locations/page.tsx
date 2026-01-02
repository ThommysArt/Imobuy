import { locations } from "@/data/locations"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/lib/currency"
import Link from "next/link"
import { getTranslations } from "next-intl/server"

export async function generateMetadata() {
  const t = await getTranslations("metadata.locations")
  return {
    title: t("title"),
    description: t("description"),
  }
}

export default async function LocationsPage() {
  const t = await getTranslations("locations")
  const tLabel = await getTranslations("common.label")
  const formatPrice = (price: number) => {
    return formatCurrency(price, "XAF", { maximumFractionDigits: 0 })
  }

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
                      <p className="text-xs sm:text-sm text-muted-foreground">{t("properties")}</p>
                      <p className="text-lg sm:text-xl font-semibold">{location.propertyCount}</p>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-muted-foreground">{tLabel("avgPrice")}</p>
                      <p className="text-lg sm:text-xl font-semibold">{formatPrice(location.averagePrice)}</p>
                    </div>
                  </div>
                  <Link
                    href={`/properties?city=${location.city}`}
                    className="block text-center text-sm sm:text-base font-medium text-primary hover:underline"
                  >
                    {t("viewProperties")}
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
            {t("mapOverview")}
          </h2>
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
            <p className="text-sm sm:text-base text-muted-foreground">
              {t("mapPlaceholder")}
            </p>
          </div>
        </div>
      </section>

      {/* Local Investment Insights */}
      <section className="px-4 sm:px-[2vw] py-16 sm:py-[10vh]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-8 text-center">
            {t("investmentInsights")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {locations.slice(0, 4).map((location) => (
              <Card key={location.id}>
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl">{location.name} {t("market")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm sm:text-base text-muted-foreground mb-4">
                    {t("insightDesc", { location: location.name })}
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• {t("insight1")}</li>
                    <li>• {t("insight2")}</li>
                    <li>• {t("insight3")}</li>
                    <li>• {t("insight4")}</li>
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

