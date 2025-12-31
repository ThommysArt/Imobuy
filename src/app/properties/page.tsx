"use client"

import { useState, useMemo, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { PropertyCard } from "@/components/property-card"
import { PropertyFilters, FilterState } from "@/components/property-filters"
import { PropertySearch } from "@/components/property-search"
import { properties } from "@/data/properties"
import { PropertyType } from "@/data/properties"
import { Input } from "@/components/ui/input"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

function PropertiesContent() {
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState<FilterState>({
    type: "all",
    status: "all",
  })

  // Initialize from URL params
  useEffect(() => {
    const q = searchParams.get("q")
    const type = searchParams.get("type")
    const status = searchParams.get("status")
    const maxPrice = searchParams.get("maxPrice")
    
    if (q) setSearchQuery(q)
    if (type) setFilters(prev => ({ ...prev, type: type as PropertyType }))
    if (status) setFilters(prev => ({ ...prev, status: status as any }))
    if (maxPrice) setFilters(prev => ({ ...prev, maxPrice: parseInt(maxPrice) }))
  }, [searchParams])

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesSearch = 
          property.title.toLowerCase().includes(query) ||
          property.location.toLowerCase().includes(query) ||
          property.city.toLowerCase().includes(query) ||
          property.description.toLowerCase().includes(query)
        if (!matchesSearch) return false
      }

      // Type filter
      if (filters.type && filters.type !== "all" && property.type !== filters.type) {
        return false
      }
      
      // Status filter
      if (filters.status && filters.status !== "all" && property.status !== filters.status) {
        return false
      }
      
      // Price filters
      if (filters.minPrice && property.price < filters.minPrice) {
        return false
      }
      if (filters.maxPrice && property.price > filters.maxPrice) {
        return false
      }
      
      // Bedrooms filter
      if (filters.bedrooms && property.bedrooms && property.bedrooms < filters.bedrooms) {
        return false
      }
      
      return true
    })
  }, [filters, searchQuery])

  return (
    <div className="min-h-screen px-4 sm:px-[2vw] py-16 sm:py-[10vh]">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink render={<Link href="/" />}>Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Properties</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4">
            All Properties
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground">
            Browse our complete collection of available properties
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="max-w-2xl">
            <Input
              placeholder="Search properties by name, location, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        <PropertyFilters onFilterChange={setFilters} className="mb-8" />

        <div className="mb-6">
          <p className="text-sm sm:text-base text-muted-foreground">
            Showing {filteredProperties.length} of {properties.length} properties
          </p>
        </div>

        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg sm:text-xl text-muted-foreground">
              No properties found matching your criteria. Try adjusting your filters.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function PropertiesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen px-4 sm:px-[2vw] py-16 sm:py-[10vh]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 sm:mb-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4">
              All Properties
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground">
              Browse our complete collection of available properties
            </p>
          </div>
        </div>
      </div>
    }>
      <PropertiesContent />
    </Suspense>
  )
}

