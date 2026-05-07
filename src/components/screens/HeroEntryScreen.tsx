import { MapPin, Search, Menu, User, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import React from 'react';

export function HeroEntryScreen() {
  return (
    <div className="relative w-full h-full flex flex-col bg-charcoal-900 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-x-0 top-0 h-[60%] bg-cover bg-center z-0"
        style={{ 
          backgroundImage: 'url(https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=800&auto=format&fit=crop)',
          maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)'
        }}
      >
        <div className="absolute inset-0 bg-charcoal-900/30" />
      </div>

      {/* Top Nav */}
      <div className="pt-12 px-6 flex justify-between items-center z-10">
        <Menu className="w-6 h-6 text-cream" />
        <div className="flex space-x-4">
          <span className="text-xs font-sans font-medium uppercase tracking-wider text-cream/70 mt-1">Track</span>
          <User className="w-6 h-6 text-cream" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 flex flex-col justify-end pb-12 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="font-display text-4xl font-bold leading-tight mb-3">
            Craze
            <br />
            <span className="text-neon-orange">Curated Flavors,</span>
            <br />
            Hyper-Fast.
          </h1>
          <p className="font-sans text-cream-muted text-sm mb-8 pr-4">
            Discover premium culinary experiences delivered to your door with unprecedented speed.
          </p>

          {/* Search Bar */}
          <div className="glass rounded-2xl flex items-center p-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-charcoal-700/80 flex items-center justify-center mr-3">
              <MapPin className="w-5 h-5 text-neon-orange" />
            </div>
            <input 
              type="text" 
              placeholder="Enter zip code..." 
              className="bg-transparent border-none text-cream focus:outline-none focus:ring-0 font-sans w-full text-base placeholder-cream/30"
              readOnly
            />
            <button className="w-10 h-10 rounded-xl bg-neon-orange text-charcoal-900 flex items-center justify-center shadow-[0_0_15px_rgba(0,255,136,0.4)]">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <button className="w-full bg-cream text-charcoal-900 font-display font-bold py-4 rounded-2xl text-lg hover:bg-white transition-colors flex justify-center items-center">
            Download App
          </button>
        </motion.div>
      </div>
    </div>
  );
}
