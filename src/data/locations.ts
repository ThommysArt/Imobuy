export interface Location {
  id: string;
  name: string;
  city: string;
  region: string;
  propertyCount: number;
  averagePrice: number;
  description: string;
  coordinates: { lat: number; lng: number };
}

export const locations: Location[] = [
  {
    id: "1",
    name: "Gangnam",
    city: "Seoul",
    region: "Seoul",
    propertyCount: 45,
    averagePrice: 350000,
    description: "Premium district known for luxury properties and excellent amenities.",
    coordinates: { lat: 37.4979, lng: 127.0276 },
  },
  {
    id: "2",
    name: "Jongno",
    city: "Seoul",
    region: "Seoul",
    propertyCount: 32,
    averagePrice: 420000,
    description: "Historic district with commercial and residential opportunities.",
    coordinates: { lat: 37.5735, lng: 126.9788 },
  },
  {
    id: "3",
    name: "Yongsan",
    city: "Seoul",
    region: "Seoul",
    propertyCount: 28,
    averagePrice: 380000,
    description: "Rapidly developing area with great investment potential.",
    coordinates: { lat: 37.5326, lng: 126.9907 },
  },
  {
    id: "4",
    name: "Seongdong",
    city: "Seoul",
    region: "Seoul",
    propertyCount: 22,
    averagePrice: 290000,
    description: "Family-friendly residential area with good connectivity.",
    coordinates: { lat: 37.5636, lng: 127.0366 },
  },
  {
    id: "5",
    name: "Itaewon",
    city: "Seoul",
    region: "Seoul",
    propertyCount: 18,
    averagePrice: 450000,
    description: "International district with diverse property options.",
    coordinates: { lat: 37.5347, lng: 126.9946 },
  },
];

