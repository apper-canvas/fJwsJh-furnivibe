import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  Check, 
  X, 
  Sofa, 
  Bed, 
  Coffee, 
  Armchair, 
  ChevronDown, 
  ChevronUp,
  Maximize2,
  Minimize2,
  RotateCcw
} from "lucide-react";

// Sample room data
const roomStyles = [
  { id: "rs1", name: "Scandinavian", description: "Clean lines, light woods, and minimalist approach" },
  { id: "rs2", name: "Mid-Century Modern", description: "Retro-inspired with organic forms and functionality" },
  { id: "rs3", name: "Industrial", description: "Raw materials, exposed elements, and utilitarian appeal" },
  { id: "rs4", name: "Bohemian", description: "Eclectic mix of patterns, textures, and global influences" },
  { id: "rs5", name: "Contemporary", description: "Current trends with clean, sophisticated aesthetics" }
];

const roomTypes = [
  { id: "rt1", name: "Living Room", icon: <Sofa size={20} /> },
  { id: "rt2", name: "Bedroom", icon: <Bed size={20} /> },
  { id: "rt3", name: "Dining Room", icon: <Coffee size={20} /> },
  { id: "rt4", name: "Office", icon: <Armchair size={20} /> }
];

// Sample furniture pieces for visualization
const furniturePieces = {
  "rt1": [ // Living Room
    { 
      id: "f1", 
      name: "Modern Sectional Sofa", 
      price: 1299, 
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      position: { x: 20, y: 50 },
      scale: 1
    },
    { 
      id: "f2", 
      name: "Accent Chair", 
      price: 499, 
      image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      position: { x: 65, y: 40 },
      scale: 0.8
    },
    { 
      id: "f3", 
      name: "Coffee Table", 
      price: 349, 
      image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      position: { x: 40, y: 70 },
      scale: 0.7
    }
  ],
  "rt2": [ // Bedroom
    { 
      id: "f4", 
      name: "Platform Bed", 
      price: 899, 
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      position: { x: 50, y: 50 },
      scale: 1
    },
    { 
      id: "f5", 
      name: "Nightstand", 
      price: 249, 
      image: "https://images.unsplash.com/photo-1532372320572-cda25653a26d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      position: { x: 75, y: 50 },
      scale: 0.6
    }
  ],
  "rt3": [ // Dining Room
    { 
      id: "f6", 
      name: "Dining Table", 
      price: 799, 
      image: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      position: { x: 50, y: 50 },
      scale: 1
    },
    { 
      id: "f7", 
      name: "Dining Chair (Set of 4)", 
      price: 599, 
      image: "https://images.unsplash.com/photo-1551298370-9d3d53740c72?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      position: { x: 30, y: 70 },
      scale: 0.7
    }
  ],
  "rt4": [ // Office
    { 
      id: "f8", 
      name: "Desk", 
      price: 549, 
      image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      position: { x: 50, y: 50 },
      scale: 1
    },
    { 
      id: "f9", 
      name: "Office Chair", 
      price: 349, 
      image: "https://images.unsplash.com/photo-1505843490701-5c4b83b47773?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      position: { x: 50, y: 70 },
      scale: 0.8
    }
  ]
};

// Room background images based on style
const roomBackgrounds = {
  "rs1": {
    "rt1": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80", // Scandinavian Living Room
    "rt2": "https://images.unsplash.com/photo-1588046130717-0eb0c9a3ba15?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80", // Scandinavian Bedroom
    "rt3": "https://images.unsplash.com/photo-1532323544230-7191fd51bc1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80", // Scandinavian Dining
    "rt4": "https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"  // Scandinavian Office
  },
  "rs2": {
    "rt1": "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80", // Mid-Century Living Room
    "rt2": "https://images.unsplash.com/photo-1505693314120-0d443867891c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80", // Mid-Century Bedroom
    "rt3": "https://images.unsplash.com/photo-1615876063860-d971f6dca5dc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80", // Mid-Century Dining
    "rt4": "https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"  // Mid-Century Office
  },
  "rs3": {
    "rt1": "https://images.unsplash.com/photo-1600607687644-c7f34b5e8d97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80", // Industrial Living Room
    "rt2": "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80", // Industrial Bedroom
    "rt3": "https://images.unsplash.com/photo-1597075687490-8f673c6c17f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80", // Industrial Dining
    "rt4": "https://images.unsplash.com/photo-1593642532744-d377ab507dc8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"  // Industrial Office
  },
  "rs4": {
    "rt1": "https://images.unsplash.com/photo-1586105251261-72a756497a11?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80", // Bohemian Living Room
    "rt2": "https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80", // Bohemian Bedroom
    "rt3": "https://images.unsplash.com/photo-1615529162924-f8605388461d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80", // Bohemian Dining
    "rt4": "https://images.unsplash.com/photo-1599696848652-f0ff23bc911f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"  // Bohemian Office
  },
  "rs5": {
    "rt1": "https://images.unsplash.com/photo-1618220179428-22790b461013?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80", // Contemporary Living Room
    "rt2": "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80", // Contemporary Bedroom
    "rt3": "https://images.unsplash.com/photo-1617806118233-18e1de247200?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80", // Contemporary Dining
    "rt4": "https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"  // Contemporary Office
  }
};

const MainFeature = () => {
  const [step, setStep] = useState(1);
  const [selectedRoomStyle, setSelectedRoomStyle] = useState(null);
  const [selectedRoomType, setSelectedRoomType] = useState(null);
  const [selectedFurniture, setSelectedFurniture] = useState([]);
  const [activeFurniture, setActiveFurniture] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showStyleInfo, setShowStyleInfo] = useState(false);
  
  // Reset furniture positions when room type changes
  useEffect(() => {
    if (selectedRoomType) {
      setSelectedFurniture(furniturePieces[selectedRoomType]);
    }
  }, [selectedRoomType]);
  
  // Handle furniture drag
  const handleDrag = (id, newPosition) => {
    setSelectedFurniture(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, position: newPosition } 
          : item
      )
    );
  };
  
  // Handle furniture scale
  const handleScale = (id, scaleFactor) => {
    setSelectedFurniture(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, scale: Math.max(0.3, Math.min(1.5, item.scale * scaleFactor)) } 
          : item
      )
    );
  };
  
  // Reset furniture positions
  const resetFurniture = () => {
    if (selectedRoomType) {
      setSelectedFurniture(furniturePieces[selectedRoomType]);
    }
  };
  
  // Get current room background
  const getRoomBackground = () => {
    if (selectedRoomStyle && selectedRoomType) {
      return roomBackgrounds[selectedRoomStyle][selectedRoomType];
    }
    return null;
  };
  
  // Calculate total price of selected furniture
  const calculateTotalPrice = () => {
    return selectedFurniture.reduce((total, item) => total + item.price, 0);
  };
  
  return (
    <div className={`${isFullscreen ? 'fixed inset-0 z-50 bg-white dark:bg-surface-900 p-4' : ''}`}>
      <div className="text-center mb-12">
        <motion.h2 
          className="text-3xl md:text-4xl font-heading font-bold text-surface-900 dark:text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Design Your Space
        </motion.h2>
        <motion.p 
          className="text-surface-600 dark:text-surface-300 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Visualize how our furniture will look in your home with our interactive room designer.
        </motion.p>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left side - Room Visualizer */}
        <motion.div 
          className={`relative flex-1 rounded-xl overflow-hidden shadow-card bg-white dark:bg-surface-800 ${isFullscreen ? 'h-[calc(100vh-120px)]' : 'h-[500px]'}`}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Room background */}
          {getRoomBackground() ? (
            <div className="absolute inset-0 bg-surface-200 dark:bg-surface-700">
              <img 
                src={getRoomBackground()} 
                alt="Room background" 
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-surface-200 dark:bg-surface-700">
              <p className="text-surface-500 dark:text-surface-400 text-lg">
                {step === 1 ? "Select a room style to begin" : "Select a room type to continue"}
              </p>
            </div>
          )}
          
          {/* Draggable furniture pieces */}
          {step === 3 && selectedFurniture.map((furniture) => (
            <motion.div
              key={furniture.id}
              className={`absolute cursor-move ${activeFurniture === furniture.id ? 'ring-2 ring-primary z-20' : 'z-10'}`}
              style={{ 
                left: `${furniture.position.x}%`, 
                top: `${furniture.position.y}%`,
                transform: `translate(-50%, -50%) scale(${furniture.scale})`,
                transformOrigin: 'center'
              }}
              drag
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              dragElastic={0.1}
              dragMomentum={false}
              onDrag={(_, info) => {
                const element = info.node;
                const rect = element.getBoundingClientRect();
                const parent = element.parentElement.getBoundingClientRect();
                
                const x = ((rect.left + rect.width / 2) - parent.left) / parent.width * 100;
                const y = ((rect.top + rect.height / 2) - parent.top) / parent.height * 100;
                
                handleDrag(furniture.id, { x, y });
              }}
              onClick={() => setActiveFurniture(furniture.id)}
              whileTap={{ scale: furniture.scale * 0.95 }}
            >
              <div className="relative">
                <img 
                  src={furniture.image} 
                  alt={furniture.name} 
                  className="max-w-[200px] max-h-[200px] object-contain pointer-events-none"
                />
                
                {activeFurniture === furniture.id && (
                  <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-2 bg-white dark:bg-surface-800 rounded-full shadow-md p-1">
                    <motion.button 
                      className="p-1.5 rounded-full bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleScale(furniture.id, 1.1);
                      }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Maximize2 size={14} />
                    </motion.button>
                    <motion.button 
                      className="p-1.5 rounded-full bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleScale(furniture.id, 0.9);
                      }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Minimize2 size={14} />
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
          
          {/* Controls */}
          <div className="absolute top-4 right-4 flex space-x-2">
            <motion.button 
              className="p-2 rounded-full bg-white/80 dark:bg-surface-800/80 backdrop-blur-sm text-surface-600 dark:text-surface-300 hover:bg-white dark:hover:bg-surface-700"
              onClick={() => setIsFullscreen(!isFullscreen)}
              whileTap={{ scale: 0.95 }}
            >
              {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
            </motion.button>
            
            {step === 3 && (
              <motion.button 
                className="p-2 rounded-full bg-white/80 dark:bg-surface-800/80 backdrop-blur-sm text-surface-600 dark:text-surface-300 hover:bg-white dark:hover:bg-surface-700"
                onClick={resetFurniture}
                whileTap={{ scale: 0.95 }}
              >
                <RotateCcw size={18} />
              </motion.button>
            )}
          </div>
          
          {/* Selected style info */}
          {selectedRoomStyle && (
            <div className="absolute bottom-4 left-4">
              <motion.button
                className="p-2 rounded-full bg-white/80 dark:bg-surface-800/80 backdrop-blur-sm text-surface-600 dark:text-surface-300 hover:bg-white dark:hover:bg-surface-700"
                onClick={() => setShowStyleInfo(!showStyleInfo)}
                whileTap={{ scale: 0.95 }}
              >
                {showStyleInfo ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
              </motion.button>
              
              <AnimatePresence>
                {showStyleInfo && (
                  <motion.div 
                    className="absolute bottom-12 left-0 w-64 p-4 bg-white/90 dark:bg-surface-800/90 backdrop-blur-sm rounded-lg shadow-md"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                  >
                    <h4 className="font-medium text-surface-900 dark:text-white mb-1">
                      {roomStyles.find(style => style.id === selectedRoomStyle)?.name}
                    </h4>
                    <p className="text-sm text-surface-600 dark:text-surface-300">
                      {roomStyles.find(style => style.id === selectedRoomStyle)?.description}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
        
        {/* Right side - Controls */}
        <motion.div 
          className="w-full lg:w-96 bg-white dark:bg-surface-800 rounded-xl shadow-card overflow-hidden"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Steps indicator */}
          <div className="flex border-b border-surface-200 dark:border-surface-700">
            {[1, 2, 3].map((stepNumber) => (
              <div 
                key={stepNumber}
                className={`flex-1 py-4 text-center font-medium ${
                  step === stepNumber 
                    ? 'text-primary dark:text-primary-light border-b-2 border-primary dark:border-primary-light' 
                    : step > stepNumber 
                      ? 'text-surface-600 dark:text-surface-300' 
                      : 'text-surface-400 dark:text-surface-600'
                }`}
              >
                {stepNumber === 1 && "Style"}
                {stepNumber === 2 && "Room"}
                {stepNumber === 3 && "Arrange"}
              </div>
            ))}
          </div>
          
          <div className="p-6">
            {/* Step 1: Select Room Style */}
            {step === 1 && (
              <div>
                <h3 className="text-xl font-heading font-bold text-surface-900 dark:text-white mb-4">
                  Choose Your Style
                </h3>
                
                <div className="space-y-3">
                  {roomStyles.map((style) => (
                    <motion.div
                      key={style.id}
                      className={`p-4 rounded-lg cursor-pointer transition-all ${
                        selectedRoomStyle === style.id 
                          ? 'bg-primary/10 dark:bg-primary/20 border border-primary/30' 
                          : 'bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600'
                      }`}
                      onClick={() => setSelectedRoomStyle(style.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium text-surface-900 dark:text-white">{style.name}</h4>
                          <p className="text-sm text-surface-600 dark:text-surface-300">{style.description}</p>
                        </div>
                        
                        {selectedRoomStyle === style.id && (
                          <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white">
                            <Check size={14} />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-8 flex justify-end">
                  <motion.button 
                    className="btn btn-primary"
                    onClick={() => selectedRoomStyle && setStep(2)}
                    disabled={!selectedRoomStyle}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Continue
                    <ArrowRight size={18} className="ml-2" />
                  </motion.button>
                </div>
              </div>
            )}
            
            {/* Step 2: Select Room Type */}
            {step === 2 && (
              <div>
                <h3 className="text-xl font-heading font-bold text-surface-900 dark:text-white mb-4">
                  Select Room Type
                </h3>
                
                <div className="grid grid-cols-2 gap-3">
                  {roomTypes.map((room) => (
                    <motion.div
                      key={room.id}
                      className={`p-4 rounded-lg cursor-pointer transition-all ${
                        selectedRoomType === room.id 
                          ? 'bg-primary/10 dark:bg-primary/20 border border-primary/30' 
                          : 'bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600'
                      }`}
                      onClick={() => setSelectedRoomType(room.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex flex-col items-center text-center">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                          selectedRoomType === room.id 
                            ? 'bg-primary text-white' 
                            : 'bg-surface-200 dark:bg-surface-600 text-surface-600 dark:text-surface-300'
                        }`}>
                          {room.icon}
                        </div>
                        <h4 className="font-medium text-surface-900 dark:text-white">{room.name}</h4>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-8 flex justify-between">
                  <motion.button 
                    className="btn btn-outline"
                    onClick={() => setStep(1)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Back
                  </motion.button>
                  
                  <motion.button 
                    className="btn btn-primary"
                    onClick={() => selectedRoomType && setStep(3)}
                    disabled={!selectedRoomType}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Continue
                    <ArrowRight size={18} className="ml-2" />
                  </motion.button>
                </div>
              </div>
            )}
            
            {/* Step 3: Arrange Furniture */}
            {step === 3 && (
              <div>
                <h3 className="text-xl font-heading font-bold text-surface-900 dark:text-white mb-4">
                  Arrange Your Furniture
                </h3>
                
                <p className="text-surface-600 dark:text-surface-300 text-sm mb-4">
                  Drag items to position them. Click on an item to resize it.
                </p>
                
                <div className="space-y-3 mb-6">
                  {selectedFurniture.map((furniture) => (
                    <motion.div
                      key={furniture.id}
                      className={`p-3 rounded-lg cursor-pointer transition-all ${
                        activeFurniture === furniture.id 
                          ? 'bg-primary/10 dark:bg-primary/20 border border-primary/30' 
                          : 'bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600'
                      }`}
                      onClick={() => setActiveFurniture(furniture.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded bg-white dark:bg-surface-600 flex items-center justify-center mr-3 overflow-hidden">
                          <img 
                            src={furniture.image} 
                            alt={furniture.name} 
                            className="w-10 h-10 object-contain"
                          />
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-medium text-surface-900 dark:text-white text-sm">{furniture.name}</h4>
                          <p className="text-primary dark:text-primary-light text-sm font-medium">${furniture.price}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="p-4 rounded-lg bg-surface-100 dark:bg-surface-700 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-surface-600 dark:text-surface-300">Total Price:</span>
                    <span className="text-xl font-bold text-surface-900 dark:text-white">${calculateTotalPrice()}</span>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <motion.button 
                    className="btn btn-outline"
                    onClick={() => setStep(2)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Back
                  </motion.button>
                  
                  <motion.button 
                    className="btn btn-primary"
                    onClick={() => alert("Your design has been saved! You can now proceed to checkout.")}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Save Design
                  </motion.button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MainFeature;