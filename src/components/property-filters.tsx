"use client"

import { useState } from "react"
import { PropertyType } from "@/data/properties"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

interface PropertyFiltersProps {
  onFilterChange: (filters: FilterState) => void
  className?: string
}

export interface FilterState {
  type?: PropertyType | "all"
  minPrice?: number
  maxPrice?: number
  bedrooms?: number
  bathrooms?: number
  city?: string
  status?: "available" | "pending" | "sold" | "all"
  minSize?: number
  maxSize?: number
}

export function PropertyFilters({ onFilterChange, className }: PropertyFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    type: "all",
    status: "all",
  })
  const [priceRange, setPriceRange] = useState([0, 1000000])
  const [sizeRange, setSizeRange] = useState([0, 2000])

  const updateFilter = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const clearFilters = () => {
    const cleared: FilterState = { type: "all", status: "all" }
    setFilters(cleared)
    setPriceRange([0, 1000000])
    setSizeRange([0, 2000])
    onFilterChange(cleared)
  }

  return (
    <div className={className}>
      <Sheet>
        <SheetTrigger>
          <Button variant="outline" className="md:hidden">
            Filters
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] sm:w-[400px]">
          <SheetHeader>
            <SheetTitle>Filter Properties</SheetTitle>
            <SheetDescription>
              Refine your search to find the perfect property
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6 space-y-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Property Type</label>
              <Select
                value={filters.type || "all"}
                onValueChange={(value) => updateFilter("type", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="land">Land</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Price Range: ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}
              </label>
              <Slider
                value={priceRange}
                onValueChange={(value) => {
                  const range = Array.isArray(value) ? value : [value]
                  setPriceRange(range)
                  updateFilter("minPrice", range[0])
                  updateFilter("maxPrice", range[1])
                }}
                max={1000000}
                step={10000}
                className="w-full"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Status</label>
              <Select
                value={filters.status || "all"}
                onValueChange={(value) => updateFilter("status", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="sold">Sold</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Bedrooms</label>
              <Select
                value={filters.bedrooms?.toString() || "any"}
                onValueChange={(value) =>
                  updateFilter("bedrooms", value === "any" || !value ? undefined : parseInt(value))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="1">1+</SelectItem>
                  <SelectItem value="2">2+</SelectItem>
                  <SelectItem value="3">3+</SelectItem>
                  <SelectItem value="4">4+</SelectItem>
                  <SelectItem value="5">5+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {(filters.type === "land" || filters.type === "all") && (
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Surface Area (m²): {sizeRange[0]} - {sizeRange[1]}
                </label>
                <Slider
                  value={sizeRange}
                  onValueChange={(value) => {
                    const range = Array.isArray(value) ? value : [value]
                    setSizeRange(range)
                    updateFilter("minSize", range[0])
                    updateFilter("maxSize", range[1])
                  }}
                  max={2000}
                  step={50}
                  className="w-full"
                />
              </div>
            )}

            <Button onClick={clearFilters} variant="outline" className="w-full">
              Clear Filters
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Filters */}
      <div className="hidden md:flex flex-col gap-4 p-4 bg-muted rounded-lg">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Type</label>
            <Select
              value={filters.type || "all"}
              onValueChange={(value) => updateFilter("type", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="land">Land</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Status</label>
            <Select
              value={filters.status || "all"}
              onValueChange={(value) => updateFilter("status", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="sold">Sold</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Bedrooms</label>
            <Select
              value={filters.bedrooms?.toString() || "any"}
              onValueChange={(value) =>
                updateFilter("bedrooms", value === "any" || !value ? undefined : parseInt(value))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="1">1+</SelectItem>
                <SelectItem value="2">2+</SelectItem>
                <SelectItem value="3">3+</SelectItem>
                <SelectItem value="4">4+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Price Range</label>
            <div className="text-sm text-muted-foreground">
              ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}
            </div>
            <Slider
              value={priceRange}
              onValueChange={(value) => {
                const range = Array.isArray(value) ? value : [value]
                setPriceRange(range)
                updateFilter("minPrice", range[0])
                updateFilter("maxPrice", range[1])
              }}
              max={1000000}
              step={10000}
              className="w-full mt-2"
            />
          </div>

          {(filters.type === "land" || filters.type === "all") && (
            <div>
              <label className="text-sm font-medium mb-2 block">Surface Area (m²)</label>
              <div className="text-sm text-muted-foreground">
                {sizeRange[0]} - {sizeRange[1]} m²
              </div>
              <Slider
                value={sizeRange}
                onValueChange={(value) => {
                  const range = Array.isArray(value) ? value : [value]
                  setSizeRange(range)
                  updateFilter("minSize", range[0])
                  updateFilter("maxSize", range[1])
                }}
                max={2000}
                step={50}
                className="w-full mt-2"
              />
            </div>
          )}
        </div>
        <Button onClick={clearFilters} variant="outline" className="w-fit">
          Clear All
        </Button>
      </div>
    </div>
  )
}

