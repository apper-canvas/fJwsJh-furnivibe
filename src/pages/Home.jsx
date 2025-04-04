import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronRight, 
  ChevronLeft, 
  ShoppingCart, 
  Heart, 
  Search, 
  Menu, 
  X, 
  ArrowRight, 
  Star,
  Instagram,
  Facebook,
  Twitter
} from "lucide-react";
import MainFeature from "../components/MainFeature";

// Sample data
const featuredProducts = [
  {
    id: "fp1",
    name: "Scandinavian Lounge Chair",
    description: "Minimalist design with maximum comfort. Perfect for your living room.",
    price: 599,
    salePrice: 499,
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Chairs",
    rating: 4.8,
    colors: ["#D8B78E", "#8B5A2B", "#2B5A8B"]
  },
  {
    id: "fp2",
    name: "Modern Coffee Table",
    description: "Sleek design with durable materials. The centerpiece for any living space.",
    price: 349,
    salePrice: null,
    image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Tables",
    rating: 4.6,
    colors: ["#D8B78E", "#1E3F61"]
  },
  {
    id: "fp3",
    name: "Artisan Bookshelf",
    description: "Handcrafted with sustainable materials. Perfect for displaying your collection.",
    price: 899,
    salePrice: 799,
    image: "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Storage",
    rating: 4.9,
    colors: ["#8B5A2B", "#1E3F61"]
  },
  {
    id: "fp4",
    name: "Ergonomic Office Chair",
    description: "Designed for comfort during long work hours. Adjustable features for perfect positioning.",
    price: 499,
    salePrice: null,
    image: "https://images.unsplash.com/photo-1505843490701-5c4b83b47773?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Office",
    rating: 4.7,
    colors: ["#000000", "#2B5A8B", "#8B5A2B"]
  }
];

const categories = [
  {
    id: "c1",
    name: "Living Room",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    productCount: 124
  },
  {
    id: "c2",
    name: "Bedroom",
    image: "https://images.unsplash.com/photo-1588046130717-0eb0c9a3ba15?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    productCount: 86
  },
  {
    id: "c3",
    name: "Dining",
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    productCount: 52
  },
  {
    id: "c4",
    name: "Office",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    productCount: 43
  }
];

const testimonials = [
  {
    id: "t1",
    customerName: "Sarah Johnson",
    customerLocation: "New York, NY",
    rating: 5,
    comment: "The quality of my new sofa exceeded my expectations. The customer service was also exceptional!",
    productPurchased: "Modern Sectional Sofa",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "t2",
    customerName: "Michael Chen",
    customerLocation: "San Francisco, CA",
    rating: 4,
    comment: "Beautiful craftsmanship on my dining table. It's become the centerpiece of our home.",
    productPurchased: "Walnut Dining Table",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "t3",
    customerName: "Emily Rodriguez",
    customerLocation: "Austin, TX",
    rating: 5,
    comment: "I've purchased multiple pieces from Your Furniture Shop and each one has been perfect. Their attention to detail is amazing.",
    productPurchased: "Bedroom Set",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  }
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("c1");
  const [cartCount, setCartCount] = useState(0);
  const [wishlistItems, setWishlistItems] = useState([]);

  // Handle product carousel
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === featuredProducts.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? featuredProducts.length - 1 : prev - 1));
  };

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  // Handle adding to cart
  const addToCart = (productId) => {
    setCartCount((prev) => prev + 1);
    // Show notification
    alert(`Added ${featuredProducts.find(p => p.id === productId).name} to cart!`);
  };

  // Handle wishlist toggle
  const toggleWishlist = (productId) => {
    setWishlistItems((prev) => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <div className="relative">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/90 dark:bg-surface-900/90 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <motion.a 
                href="/" 
                className="text-2xl font-heading font-bold text-primary dark:text-primary-light"
                whileHover={{ scale: 1.05 }}
              >
                Your Furniture Shop
              </motion.a>
              
              <nav className="hidden md:flex ml-10 space-x-8">
                <a href="#" className="text-surface-800 dark:text-surface-200 hover:text-primary dark:hover:text-primary-light font-medium transition-colors">Home</a>
                <a href="#shop" className="text-surface-800 dark:text-surface-200 hover:text-primary dark:hover:text-primary-light font-medium transition-colors">Shop</a>
                <a href="#collections" className="text-surface-800 dark:text-surface-200 hover:text-primary dark:hover:text-primary-light font-medium transition-colors">Collections</a>
                <a href="#about" className="text-surface-800 dark:text-surface-200 hover:text-primary dark:hover:text-primary-light font-medium transition-colors">About</a>
                <a href="#contact" className="text-surface-800 dark:text-surface-200 hover:text-primary dark:hover:text-primary-light font-medium transition-colors">Contact</a>
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              <motion.button 
                className="p-2 text-surface-700 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Search size={20} />
              </motion.button>
              
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <button className="p-2 text-surface-700 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light">
                  <ShoppingCart size={20} />
                </button>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </motion.div>
              
              <button 
                className="md:hidden p-2 text-surface-700 dark:text-surface-300"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="fixed inset-0 z-50 bg-white dark:bg-surface-900 p-4 flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25 }}
          >
            <div className="flex justify-between items-center mb-8">
              <span className="text-2xl font-heading font-bold text-primary dark:text-primary-light">Your Furniture Shop</span>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2"
              >
                <X size={24} />
              </button>
            </div>
            
            <nav className="flex flex-col space-y-6 text-lg">
              <a href="#" className="text-surface-800 dark:text-surface-200 hover:text-primary dark:hover:text-primary-light font-medium" onClick={() => setMobileMenuOpen(false)}>Home</a>
              <a href="#shop" className="text-surface-800 dark:text-surface-200 hover:text-primary dark:hover:text-primary-light font-medium" onClick={() => setMobileMenuOpen(false)}>Shop</a>
              <a href="#collections" className="text-surface-800 dark:text-surface-200 hover:text-primary dark:hover:text-primary-light font-medium" onClick={() => setMobileMenuOpen(false)}>Collections</a>
              <a href="#about" className="text-surface-800 dark:text-surface-200 hover:text-primary dark:hover:text-primary-light font-medium" onClick={() => setMobileMenuOpen(false)}>About</a>
              <a href="#contact" className="text-surface-800 dark:text-surface-200 hover:text-primary dark:hover:text-primary-light font-medium" onClick={() => setMobileMenuOpen(false)}>Contact</a>
            </nav>
            
            <div className="mt-auto pt-8 border-t border-surface-200 dark:border-surface-700">
              <div className="flex space-x-4">
                <a href="#" className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary-light">
                  <Instagram size={20} />
                </a>
                <a href="#" className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary-light">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary-light">
                  <Twitter size={20} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Hero Section */}
      <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 dark:from-primary/30 dark:to-secondary/30 mix-blend-multiply"></div>
          <img 
            src="https://images.unsplash.com/photo-1618220179428-22790b461013?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80" 
            alt="Modern living room" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <motion.h1 
              className="text-4xl md:text-6xl font-heading font-bold text-white mb-6 leading-tight text-shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Transform Your Space With Timeless Elegance
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl text-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Discover our curated collection of premium furniture that blends artisanal craftsmanship with modern design. Each piece tells a story.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <a 
                href="#shop" 
                className="btn btn-primary"
              >
                Shop Collection
                <ArrowRight size={18} className="ml-2" />
              </a>
              
              <a 
                href="#explore" 
                className="btn bg-white/20 backdrop-blur-sm text-white border-2 border-white/40 hover:bg-white/30"
              >
                Explore Designs
              </a>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section id="collections" className="py-16 md:py-24 bg-surface-50 dark:bg-surface-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl md:text-4xl font-heading font-bold text-surface-900 dark:text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Explore Our Collections
            </motion.h2>
            <motion.p 
              className="text-surface-600 dark:text-surface-300 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Discover furniture for every room, crafted with attention to detail and designed for modern living.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div 
                key={category.id}
                className={`group cursor-pointer rounded-xl overflow-hidden relative shadow-card ${activeCategory === category.id ? 'ring-2 ring-primary' : ''}`}
                onClick={() => setActiveCategory(category.id)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <h3 className="text-xl font-heading font-bold text-white mb-1">{category.name}</h3>
                  <p className="text-white/80 text-sm">{category.productCount} products</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section id="shop" className="py-16 md:py-24 bg-white dark:bg-surface-800">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <motion.h2 
                className="text-3xl md:text-4xl font-heading font-bold text-surface-900 dark:text-white mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Featured Products
              </motion.h2>
              <motion.p 
                className="text-surface-600 dark:text-surface-300 max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Our most popular pieces, loved by customers for their quality and design.
              </motion.p>
            </div>
            
            <div className="hidden md:flex space-x-2">
              <motion.button 
                onClick={prevSlide}
                className="p-3 rounded-full border border-surface-200 dark:border-surface-700 text-surface-600 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft size={20} />
              </motion.button>
              <motion.button 
                onClick={nextSlide}
                className="p-3 rounded-full border border-surface-200 dark:border-surface-700 text-surface-600 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronRight size={20} />
              </motion.button>
            </div>
          </div>
          
          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {featuredProducts.map((product) => (
                <div key={product.id} className="min-w-full md:min-w-[50%] lg:min-w-[25%] px-3">
                  <motion.div 
                    className="card h-full flex flex-col group"
                    whileHover={{ y: -5 }}
                  >
                    <div className="relative overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute top-4 right-4 z-10">
                        <motion.button 
                          className={`p-2 rounded-full ${wishlistItems.includes(product.id) ? 'bg-primary text-white' : 'bg-white/80 text-surface-600 hover:bg-primary hover:text-white'} backdrop-blur-sm transition-colors`}
                          onClick={() => toggleWishlist(product.id)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Heart size={18} fill={wishlistItems.includes(product.id) ? "currentColor" : "none"} />
                        </motion.button>
                      </div>
                      {product.salePrice && (
                        <div className="absolute top-4 left-4 bg-primary text-white text-sm font-medium px-3 py-1 rounded-full">
                          Sale
                        </div>
                      )}
                    </div>
                    
                    <div className="p-6 flex-grow flex flex-col">
                      <div className="flex items-center mb-2">
                        <span className="text-primary dark:text-primary-light text-sm font-medium">{product.category}</span>
                        <div className="ml-auto flex items-center">
                          <Star size={14} className="text-yellow-500 fill-current" />
                          <span className="text-sm text-surface-600 dark:text-surface-300 ml-1">{product.rating}</span>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-heading font-bold text-surface-900 dark:text-white mb-2">{product.name}</h3>
                      <p className="text-surface-600 dark:text-surface-400 text-sm mb-4 flex-grow">{product.description}</p>
                      
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center space-x-2">
                          {product.colors.map((color, i) => (
                            <div 
                              key={i}
                              className="w-5 h-5 rounded-full border border-surface-200 dark:border-surface-600"
                              style={{ backgroundColor: color }}
                            ></div>
                          ))}
                        </div>
                        
                        <div className="text-right">
                          {product.salePrice ? (
                            <div className="flex items-center">
                              <span className="text-surface-500 dark:text-surface-400 line-through text-sm mr-2">${product.price}</span>
                              <span className="text-lg font-bold text-primary dark:text-primary-light">${product.salePrice}</span>
                            </div>
                          ) : (
                            <span className="text-lg font-bold text-surface-900 dark:text-white">${product.price}</span>
                          )}
                        </div>
                      </div>
                      
                      <motion.button 
                        className="mt-4 w-full btn btn-primary"
                        onClick={() => addToCart(product.id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Add to Cart
                        <ShoppingCart size={16} className="ml-2" />
                      </motion.button>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center mt-8 md:hidden">
              <div className="flex space-x-2">
                {featuredProducts.map((_, index) => (
                  <button 
                    key={index}
                    className={`w-2.5 h-2.5 rounded-full ${currentSlide === index ? 'bg-primary' : 'bg-surface-300 dark:bg-surface-600'}`}
                    onClick={() => setCurrentSlide(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Main Feature Section */}
      <section id="explore" className="py-16 md:py-24 bg-surface-100 dark:bg-surface-900">
        <div className="container mx-auto px-4">
          <MainFeature />
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-white dark:bg-surface-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl md:text-4xl font-heading font-bold text-surface-900 dark:text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              What Our Customers Say
            </motion.h2>
            <motion.p 
              className="text-surface-600 dark:text-surface-300 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Real experiences from people who have transformed their spaces with our furniture.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={testimonial.id}
                className="card p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.customerName} 
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <h4 className="font-medium text-surface-900 dark:text-white">{testimonial.customerName}</h4>
                    <p className="text-sm text-surface-500 dark:text-surface-400">{testimonial.customerLocation}</p>
                  </div>
                </div>
                
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      className={i < testimonial.rating ? "text-yellow-500 fill-current" : "text-surface-300 dark:text-surface-600"} 
                    />
                  ))}
                </div>
                
                <p className="text-surface-700 dark:text-surface-300 mb-4">"{testimonial.comment}"</p>
                
                <p className="text-sm text-primary dark:text-primary-light font-medium">
                  Purchased: {testimonial.productPurchased}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="py-16 md:py-24 bg-primary dark:bg-primary-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="pattern-circles" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse">
              <circle id="pattern-circle" cx="10" cy="10" r="1.6257413380501518" fill="#000000"></circle>
            </pattern>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)"></rect>
          </svg>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2 
              className="text-3xl md:text-4xl font-heading font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Join Our Community
            </motion.h2>
            <motion.p 
              className="text-white/80 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Subscribe to our newsletter for exclusive offers, design tips, and first access to new collections.
            </motion.p>
            
            <motion.form 
              className="flex flex-col sm:flex-row gap-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              onSubmit={(e) => e.preventDefault()}
            >
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow input border-transparent focus:ring-white"
                required
              />
              <motion.button 
                type="submit" 
                className="btn bg-white text-primary hover:bg-surface-100"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Subscribe
              </motion.button>
            </motion.form>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-surface-900 text-surface-300 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-heading font-bold text-white mb-4">Your Furniture Shop</h3>
              <p className="mb-6">Transforming spaces with timeless elegance and modern design since 2010.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-surface-400 hover:text-white transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="#" className="text-surface-400 hover:text-white transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-surface-400 hover:text-white transition-colors">
                  <Twitter size={20} />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-4">Shop</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-surface-400 hover:text-white transition-colors">Living Room</a></li>
                <li><a href="#" className="text-surface-400 hover:text-white transition-colors">Bedroom</a></li>
                <li><a href="#" className="text-surface-400 hover:text-white transition-colors">Dining</a></li>
                <li><a href="#" className="text-surface-400 hover:text-white transition-colors">Office</a></li>
                <li><a href="#" className="text-surface-400 hover:text-white transition-colors">Outdoor</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-4">About</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-surface-400 hover:text-white transition-colors">Our Story</a></li>
                <li><a href="#" className="text-surface-400 hover:text-white transition-colors">Craftsmanship</a></li>
                <li><a href="#" className="text-surface-400 hover:text-white transition-colors">Sustainability</a></li>
                <li><a href="#" className="text-surface-400 hover:text-white transition-colors">Design Philosophy</a></li>
                <li><a href="#" className="text-surface-400 hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-4">Customer Service</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-surface-400 hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-surface-400 hover:text-white transition-colors">FAQs</a></li>
                <li><a href="#" className="text-surface-400 hover:text-white transition-colors">Shipping & Returns</a></li>
                <li><a href="#" className="text-surface-400 hover:text-white transition-colors">Warranty</a></li>
                <li><a href="#" className="text-surface-400 hover:text-white transition-colors">Care Instructions</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-surface-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-surface-500 text-sm">© 2023 Your Furniture Shop. All rights reserved.</p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <a href="#" className="text-surface-500 hover:text-surface-300 text-sm">Privacy Policy</a>
              <a href="#" className="text-surface-500 hover:text-surface-300 text-sm">Terms of Service</a>
              <a href="#" className="text-surface-500 hover:text-surface-300 text-sm">Accessibility</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;