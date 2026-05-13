import { motion } from 'motion/react';
import { ArrowRight, MapPin, Star, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { destinations, hotels } from '../data/mockData';
import { useChatStore } from '../store/useChatStore';

const MotionLink = motion.create(Link);

export default function Home() {
  const setOpen = useChatStore(state => state.setOpen);
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[110vh] flex items-center px-6 md:px-10">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&q=80&w=2600" 
            alt="Hero Luxury" 
            className="w-full h-full object-cover"
            draggable={false}
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black" />
          <div className="absolute inset-0 z-10 bg-transparent" />
        </div>

        <div className="relative z-10 max-w-screen-2xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="max-w-3xl"
          >
            <h4 className="micro-label mb-6 text-white/80">Premium Travel Experience</h4>
            <h1 className="section-title mb-8 italic">
              Unveil the World in <br />
              <span className="font-serif">Pure Elegance</span>
            </h1>
            <p className="text-xl font-light text-white/60 mb-10 leading-relaxed">
              Curating the most extraordinary journeys for our distinguished clientele. 
              Escape the ordinary and embrace the sublime.
            </p>
            <div className="flex flex-wrap gap-6">
              <Link to="/hotels" className="premium-button premium-button-primary flex items-center gap-2">
                Explore Hotels <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">Discover more</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent" />
        </motion.div>
      </section>

      {/* Featured Destinations (Horizontal Scroll) */}
      <section className="py-32 px-10">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex items-end justify-between mb-16">
            <div>
              <h4 className="micro-label mb-4">Curated Collection</h4>
              <h2 className="text-5xl font-light italic">Signature Destinations</h2>
            </div>
            <Link to="/destinations" className="text-sm uppercase tracking-widest text-white/60 hover:text-white flex items-center gap-2 transition-colors">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {destinations.map((dest, i) => (
              <MotionLink
                key={dest.id}
                to={`/destinations/${dest.id}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group relative h-[500px] rounded-3xl overflow-hidden cursor-pointer block"
              >
                <img 
                  src={dest.image} 
                  alt={dest.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  draggable={false}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="w-3 h-3 text-white fill-current" />
                    <span className="text-[10px] uppercase font-bold">{dest.rating}</span>
                  </div>
                  <h3 className="text-2xl font-light mb-2">{dest.name}</h3>
                  <div className="flex items-center gap-1 text-white/60 mb-4">
                    <MapPin className="w-3 h-3" />
                    <span className="text-xs uppercase tracking-widest">{dest.country}</span>
                  </div>
                </div>
              </MotionLink>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-white/10 bg-white/[0.02]">
        <div className="max-w-screen-2xl mx-auto px-10 grid grid-cols-2 lg:grid-cols-4 gap-12">
          {[
            { label: 'Destinations', val: '120+' },
            { label: 'Hotels', val: '1.2k+' },
            { label: 'Satisfied Guests', val: '50k+' },
            { label: 'Years Experience', val: '25' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <h3 className="text-6xl font-light mb-2">{stat.val}</h3>
              <p className="micro-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Signature Hotels Section */}
      <section className="py-32 px-10 bg-black">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="lg:w-1/2">
              <h4 className="micro-label mb-4 italic">Unrivaled Comfort</h4>
              <h2 className="text-6xl font-light italic mb-8">Iconic Residences & Private Villas</h2>
              <p className="text-lg font-light text-white/60 mb-12 leading-relaxed">
                We partner exclusively with the world\'s most prestigious establishments. 
                From clifftop retreats to urban sanctuaries, every room is a masterpiece of design.
              </p>
              <div className="space-y-8">
                {hotels.slice(0, 2).map((hotel, i) => (
                  <Link to={`/hotels/${hotel.id}`} key={hotel.id} className="flex gap-6 group cursor-pointer border-b border-white/5 pb-8 hover:border-white/20 transition-colors">
                    <div className="w-32 h-32 rounded-2xl overflow-hidden shrink-0 relative">
                      <img 
                        src={hotel.images[0]} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                        alt="" 
                        draggable={false}
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <h4 className="text-xl font-light mb-2 group-hover:italic transition-all">{hotel.name}</h4>
                      <p className="text-sm font-light text-white/40 mb-3">{hotel.category} • from ${hotel.pricePerNight}</p>
                      <span className="text-[10px] uppercase tracking-widest text-white/60 group-hover:text-white flex items-center gap-2">View Details <ArrowRight className="w-3 h-3" /></span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 relative">
               <motion.div 
                 initial={{ opacity: 0, scale: 0.9 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 className="relative z-10 rounded-[4rem] overflow-hidden aspect-[4/5] group"
               >
                 <img 
                   src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=1200" 
                   className="w-full h-full object-cover" 
                   alt="Featured Residence" 
                   draggable={false}
                   referrerPolicy="no-referrer"
                 />
                 <div className="absolute inset-0 z-10 bg-transparent" />
               </motion.div>
               {/* Floating elements */}
               <div className="absolute -top-10 -right-10 w-40 h-40 glass rounded-full flex items-center justify-center p-8 text-center animate-bounce-slow">
                 <p className="micro-label leading-tight">Award Winning <br /> Service 2026</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-40 px-10 overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover" 
            alt="" 
            draggable={false}
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div className="absolute inset-0 z-10 bg-transparent" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="section-title italic mb-10">Your Journey Starts with <br /> a Whisper.</h2>
          <button 
            onClick={() => setOpen(true)}
            className="premium-button premium-button-primary px-12 py-5 text-base"
          >
            Inquire with a Specialist
          </button>
        </div>
      </section>
    </div>
  );
}
