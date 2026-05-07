import { Scan, X, Info, Box } from 'lucide-react';
import { motion } from 'motion/react';
import React from 'react';

export function ARScannerScreen() {
  return (
    <div className="w-full h-full bg-charcoal-900 text-cream flex flex-col font-sans relative overflow-hidden">
      {/* Simulated Camera Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1599814316131-ab10d40212ac?q=80&w=800&auto=format&fit=crop)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/80 via-transparent to-charcoal-900/90" />

      {/* Top Controls */}
      <div className="absolute top-12 inset-x-6 flex justify-between items-center z-10">
        <div className="flex items-center space-x-2 bg-charcoal-900/60 backdrop-blur px-3 py-1.5 rounded-full border border-white/10">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-xs font-medium uppercase tracking-widest text-cream/80">AR Live</span>
        </div>
        <button className="w-10 h-10 rounded-full bg-charcoal-900/60 backdrop-blur flex items-center justify-center border border-white/10">
          <X className="w-5 h-5 text-cream" />
        </button>
      </div>

      {/* AR Viewport */}
      <div className="flex-1 flex items-center justify-center relative z-10 mt-10">
        <motion.div 
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="relative w-64 h-64 flex items-center justify-center"
        >
          {/* AR Target Reticle */}
          <div className="absolute inset-0 border-2 border-dashed border-neon-orange/30 rounded-full animate-spin-slow" style={{ animationDuration: '10s' }} />
          <div className="absolute inset-4 border border-neon-orange/20 rounded-full border-t-neon-orange animate-spin" style={{ animationDuration: '3s' }} />
          
          {/* 3D Dish Projection Simulation */}
          <div className="w-48 h-48 rounded-full overflow-hidden relative shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-4 border-neon-orange/20 bg-charcoal-800">
             <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600&auto=format&fit=crop" alt="AR Dish" className="w-full h-full object-cover opacity-90 scale-110" />
             {/* Steam Overlay */}
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mix-blend-overlay" />
          </div>

          {/* Floating Data Tags */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute top-4 -right-12 glass px-3 py-2 rounded-xl text-xs whitespace-nowrap"
          >
            <span className="text-neon-orange font-bold">450</span> kcal
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="absolute bottom-12 -left-8 glass px-3 py-2 rounded-xl text-xs whitespace-nowrap flex items-center"
          >
            <Box className="w-3 h-3 text-neon-orange mr-1" />
            Actual Size
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Information */}
      <div className="absolute bottom-0 inset-x-0 p-6 z-10 flex flex-col items-center">
         <div className="glass-card w-full p-4 mb-4 flex justify-between items-center">
            <div>
              <h3 className="font-display font-semibold text-lg">Superfood Bowl</h3>
              <p className="text-xs text-cream-muted">Tap anywhere to place dish</p>
            </div>
            <button className="w-10 h-10 rounded-full bg-charcoal-800 flex items-center justify-center">
              <Info className="w-5 h-5 text-neon-orange" />
            </button>
         </div>
         
         <div className="w-full flex space-x-3">
           <button className="flex-1 bg-charcoal-800 text-cream py-3 rounded-xl text-sm font-medium border border-white/5">Cancel</button>
           <button className="flex-1 bg-neon-orange text-charcoal-900 py-3 rounded-xl text-sm font-bold flex items-center justify-center shadow-[0_0_15px_rgba(0,255,136,0.2)]">
             <Scan className="w-4 h-4 mr-2" /> Add to Cart
           </button>
         </div>
      </div>
    </div>
  );
}
