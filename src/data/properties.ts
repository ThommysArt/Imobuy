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
    price: 450000,
    currency: "XAF",
    location: "Downtown District",
    city: "Seoul",
    size: 350,
    bedrooms: 4,
    bathrooms: 3,
    images: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    ],
    description: "Stunning modern villa with panoramic views, premium finishes, and spacious living areas. Perfect for families seeking luxury and comfort.",
    status: "available",
    featured: true,
    coordinates: { lat: 37.5665, lng: 126.9780 },
  },
  {
    id: "2",
    title: "Downtown Apartment",
    type: "apartment",
    price: 280000,
    currency: "XAF",
    location: "Gangnam",
    city: "Seoul",
    size: 120,
    bedrooms: 2,
    bathrooms: 2,
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
    ],
    description: "Contemporary apartment in the heart of Gangnam with modern amenities and excellent connectivity.",
    status: "available",
    featured: true,
    coordinates: { lat: 37.4979, lng: 127.0276 },
  },
  {
    id: "3",
    title: "Prime Land Parcel",
    type: "land",
    price: 320000,
    currency: "XAF",
    location: "Yongsan",
    city: "Seoul",
    size: 500,
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800",
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800",
    ],
    description: "Prime development land in a rapidly growing area. Perfect for residential or commercial development.",
    status: "available",
    featured: true,
    coordinates: { lat: 37.5326, lng: 126.9907 },
  },
  {
    id: "4",
    title: "Commercial Office Space",
    type: "commercial",
    price: 650000,
    currency: "XAF",
    location: "Jongno",
    city: "Seoul",
    size: 800,
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800",
    ],
    description: "Premium commercial office space in central business district with high foot traffic and excellent visibility.",
    status: "available",
    featured: false,
    coordinates: { lat: 37.5735, lng: 126.9788 },
  },
  {
    id: "5",
    title: "Family Home",
    type: "house",
    price: 380000,
    currency: "XAF",
    location: "Seongdong",
    city: "Seoul",
    size: 280,
    bedrooms: 3,
    bathrooms: 2,
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800",
    ],
    description: "Charming family home with garden, perfect for those seeking a peaceful residential area.",
    status: "available",
    featured: false,
    coordinates: { lat: 37.5636, lng: 127.0366 },
  },
  {
    id: "6",
    title: "Luxury Penthouse",
    type: "apartment",
    price: 750000,
    currency: "XAF",
    location: "Itaewon",
    city: "Seoul",
    size: 200,
    bedrooms: 3,
    bathrooms: 3,
    images: [
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800",
    ],
    description: "Exclusive penthouse with rooftop terrace and stunning city views. Premium finishes throughout.",
    status: "available",
    featured: true,
    coordinates: { lat: 37.5347, lng: 126.9946 },
  },
];

