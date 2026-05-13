import { motion } from 'motion/react';
import { Plane, ChevronRight, Globe, Shield, Zap } from 'lucide-react';

export default function Flights() {
  return (
    <div className="page-container">
      <div className="max-w-screen-2xl mx-auto">
        <div className="relative h-[60vh] rounded-[4rem] overflow-hidden mb-20">
          <img 
            src="https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&q=80&w=1600" 
            className="w-full h-full object-cover" 
            alt="Private Jet"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center p-10">
            <h1 className="text-8xl font-light italic mb-6">Private Aviation</h1>
            <p className="micro-label">Non-stop service to anywhere on Earth</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {[
            { icon: <Shield />, title: 'Absolute Privacy', desc: 'Discreet arrivals and departures via private terminals globaly.' },
            { icon: <Zap />, title: 'Bespoke Catering', desc: 'Michelin-starred cuisine curated to your specific culinary preferences.' },
            { icon: <Globe />, title: 'Global Reach', desc: 'Access to 5,000+ airports worldwide, unreachable by commercial flights.' },
          ].map((feature, i) => (
            <motion.div 
               key={i}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
               className="glass p-10 rounded-[3rem] text-center"
            >
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black mx-auto mb-6">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-light mb-4 italic">{feature.title}</h3>
              <p className="text-sm font-light text-white/40 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-32 glass p-16 rounded-[4rem] flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-2/3">
            <h2 className="text-5xl font-light italic mb-6">Inquire Flight Charter</h2>
            <p className="text-lg font-light text-white/60">Our flight operation specialists are available 24/7 to orchestrate your next journey.</p>
          </div>
          <button className="premium-button premium-button-primary px-12 py-5 whitespace-nowrap">Contact Operations</button>
        </div>
      </div>
    </div>
  );
}
