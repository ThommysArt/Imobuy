export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: "news" | "project" | "insight" | "announcement";
  date: string;
  author: string;
}

export const news: NewsArticle[] = [
  {
    id: "1",
    title: "New Luxury Development Project Launched",
    excerpt: "Imobuy announces a new luxury residential development in Gangnam with state-of-the-art amenities.",
    content: "We're excited to announce our latest luxury residential development project in the heart of Gangnam...",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    category: "project",
    date: "2025-01-15",
    author: "Imobuy Team",
  },
  {
    id: "2",
    title: "Real Estate Market Trends 2025",
    excerpt: "Our analysis of the current real estate market trends and what to expect in 2025.",
    content: "The real estate market in 2025 shows promising growth with increased demand for...",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800",
    category: "insight",
    date: "2025-01-10",
    author: "Market Analysis Team",
  },
  {
    id: "3",
    title: "Tips for First-Time Home Buyers",
    excerpt: "Essential guide for first-time buyers navigating the real estate market.",
    content: "Buying your first home is an exciting milestone. Here are some essential tips to help you...",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800",
    category: "insight",
    date: "2025-01-05",
    author: "Buyer's Guide Team",
  },
  {
    id: "4",
    title: "New Office Location Opening",
    excerpt: "Imobuy opens a new office location to better serve clients in the northern region.",
    content: "We're pleased to announce the opening of our new office location in...",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
    category: "announcement",
    date: "2025-01-01",
    author: "Imobuy Team",
  },
  {
    id: "5",
    title: "Investment Opportunities in Commercial Real Estate",
    excerpt: "Exploring high-value investment opportunities in the commercial real estate sector.",
    content: "Commercial real estate continues to offer attractive investment opportunities...",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800",
    category: "insight",
    date: "2024-12-28",
    author: "Investment Advisory Team",
  },
  {
    id: "6",
    title: "Year-End Market Report 2024",
    excerpt: "Comprehensive year-end report analyzing market performance and future outlook.",
    content: "2024 has been a remarkable year for the real estate market. Our comprehensive analysis shows...",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800",
    category: "news",
    date: "2024-12-20",
    author: "Research Team",
  },
];

