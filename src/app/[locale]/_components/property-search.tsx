"use client";

import { useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";

type PropertyType = "house" | "apartment" | "land" | "studio" | "other" | "all";

export function PropertySearch() {
  const t = useTranslations("properties.search");
  const tType = useTranslations("common.propertyType");
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [propertyType, setPropertyType] = useState<PropertyType>("all");
  const [maxPrice, setMaxPrice] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (propertyType !== "all") params.set("type", propertyType);
    if (maxPrice) params.set("maxPrice", maxPrice);

    router.push(`/listings?${params.toString()}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className="w-full max-w-5xl mx-auto bg-background/95 backdrop-blur-sm rounded-lg shadow-lg border border-border/50 p-4 sm:p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Input
          placeholder={t("placeholder")}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-full bg-background text-foreground border-border"
        />
        <Select value={propertyType} onValueChange={(value) => setPropertyType(value as PropertyType | "all")}>
          <SelectTrigger className="w-full bg-background text-foreground border-border">
            <SelectValue>
              {propertyType === "all" ? tType("all") : tType(propertyType)}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{tType("all")}</SelectItem>
            <SelectItem value="house">{tType("house")}</SelectItem>
            <SelectItem value="apartment">{tType("apartment")}</SelectItem>
            <SelectItem value="land">{tType("land")}</SelectItem>
            <SelectItem value="studio">{tType("all")}</SelectItem>
            <SelectItem value="other">{tType("all")}</SelectItem>
          </SelectContent>
        </Select>
        <Input
          type="number"
          placeholder={t("maxPrice")}
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-full bg-background text-foreground border-border"
        />
        <Button onClick={handleSearch} className="w-full">
          {t("button")}
        </Button>
      </div>
    </div>
  )
}
