import { useParams, useNavigate } from 'react-router-dom';
import { tours } from '../data/mockData';
import { motion } from 'motion/react';
import { Clock, Users, Star, ArrowLeft, Calendar, ShieldCheck, Map, Camera, ArrowRight, User } from 'lucide-react';
import { useSearchStore } from '../store/useSearchStore';
import React, { useState } from 'react';
import confetti from 'canvas-confetti';

export default function TourDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const tour = tours.find(t => t.id === id);
  const [isBooking, setIsBooking] = useState(false);
  const { checkIn, checkOut, adults, children, setDates, setGuests } = useSearchStore();

  if (!tour) {
    return (
      <div className="page-container text-center pt-40">
        <h2 className="text-3xl font-light mb-8">Adventure not found</h2>
        <button 
          onClick={() => navigate('/tours')}
          className="text-white/40 hover:text-white transition-colors flex items-center gap-2 mx-auto"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Expeditions
        </button>
      </div>
    );
  }

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/tours');
    }
  };

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

  const formatForInput = (dStr: string) => {
    if (!dStr) return '';
    const d = new Date(dStr);
    if (isNaN(d.getTime())) return '';
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const parseFromInput = (val: string) => {
    if (!val) return '';
    const [year, month, day] = val.split('-');
    const d = new Date(Number(year), Number(month) - 1, Number(day));
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  };

  const totalPrice = tour.price * (adults + children);

  let displayEndDate = `Fixed Duration (${tour.duration})`;
  if (checkIn) {
    const days = parseInt(tour.duration);
    if (!isNaN(days)) {
      const d = new Date(checkIn);
      d.setDate(d.getDate() + days - 1);
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      displayEndDate = `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
    }
  }

  return (
    <div className="page-container bg-black/20">
      <div className="max-w-screen-2xl mx-auto">
        <a 
          href="/tours"
          onClick={handleBack}
          className="mb-12 text-white/40 hover:text-white transition-colors flex items-center gap-2 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Curated Experiences
        </a>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <div className="rounded-[3rem] overflow-hidden aspect-[4/5] bg-white/5 shadow-2xl">
              <img src={tour.images[0]} className="w-full h-full object-cover" alt={tour.name} referrerPolicy="no-referrer" />
            </div>
          </motion.div>

          {/* Details */}
          <div className="pt-6">
            <h4 className="micro-label mb-4 italic text-emerald-500/80">{tour.type} Expedition</h4>
            <h1 className="text-5xl md:text-7xl font-light italic mb-8 leading-tight">{tour.name}</h1>
            
            <div className="flex flex-wrap gap-8 mb-12">
              <div className="flex items-center gap-3">
                <Star className="w-5 h-5 fill-white text-white" />
                <div>
                  <p className="text-lg font-light leading-none">{tour.rating}</p>
                  <p className="text-[10px] uppercase tracking-widest text-white/40 mt-1">Guest Rating</p>
                </div>
              </div>
              <div className="h-10 w-px bg-white/10" />
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-white/60" />
                <div>
                  <p className="text-lg font-light leading-none">{tour.duration}</p>
                  <p className="text-[10px] uppercase tracking-widest text-white/40 mt-1">Experience Length</p>
                </div>
              </div>
              <div className="h-10 w-px bg-white/10" />
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-white/60" />
                <div>
                  <p className="text-lg font-light leading-none">Up to {tour.groupSize}</p>
                  <p className="text-[10px] uppercase tracking-widest text-white/40 mt-1">Intimate Group</p>
                </div>
              </div>
            </div>

            <p className="text-xl font-light text-white/70 mb-12 leading-relaxed italic">
              "{tour.description}"
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="glass p-6 rounded-3xl border border-white/5">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  </div>
                  <p className="micro-label">All-Inclusive Luxury</p>
                </div>
                <p className="text-sm font-light text-white/40">Premium transfers, 5-star lodging, and private concierge included.</p>
              </div>
              <div className="glass p-6 rounded-3xl border border-white/5">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                    <Map className="w-5 h-5 text-blue-400" />
                  </div>
                  <p className="micro-label">Expert Curators</p>
                </div>
                <p className="text-sm font-light text-white/40">Guided by local historians and environmental specialists.</p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-10 rounded-[3rem] flex flex-col gap-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div>
                  <p className="micro-label mb-2">Private Expedition Price</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-light">${tour.price}</span>
                    <span className="text-white/40 font-light">/ per person</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="micro-label mb-2 text-emerald-400">Total Price</p>
                  <div className="flex items-baseline gap-2 justify-end">
                    <span className="text-4xl font-light">${totalPrice}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-center overflow-hidden hover:bg-white/10 transition-colors group">
                    <p className="text-[9px] uppercase tracking-widest text-white/40 flex items-center gap-2 mb-1"><Calendar className="w-3 h-3" /> Start Date</p>
                    <input 
                      type="date" 
                      value={formatForInput(checkIn)} 
                      onChange={(e) => setDates(parseFromInput(e.target.value), checkOut)} 
                      className="bg-transparent text-sm font-medium text-white focus:outline-none w-full outline-none cursor-pointer"
                      style={{ colorScheme: 'dark' }}
                    />
                  </div>
                  <div className="relative p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-center overflow-hidden transition-colors group">
                    <p className="text-[9px] uppercase tracking-widest text-white/40 flex items-center gap-2 mb-1">End Date <ArrowRight className="w-3 h-3 ml-auto opacity-50" /></p>
                    <p className="text-sm font-medium text-white">{displayEndDate}</p>
                    <p className="absolute bottom-1 right-3 text-[8px] uppercase tracking-widest text-white/20">{tour.duration}</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4">
                  <div className="flex-1 flex flex-col">
                    <p className="text-[9px] uppercase tracking-widest text-white/40 mb-2 flex items-center gap-2"><User className="w-3 h-3"/> Adults</p>
                    <div className="flex items-center gap-3">
                      <button onClick={() => setGuests(Math.max(1, adults - 1), children)} className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-xs">-</button>
                      <span className="text-sm font-medium w-4 text-center">{adults}</span>
                      <button onClick={() => setGuests(adults + 1, children)} className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-xs">+</button>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col items-end border-l border-white/10 pl-4">
                    <p className="text-[9px] uppercase tracking-widest text-white/40 mb-2 flex items-center gap-2">Children <User className="w-3 h-3 opacity-50"/></p>
                    <div className="flex items-center gap-3">
                      <button onClick={() => setGuests(adults, Math.max(0, children - 1))} className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-xs">-</button>
                      <span className="text-sm font-medium w-4 text-center">{children}</span>
                      <button onClick={() => setGuests(adults, children + 1)} className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-xs">+</button>
                    </div>
                  </div>
                </div>
              </div>

              <button 
                onClick={handleBooking}
                disabled={isBooking || !checkIn}
                className="premium-button premium-button-primary w-full py-5 text-base mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isBooking ? 'Processing...' : 'Reserve Dates'}
              </button>
            </div>
          </div>
        </div>

        {/* Highlights Section Placeholder */}
        <section className="mt-32 border-t border-white/10 pt-20">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-light italic mb-6 text-white/90">Experience Highlights</h2>
              <p className="text-white/40 font-light leading-relaxed">
                Every Lumina expedition is meticulously crafted to offer moments of profound connection and discovery. 
                Our signature highlights define the character of each journey.
              </p>
            </div>
            <div className="flex gap-4">
              <div className="glass p-4 rounded-full"><Camera className="w-5 h-5" /></div>
              <div className="glass p-4 rounded-full"><Calendar className="w-5 h-5" /></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="group relative rounded-[2.5rem] overflow-hidden aspect-video bg-white/5">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10" />
                <div className="absolute bottom-8 left-8 z-20">
                  <p className="micro-label text-white/60 mb-2">Highlight 0{i}</p>
                  <h5 className="text-xl font-light italic">Signature Moment</h5>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
