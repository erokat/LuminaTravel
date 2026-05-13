import { Globe, Instagram, Twitter, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 pt-20 pb-10 px-6">
      <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="space-y-6">
          <Link to="/" className="flex items-center gap-2">
            <Globe className="w-8 h-8 text-white" />
            <span className="text-2xl font-light tracking-tighter uppercase italic">Lumina</span>
          </Link>
          <p className="text-white/40 font-light leading-relaxed max-w-xs">
            Redefining the art of luxury travel. We curate bespoke experiences that transcend the ordinary.
          </p>
        </div>

        <div>
          <h4 className="micro-label mb-6">Explore</h4>
          <ul className="space-y-4">
            <li><Link to="/hotels" className="text-sm font-light text-white/60 hover:text-white transition-colors">Premium Hotels</Link></li>
            <li><Link to="/tours" className="text-sm font-light text-white/60 hover:text-white transition-colors">Exclusive Tours</Link></li>
            <li><Link to="/flights" className="text-sm font-light text-white/60 hover:text-white transition-colors">Private Jets</Link></li>
            <li><Link to="/destinations" className="text-sm font-light text-white/60 hover:text-white transition-colors">Destinations</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="micro-label mb-6">Company</h4>
          <ul className="space-y-4">
            <li><Link to="/about" className="text-sm font-light text-white/60 hover:text-white transition-colors">Our Story</Link></li>
            <li><Link to="/contact" className="text-sm font-light text-white/60 hover:text-white transition-colors">Concierge</Link></li>
            <li><Link to="/careers" className="text-sm font-light text-white/60 hover:text-white transition-colors">Careers</Link></li>
            <li><Link to="/privacy" className="text-sm font-light text-white/60 hover:text-white transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="micro-label">Newsletter</h4>
          <div className="relative">
            <input 
              type="email" 
              placeholder="Email address" 
              className="w-full bg-transparent border-b border-white/20 py-2 text-sm font-light focus:outline-none focus:border-white transition-colors"
            />
            <button className="absolute right-0 top-1/2 -translate-y-1/2 text-xs uppercase tracking-widest font-medium hover:text-white/60 transition-colors">Subscribe</button>
          </div>
          <div className="flex gap-6 pt-4 text-white/40">
            <Instagram className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
            <Twitter className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
            <Facebook className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
          </div>
        </div>
      </div>
      
      <div className="max-w-screen-2xl mx-auto mt-20 pt-10 border-t border-white/5 flex flex-col md:row items-center justify-between gap-6">
        <p className="text-[10px] uppercase tracking-widest text-white/20">
          © 2026 Lumina Luxury Travel Group. All rights reserved.
        </p>
        <div className="flex gap-8">
          <span className="text-[10px] uppercase tracking-widest text-white/20 cursor-pointer hover:text-white/40 transition-colors">Cookie Settings</span>
          <span className="text-[10px] uppercase tracking-widest text-white/20 cursor-pointer hover:text-white/40 transition-colors">Legal</span>
        </div>
      </div>
    </footer>
  );
}
