export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export const services: Service[] = [
  {
    id: "1",
    title: "Land Sales & Acquisition",
    description: "Expert assistance in buying and selling land parcels with full legal support and market analysis.",
    icon: "🏞️",
    features: [
      "Land valuation and assessment",
      "Legal documentation support",
      "Market analysis and insights",
      "Negotiation assistance",
    ],
  },
  {
    id: "2",
    title: "Property Management",
    description: "Comprehensive property management services including rentals, maintenance, and tenant handling.",
    icon: "🏢",
    features: [
      "Rental management",
      "Maintenance coordination",
      "Tenant screening and relations",
      "Financial reporting",
    ],
  },
  {
    id: "3",
    title: "Real Estate Consulting",
    description: "Professional consulting services to help you make informed real estate investment decisions.",
    icon: "💼",
    features: [
      "Investment analysis",
      "Market research",
      "Portfolio optimization",
      "Risk assessment",
    ],
  },
  {
    id: "4",
    title: "Investment Advisory",
    description: "Strategic investment advice tailored to your financial goals and risk tolerance.",
    icon: "📈",
    features: [
      "ROI analysis",
      "Market trends",
      "Investment strategies",
      "Portfolio diversification",
    ],
  },
  {
    id: "5",
    title: "Legal Assistance",
    description: "Full legal support for all real estate transactions and documentation.",
    icon: "⚖️",
    features: [
      "Contract review",
      "Title verification",
      "Legal compliance",
      "Dispute resolution",
    ],
  },
  {
    id: "6",
    title: "After-Sale Support",
    description: "Ongoing support after your purchase to ensure a smooth transition and satisfaction.",
    icon: "🤝",
    features: [
      "Post-purchase assistance",
      "Warranty support",
      "Maintenance referrals",
      "Ongoing consultation",
    ],
  },
];

