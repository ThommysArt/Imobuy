export type PropertyType = "house" | "apartment" | "land" | "commercial";

export interface Property {
  id: string;
  title: string;
  type: PropertyType;
  price: number;
  currency?: string; // Currency code (defaults to XAF/FCFA)
  location: string;
  city: string;
  size: number; // in square meters
  bedrooms?: number;
  bathrooms?: number;
  images: string[];
  description: string;
  status: "available" | "sold" | "pending";
  featured: boolean;
  coordinates?: { lat: number; lng: number };
}

export const properties: Property[] = [
  {
    id: "1",
    title: "Modern Luxury Villa",
    type: "house",
    price: 45000000,
    currency: "XAF",
    location: "Bastos",
    city: "Yaoundé",
    size: 350,
    bedrooms: 4,
    bathrooms: 3,
    images: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    ],
    description: "Stunning modern villa with panoramic views, premium finishes, and spacious living areas. Perfect for families seeking luxury and comfort in the heart of Yaoundé.",
    status: "available",
    featured: true,
    coordinates: { lat: 3.8480, lng: 11.5021 },
  },
  {
    id: "2",
    title: "Downtown Apartment",
    type: "apartment",
    price: 28000000,
    currency: "XAF",
    location: "Bonanjo",
    city: "Douala",
    size: 120,
    bedrooms: 2,
    bathrooms: 2,
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
    ],
    description: "Contemporary apartment in the heart of Douala's business district with modern amenities and excellent connectivity.",
    status: "available",
    featured: true,
    coordinates: { lat: 4.0511, lng: 9.7679 },
  },
  {
    id: "3",
    title: "Prime Land Parcel",
    type: "land",
    price: 32000000,
    currency: "XAF",
    location: "Etoa-Meki",
    city: "Yaoundé",
    size: 500,
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800",
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800",
    ],
    description: "Prime development land in a rapidly growing area. Perfect for residential or commercial development with all legal documentation in order.",
    status: "available",
    featured: true,
    coordinates: { lat: 3.8600, lng: 11.5200 },
  },
  {
    id: "4",
    title: "Commercial Office Space",
    type: "commercial",
    price: 65000000,
    currency: "XAF",
    location: "Aké Palace",
    city: "Douala",
    size: 800,
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800",
    ],
    description: "Premium commercial office space in central business district with high foot traffic and excellent visibility. Ideal for businesses looking to establish in Douala.",
    status: "available",
    featured: true,
    coordinates: { lat: 4.0500, lng: 9.7000 },
  },
  {
    id: "5",
    title: "Family Home",
    type: "house",
    price: 38000000,
    currency: "XAF",
    location: "Elig-Edzoa",
    city: "Yaoundé",
    size: 280,
    bedrooms: 3,
    bathrooms: 2,
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800",
    ],
    description: "Charming family home with garden, perfect for those seeking a peaceful residential area in Yaoundé.",
    status: "available",
    featured: true,
    coordinates: { lat: 3.8700, lng: 11.5100 },
  },
  {
    id: "6",
    title: "Luxury Penthouse",
    type: "apartment",
    price: 75000000,
    currency: "XAF",
    location: "Bonapriso",
    city: "Douala",
    size: 200,
    bedrooms: 3,
    bathrooms: 3,
    images: [
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800",
    ],
    description: "Exclusive penthouse with rooftop terrace and stunning city views. Premium finishes throughout in one of Douala's most prestigious neighborhoods.",
    status: "available",
    featured: true,
    coordinates: { lat: 4.0600, lng: 9.7200 },
  },
  {
    id: "7",
    title: "Residential Land Plot",
    type: "land",
    price: 15000000,
    currency: "XAF",
    location: "Nkoldongo",
    city: "Yaoundé",
    size: 300,
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800",
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800",
    ],
    description: "Well-located residential land plot, perfect for building your dream home. All legal documents verified and ready for construction.",
    status: "available",
    featured: false,
    coordinates: { lat: 3.8500, lng: 11.5300 },
  },
  {
    id: "8",
    title: "Cozy Apartment",
    type: "apartment",
    price: 18000000,
    currency: "XAF",
    location: "Mvog-Ada",
    city: "Yaoundé",
    size: 85,
    bedrooms: 2,
    bathrooms: 1,
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
    ],
    description: "Cozy and affordable apartment in a quiet neighborhood, perfect for young professionals or small families.",
    status: "available",
    featured: false,
    coordinates: { lat: 3.8400, lng: 11.5000 },
  },
];

