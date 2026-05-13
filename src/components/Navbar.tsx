import { motion } from 'motion/react';
import { Search, Menu, X, User, Globe } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Hotels', path: '/hotels' },
    { name: 'Tours', path: '/tours' },
    { name: 'Flights', path: '/flights' },
    { name: 'Destinations', path: '/destinations' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4',
        isScrolled ? 'bg-black/80 backdrop-blur-md border-bottom border-white/10' : 'bg-transparent'
      )}
    >
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <Globe className="w-8 h-8 text-white group-hover:rotate-12 transition-transform duration-500" />
          <span className="text-2xl font-light tracking-tighter uppercase italic">Lumina</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-10">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                'nav-link',
                location.pathname === item.path && 'text-white font-normal'
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Desktop Actions - Simplified */}
        <div className="hidden lg:flex items-center px-4">
          <button className="premium-button premium-button-primary !py-2 !px-6 text-[10px]">Book Journey</button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={mobileMenuOpen ? { x: 0, opacity: 1 } : { x: '100%', opacity: 0 }}
        className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center gap-8 lg:hidden"
      >
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            onClick={() => setMobileMenuOpen(false)}
            className="text-4xl font-light tracking-widest uppercase italic"
          >
            {item.name}
          </Link>
        ))}
        <button className="premium-button premium-button-primary mt-10">Book Now</button>
      </motion.div>
    </motion.nav>
  );
}
