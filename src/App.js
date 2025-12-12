import React from 'react';
import Menu from './components/Menu';
import './App.css';

function Etudiant(props) {
  return (
    <div className="etudiant-card">
      <h2>Étudiant nom: {props.nom} a pour âge: {props.age}</h2>
    </div>
  );
}

export default function App() {
  return (
    <div className="app-root">
      <Menu />
      <main className="main-content">
        <h1>Bienvenue sur MyReact</h1>
        <div className="students">
          <Etudiant nom="Rami" age={23} />
          <Etudiant nom="Karimi" age={21} />
        </div>
      </main>
    </div>
  );
}
import React from 'react';
import Menu from './components/Menu';
import './App.css';

function Etudiant(props) {
  return (
    <div className="etudiant-card">
      <h2>Étudiant nom: {props.nom} a pour âge: {props.age}</h2>
    </div>
  );
}

export default function App() {
  return (
    <div className="app-root">
      <Menu />
      <main className="main-content">
        <h1>Bienvenue sur MyReact</h1>
        <div className="students">
          <Etudiant nom="Rami" age={23} />
          <Etudiant nom="Karimi" age={21} />
        </div>
      </main>
    </div>
  );
}
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';

// --- Données du menu (facilement modifiables) ---
const menuItems = [
  { 
    title: "Projets", 
    description: "Nos réalisations récentes",
    image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2400&auto=format&fit=crop" 
  },
  { 
    title: "Agence", 
    description: "Notre histoire & culture",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2400&auto=format&fit=crop" 
  },
  { 
    title: "Services", 
    description: "Ce que nous faisons de mieux",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2400&auto=format&fit=crop" 
  },
  { 
    title: "Contact", 
    description: "Démarrons un projet ensemble",
    image: "https://images.unsplash.com/photo-1596524430615-b46476dd9963?q=80&w=2400&auto=format&fit=crop" 
  },
];

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredImage, setHoveredImage] = useState(null);

  // Variants pour l'animation du conteneur (Rideau)
  const menuVariants = {
    closed: {
      x: "100%",
      transition: { type: "spring", stiffness: 400, damping: 40 }
    },
    open: {
      x: "0%",
      transition: { type: "spring", stiffness: 400, damping: 40, staggerChildren: 0.1 }
    }
  };

  // Variants pour chaque lien (Apparition en cascade)
  const linkVariants = {
    closed: { x: 50, opacity: 0 },
    open: { x: 0, opacity: 1 }
  };

  return (
    <div className="relative">
      
      {/* 1. Bouton Flottant (Trigger) */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-8 right-8 z-50 p-4 bg-black text-white rounded-full hover:scale-110 transition-transform duration-300 mix-blend-difference"
      >
        <AnimatePresence mode='wait'>
          {isOpen ? (
            <motion.div 
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div 
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <Menu size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      {/* 2. Overlay du Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 bg-[#0f0f0f] z-40 flex flex-col justify-center items-center text-white overflow-hidden"
          >
            
            {/* Image de fond dynamique */}
            <div className="absolute inset-0 opacity-20 pointer-events-none transition-opacity duration-700">
               {hoveredImage && (
                 <motion.img 
                   key={hoveredImage}
                   initial={{ scale: 1.2, opacity: 0 }}
                   animate={{ scale: 1, opacity: 1 }}
                   transition={{ duration: 0.5 }}
                   src={hoveredImage} 
                   alt="Background preview" 
                   className="w-full h-full object-cover grayscale"
                 />
               )}
            </div>

            {/* Liste des liens */}
            <div className="relative z-10 flex flex-col gap-8 w-full max-w-4xl px-8">
              {menuItems.map((item, index) => (
                <motion.div 
                  key={index}
                  variants={linkVariants}
                  onMouseEnter={() => setHoveredImage(item.image)}
                  onMouseLeave={() => setHoveredImage(null)}
                  className="group flex items-center justify-between border-b border-gray-800 pb-4 cursor-pointer"
                >
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500 mb-1">0{index + 1}</span>
                    <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-600 transition-all duration-300">
                      {item.title}
                    </h2>
                  </div>
                  
                  <motion.div 
                    className="hidden md:flex items-center gap-2 opacity-0 group-hover:opacity-100 -translate-x-10 group-hover:translate-x-0 transition-all duration-300"
                  >
                    <span className="text-lg font-light">{item.description}</span>
                    <div className="bg-white text-black p-2 rounded-full">
                      <ArrowRight size={20} />
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Footer du menu */}
            <motion.div 
              variants={linkVariants}
              className="absolute bottom-10 left-10 text-gray-500 text-sm"
            >
              © 2025 Creative Agency. Tous droits réservés.
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// End of file: single App component