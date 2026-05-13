import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { destinations, hotels, tours } from '../data/mockData';
import { ArrowLeft, Star, MapPin, Calendar, Users, Camera, Wind } from 'lucide-react';
import { cn } from '../lib/utils';

export default function DestinationDetail() {
  const { id } = useParams<{ id: string }>();
  const destination = destinations.find(d => d.id === id);

  if (!destination) {
    return (
      <div className="pt-40 text-center">
        <h1 className="text-4xl font-light italic">Destination Not Found</h1>
        <Link to="/destinations" className="mt-8 inline-block text-white/60 hover:text-white underline">
          Back to Collections
        </Link>
      </div>
    );
  }

  const destinationHotels = hotels.filter(h => h.destinationId === destination.id);
  const destinationTours = tours.filter(t => t.destinationId === destination.id);

  return (
    <div className="page-container pb-20">
      {/* Hero Section */}
      <div className="relative h-[80vh] w-full mb-20">
        <div className="absolute inset-0">
          <img 
            src={destination.image} 
            alt={destination.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/20 to-transparent" />
        </div>

        <div className="absolute inset-0 flex flex-col justify-end p-12 md:p-24">
          <Link to="/destinations" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8 w-fit group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] uppercase tracking-widest">Back to Collections</span>
          </Link>

          <header className="max-w-4xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="glass px-4 py-1.5 rounded-full flex items-center gap-2">
                <Star className="w-3 h-3 fill-white" />
                <span className="text-[10px] font-bold tracking-widest">{destination.rating}</span>
              </div>
              <div className="glass px-4 py-1.5 rounded-full flex items-center gap-2">
                <MapPin className="w-3 h-3" />
                <span className="text-[10px] uppercase tracking-widest">{destination.country}</span>
              </div>
            </div>
            <h1 className="text-8xl md:text-9xl font-light italic leading-none mb-8">
              {destination.name}
            </h1>
            <p className="text-xl md:text-2xl font-light text-white/80 max-w-2xl leading-relaxed">
              {destination.description}
            </p>
          </header>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto px-12 md:px-24">
        {/* Curated Stays Section */}
        {destinationHotels.length > 0 && (
          <section className="mb-32">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h4 className="micro-label mb-4">The Collection</h4>
                <h2 className="text-5xl font-light italic italic">Curated <span className="font-serif">Sanctuaries</span></h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {destinationHotels.map((hotel) => (
                <Link 
                  key={hotel.id} 
                  to={`/hotels/${hotel.id}`}
                  className="group flex flex-col"
                >
                  <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden mb-6 bg-white/5">
                    <img 
                      src={hotel.images[0]} 
                      alt={hotel.name} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <p className="text-[10px] uppercase tracking-widest text-white/60 mb-2">{hotel.category}</p>
                      <h3 className="text-2xl font-light">{hotel.name}</h3>
                    </div>
                  </div>
                  <div className="flex justify-between items-center px-2">
                    <span className="text-xs tracking-widest uppercase text-white/40">From ${hotel.pricePerNight} / Night</span>
                    <div className="flex items-center gap-1.5">
                      <Star className="w-3 h-3 fill-white" />
                      <span className="text-xs">{hotel.rating}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Private Experiences Section */}
        {destinationTours.length > 0 && (
          <section className="mb-32">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h4 className="micro-label mb-4">Experiences</h4>
                <h2 className="text-5xl font-light italic">Private <span className="font-serif">Journeys</span></h2>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8">
              {destinationTours.map((tour) => (
                <Link 
                  key={tour.id} 
                  to={`/tours/${tour.id}`}
                  className="group grid grid-cols-1 lg:grid-cols-2 gap-12 glass p-10 rounded-[3rem] hover:border-white/20 transition-all duration-500 overflow-hidden"
                >
                  <div className="aspect-[16/9] lg:aspect-square rounded-[2rem] overflow-hidden bg-white/5 relative">
                    <img 
                      src={tour.images[0]} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" 
                      alt={tour.name} 
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="glass px-3 py-1 rounded-full text-[10px] uppercase tracking-widest">{tour.type}</span>
                      <span className="text-[10px] uppercase tracking-widest text-white/40">{tour.duration}</span>
                    </div>
                    <h3 className="text-5xl font-light mb-6 group-hover:italic transition-all">{tour.name}</h3>
                    <p className="text-white/60 font-light leading-relaxed mb-8 text-lg">
                      {tour.description}
                    </p>
                    <div className="flex items-center gap-8 text-white/40">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span className="text-xs uppercase tracking-widest">Max {tour.groupSize} Guests</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Wind className="w-4 h-4" />
                        <span className="text-xs uppercase tracking-widest">{tour.difficulty}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Call to Action */}
        <section className="text-center py-20 bg-white/5 rounded-[4rem] border border-white/5">
          <h2 className="text-6xl font-light italic mb-8">Begin Your Journey</h2>
          <p className="text-white/60 font-light text-xl mb-12 max-w-xl mx-auto">
            Our private concierges are ready to tailor your {destination.name} experience to your exact specifications.
          </p>
          <button className="px-12 py-5 rounded-full bg-white text-black text-xs uppercase tracking-widest font-bold hover:scale-105 transition-all">
            Inquire Now
          </button>
        </section>
      </div>
    </div>
  );
}
