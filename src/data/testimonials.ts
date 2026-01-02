export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  image?: string;
  content: string;
  rating: number;
  propertyType?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Marie Ngo",
    role: "Home Buyer",
    content: "Imobuy made our home buying experience seamless. Their team was professional, transparent, and always available to answer our questions. We found our dream home in Bastos, Yaoundé within weeks!",
    rating: 5,
    propertyType: "House",
  },
  {
    id: "2",
    name: "Jean-Pierre Mbarga",
    role: "Investor",
    company: "Mbarga Investments",
    content: "As a real estate investor, I appreciate Imobuy's market insights and professional service. They helped me acquire several profitable properties in Douala and Yaoundé with excellent ROI potential.",
    rating: 5,
    propertyType: "Commercial",
  },
  {
    id: "3",
    name: "Aminata Diallo",
    role: "First-time Buyer",
    content: "Being a first-time buyer was overwhelming, but Imobuy guided me through every step. Their transparency and legal support gave me confidence in my purchase. Highly recommended!",
    rating: 5,
    propertyType: "Apartment",
  },
  {
    id: "4",
    name: "Paul Tchouassi",
    role: "Land Developer",
    content: "Imobuy's expertise in land acquisition is unmatched. They helped us secure prime development land in Etoa-Meki with all legal documentation in order. Professional service from start to finish.",
    rating: 5,
    propertyType: "Land",
  },
  {
    id: "5",
    name: "Sophie Mvondo",
    role: "Property Owner",
    content: "Their property management services have been excellent. They handle everything professionally, and I've had zero issues with tenants or maintenance. Great value for money.",
    rating: 5,
    propertyType: "Management",
  },
];

