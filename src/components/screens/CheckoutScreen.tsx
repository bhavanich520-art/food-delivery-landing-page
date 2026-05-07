import { ChevronRight, ShieldCheck, CreditCard, Apple } from 'lucide-react';
import React from 'react';

export function CheckoutScreen() {
  return (
    <div className="w-full h-full bg-charcoal-900 text-cream flex flex-col font-sans pt-12 px-6">
      <div className="pt-12 mb-6">
        <h2 className="font-display text-2xl font-bold mb-1">Checkout</h2>
        <p className="text-sm text-cream-muted">2 items from Sushi Nakazawa</p>
      </div>

      <div className="space-y-4 mb-8">
        <div className="glass p-4 rounded-2xl flex justify-between items-center">
          <div className="flex items-center space-x-3">
             <div className="w-8 h-8 rounded-lg bg-charcoal-700 flex items-center justify-center font-display font-bold text-xs text-neon-orange">1</div>
             <div>
               <p className="text-sm font-medium">Spicy Tuna Crispy Rice</p>
               <p className="text-xs text-cream-muted">$14.99</p>
             </div>
          </div>
          <span className="text-sm font-medium">$14.99</span>
        </div>
        
        <div className="glass p-4 rounded-2xl flex justify-between items-center">
          <div className="flex items-center space-x-3">
             <div className="w-8 h-8 rounded-lg bg-charcoal-700 flex items-center justify-center font-display font-bold text-xs text-neon-orange">1</div>
             <div>
               <p className="text-sm font-medium">A5 Wagyu Maki</p>
               <p className="text-xs text-cream-muted">$28.00</p>
             </div>
          </div>
          <span className="text-sm font-medium">$28.00</span>
        </div>
      </div>

      <div className="border-t border-white/10 pt-6 mb-8">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm text-cream-muted">Subtotal</span>
          <span className="text-sm">$42.99</span>
        </div>
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm text-cream-muted">Delivery Fee</span>
          <span className="text-sm">$2.99</span>
        </div>
        <div className="flex justify-between items-center text-lg font-bold mt-4 pt-2">
          <span>Total</span>
          <span className="text-neon-orange">$45.98</span>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-display font-semibold text-sm mb-3 text-cream-muted uppercase tracking-wider">Payment Method</h3>
        <div className="glass-card p-1 rounded-2xl flex space-x-1 bg-charcoal-800/80">
          <button className="flex-1 py-3 bg-charcoal-700 rounded-xl flex items-center justify-center border border-white/5 shadow-inner">
            <Apple className="w-5 h-5 mr-1" /> Pay
          </button>
          <button className="flex-1 py-3 rounded-xl flex items-center justify-center text-cream-muted hover:text-cream transition-colors">
            <CreditCard className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="mt-auto pb-8 relative">
        <div className="flex items-center justify-center mb-4 space-x-2 text-xs text-cream-muted bg-neon-orange/5 border border-neon-orange/10 py-2 rounded-lg w-max mx-auto px-4">
          <ShieldCheck className="w-4 h-4 text-neon-orange" />
          <span>Secure AES-256 Transaction</span>
        </div>

        <button className="relative w-full bg-neon-orange overflow-hidden rounded-2xl group">
           <div className="absolute inset-0 w-1/4 h-full bg-white/20 skew-x-[-20deg] group-hover:translate-x-[400%] transition-transform duration-700 ease-out" />
           <div className="px-6 py-4 flex justify-between items-center text-charcoal-900 font-display font-bold text-lg">
             <span>Pay $45.98</span>
             <ChevronRight className="w-5 h-5" />
           </div>
        </button>
      </div>
    </div>
  );
}
