import { useState, useEffect } from 'react';
import { Search, Filter, Star, MapPin, ChevronDown } from 'lucide-react';
import { hotels } from '../data/mockData';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { useSearchStore } from '../store/useSearchStore';

const MotionLink = motion.create(Link);

export default function Hotels() {
  const location = useLocation();
  const { destination, setDestination, checkIn, checkOut, adults } = useSearchStore();
  const searchParams = new URLSearchParams(location.search);
  const initialFilter = searchParams.get('filter') || 'All';
  
  const [filter, setFilter] = useState(initialFilter);
  const categories = ['All', 'Luxury', 'Boutique', 'Resort', 'Villa'];

  const displayDate = (dStr: string) => {
    if (!dStr) return '';
    const d = new Date(dStr);
    if (isNaN(d.getTime())) return dStr;
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[d.getMonth()]} ${d.getDate()}`;
  };

  const filteredHotels = hotels.filter(h => {
    const searchDest = (destination || '').toLowerCase();
    const matchesCategory = filter === 'All' || h.category === filter;
    const matchesDestination = !destination || 
      (h.destinationId?.toLowerCase() === searchDest) ||
      h.name?.toLowerCase().includes(searchDest) || 
      h.location?.address?.toLowerCase().includes(searchDest);
    return matchesCategory && matchesDestination;
  });

  return (
    <div className="page-container">
      <div className="max-w-screen-2xl mx-auto">
        {/* Header */}
        <header className="mb-16">
          <h4 className="micro-label mb-4 italic">Exclusive Stay</h4>
          <h1 className="text-5xl md:text-7xl font-light italic mb-8">Iconic Residences</h1>
          
          <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center justify-between mt-12 bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl">
            <div className="flex-1 w-full flex flex-col md:flex-row gap-6">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input 
                  type="text" 
                  placeholder="Search by destination or hotel name..."
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full bg-transparent border-none pl-12 text-sm font-light focus:ring-0 placeholder:text-white/20 appearance-none"
                />
              </div>
              
              {(checkIn || adults > 2) && (
                <div className="flex items-center gap-4 px-4 py-2 bg-white/5 rounded-xl border border-white/5 text-[10px] uppercase tracking-widest text-white/60">
                   {checkIn && (
                     <span>{displayDate(checkIn)} — {displayDate(checkOut)}</span>
                   )}
                   {adults > 0 && (
                     <span>{adults} Guests</span>
                   )}
                </div>
              )}
            </div>
            <div className="h-8 w-px bg-white/10 hidden lg:block" />
            <div className="flex items-center gap-4 w-full lg:w-auto overflow-x-auto scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={cn(
                    "px-6 py-2 rounded-full text-xs uppercase tracking-widest border transition-all duration-300 whitespace-nowrap",
                    filter === cat ? "bg-white text-black border-white" : "border-white/10 text-white/40 hover:border-white/40"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Results */}
        {filteredHotels.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredHotels.map((hotel, i) => (
              <MotionLink
                key={hotel.id}
                to={`/hotels/${hotel.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group flex flex-col h-full"
              >
                <div className="relative h-96 rounded-[2rem] overflow-hidden mb-6 block bg-white/5 group/img">
                  <img 
                    src={hotel.images[0]} 
                    alt={hotel.name} 
                    loading="lazy"
                    draggable={false}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute top-6 right-6 z-20">
                    <div className="glass px-3 py-1 rounded-full flex items-center gap-1.5 backdrop-blur-md">
                      <Star className="w-3 h-3 fill-white" />
                      <span className="text-[10px] font-bold">{hotel.rating}</span>
                    </div>
                  </div>
                  <div className="absolute bottom-6 left-6">
                    <span className="micro-label bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                      {hotel.category}
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-light mb-2 group-hover:italic transition-all">{hotel.name}</h3>
                    <div className="flex items-center gap-1.5 text-white/40 mb-4">
                      <MapPin className="w-3 h-3" />
                      <span className="text-[10px] uppercase tracking-[0.2em]">{hotel.location.address}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs text-white/40 uppercase tracking-widest mb-1">From</p>
                    <p className="text-2xl font-light">${hotel.pricePerNight}</p>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-auto pt-4 border-t border-white/10 overflow-x-auto scrollbar-hide">
                  {hotel.amenities.slice(0, 3).map((amenity, idx) => (
                    <span key={idx} className="text-[9px] uppercase tracking-widest text-white/40 border border-white/5 px-2 py-1 rounded whitespace-nowrap">
                      {amenity}
                    </span>
                  ))}
                </div>
              </MotionLink>
            ))}
          </div>
        ) : (
          <div className="py-40 text-center glass rounded-[4rem]">
            <h3 className="text-3xl font-light italic text-white/40 mb-4">No iconic residences found</h3>
            <button 
              onClick={() => {
                setFilter('All');
                setDestination('');
              }} 
              className="text-sm uppercase tracking-widest text-white underline underline-offset-8 decoration-white/20 hover:decoration-white transition-all"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
