import { motion } from 'motion/react';
import React from 'react';

export function AppFrame({ children, title, description, isActive = false }: { children: React.ReactNode, title: string, description: string, isActive?: boolean }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center gap-8 group"
    >
      <div className="relative">
        {/* Glow effect behind phone */}
        <div className={`absolute -inset-4 bg-neon-orange/20 blur-3xl rounded-[3rem] transition-opacity duration-700 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
        
        {/* Phone Hardware Shell */}
        <div className="relative w-[340px] h-[720px] bg-charcoal-700 rounded-[3rem] p-3 shadow-2xl border border-white/5 ring-1 ring-white/10 z-10 overflow-hidden transform transition-transform duration-500 hover:scale-[1.02]">
          
          {/* Inner Screen */}
          <div className="relative w-full h-full bg-charcoal-800 rounded-[2.25rem] overflow-hidden flex flex-col">
            
            {/* Dynamic Island / Notch */}
            <div className="absolute top-0 inset-x-0 h-7 flex justify-center z-50 mt-2 pointer-events-none">
              <div className="w-24 h-6 w- max-w-full bg-charcoal-900 rounded-full flex items-center justify-between px-2 shadow-inner">
                <div className="w-2 h-2 rounded-full bg-white/10 ml-1" />
                <div className="w-2 h-2 rounded-full bg-neon-orange/50 mr-1" />
              </div>
            </div>

            {/* Screen Content */}
            <div className="flex-1 w-full h-full overflow-y-auto no-scrollbar pb-8 relative bg-charcoal-900">
              {children}
            </div>

            {/* Home Indicator */}
            <div className="absolute bottom-1 inset-x-0 h-4 flex justify-center items-center z-50 pointer-events-none">
              <div className="w-32 h-1 bg-white/20 rounded-full" />
            </div>

          </div>
        </div>
      </div>

      <div className="text-center max-w-[340px]">
        <h3 className="font-display font-medium text-xl text-cream mb-2 tracking-wide uppercase text-sm">
          {title}
        </h3>
        <p className="font-sans text-sm text-cream-muted leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
