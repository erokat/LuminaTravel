import { Hotel, Tour, Destination } from '../api/types';

export const destinations: Destination[] = [
  {
    id: 'dubai',
    name: 'Dubai',
    country: 'United Arab Emirates',
    description: 'A city of superlatives, where traditional culture meets futuristic architecture.',
    image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&q=80&w=1200', // Palm Jumeirah view
    rating: 4.9,
    featured: true,
  },
  {
    id: 'tokyo',
    name: 'Tokyo',
    country: 'Japan',
    description: 'A neon-lit metropolis where ancient shrines stand alongside gleaming skyscrapers.',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80&w=1200', // Tokyo Tower
    rating: 4.8,
    featured: true,
  },
  {
    id: 'santorini',
    name: 'Santorini',
    country: 'Greece',
    description: 'Iconic white-washed buildings overlooking the deep blue Aegean Sea.',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=1200',
    rating: 4.9,
    featured: true,
  },
  {
    id: 'maldives',
    name: 'Maldives',
    country: 'Maldives',
    description: 'A tropical paradise of crystal clear waters and white sandy beaches.',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=1200', // Maldives
    rating: 5.0,
    featured: true,
  },
  {
    id: 'reykjavik',
    name: 'Reykjavik',
    country: 'Iceland',
    description: 'A coastal capital known for its striking modern architecture and proximity to natural wonders.',
    image: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&q=80&w=1200', // Hallgrímskirkja / City
    rating: 4.8,
    featured: false,
  },
  {
    id: 'nairobi',
    name: 'Nairobi',
    country: 'Kenya',
    description: 'The world\'s only capital with a national park within its borders.',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=1200', // Rhino/National Park
    rating: 4.7,
    featured: false,
  },
  {
    id: 'bali',
    name: 'Bali',
    country: 'Indonesia',
    description: 'An island of spiritual depth, lush jungles, and crystal beaches.',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=1200',
    rating: 4.9,
    featured: false,
  },
  {
    id: 'antarctica',
    name: 'Antarctica',
    country: 'International',
    description: 'The last frontier. A vast wilderness of ice and unique wildlife.',
    image: 'https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&q=80&w=1200',
    rating: 4.8,
    featured: false,
  },
  {
    id: 'zurich',
    name: 'St. Moritz & Zurich',
    country: 'Switzerland',
    description: 'The pinnacle of European luxury and chocolate-box Alpine scenery.',
    image: 'https://images.unsplash.com/photo-1496372412473-e8548ffd82bc?auto=format&fit=crop&q=80&w=1200', // Lake St. Moritz Scenery
    rating: 4.9,
    featured: false,
  },
  {
    id: 'peru',
    name: 'Amazon & Machu Picchu',
    country: 'Peru',
    description: 'A land of ancient empires and the world\'s most vital rainforest.',
    image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&q=80&w=1200', // Machu Picchu
    rating: 4.7,
    featured: false,
  }
];

export const hotels: Hotel[] = [
  {
    id: 'burj-al-arab',
    name: 'Burj Al Arab Jumeirah',
    destinationId: 'dubai',
    pricePerNight: 1800,
    rating: 4.9,
    reviews: 2450,
    category: 'Luxury',
    description: 'The world\'s most luxurious hotel, offering an experience beyond five stars. Situated on its own island, Burj Al Arab Jumeirah offers suites overlooking the sea, 9 signature restaurants and a full-service spa.',
    images: [
      'https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?auto=format&fit=crop&q=80&w=1200', // Iconic Exterior
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1200', // Lobby
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=1200'  // Pool
    ],
    amenities: ['Private Beach', 'Infinity Pool', 'Butler Service', 'Spa', 'Fine Dining'],
    location: {
      lat: 25.1412,
      lng: 55.1852,
      address: 'Jumeirah St, Dubai, UAE'
    }
  },
  {
    id: 'park-hyatt-tokyo',
    name: 'Park Hyatt Tokyo',
    destinationId: 'tokyo',
    pricePerNight: 950,
    rating: 4.8,
    reviews: 1800,
    category: 'Luxury',
    description: 'Occupying the top 14 floors of a 52-story tower, Park Hyatt Tokyo offers 360-degree views of the city and Mount Fuji. Known for its appearances in cinema and its legendary Jazz club.',
    images: [
      'https://images.unsplash.com/photo-1503174971373-b1f69850bded?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=1200'
    ],
    amenities: ['City View', 'Pool', 'Fitness Center', 'Jazz Club', 'Library'],
    location: {
      lat: 35.6835,
      lng: 139.6917,
      address: '3-7-1-2 Nishi-Shinjuku, Shinjuku, Tokyo'
    }
  },
  {
    id: 'one-and-only-maldives',
    name: 'One&Only Reethi Rah',
    destinationId: 'maldives',
    pricePerNight: 2200,
    rating: 5.0,
    reviews: 980,
    category: 'Resort',
    description: 'An exclusive tropical paradise with 12 pristine beaches. Revel in the privacy of your own villa, either on the beach or over the crystal clear turquoise waters.',
    images: [
      'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1573843225233-6f3365df4617?auto=format&fit=crop&q=80&w=1200'
    ],
    amenities: ['Overwater Villas', 'Private Pool', 'Diving Center', 'Yoga Pavilion', 'Kids Club'],
    location: {
      lat: 4.7933,
      lng: 73.3644,
      address: 'Reethi Rah, North Malé Atoll, Maldives'
    }
  },
  {
    id: 'canaves-oia',
    name: 'Canaves Oia Epitome',
    destinationId: 'santorini',
    pricePerNight: 1100,
    rating: 4.9,
    reviews: 850,
    category: 'Resort',
    description: 'Boutique luxury perched above the picturesque fishing village of Ammoudi. Epitome offers private pool villas with sunset views that redefine Mediterranean elegance.',
    images: [
      'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1469796466635-455ede028ca8?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1515488764276-beab7607c1e6?auto=format&fit=crop&q=80&w=1200'
    ],
    amenities: ['Sunset Views', 'Private Infinity Pool', 'Wine Tasting', 'Fine Dining', 'Pool Bar'],
    location: {
      lat: 36.4618,
      lng: 25.3753,
      address: 'Oia, Santorini, Greece'
    }
  },
  {
    id: 'blue-lagoon-retreat',
    name: 'The Retreat at Blue Lagoon',
    destinationId: 'reykjavik',
    pricePerNight: 1350,
    rating: 4.9,
    reviews: 1100,
    category: 'Spa',
    description: 'Built directly into a centuries-old lava field, the Retreat is a sanctuary of serenity. Offering exclusive access to the Blue Lagoon and volcanic spa rituals.',
    images: [
      new URL('../assets/images/blue_lagoon_retreat_1_1778655729298.png', import.meta.url).href,
      new URL('../assets/images/blue_lagoon_retreat_2_1778655758245.png', import.meta.url).href,
      new URL('../assets/images/blue_lagoon_retreat_3_1778655776511.png', import.meta.url).href
    ],
    amenities: ['Private Lagoon Access', 'Lava Spa', 'Northern Lights Lounge', 'Michelin Dining', 'Concierge'],
    location: {
      lat: 63.8804,
      lng: -22.4495,
      address: 'Nordurljosavegur 9, Grindavík, Iceland'
    }
  },
  {
    id: 'four-seasons-bali',
    name: 'Four Seasons Sayan',
    destinationId: 'bali',
    pricePerNight: 1050,
    rating: 5.0,
    reviews: 1400,
    category: 'Resort',
    description: 'Arrive via a dramatic suspension bridge to a riverside sanctuary. This architectural masterpiece is nestled in the lush Ayung River valley of Ubud.',
    images: [
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1506929113614-bb9baf19725b?auto=format&fit=crop&q=80&w=1200'
    ],
    amenities: ['Riverside Yoga', 'Infinity Pool', 'Rice Paddy Walks', 'Sacred Nap Area', 'Private Dining'],
    location: {
      lat: -8.4925,
      lng: 115.2443,
      address: 'Sayan, Ubud, Bali, Indonesia'
    }
  },
  {
    id: 'badrutts-palace',
    name: "Badrutt's Palace Hotel",
    destinationId: 'zurich',
    pricePerNight: 1650,
    rating: 4.9,
    reviews: 2100,
    category: 'Luxury',
    description: 'An icon of St. Moritz. This historical palace offers old-world charm combined with modern luxury, overlooking the pristine Lake St. Moritz.',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1496372412473-e8548ffd82bc?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1548013146-72479768bbaa?auto=format&fit=crop&q=80&w=1200'
    ],
    amenities: ['Lake View', 'Nightclub', 'Ice Rink', 'Rolls-Royce Transfer', 'Butler Service'],
    location: {
      lat: 46.4984,
      lng: 9.8394,
      address: 'Via Serlas 27, 7500 St. Moritz, Switzerland'
    }
  },
  {
    id: 'giraffe-manor',
    name: 'Giraffe Manor',
    destinationId: 'nairobi',
    pricePerNight: 950,
    rating: 4.8,
    reviews: 650,
    category: 'Resort',
    description: 'Breakfast with giraffes at this exclusive boutique hotel. An Instagram-famous sanctuary where resident Rothschild giraffes visit you during your stay.',
    images: [
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1523800503107-5bc3ba2a6f81?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&q=80&w=1200'
    ],
    amenities: ['Wildlife Encounters', 'English Gardens', 'Afternoon Tea', 'Private Safari', 'Spa'],
    location: {
      lat: -1.3768,
      lng: 36.7441,
      address: 'Gogo Falls Road, Nairobi, Kenya'
    }
  },
  {
    id: 'sanctuary-lodge',
    name: 'Belmond Sanctuary Lodge',
    destinationId: 'peru',
    pricePerNight: 1200,
    rating: 4.7,
    reviews: 580,
    category: 'Luxury',
    description: 'The only hotel located adjacent to the ancient citadel of Machu Picchu. Enjoy exclusive access to the ruins and sunrise views before the crowds arrive.',
    images: [
      'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1589556264800-08ae9e129a8c?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=1200'
    ],
    amenities: ['Machu Picchu View', 'Orchid Garden', 'Andean Rituals', 'Fine Dining', 'Hike Concierge'],
    location: {
      lat: -13.1631,
      lng: -72.5451,
      address: 'Carretera Hiram Bingham Km 7.5, Cusco, Peru'
    }
  }
];

export const tours: Tour[] = [
  {
    id: 'japan-cherry-blossom',
    name: 'Cherry Blossom Cultural Odyssey',
    destinationId: 'tokyo',
    duration: '10 Days',
    price: 4500,
    rating: 4.9,
    difficulty: 'Moderate',
    groupSize: 12,
    type: 'Culture',
    images: [
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1528164344705-47542687990d?auto=format&fit=crop&q=80&w=1200'
    ],
    description: 'Experience the magic of Japan\'s Sakura season with private shrine visits, high-speed rail journeys, and exclusive tea ceremonies in Kyoto.'
  },
  {
    id: 'maldives-atoll-explorer',
    name: 'Maldives Private Yacht Atoll Explorer',
    destinationId: 'maldives',
    duration: '7 Days',
    price: 8900,
    rating: 5.0,
    difficulty: 'Easy',
    groupSize: 4,
    type: 'Adventure',
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1506929113614-bb9baf19725b?auto=format&fit=crop&q=80&w=1200'
    ],
    description: 'Charter a private yacht and discover uninhabited islands and pristine coral reefs.'
  },
  {
    id: 'iceland-northern-lights',
    name: 'Icelandic Aurora Expedition',
    destinationId: 'reykjavik',
    duration: '6 Days',
    price: 6400,
    rating: 4.9,
    difficulty: 'Moderate',
    groupSize: 8,
    type: 'Nature',
    images: [
      'https://images.unsplash.com/photo-1476610182048-b716b8518aae?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1521024221340-efe7d7fa239b?auto=format&fit=crop&q=80&w=1200'
    ],
    description: 'Chase the Aurora Borealis in private super-jeeps, explore blue ice caves, and soak in exclusive geothermal lagoons.'
  },
  {
    id: 'kenya-safari-luxury',
    name: 'Masai Mara Private Safari',
    destinationId: 'nairobi',
    duration: '8 Days',
    price: 7800,
    rating: 5.0,
    difficulty: 'Moderate',
    groupSize: 6,
    type: 'Wildlife',
    images: [
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1523800503107-5bc3ba2a6f81?auto=format&fit=crop&q=80&w=1200'
    ],
    description: 'Witness the Great Migration from a hot air balloon and stay in ultra-luxury tented camps with private game drives.'
  },
  {
    id: 'antarctica-expedition',
    name: 'Antarctic White Continent Voyage',
    destinationId: 'antarctica',
    duration: '12 Days',
    price: 15800,
    rating: 4.8,
    difficulty: 'Hard',
    groupSize: 16,
    type: 'Extreme',
    images: [
      'https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1551066512-23b97b055841?auto=format&fit=crop&q=80&w=1200'
    ],
    description: 'A transformative journey to the edge of the world on a luxury ice-strengthened vessel with daily zodiac excursions.'
  },
  {
    id: 'swiss-alps-rail',
    name: 'Swiss Alpine Luxury Rail Odyssey',
    destinationId: 'zurich',
    duration: '7 Days',
    price: 5900,
    rating: 4.9,
    difficulty: 'Easy',
    groupSize: 10,
    type: 'Mountain',
    images: [
      'https://images.unsplash.com/photo-1531310197839-ccf54664b297?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1476493279419-b785d41e38d8?auto=format&fit=crop&q=80&w=1200'
    ],
    description: 'Traverse the majestic Alps via the Glacier Express and stay in iconic palace hotels in St. Moritz and Zermatt.'
  },
  {
    id: 'amazon-river-cruise',
    name: 'Amazon Rainforest Explorer',
    destinationId: 'peru',
    duration: '6 Days',
    price: 7200,
    rating: 4.7,
    difficulty: 'Challenging',
    groupSize: 12,
    type: 'Nature',
    images: [
      'https://images.unsplash.com/photo-1589556264800-08ae9e129a8c?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&q=80&w=1200'
    ],
    description: 'Venture deep into the Amazon on a sustainable luxury river cruise vessel with private naturalists.'
  },
  {
    id: 'bali-spiritual-retreat',
    name: 'Bali Spiritual & Wellness Retreat',
    destinationId: 'bali',
    duration: '10 Days',
    price: 4800,
    rating: 4.9,
    difficulty: 'Easy',
    groupSize: 8,
    type: 'Culture',
    images: [
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?auto=format&fit=crop&q=80&w=1200'
    ],
    description: 'Find inner peace with private meditation sessions, temple blessings, and exclusive villa living in Ubud.'
  }
];
