"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { PropertyType } from "@/data/properties"

export function PropertySearch() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [propertyType, setPropertyType] = useState<PropertyType | "all">("all")
  const [maxPrice, setMaxPrice] = useState("")

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (searchQuery) params.set("q", searchQuery)
    if (propertyType !== "all") params.set("type", propertyType)
    if (maxPrice) params.set("maxPrice", maxPrice)
    
    router.push(`/properties?${params.toString()}`)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className="w-full max-w-5xl mx-auto bg-background/95 backdrop-blur-sm rounded-lg shadow-lg border border-border/50 p-4 sm:p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Input
          placeholder="Search by location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-full bg-background text-foreground border-border"
        />
        <Select value={propertyType} onValueChange={(value) => setPropertyType(value as PropertyType | "all")}>
          <SelectTrigger className="w-full bg-background text-foreground border-border">
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
        <Input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-full bg-background text-foreground border-border"
        />
        <Button onClick={handleSearch} className="w-full">
          Search Properties
        </Button>
      </div>
    </div>
  )
}
