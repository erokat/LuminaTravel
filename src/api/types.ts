export type Destination = {
  id: string;
  name: string;
  country: string;
  description: string;
  image: string;
  rating: number;
  featured: boolean;
};

export type Hotel = {
  id: string;
  name: string;
  destinationId: string;
  pricePerNight: number;
  rating: number;
  reviews: number;
  amenities: string[];
  description: string;
  images: string[];
  category: 'Luxury' | 'Boutique' | 'Resort' | 'Villa' | 'Spa' | 'Eco' | 'Heritage';
  location: {
    lat: number;
    lng: number;
    address: string;
  };
};

export type Tour = {
  id: string;
  name: string;
  destinationId: string;
  duration: string;
  price: number;
  rating: number;
  difficulty: 'Easy' | 'Moderate' | 'Challenging' | 'Hard';
  groupSize: number;
  images: string[];
  description: string;
  type: 'Beach' | 'Mountain' | 'Culture' | 'Adventure' | 'Nature' | 'Wildlife' | 'Extreme' | 'Wellness' | 'Urban';
};

export type MessageRole = 'bot' | 'user';

export type ChatAction = 
  | { type: 'navigate'; path: string; filter?: any }
  | { type: 'select_hotel'; hotelId: string }
  | { type: 'select_tour'; tourId: string }
  | { type: 'scripted_next'; nextStep: string };

export type Message = {
  id: string;
  role: MessageRole;
  text: string;
  options?: { label: string; action: ChatAction }[];
  functionCalls?: { name: string; args: any }[];
  timestamp: number;
  image?: string;
  price?: string;
  status?: 'sent' | 'pending';
  reasoning_details?: any;
};
