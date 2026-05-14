import { tours } from '../data/mockData';
import { motion } from 'motion/react';
import { Clock, Users, Star, ArrowRight, Search, Calendar } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
import { useSearchStore } from '../store/useSearchStore';

const MotionLink = motion.create(Link);

export default function Tours() {
  const location = useLocation();
  const { destination, setDestination, checkIn, checkOut, adults } = useSearchStore();
  const searchParams = new URLSearchParams(location.search);
  const filter = searchParams.get('filter') || '';

  const filteredTours = tours.filter(t => {
    const searchFilter = (filter || '').toLowerCase();
    const searchDest = (destination || '').toLowerCase();

    const matchesFilter = !filter || 
      t.name?.toLowerCase().includes(searchFilter) || 
      t.description?.toLowerCase().includes(searchFilter) ||
      t.id?.toLowerCase().includes(searchFilter);
    
    const matchesDestination = !destination ||
      t.destinationId?.toLowerCase() === searchDest ||
      t.name?.toLowerCase().includes(searchDest) ||
      t.description?.toLowerCase().includes(searchDest);

    return matchesFilter && matchesDestination;
  });

  return (
    <div className="page-container">
      <div className="max-w-screen-2xl mx-auto">
        <header className="mb-16">
          <h4 className="micro-label mb-4 italic">Bespoke Adventures</h4>
          <h1 className="text-5xl md:text-7xl font-light italic mb-8">Curated Experiences</h1>
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-end justify-between">
            <div className="flex-1">
              <p className="text-white/60 font-light max-w-2xl leading-relaxed mb-6">
                From private yacht charters in the Maldives to cultural odyssey through Japan, 
                our tours are designed for the truly curious.
              </p>
              {(checkIn || adults > 2) && (
                <div className="flex items-center gap-6 text-[10px] uppercase tracking-widest text-white/40 italic">
                  {checkIn && (
                    <div className="flex items-center gap-2">
                       <Calendar className="w-3 h-3" />
                       <span>Planning for {checkIn}</span>
                    </div>
                  )}
                  {adults > 0 && (
                    <div className="flex items-center gap-2">
                       <Users className="w-3 h-3" />
                       <span>{adults} Travelers</span>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="w-full md:w-96 relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-white transition-colors" />
              <input 
                type="text" 
                placeholder="Find an expedition..."
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm font-light focus:outline-none focus:border-white/30 transition-all"
              />
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {filteredTours.length > 0 ? filteredTours.map((tour, i) => (
            <MotionLink
              key={tour.id}
              to={`/tours/${tour.id}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group flex flex-col lg:flex-row gap-8 glass p-8 rounded-[4rem] hover:border-white/20 transition-all duration-500 overflow-hidden h-full"
            >
              <div className="lg:w-1/2 aspect-[4/5] rounded-[3rem] overflow-hidden bg-white/5 relative group/img shrink-0">
                <img 
                  src={tour.images[0]} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" 
                  alt={tour.name} 
                  loading="lazy" 
                  draggable={false}
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="lg:w-1/2 flex flex-col py-4">
                <div className="flex justify-between items-start mb-6">
                  <span className="micro-label bg-white/5 border border-white/10 px-3 py-1 rounded-full">{tour.type}</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-white" />
                    <span className="text-[10px] font-bold">{tour.rating}</span>
                  </div>
                </div>
                <h3 className="text-3xl font-light mb-4 group-hover:italic transition-all">{tour.name}</h3>
                <p className="text-sm font-light text-white/60 mb-8 flex-1 leading-relaxed line-clamp-3">{tour.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center gap-2 text-white/40">
                    <Clock className="w-4 h-4" />
                    <span className="text-[10px] uppercase tracking-widest">{tour.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/40">
                    <Users className="w-4 h-4" />
                    <span className="text-[10px] uppercase tracking-widest">Up to {tour.groupSize}</span>
                  </div>
                </div>

                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Per Person</p>
                    <p className="text-3xl font-light">${tour.price}</p>
                  </div>
                  <div className="premium-button premium-button-primary p-4 rounded-full flex items-center justify-center">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </MotionLink>
          )) : (
            <div className="col-span-full py-40 text-center glass rounded-[4rem]">
              <h3 className="text-3xl font-light italic text-white/40 mb-4">No adventures found</h3>
              <a href="/tours" className="text-sm uppercase tracking-widest text-white underline underline-offset-8">Explore All Tours</a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
