import { Search, SlidersHorizontal, MapPin, Clock, Star } from 'lucide-react';
import React from 'react';

const CATEGORIES = [
  { id: 1, name: 'Sushi', icon: '🍣', active: true },
  { id: 2, name: 'Burger', icon: '🍔', active: false },
  { id: 3, name: 'Pizza', icon: '🍕', active: false },
  { id: 4, name: 'Salad', icon: '🥗', active: false },
];

const RECOMMENDATIONS = [
  {
    id: 1,
    name: "Omakase Box",
    restaurant: "Sushi Nakazawa",
    rating: 4.9,
    time: "25 min",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Truffle Burger",
    restaurant: "Umami Prime",
    rating: 4.8,
    time: "18 min",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop"
  }
];

export function CuratedHomeScreen() {
  return (
    <div className="w-full h-full bg-[#0a0a0c] pt-12 text-cream flex flex-col font-sans">
      <div className="px-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-neon-orange/20 flex items-center justify-center">
              <MapPin className="w-4 h-4 text-neon-orange" />
            </div>
            <div>
              <p className="text-[10px] text-cream-muted uppercase tracking-wider font-semibold">Delivering to</p>
              <p className="text-sm font-medium">10013, New York</p>
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-charcoal-800 border border-white/5 overflow-hidden">
             <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop" alt="User" />
          </div>
        </div>

        <div className="flex space-x-3">
          <div className="flex-1 bg-charcoal-800 rounded-xl flex items-center px-4 py-3 border border-white/5">
            <Search className="w-4 h-4 text-cream-muted mr-3" />
            <input type="text" placeholder="Search dishes..." className="bg-transparent text-sm w-full outline-none placeholder-cream-muted" readOnly />
          </div>
          <button className="w-12 h-12 bg-charcoal-800 rounded-xl flex items-center justify-center border border-white/5">
            <SlidersHorizontal className="w-5 h-5 text-neon-orange" />
          </button>
        </div>
      </div>

      <div className="px-6 mb-6">
        <h2 className="font-display text-lg font-bold mb-4">Based on Your Cravings</h2>
        <div className="flex space-x-4 overflow-x-auto no-scrollbar pb-4 -mx-6 px-6">
          {RECOMMENDATIONS.map(item => (
            <div key={item.id} className="min-w-[240px] bg-charcoal-800 rounded-2xl p-3 border border-white/5">
              <div className="w-full h-[140px] rounded-xl overflow-hidden mb-3 relative">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2 bg-charcoal-900/80 backdrop-blur border border-white/10 px-2 py-1 rounded-lg flex items-center">
                  <Star className="w-3 h-3 text-yellow-400 mr-1 fill-yellow-400" />
                  <span className="text-xs font-bold">{item.rating}</span>
                </div>
              </div>
              <h3 className="font-display font-semibold text-base mb-1">{item.name}</h3>
              <div className="flex items-center text-xs text-cream-muted space-x-4">
                <span>{item.restaurant}</span>
                <div className="flex items-center">
                  <Clock className="w-3 h-3 mr-1 text-neon-orange" />
                  <span>{item.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 flex-1 bg-charcoal-800/30 rounded-t-[2.5rem] pt-6 border-t border-white/5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-display text-lg font-bold">Categories</h2>
          <span className="text-neon-orange text-xs font-medium">See All</span>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {CATEGORIES.map(cat => (
            <div key={cat.id} className="flex flex-col items-center">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-2 transition-colors ${cat.active ? 'bg-neon-orange text-charcoal-900 shadow-[0_0_15px_rgba(0,255,136,0.3)]' : 'bg-charcoal-800 border border-white/5'}`}>
                {cat.icon}
              </div>
              <span className="text-xs font-medium text-cream-muted">{cat.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
