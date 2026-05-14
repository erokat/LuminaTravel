/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import Hotels from './pages/Hotels';
import HotelDetail from './pages/HotelDetail';
import Tours from './pages/Tours';
import TourDetail from './pages/TourDetail';
import Flights from './pages/Flights';
import Destinations from './pages/Destinations';
import DestinationDetail from './pages/DestinationDetail';

// Mock placeholders for remaining pages
const About = () => <div className="pt-40 px-10 text-center"><h4 className="micro-label mb-6">Our Legacy</h4><h1 className="section-title italic">Architecture of <br /> Luxury</h1></div>;
const Contact = () => <div className="pt-40 px-10 text-center"><h4 className="micro-label mb-6">Connect</h4><h1 className="section-title italic">Private Concierge</h1></div>;

function InitialRedirect() {
  const navigate = useNavigate();
  const location = useLocation();
  const hasRedirected = useRef(false);

  useEffect(() => {
    // Force redirect to home ONLY on the very first mount of the session
    if (!hasRedirected.current && location.pathname !== '/') {
      hasRedirected.current = true;
      navigate('/', { replace: true });
    }
  }, []); // Only once on mount

  return null;
}

export default function App() {
  return (
    <Router>
      <InitialRedirect />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/hotels/:id" element={<HotelDetail />} />
          <Route path="/tours" element={<Tours />} />
          <Route path="/tours/:id" element={<TourDetail />} />
          <Route path="/flights" element={<Flights />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/destinations/:id" element={<DestinationDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}
