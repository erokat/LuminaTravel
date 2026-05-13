import { useParams, useNavigate } from 'react-router-dom';
import { tours } from '../data/mockData';
import { motion } from 'motion/react';
import { Clock, Users, Star, ArrowLeft, Calendar, ShieldCheck, Map, Camera } from 'lucide-react';

export default function TourDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const tour = tours.find(t => t.id === id);

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

  return (
    <div className="page-container bg-black/20">
      <div className="max-w-screen-2xl mx-auto">
        <button 
          onClick={() => navigate('/tours')}
          className="mb-12 text-white/40 hover:text-white transition-colors flex items-center gap-2 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Curated Experiences
        </button>

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

            <div className="bg-white/5 border border-white/10 p-10 rounded-[3rem] flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <p className="micro-label mb-2">Private Expedition Price</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-light">${tour.price}</span>
                  <span className="text-white/40 font-light">/ per person</span>
                </div>
              </div>
              <button className="premium-button premium-button-primary w-full md:w-auto px-12 py-5 text-base">
                Inquire for Dates
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
