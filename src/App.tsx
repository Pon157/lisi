import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, 
  Music, 
  User, 
  Image as ImageIcon, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import photosData from './data/photos.json';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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
    <Link to="/" className="text-2xl font-serif italic tracking-tighter">Лысый Годжо</Link>
    <div className="flex gap-8 text-xs uppercase tracking-widest font-semibold">
      <Link to="/" className="hover:opacity-50 transition-opacity">Главная</Link>
      <Link to="/gallery" className="hover:opacity-50 transition-opacity">Галерея</Link>
    </div>
  </nav>
);

const SocialLink = ({ href, icon: Icon, label, sublabel }: { href: string, icon: any, label: string, sublabel: string }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="group relative flex items-center justify-between p-8 border-b border-white/10 hover:bg-white/[0.02] transition-colors"
  >
    <div className="flex items-center gap-6">
      <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
        <Icon size={20} />
      </div>
      <div>
        <h3 className="text-xl font-serif italic">{label}</h3>
        <p className="text-xs text-muted uppercase tracking-widest mt-1">{sublabel}</p>
      </div>
    </div>
    <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
  </a>
);

// --- Pages ---

const Home = () => {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-20 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-[12vw] lg:text-[8vw] leading-[0.85] font-serif italic tracking-tighter mb-8">
            Bald <br /> <span className="text-stroke">Gojo</span>
          </h1>
          <p className="text-muted max-w-md text-lg leading-relaxed mb-12">
            Косплеер, певица и просто лысый Годжо. Добро пожаловать в мой мир, где стиль встречается с безумием.
          </p>
          
          <div className="flex gap-4">
            <Link 
              to="/gallery" 
              className="px-8 py-4 bg-white text-black rounded-full font-semibold uppercase text-xs tracking-widest hover:scale-105 transition-transform"
            >
              Смотреть фото
            </Link>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative aspect-[3/4] rounded-3xl overflow-hidden"
        >
          <img 
            src="https://picsum.photos/seed/gojo/800/1200" 
            alt="Hero" 
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent opacity-60" />
        </motion.div>
      </div>

      <div className="mt-40">
        <h2 className="text-xs uppercase tracking-[0.3em] text-muted mb-12">Ресурсы</h2>
        <div className="border-t border-white/10">
          <SocialLink 
            href="https://t.me/kseshac" 
            icon={Send} 
            label="Основной канал" 
            sublabel="Telegram / @kseshac" 
          />
          <SocialLink 
            href="https://t.me/kaverslisy" 
            icon={Music} 
            label="Каверы" 
            sublabel="Telegram / @kaverslisy" 
          />
          <SocialLink 
            href="https://t.me/realife_l" 
            icon={User} 
            label="Реальная жизнь" 
            sublabel="Telegram / @realife_l" 
          />
        </div>
      </div>
    </div>
  );
};

const Gallery = () => {
  const [photos] = useState<Photo[]>(photosData);

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-16">
        <div>
          <h2 className="text-xs uppercase tracking-[0.3em] text-muted mb-4">Альбом</h2>
          <h1 className="text-6xl font-serif italic">Галерея</h1>
        </div>
        <p className="text-muted text-sm max-w-[200px] text-right">
          Коллекция образов и моментов из жизни Лысого Годжо.
        </p>
      </div>

      {photos.length === 0 ? (
        <div className="text-center py-40 border border-dashed border-white/10 rounded-3xl">
          <ImageIcon className="mx-auto mb-4 opacity-20" size={48} />
          <p className="text-muted">Галерея пока пуста.</p>
        </div>
      ) : (
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {photos.map((photo) => (
            <motion.div 
              key={photo.id}
              layoutId={`photo-${photo.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative group rounded-2xl overflow-hidden break-inside-avoid"
            >
              <img 
                src={`./photos/${photo.filename}`} 
                alt={photo.title}
                className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-500"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  // Fallback to placeholder if image doesn't exist yet
                  (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${photo.id}/800/1200`;
                }}
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                <p className="text-xs uppercase tracking-widest text-white/60 mb-1">{photo.category}</p>
                <h3 className="text-xl font-serif italic">{photo.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      

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
        <p className="text-[10px] uppercase tracking-[0.5em] text-muted">
          © {new Date().getFullYear()} Лысый Годжо. Сделано @kotickr
        </p>
      </footer>
    </Router>
  );
}
