export type BookingStatus = "Pending" | "Assigned" | "Completed" | "Cancelled" | "In Progress";

export interface BookingCardData {
  id: string;
  timestamp?: string;
  fullName: string;
  phoneNumber: string;
  whatsappNumber: string;
  taskType: string;
  taskDescription: string;
  urgency: string;
  selectedDate: string;
  selectedTime: string;
  address: string;
  landmark: string;
  media: string[];
  status: BookingStatus | string;
  assignedTo: string;
  providerCategory: string;
  providerLocation: string;
  estimatedDuration: string;
}

export interface ProviderCardData {
  id: string;
  fullName: string;
  phoneNumber: string;
  whatsappNumber: string;
  serviceType: string;
  serviceTags: string[];
  availability: string;
  location: string;
  completedJobs: string;
  rating: string;
  isAvailable: boolean;
}
