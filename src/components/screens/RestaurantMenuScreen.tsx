import { ArrowLeft, Plus, Heart } from 'lucide-react';
import React from 'react';

const MENU_ITEMS = [
  {
    id: 1,
    name: "Spicy Tuna Crispy Rice",
    desc: "Pan-fried sushi rice topped with spicy tuna tartar and jalapeño.",
    price: "$14.99",
    image: "https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "A5 Wagyu Maki",
    desc: "Blowtorched A5 wagyu beef, asparagus, truffle soy glaze.",
    price: "$28.00",
    image: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Salmon Nigiri Set",
    desc: "4 pieces of fresh Atlantic salmon nigiri with wasabi.",
    price: "$16.50",
    image: "https://images.unsplash.com/photo-1583623025817-d180a2221d0a?q=80&w=800&auto=format&fit=crop"
  }
]

export function RestaurantMenuScreen() {
  return (
    <div className="w-full h-full bg-[#0a0a0c] text-cream flex flex-col font-sans relative">
      <div 
        className="h-[240px] w-full bg-cover bg-center relative"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=800&auto=format&fit=crop)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-charcoal-900/40 to-transparent" />
        
        <div className="absolute top-12 inset-x-6 flex justify-between items-center z-10">
          <button className="w-10 h-10 rounded-full bg-charcoal-900/60 backdrop-blur flex items-center justify-center border border-white/10">
            <ArrowLeft className="w-5 h-5 text-cream" />
          </button>
          <button className="w-10 h-10 rounded-full bg-charcoal-900/60 backdrop-blur flex items-center justify-center border border-white/10">
            <Heart className="w-5 h-5 text-cream" />
          </button>
        </div>

        <div className="absolute bottom-6 left-6 z-10">
          <h1 className="font-display text-3xl font-bold mb-1">Sushi Nakazawa</h1>
          <p className="text-sm text-cream-muted">Japanese • Sushi • 4.9 ★</p>
        </div>
      </div>

      <div className="flex-1 px-6 pt-6 pb-24 overflow-y-auto no-scrollbar">
        <h2 className="font-display text-lg font-bold mb-4">Popular Items</h2>
        <div className="space-y-6">
          {MENU_ITEMS.map((item) => (
            <div key={item.id} className="flex space-x-4">
              <div className="flex-1">
                <h3 className="font-semibold text-base mb-1">{item.name}</h3>
                <p className="text-xs text-cream-muted leading-relaxed mb-3 pr-2 line-clamp-2">
                  {item.desc}
                </p>
                <span className="font-display font-medium text-neon-orange">{item.price}</span>
              </div>
              <div className="relative w-28 h-28 shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-2xl" />
                <button className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-cream text-charcoal-900 flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-6 inset-x-6">
        <button className="w-full bg-neon-orange text-charcoal-900 font-display font-bold py-4 rounded-2xl text-lg shadow-[0_10px_30px_rgba(0,255,136,0.2)] flex justify-between px-6 items-center hover:scale-[1.01] transition-transform">
          <div className="flex items-center space-x-2">
            <div className="bg-charcoal-900 text-neon-orange w-6 h-6 rounded-md flex items-center justify-center text-sm">2</div>
            <span>View Cart</span>
          </div>
          <span>$42.99</span>
        </button>
      </div>
    </div>
  );
}
