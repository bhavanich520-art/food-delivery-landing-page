import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import localforage from 'localforage';
import { 
  ArrowRight, Github, Twitter, Instagram, MapPin, Mail, Phone, 
  Star, Apple, Play, Zap, Ticket, Gift, ShoppingCart 
} from 'lucide-react';
import { AppFrame } from './components/AppFrame';
import { HeroEntryScreen } from './components/screens/HeroEntryScreen';
import { CuratedHomeScreen } from './components/screens/CuratedHomeScreen';
import { RestaurantMenuScreen } from './components/screens/RestaurantMenuScreen';
import { ARScannerScreen } from './components/screens/ARScannerScreen';
import { CheckoutScreen } from './components/screens/CheckoutScreen';
import { OrderTrackerScreen } from './components/screens/OrderTrackerScreen';

const OFFERS = [
  { id: 1, title: "50% OFF", desc: "On your first premium order", icon: Ticket, color: "text-neon-orange", bg: "bg-neon-orange/10", border: "border-neon-orange/20" },
  { id: 2, title: "Free Delivery", desc: "On all orders above $30", icon: Zap, color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/20" },
  { id: 3, title: "Buy 1 Get 1", desc: "Selected featured dishes", icon: Gift, color: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/20" },
  { id: 4, title: "$15 Welcome", desc: "First order discount drop", icon: Star, color: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/20" },
];

const INITIAL_POPULAR_FOODS = [
  { id: 1, name: "Chicken Biryani", price: "$18.99", rating: 4.9, image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=800&auto=format&fit=crop", edited: false },
  { id: 2, name: "Margherita Pizza", price: "$14.50", rating: 4.8, image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?q=80&w=800&auto=format&fit=crop", edited: false },
  { id: 3, name: "Veg Burger", price: "$12.00", rating: 4.7, image: "https://images.unsplash.com/photo-1585238342024-78d387f4a707?q=80&w=800&auto=format&fit=crop", edited: false },
  { id: 4, name: "Fried Rice", price: "$16.00", rating: 4.6, image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=800&auto=format&fit=crop", edited: false },
  { id: 5, name: "Gulab Jamun", price: "$8.50", rating: 4.9, image: "https://images.unsplash.com/photo-1551446591-142875a901a1?q=80&w=800&auto=format&fit=crop", edited: false },
];

const REVIEWS = [
  { id: 1, user: "Sarah L.", role: "Foodie", rating: 5, review: "Craze has completely changed how I order food. The AR feature is mind-blowing! You get exactly what you see.", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop" },
  { id: 2, user: "James D.", role: "Tech Enthusiast", rating: 5, review: "The UI is incredibly sleek, dark mode is gorgeous, and delivery is blazing fast. My absolute go-to delivery app.", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop" },
  { id: 3, user: "Elena V.", role: "Chef", rating: 4.8, review: "As a chef, I appreciate the curation. It feels premium. The photos do justice to the amazing dishes available here.", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop" }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('features');
  const [popularFoods, setPopularFoods] = useState(INITIAL_POPULAR_FOODS);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const [activeMood, setActiveMood] = useState<string | null>(null);
  const [selectedItemForCombo, setSelectedItemForCombo] = useState<string | null>('Burger');

  const MOODS = [
    { id: 'happy', label: '😄 Happy', suggestion: 'Treat yourself to something sweet! How about our signature Gulab Jamun?' },
    { id: 'lazy', label: '😴 Lazy', suggestion: 'Feeling lazy? Order a classic Margherita Pizza or a juicy Burger. We will bring it to your door.' },
    { id: 'hungry', label: '😋 Hungry', suggestion: 'Starving? Our massive Chicken Biryani will hit the spot perfectly.' }
  ];

  const COMBOS: Record<string, { desc: string, price: string }> = {
    'Burger': { desc: 'Add Fries + Drink (Combo Offer)', price: '+$4.99' },
    'Pizza': { desc: 'Add Garlic Bread + Cola', price: '+$5.99' },
    'Biryani': { desc: 'Add Raita + Dessert', price: '+$3.99' }
  };

  const TODAYS_SPECIAL = {
    name: 'Truffle Mushroom Burger',
    desc: 'Limited time daily special with roasted mushrooms and truffle mayo.',
    price: '$14.99',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop'
  };

  useEffect(() => {
    let mounted = true;
    localforage.getItem('craze_popular_foods').then((saved) => {
      if (!mounted) return;
      if (saved && Array.isArray(saved) && saved.length > 0) {
        setPopularFoods(saved as any);
      }
      setIsLoaded(true);
    }).catch((err) => {
      console.error('Error loading data:', err);
      if (mounted) setIsLoaded(true);
    });
    return () => { mounted = false; };
  }, []);

  const handleImageEdit = async (id: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result as string;
        const newFoods = popularFoods.map(food => 
          food.id === id ? { ...food, image: base64String, edited: true } : food
        );
        setPopularFoods(newFoods);
        await localforage.setItem('craze_popular_foods', newFoods);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-charcoal-900 text-cream selection:bg-neon-orange selection:text-charcoal-900 font-sans overflow-x-hidden">
      
      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 h-20 z-50 flex items-center justify-between px-8 md:px-12 bg-charcoal-900/90 backdrop-blur-md border-b border-white/5 shadow-2xl">
        <button onClick={() => handleTabChange('features')} className="font-display font-bold text-2xl tracking-tighter text-white">
          Craze<span className="text-neon-orange">.</span>
        </button>
        <div className="flex space-x-6">
          <button onClick={() => handleTabChange('features')} className={`text-sm font-medium transition-colors pb-1 border-b ${activeTab === 'features' ? 'text-neon-orange border-neon-orange' : 'text-white/80 border-transparent hover:text-neon-orange hover:border-neon-orange'}`}>Features</button>
          <button onClick={() => handleTabChange('offers')} className={`text-sm font-medium transition-colors pb-1 border-b ${activeTab === 'offers' ? 'text-neon-orange border-neon-orange' : 'text-white/80 border-transparent hover:text-neon-orange hover:border-neon-orange'}`}>Offers</button>
          <button onClick={() => handleTabChange('reviews')} className={`text-sm font-medium transition-colors pb-1 border-b ${activeTab === 'reviews' ? 'text-neon-orange border-neon-orange' : 'text-white/80 border-transparent hover:text-neon-orange hover:border-neon-orange'}`}>Reviews</button>
          <button onClick={() => handleTabChange('download')} className={`text-sm font-medium transition-colors pb-1 border-b ${activeTab === 'download' ? 'text-neon-orange border-neon-orange' : 'text-white/80 border-transparent hover:text-neon-orange hover:border-neon-orange'}`}>Download</button>
        </div>
      </nav>

      <main className="pt-24">
        {/* Header Section */}
        {activeTab === 'features' && (
        <section className="px-8 md:px-12 max-w-7xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <h1 className="font-display text-5xl md:text-8xl font-bold leading-[1.1] tracking-tight mb-8">
              Curated Flavors, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-orange to-orange-200">
                Hyper-Fast.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-cream-muted max-w-2xl leading-relaxed mb-12">
              Experience the future of food delivery. Immerse yourself in sleek futurism, AR food previews, and hyper-personalized curation.
            </p>
            <div className="flex items-center space-x-6">
              <button onClick={() => handleTabChange('download')} className="bg-white text-charcoal-900 px-8 py-4 rounded-full font-semibold flex items-center group hover:bg-neon-orange transition-colors duration-300">
                Get the App
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </section>
        )}

        {/* Bento Grid Gallery */}
        {activeTab === 'features' && (
        <motion.section 
          initial={{ opacity: 0, y: 15 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
          id="features" 
          className="px-4 md:px-12 max-w-[1600px] mx-auto mb-20"
        >
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Core <span className="text-neon-orange">Features</span></h2>
            <p className="text-cream-muted text-lg">Explore the innovative UX that defines the Craze experience.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-y-32 gap-x-16 items-center place-items-center">
            
            <div className="lg:col-span-1 border border-white/5 bg-charcoal-800/20 rounded-[4rem] p-12 w-full flex justify-center">
              <AppFrame 
                title="The Hero Entry" 
                description="High-resolution, appetizing gourmet entry with prominent zip code search and clear CTAs."
                isActive={true}
              >
                <HeroEntryScreen />
              </AppFrame>
            </div>

            <div className="lg:col-span-1 border border-white/5 bg-charcoal-800/20 rounded-[4rem] p-12 w-full flex justify-center lg:translate-y-24">
              <AppFrame 
                title="Curated Home" 
                description="Core hub layout featuring horizontal scrolling carousels tailored to individual cravings."
              >
                <CuratedHomeScreen />
              </AppFrame>
            </div>

            <div className="lg:col-span-1 border border-white/5 bg-charcoal-800/20 rounded-[4rem] p-12 w-full flex justify-center xl:-translate-y-12">
              <AppFrame 
                title="Restaurant Menu" 
                description="Sleek vertical lists with gorgeous thumbnail focus and floating action buttons."
              >
                <RestaurantMenuScreen />
              </AppFrame>
            </div>

            <div className="lg:col-span-1 border border-white/5 bg-charcoal-800/20 rounded-[4rem] p-12 w-full flex justify-center 2xl:translate-y-12">
              <AppFrame 
                title="Culinary AR Scanner" 
                description="Interactive augmented reality projection allowing users to preview dishes and portion sizes on their table."
              >
                <ARScannerScreen />
              </AppFrame>
            </div>

            <div className="lg:col-span-1 border border-white/5 bg-charcoal-800/20 rounded-[4rem] p-12 w-full flex justify-center">
              <AppFrame 
                title="Money Transaction" 
                description="Minimalist checkout overlay with clear summaries, payment badges, and secure transaction flows."
              >
                <CheckoutScreen />
              </AppFrame>
            </div>

            <div className="lg:col-span-1 border border-white/5 bg-charcoal-800/20 rounded-[4rem] p-12 w-full flex justify-center lg:translate-y-24">
              <AppFrame 
                title="Live Order Tracking" 
                description="Dark mode map tracing the driver's route, accompanied by live push notifications for precise ETAs."
              >
                <OrderTrackerScreen />
              </AppFrame>
            </div>

          </div>
        </motion.section>
        )}

        {/* Smart Discovery Grid */}
        {activeTab === 'features' && (
        <section className="px-4 md:px-12 max-w-[1600px] mx-auto mb-20">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Smart <span className="text-neon-orange">Discovery</span></h2>
            <p className="text-cream-muted text-lg">Personalized recommendations and special daily finds.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Mood-Based Recommendations */}
            <div className="glass-card p-6 md:p-8 flex flex-col rounded-[2rem] border border-white/5 h-full">
              <h3 className="font-display text-2xl font-bold mb-2">Mood-Based Food</h3>
              <p className="text-cream-muted text-sm mb-6">What are you feeling today?</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {MOODS.map(mood => (
                  <button 
                    key={mood.id} 
                    onClick={() => setActiveMood(mood.id)}
                    className={`px-4 py-2 text-sm rounded-full font-bold transition-all border ${activeMood === mood.id ? 'bg-neon-orange text-charcoal-900 border-neon-orange' : 'bg-charcoal-800 border-white/10 hover:border-white/30'}`}
                  >
                    {mood.label}
                  </button>
                ))}
              </div>
              
              <div className="mt-auto">
                {activeMood ? (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-xl glass border border-neon-orange/20 text-sm font-medium text-cream bg-neon-orange/5">
                    👉 {MOODS.find(m => m.id === activeMood)?.suggestion}
                  </motion.div>
                ) : (
                  <div className="p-4 rounded-xl border border-dashed border-white/10 text-cream-muted/50 text-sm italic text-center">
                    Select a mood to get started
                  </div>
                )}
              </div>
            </div>

            {/* Smart Combos */}
            <div className="glass-card p-6 md:p-8 flex flex-col rounded-[2rem] border border-white/5 h-full">
              <h3 className="font-display text-2xl font-bold mb-2">Smart Combos</h3>
              <p className="text-cream-muted text-sm mb-6">Perfect pairings for your cravings.</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {Object.keys(COMBOS).map(item => (
                  <button 
                    key={item} 
                    onClick={() => setSelectedItemForCombo(item)}
                    className={`px-4 py-2 text-sm rounded-full font-bold transition-all border ${selectedItemForCombo === item ? 'bg-neon-orange text-charcoal-900 border-neon-orange' : 'bg-charcoal-800 border-white/10 hover:border-white/30'}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
              
              <div className="mt-auto">
                {selectedItemForCombo ? (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-4 rounded-xl glass border border-neon-orange/20 flex flex-col gap-2 bg-neon-orange/5">
                    <p className="font-bold">{selectedItemForCombo} Combo</p>
                    <p className="text-cream-muted text-sm border-l-2 border-neon-orange/50 pl-2 ml-1">👉 {COMBOS[selectedItemForCombo].desc}</p>
                    <span className="bg-neon-orange text-charcoal-900 font-bold px-3 py-1 rounded-lg text-xs self-end mt-1">{COMBOS[selectedItemForCombo].price}</span>
                  </motion.div>
                ) : (
                  <div className="p-4 rounded-xl border border-dashed border-white/10 text-cream-muted/50 text-sm italic text-center">
                    Select an item to see combos
                  </div>
                )}
              </div>
            </div>

            {/* Today's Special */}
            <div className="glass-card p-0 flex flex-col rounded-[2rem] border border-white/5 overflow-hidden relative group h-full">
              <div className="absolute top-4 right-4 bg-neon-orange text-charcoal-900 px-3 py-1 rounded-full font-bold text-xs z-10 uppercase tracking-wider">Today's Special</div>
              <div className="h-48 w-full relative overflow-hidden shrink-0">
                <img src={TODAYS_SPECIAL.image} alt={TODAYS_SPECIAL.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/60 to-transparent pointer-events-none"></div>
              </div>
              <div className="p-6 md:p-8 flex flex-col flex-1 bg-charcoal-900/40">
                <h3 className="font-display text-xl font-bold mb-2">{TODAYS_SPECIAL.name}</h3>
                <p className="text-cream-muted text-sm mb-6 flex-1 leading-relaxed">{TODAYS_SPECIAL.desc}</p>
                
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-2xl font-bold text-neon-orange">{TODAYS_SPECIAL.price}</span>
                  <button className="bg-charcoal-800 hover:bg-neon-orange hover:text-charcoal-900 border border-white/5 text-xs font-bold px-4 py-2.5 rounded-xl flex items-center transition-all duration-300">
                    <ShoppingCart className="w-3.5 h-3.5 mr-1.5" /> Add to Cart
                  </button>
                </div>
              </div>
            </div>

          </div>
        </section>
        )}

        {/* Offers & Discounts */}
        {activeTab === 'offers' && (
        <motion.div
           initial={{ opacity: 0, y: 15 }} 
           animate={{ opacity: 1, y: 0 }} 
           transition={{ duration: 0.5 }}
        >
        <section id="offers" className="px-8 md:px-12 max-w-7xl mx-auto mb-20">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Craze <span className="text-neon-orange">Offers</span></h2>
              <p className="text-cream-muted text-lg">Unbeatable discounts for our premium members.</p>
            </div>
            <button className="hidden md:flex text-sm font-semibold text-neon-orange items-center hover:text-white transition-colors">
              View All Offers <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {OFFERS.map((offer) => (
              <motion.div 
                key={offer.id}
                whileHover={{ y: -8 }}
                className={`glass-card p-6 border ${offer.border} relative overflow-hidden group`}
              >
                <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full ${offer.bg} blur-2xl group-hover:scale-150 transition-transform duration-500`} />
                <div className={`w-12 h-12 rounded-2xl ${offer.bg} flex items-center justify-center mb-6 relative z-10`}>
                  <offer.icon className={`w-6 h-6 ${offer.color}`} />
                </div>
                <h3 className="font-display text-2xl font-bold mb-2 relative z-10">{offer.title}</h3>
                <p className="text-sm text-cream-muted leading-relaxed relative z-10">{offer.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Popular Foods / Trending */}
        <section id="menu" className="px-8 md:px-12 max-w-[1600px] mx-auto mb-20 pt-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Trending <span className="text-neon-orange">Now</span></h2>
            <p className="text-cream-muted text-lg">The most craved dishes right now, delivered blazing fast.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 xl:gap-8">
            {popularFoods.map((food) => (
              <motion.div 
                key={food.id}
                whileHover={{ y: -8 }}
                className="glass-card flex flex-col overflow-hidden group relative"
              >
                <div className="relative h-48 sm:h-56 w-full overflow-hidden">
                  <img src={food.image} alt={food.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-4 right-4 bg-charcoal-900/80 backdrop-blur-md border border-white/10 px-2 py-1 rounded-lg flex items-center shadow-lg">
                    <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400 mr-1.5" />
                    <span className="text-xs font-bold">{food.rating}</span>
                  </div>
                  {!food.edited && (
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity z-10">
                      <label className="cursor-pointer bg-charcoal-900/80 backdrop-blur-md px-4 py-2 rounded-lg text-sm font-semibold text-cream hover:text-neon-orange transition-colors border border-white/10 hover:border-neon-orange/50">
                        Edit Image
                        <input 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={(e) => handleImageEdit(food.id, e)} 
                        />
                      </label>
                    </div>
                  )}
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display text-lg font-bold mb-1 truncate">{food.name}</h3>
                    <p className="font-display text-neon-orange font-semibold text-lg mb-4">{food.price}</p>
                  </div>
                  <button className="w-full bg-charcoal-700 hover:bg-neon-orange hover:text-charcoal-900 border border-white/5 text-sm font-semibold py-3 rounded-xl flex items-center justify-center transition-all duration-300">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
        </motion.div>
        )}

        {/* Customer Reviews */}
        {activeTab === 'reviews' && (
        <motion.section 
          initial={{ opacity: 0, y: 15 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
          id="reviews" 
          className="px-8 md:px-12 max-w-7xl mx-auto mb-20"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div className="mb-6 md:mb-0">
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Customer <span className="text-neon-orange">Love</span></h2>
              <p className="text-cream-muted text-lg">Don't just take our word for it—see what our users are saying.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {REVIEWS.map((review) => (
              <div key={review.id} className="glass border border-white/5 p-8 rounded-3xl relative">
                <div className="text-neon-orange mb-6 flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < Math.floor(review.rating) ? 'fill-neon-orange' : 'text-cream-muted fill-transparent border-cream-muted'}`} />
                  ))}
                </div>
                <p className="text-lg leading-relaxed mb-8 italic">"{review.review}"</p>
                <div className="flex items-center space-x-4 mt-auto">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-charcoal-700">
                    <img src={review.image} alt={review.user} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-base">{review.user}</h4>
                    <p className="text-xs text-cream-muted uppercase tracking-wider">{review.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
        )}

        {/* App Download Section */}
        {activeTab === 'download' && (
        <motion.section 
          initial={{ opacity: 0, y: 15 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
          id="download" 
          className="px-4 md:px-12 max-w-7xl mx-auto mb-20"
        >
          <div className="bg-charcoal-800/40 backdrop-blur-md border border-white/10 rounded-[3rem] overflow-hidden relative flex flex-col lg:flex-row items-center justify-between">
            {/* Background Glows */}
            <div className="absolute inset-0 bg-gradient-to-r from-neon-orange/5 to-blue-500/5 opacity-50" />
            <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full bg-neon-orange/10 blur-[120px] pointer-events-none" />

            <div className="w-full lg:w-1/2 p-8 md:p-16 lg:py-24 z-10 flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
              <h2 className="font-display text-4xl md:text-5xl lg:text-5xl font-bold mb-6 tracking-tight">
                Experience Craze <br className="hidden lg:block"/>
                <span className="text-neon-orange">in Your Pocket.</span>
              </h2>
              <p className="text-cream-muted text-lg mb-10 max-w-md mx-auto lg:mx-0">
                Unlock hyper-fast delivery, AR food previews, and personalized curation. Available now on iOS and Android.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-6">
                <a href="#" onClick={(e) => { e.preventDefault(); alert("App Store download coming soon!"); }} className="flex-1 sm:flex-none bg-neon-orange hover:bg-white text-charcoal-900 rounded-2xl px-8 py-4 flex items-center justify-center transition-all duration-300 shadow-[0_0_20px_rgba(255,107,0,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]">
                  <Apple className="w-8 h-8 mr-3 shrink-0" />
                  <div className="text-left">
                    <p className="text-[11px] font-bold uppercase tracking-wider mb-0.5 leading-none opacity-80">Download on the</p>
                    <p className="font-display font-bold text-lg leading-none">App Store</p>
                  </div>
                </a>

                <a href="#" onClick={(e) => { e.preventDefault(); alert("Google Play download coming soon!"); }} className="flex-1 sm:flex-none bg-charcoal-900 hover:bg-white text-white hover:text-charcoal-900 border-2 border-white/20 hover:border-white rounded-2xl px-8 py-4 flex items-center justify-center transition-all duration-300">
                  <Play className="w-8 h-8 mr-3 shrink-0 fill-current" />
                  <div className="text-left">
                    <p className="text-[11px] font-bold uppercase tracking-wider mb-0.5 leading-none opacity-80">Get it on</p>
                    <p className="font-display font-bold text-lg leading-none">Google Play</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end items-end relative pt-12 lg:pt-0 px-8 lg:px-16 mt-8 lg:mt-0 h-full">
               {/* Phone Mockup sitting on the bottom edge */}
               <div className="relative w-[280px] lg:w-[320px] h-[500px] lg:h-[550px] bg-charcoal-900 rounded-t-[2.5rem] p-2 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] border-x border-t border-white/10 ring-1 ring-white/5 translate-y-4 group">
                  <div className="w-full h-full bg-charcoal-950 rounded-t-[2rem] overflow-hidden relative">
                    <div className="scale-90 origin-top h-[110%] w-[110%] -ml-[5%]">
                      <HeroEntryScreen />
                    </div>
                    {/* Linear gradient fade out at the bottom of the device to blend into the container edge */}
                    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-charcoal-900 via-charcoal-900/80 to-transparent z-20 pointer-events-none" />
                  </div>
               </div>
            </div>
          </div>
        </motion.section>
        )}

      </main>

      {/* Enhanced Footer */}
      <footer className="border-t border-white/5 bg-[#08080a] py-8">
        <div className="max-w-7xl mx-auto px-8 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-cream-muted">
          
          <div className="flex items-center flex-wrap justify-center md:justify-start gap-6 gap-y-4">
            {/* Contact details */}
            <div className="flex items-center space-x-6">
              <span className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-neon-orange" />
                <span>hello@crazeapp.com</span>
              </span>
              <span className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-neon-orange" />
                <span>+1 (555) 123-4567</span>
              </span>
            </div>
            
            {/* Address */}
            <div className="flex items-center space-x-2 border-l border-white/10 pl-6">
              <MapPin className="w-4 h-4 text-neon-orange" />
              <span>123 Craze Ave, NY 10013</span>
            </div>
          </div>

          <div className="flex items-center flex-wrap justify-center gap-6 gap-y-4">
            {/* Terms & Privacy */}
            <div className="flex space-x-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
            
            {/* Social media icons */}
            <div className="flex space-x-4 border-l border-white/10 pl-6">
              <a href="#" className="hover:text-neon-orange transition-colors"><Twitter className="w-4 h-4" /></a>
              <a href="#" className="hover:text-neon-orange transition-colors"><Instagram className="w-4 h-4" /></a>
              <a href="#" className="hover:text-neon-orange transition-colors"><Github className="w-4 h-4" /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
