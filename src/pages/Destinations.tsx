import { destinations } from '../data/mockData';
import { motion } from 'motion/react';
import { Star, MapPin, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSearchStore } from '../store/useSearchStore';

const MotionLink = motion.create(Link);

export default function Destinations() {
  const { destination, setDestination } = useSearchStore();

  const filteredDestinations = destinations.filter(d => {
    const search = (destination || '').toLowerCase();
    return !destination || 
      d.id?.toLowerCase() === search ||
      d.name?.toLowerCase().includes(search) ||
      d.country?.toLowerCase().includes(search);
  });

  return (
    <div className="page-container">
      <div className="max-w-screen-2xl mx-auto">
        <header className="mb-20 text-center">
          <h4 className="micro-label mb-4 italic">Global Footprint</h4>
          <h1 className="text-8xl font-light italic mb-8 leading-none">The World's Finest <br /><span className="font-serif">Boundaries</span></h1>
          
          <div className="max-w-2xl mx-auto mt-12 relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 group-focus-within:text-white transition-colors" />
            <input 
              type="text" 
              placeholder="Search destinations..."
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full glass py-6 pl-16 pr-8 rounded-full text-lg font-light focus:outline-none focus:ring-1 focus:ring-white/20 transition-all placeholder:text-white/10"
            />
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          {filteredDestinations.map((dest, i) => (
            <MotionLink
              key={dest.id}
              to={`/destinations/${dest.id}`}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer block"
            >
              <div className="h-[600px] rounded-[4rem] overflow-hidden mb-8 relative group/img">
                <img 
                  src={dest.image} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]" 
                  alt={dest.name} 
                  draggable={false}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                <div className="absolute top-10 left-10 z-20">
                  <div className="glass px-4 py-2 rounded-full text-[10px] uppercase tracking-widest backdrop-blur-md">
                    Featured Destination 2026
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-end px-4">
                <div>
                  <h2 className="text-5xl font-light mb-4 group-hover:italic transition-all">{dest.name}</h2>
                  <div className="flex items-center gap-2 text-white/40">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm uppercase tracking-widest">{dest.country}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 mb-2 justify-end">
                    <Star className="w-4 h-4 fill-white" />
                    <span className="text-lg font-light leading-none">{dest.rating}</span>
                  </div>
                  <p className="text-[10px] uppercase tracking-widest text-white/40 italic">Rating</p>
                </div>
              </div>
            </MotionLink>
          ))}
        </div>
      </div>
    </div>
  );
}
