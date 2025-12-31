import Link from "next/link"
import Image from "next/image"
import { Property } from "@/data/properties"
import { cn } from "@/lib/utils"
import { formatCurrency } from "@/lib/currency"

interface PropertyCardProps {
  property: Property
  className?: string
}

export function PropertyCard({ property, className }: PropertyCardProps) {
  const formatPrice = (price: number, currency?: string) => {
    return formatCurrency(price, currency, { maximumFractionDigits: 0 })
  }

  const getTypeLabel = (type: Property["type"]) => {
    const labels = {
      house: "House",
      apartment: "Apartment",
      land: "Land",
      commercial: "Commercial",
    }
    return labels[type]
  }

  return (
    <Link
      href={`/properties/${property.id}`}
      className={cn(
        "group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-all hover:shadow-lg",
        className
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={property.images[0] || "/placeholder-property.jpg"}
          alt={property.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
        {property.featured && (
          <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
            Featured
          </div>
        )}
        <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
          {formatPrice(property.price, property.currency)}
        </div>
      </div>
      <div className="p-4 sm:p-6 flex flex-col gap-0.5">
        <div className="flex items-center justify-between">
          <span className="text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wide">
            {getTypeLabel(property.type)}
          </span>
          <span className="text-xs sm:text-sm text-muted-foreground">
            {property.size}m²
          </span>
        </div>
        <h3 className="text-lg sm:text-xl font-semibold tracking-tight group-hover:text-primary transition-colors">
          {property.title}
        </h3>
        <p className="text-sm sm:text-base text-muted-foreground">
          {property.location}, {property.city}
        </p>
        {(property.bedrooms || property.bathrooms) && (
          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
            {property.bedrooms && (
              <span>{property.bedrooms} Bed{property.bedrooms > 1 ? "s" : ""}</span>
            )}
            {property.bathrooms && (
              <span>{property.bathrooms} Bath{property.bathrooms > 1 ? "s" : ""}</span>
            )}
          </div>
        )}
        <div className="mt-1">
          <span
            className={cn(
              "inline-block px-2 py-1 rounded text-xs font-medium",
              property.status === "available"
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                : property.status === "pending"
                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                  : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
            )}
          >
            {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
          </span>
        </div>
      </div>
    </Link>
  )
}

