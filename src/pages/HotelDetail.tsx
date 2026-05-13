import { useParams, Link } from 'react-router-dom';
import { hotels } from '../data/mockData';
import { motion } from 'motion/react';
import { Star, MapPin, CheckCircle2, ChevronLeft, Calendar, User, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useState } from 'react';

export default function HotelDetail() {
  const { id } = useParams();
  const hotel = hotels.find(h => h.id === id);
  const [isBooking, setIsBooking] = useState(false);

  if (!hotel) return <div className="pt-40 text-center">Hotel not found</div>;

  const handleBooking = () => {
    setIsBooking(true);
    setTimeout(() => {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ffffff', '#000000', '#f4f4f4']
      });
      setIsBooking(false);
      alert('Your inquiry has been sent to our concierge team. A specialist will contact you shortly.');
    }, 1500);
  };

  return (
    <div className="page-container">
      {/* Back Button */}
      <div className="max-w-screen-2xl mx-auto py-6">
        <Link to="/hotels" className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors group">
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] uppercase tracking-widest">Back to Collection</span>
        </Link>
      </div>

      {/* Gallery */}
      <div className="px-6 md:px-10 mb-16">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 min-h-[400px] md:h-[70vh]">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="md:col-span-2 rounded-[2rem] md:rounded-[3rem] overflow-hidden relative group"
          >
            <img src={hotel.images[0]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]" alt={hotel.name} referrerPolicy="no-referrer" />
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-1 md:grid-rows-2 gap-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="rounded-[2rem] md:rounded-[3rem] overflow-hidden aspect-square md:aspect-auto relative"
            >
              <img src={hotel.images[1]} className="absolute inset-0 w-full h-full object-cover" alt={hotel.name} referrerPolicy="no-referrer" />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-white/5 flex items-center justify-center relative group cursor-pointer aspect-square md:aspect-auto"
            >
              {hotel.images[2] ? (
                <img src={hotel.images[2]} className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity" alt="" referrerPolicy="no-referrer" />
              ) : (
                <div className="absolute inset-0 bg-white/10" />
              )}
              <div className="relative z-10 text-center">
                <p className="text-4xl font-light italic mb-2">+12</p>
                <p className="micro-label">View Gallery</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto px-10 grid grid-cols-1 lg:grid-cols-3 gap-20 pb-32">
        {/* Info Area */}
        <div className="lg:col-span-2 space-y-12">
          <header>
            <div className="flex items-center gap-3 mb-4">
              <span className="micro-label px-3 py-1 bg-white/5 border border-white/10 rounded-full">{hotel.category}</span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-3 h-3 fill-white" />
                ))}
              </div>
              <span className="text-[10px] uppercase text-white/40 tracking-widest">({hotel.reviews} reviews)</span>
            </div>
            <h1 className="text-7xl font-light italic mb-6 leading-none">{hotel.name}</h1>
            <div className="flex items-center gap-2 text-white/60">
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-light tracking-widest">{hotel.location.address}</span>
            </div>
          </header>

          <div className="h-px bg-white/10" />

          <section>
            <h3 className="micro-label mb-6">Description</h3>
            <p className="text-xl font-light leading-relaxed text-white/70 italic">
              {hotel.description}
            </p>
          </section>

          <section>
            <h3 className="micro-label mb-8">Amenities</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6">
              {hotel.amenities.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-white/20" />
                  <span className="text-sm font-light tracking-wide text-white/60">{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Map Placeholder */}
          <section>
            <h3 className="micro-label mb-8">Location</h3>
            <div className="h-96 rounded-[3rem] bg-white/5 border border-white/10 overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center grayscale opacity-50">
                <MapPin className="w-12 h-12 text-white animate-bounce-slow" />
                <p className="absolute mt-20 text-[10px] uppercase tracking-[0.2em] text-white/40">Lat: {hotel.location.lat} | Lng: {hotel.location.lng}</p>
              </div>
            </div>
          </section>
        </div>

        {/* Booking Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-32 glass p-10 rounded-[3rem] space-y-8">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Price per night</p>
                <h3 className="text-4xl font-light">${hotel.pricePerNight}</h3>
              </div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-500 font-bold mb-1 italic">Available</p>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between cursor-pointer hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-white/40" />
                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-white/40">Check In</p>
                    <p className="text-xs">Aug 12, 2026</p>
                  </div>
                </div>
                <ArrowRight className="w-3 h-3 text-white/20" />
                <div className="flex items-center gap-3">
                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-white/40">Check Out</p>
                    <p className="text-xs">Aug 19, 2026</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3 cursor-pointer hover:bg-white/10 transition-colors">
                <User className="w-4 h-4 text-white/40" />
                <div>
                  <p className="text-[9px] uppercase tracking-widest text-white/40">Guests</p>
                  <p className="text-xs">2 Adults, 1 Child</p>
                </div>
              </div>
            </div>

            <button 
              onClick={handleBooking}
              disabled={isBooking}
              className="w-full premium-button premium-button-primary py-5 flex items-center justify-center gap-3"
            >
              {isBooking ? (
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <>Inquire Availability <ArrowRight className="w-4 h-4" /></>
              )}
            </button>

            <p className="text-[10px] text-center text-white/20 italic font-light px-4">
              Booking price will be finalized by our travel specialist. Taxes and service fees added at checkout.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
