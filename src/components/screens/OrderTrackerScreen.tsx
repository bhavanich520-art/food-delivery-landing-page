import { MapPin, Navigation, Phone, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import React from 'react';

export function OrderTrackerScreen() {
  return (
    <div className="w-full h-full bg-charcoal-900 text-cream flex flex-col font-sans relative overflow-hidden">
      {/* Dark Map Background */}
      <div className="absolute inset-0 z-0 bg-[#0f1115]">
        {/* Abstract Map Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,100 Q150,50 300,150 T600,100" stroke="#00ff88" strokeWidth="2" fill="none" />
          <path d="M50,0 Q100,200 250,300 T50,500" stroke="#fcfcfc" strokeWidth="1" fill="none" />
          <path d="M200,600 Q300,400 400,450 T500,200" stroke="#fcfcfc" strokeWidth="1" fill="none" />
          <path d="M100,300 C150,250 200,250 250,300 S350,350 400,300" stroke="#00ff88" strokeWidth="3" strokeDasharray="5,5" fill="none" className="animate-pulse-slow" />
        </svg>

        {/* Location Markers */}
        <div className="absolute top-[30%] left-[20%] w-8 h-8 bg-charcoal-800 rounded-full border border-white/20 flex items-center justify-center shadow-lg shadow-black">
          <MapPin className="w-4 h-4 text-cream" />
        </div>
        
        <div className="absolute top-[45%] left-[65%] w-12 h-12 bg-neon-orange rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,255,136,0.4)] z-10 animate-float">
          <Navigation className="w-5 h-5 text-charcoal-900 fill-charcoal-900 transform rotate-45" />
          <div className="absolute -inset-2 rounded-full border border-neon-orange/30 animate-ping" />
        </div>

        <div className="absolute top-[60%] left-[40%] w-8 h-8 bg-charcoal-800 rounded-full border border-neon-orange flex items-center justify-center shadow-lg shadow-black">
          <div className="w-3 h-3 rounded-full bg-neon-orange animate-pulse" />
        </div>
      </div>

      {/* Push Notification Overlay */}
      <div className="absolute top-12 inset-x-4 z-20">
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1, type: "spring" }}
          className="bg-neon-orange/10 backdrop-blur-xl border border-neon-orange/20 rounded-2xl p-4 flex items-start shadow-2xl"
        >
          <div className="w-8 h-8 rounded-full bg-neon-orange/20 flex items-center justify-center shrink-0 mr-3 mt-0.5">
            <CheckCircle2 className="w-4 h-4 text-neon-orange" />
          </div>
          <div>
            <h4 className="font-display font-semibold text-neon-orange text-sm mb-0.5">Order on the way!</h4>
            <p className="text-xs text-cream/80">Chef is wrapping your order! Est. delivery: 12 min.</p>
          </div>
        </motion.div>
      </div>

      {/* Bottom Sheet */}
      <div className="absolute bottom-0 inset-x-0 z-10">
         <div className="bg-charcoal-800/90 backdrop-blur-2xl rounded-t-[2.5rem] p-6 border-t border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
            <div className="w-12 h-1 bg-white/10 rounded-full mx-auto mb-6" />
            
            <div className="flex justify-between items-end mb-6">
              <div>
                <p className="text-xs text-cream-muted uppercase tracking-wider font-semibold mb-1">Estimated Arrival</p>
                <h2 className="font-display text-4xl font-bold">12 <span className="text-xl text-cream-muted font-sans font-medium">min</span></h2>
              </div>
              <div className="text-right">
                <p className="text-xs text-cream-muted mb-1">Distance</p>
                <p className="text-lg font-medium">1.2 mi</p>
              </div>
            </div>

            <div className="glass-card p-4 rounded-2xl flex items-center mb-6">
              <div className="w-12 h-12 rounded-xl bg-charcoal-900 border border-white/5 overflow-hidden mr-4">
                <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop" alt="Driver" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-sm">Alex Johnson</h4>
                <div className="flex items-center text-xs text-cream-muted">
                   <span className="text-neon-orange mr-1">★ 4.9</span>
                   <span>· Silver Honda Civic</span>
                </div>
              </div>
              <button className="w-10 h-10 rounded-full bg-charcoal-900 flex items-center justify-center border border-white/5 hover:border-neon-orange/50 transition-colors">
                <Phone className="w-4 h-4 text-neon-orange" />
              </button>
            </div>

            <button className="w-full bg-cream/5 text-cream py-4 rounded-2xl text-sm font-medium border border-white/10 hover:bg-cream/10 transition-colors">
              View Order Details
            </button>
         </div>
      </div>
    </div>
  );
}
