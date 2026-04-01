export interface Provider {
  name: string;
  category: string;
  job: string;
  description: string;
  rating: string;
  location: string;
  price: string;
  image: string;
  completedjob: string;
  services: string[];
}

export const providers: Provider[] = [
  {
    name: "John Dril",
    category: "Plumbing",
    job: "Plumbing expert",
    description:
      "Professional plumber with 10+ years of experience in residential and commercial plumbing.",
    rating: "4.8",
    location: "Kigali, Gasabo",
    price: "8,000 RWF",
    image:
      "https://plus.unsplash.com/premium_photo-1705563088246-3673a401ed6a?q=80&w=870&auto=format&fit=crop",
    completedjob: "100 jobs completed",
    services: ["Emergency Service", "Installation", "Leak Repair"],
  },
  {
    name: "Keza Natacha",
    category: "Cleaning",
    job: "Cleaning expert",
    description:
      "Professional cleaner specialized in home and office deep cleaning services.",
    rating: "4.9",
    location: "Kigali, Gasabo",
    price: "8,000 RWF",
    image:
      "https://plus.unsplash.com/premium_photo-1681493771936-7d76691184d9?q=80&w=870&auto=format&fit=crop",
    completedjob: "100 jobs completed",
    services: ["Deep Cleaning", "Office Cleaning", "Carpet Cleaning"],
  },
  {
    name: "Eric Niyonzima",
    category: "Painting",
    job: "Painting expert",
    description:
      "Professional painter with expertise in interior and exterior painting.",
    rating: "4.7",
    location: "Kigali, Gasabo",
    price: "8,000 RWF",
    image:
      "https://images.unsplash.com/photo-1552493450-2b5ce80ed13f?q=80&w=814&auto=format&fit=crop",
    completedjob: "100 jobs completed",
    services: ["Interior Painting", "Exterior Painting", "Wallpaper Removal"],
  },
  {
    name: "Alice Uwimana",
    category: "Electrical",
    job: "Electrician",
    description:
      "Licensed electrician specializing in installations and maintenance.",
    rating: "4.6",
    location: "Kigali, Gasabo",
    price: "10,000 RWF",
    image:
      "https://images.unsplash.com/photo-1552493450-2b5ce80ed13f?q=80&w=814&auto=format&fit=crop",
    completedjob: "100 jobs completed",
    services: ["Wiring", "Lighting Installation", "Repair"],
  },
];