import { ReactNode, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ChatAssistant from './ChatAssistant';
import ScrollToTop from './ScrollToTop';
import { motion, AnimatePresence } from 'motion/react';
import { useLocation, useNavigationType } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const navType = useNavigationType();

  useEffect(() => {
    if (navType !== 'POP') {
      window.scrollTo(0, 0);
    } else {
      // Restore scroll position when user navigates back
      const savedPosition = sessionStorage.getItem(`scroll-${location.key}`);
      if (savedPosition) {
        // Small delay to allow DOM to render before scrolling
        setTimeout(() => {
          window.scrollTo(0, parseInt(savedPosition, 10));
        }, 10);
      }
    }

    const handleScroll = () => {
      sessionStorage.setItem(`scroll-${location.key}`, window.scrollY.toString());
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname, location.key, navType]);

  return (
    <div className="min-h-screen flex flex-col selection:bg-white selection:text-black relative">
      <div className="bg-mesh" />
      <Navbar />
      <main className="flex-1 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ 
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1] 
            }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <ChatAssistant />
      <ScrollToTop />
    </div>
  );
}
