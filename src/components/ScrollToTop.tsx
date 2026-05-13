import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-10 left-10 z-[100] group"
          aria-label="Scroll to top"
        >
          <div className="relative flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500 shadow-2xl">
              <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform duration-500" />
            </div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 group-hover:text-white transition-colors vertical-text">
              Top
            </span>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
