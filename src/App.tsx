import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Music, User, Image as ImageIcon, ExternalLink } from 'lucide-react';
import photosData from './data/photos.json';

// --- Types ---
interface Photo {
  id: number;
  filename: string;
  title: string;
  category: string;
}

// --- Components ---
const Navbar = () => (
  <nav className="fixed top-0 left-0 w-full z-50 px-6 py-8 flex justify-between items-center mix-blend-difference">
    <Link to="/" className="text-2xl font-serif italic tracking-tighter text-white">Лысый Годжо</Link>
    <div className="flex gap-8 text-xs uppercase tracking-widest font-semibold text-white">
      <Link to="/" className="hover:opacity-50 transition-opacity">Главная</Link>
      <Link to="/gallery" className="hover:opacity-50 transition-opacity">Галерея</Link>
    </div>
  </nav>
);

const SocialLink = ({ href, icon: Icon, label, sublabel }: { href: string, icon: any, label: string, sublabel: string }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="group relative flex items-center justify-between p-8 border-b border-white/10 hover:bg-white/[0.02] transition-colors">
    <div className="flex items-center gap-6">
      <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
        <Icon size={20} />
      </div>
      <div>
        <h3 className="text-xl font-serif italic text-white">{label}</h3>
        <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">{sublabel}</p>
      </div>
    </div>
    <ExternalLink size={16} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
  </a>
);

const Home = () => (
  <div className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto">
    <div className="grid lg:grid-cols-2 gap-20 items-center">
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
        <h1 className="text-[12vw] lg:text-[8vw] leading-[0.85] font-serif italic tracking-tighter mb-8 text-white">
          Bald <br /> <span className="text-transparent" style={{ WebkitTextStroke: '1px white' }}>Gojo</span>
        </h1>
        <p className="text-gray-400 max-w-md text-lg leading-relaxed mb-12">Косплеер, певица и просто лысый Годжо. Добро пожаловать в мой мир.</p>
        <Link to="/gallery" className="inline-block px-8 py-4 bg-white text-black rounded-full font-semibold uppercase text-xs tracking-widest hover:scale-105 transition-transform">Смотреть фото</Link>
      </motion.div>
      <div className="relative aspect-[3/4] rounded-3xl overflow-hidden">
        <img src="https://picsum.photos/seed/gojo/800/1200" alt="Hero" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
      </div>
    </div>
    <div className="mt-40">
      <h2 className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-12">Ресурсы</h2>
      <div className="border-t border-white/10">
        <SocialLink href="https://t.me/kseshac" icon={Send} label="Основной канал" sublabel="Telegram / @kseshac" />
        <SocialLink href="https://t.me/kaverslisy" icon={Music} label="Каверы" sublabel="Telegram / @kaverslisy" />
        <SocialLink href="https://t.me/realife_l" icon={User} label="Реальная жизнь" sublabel="Telegram / @realife_l" />
      </div>
    </div>
  </div>
);

const Gallery = () => {
  const [photos] = useState<Photo[]>(photosData);
  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-16">
        <div>
          <h2 className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-4">Альбом</h2>
          <h1 className="text-6xl font-serif italic text-white">Галерея</h1>
        </div>
      </div>
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {photos.map((photo) => (
          <div key={photo.id} className="relative group rounded-2xl overflow-hidden break-inside-avoid">
            <img 
              src={`./photos/${photo.filename}`} 
              alt={photo.title} 
              className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-500" 
              referrerPolicy="no-referrer"
              onError={(e) => { (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${photo.id}/800/1200`; }}
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
              <p className="text-xs uppercase tracking-widest text-white/60 mb-1">{photo.category}</p>
              <h3 className="text-xl font-serif italic text-white">{photo.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
      </AnimatePresence>
      <footer className="py-20 px-6 text-center border-t border-white/5">
        <p className="text-[10px] uppercase tracking-[0.5em] text-gray-500">© {new Date().getFullYear()} Лысый Годжо.</p>
      </footer>
    </Router>
  );
}
