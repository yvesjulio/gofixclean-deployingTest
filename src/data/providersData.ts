export interface Provider {
  name: string;
  category: string;
  job: string;
  description: string;
  rating: string;
  location: string;
  price: string;
  image?: string;
  completedjob: string;
  services: string[];
  phone: string;
  availability: string;
  workerId?: string;
  serviceTags?: string[];
  baseLocation?: string;
  preferredAreas?: string[];
  minCost?: string;
  reliability?: string;
  status?: string;
  totalJobs?: number;
  noShows?: number;
  lastJobDate?: string;
  notes?: string;
}

export const providers: Provider[] = [
  {
    name: "Ishimwe Moise",
    category: "Cleaning",
    job: "Cleaning expert",
    description: "Professional cleaner specialized in home and office deep cleaning services.",
    rating: "4.5",
    location: "kanombe",
    price: "5,000 RWF",
    image: "",
    completedjob: "5 jobs completed",
    services: ["Sofa cleaning", "tiles cleaning", "carpet", "curtain hanging", "House cleaning"],
    phone: "786879673",
    availability: "Available",
    workerId: "W001",
    serviceTags: ["Sofa cleaning", "tiles cleaning", "carpet", "curtain hanging", "House cleaning"],
    baseLocation: "kanombe",
    preferredAreas: ["Kacyiru", "Remera"],
    minCost: "5,000 RWF",
    reliability: "High",
    status: "Active",
    totalJobs: 5,
    noShows: 0,
    lastJobDate: "4/8/2026",
    notes: "Excellent",
  },
  {
    name: "Serge Aime Nizeyimana",
    category: "Electrician",
    job: "Electrician",
    description: "Licensed electrician specializing in installations and maintenance.",
    rating: "4.5",
    location: "gasabo",
    price: "10,000 RWF",
    image: "",
    completedjob: "3 jobs completed",
    services: ["Safe and modern electrical installation"],
    phone: "791806798",
    availability: "Available",
    workerId: "W002",
    serviceTags: ["Safe and modern electrical installation"],
    baseLocation: "gasabo",
    preferredAreas: ["Kimironko", "Kanombe"],
    minCost: "10,000 RWF",
    reliability: "High",
    status: "Active",
    totalJobs: 3,
    noShows: 1,
    lastJobDate: "4/8/2026",
    notes: "Excellent",
  },
  {
    name: "Noel Kagabo",
    category: "Plumbing",
    job: "Plumbing expert",
    description: "Professional plumber with 10+ years of experience in residential and commercial plumbing.",
    rating: "4.5",
    location: "Nyamirambo",
    price: "10,000 RWF",
    image: "",
    completedjob: "7 jobs completed",
    services: ["leake fixing", "Pipes installation", "Soral water heater installation& maintanance", "washing machine repair"],
    phone: "789888702",
    availability: "Available",
    workerId: "W003",
    serviceTags: ["leake fixing", "Pipes installation", "Soral water heater installation& maintanance", "washing machine repair"],
    baseLocation: "Nyamirambo",
    preferredAreas: ["Nyamirambo", "CBD"],
    minCost: "10,000 RWF",
    reliability: "High",
    status: "Active",
    totalJobs: 7,
    noShows: 0,
    lastJobDate: "3/12/2026",
    notes: "Excellent",
  },
  {
    name: "Jean Marie Vianney Twagirimana",
    category: "Cleaning",
    job: "Cleaning expert",
    description: "Specialized in all types of tanks cleaning.",
    rating: "5",
    location: "Gisozi",
    price: "10,000 RWF",
    image: "",
    completedjob: "6 jobs completed",
    services: ["All types of tanks cleaning"],
    phone: "788718213", // Using first number
    availability: "Available",
    workerId: "W004",
    serviceTags: ["All types of tanks cleaning"],
    baseLocation: "Gisozi",
    preferredAreas: ["Gisozi", "Gikondo", "Nyabugogo", "Karuruma", "not far from Gisozi"],
    minCost: "10,000 RWF",
    reliability: "High",
    status: "Active",
    totalJobs: 6,
    noShows: 0,
    lastJobDate: "",
    notes: "Excellent",
  },
  {
    name: "New Provider",
    category: "Cleaning",
    job: "Service Provider",
    description: "New provider joining the platform.",
    rating: "4.0",
    location: "Kigali",
    price: "0 RWF",
    image: "",
    completedjob: "0 jobs completed",
    services: [],
    phone: "",
    availability: "Available",
    workerId: "W005",
    status: "Active",
  },
];
