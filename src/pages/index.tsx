"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Beer, UtensilsCrossed, Sandwich, X, Pizza, Search } from 'lucide-react';

type MenuItem = {
  name: string;
  description: string;
  price: string;
  image?: string;
  featured?: boolean;
};

const menuData = {
  bebidas: [
    {
      name: "Caipirinha",
      description: "Limão, cachaça e açúcar",
      price: "Kz 2.433,00",
      featured: true,
      image: "" // Added empty string for type safety
    },
    {
      name: "Cerveja",
      description: "Brahma 600ml",
      price: "Kz 1.946,40",
      image: "" // Added empty string for type safety
    },
    {
      name: "Mojito",
      description: "Rum, hortelã, limão e água com gás",
      price: "Kz 2.919,60",
      image: "" // Added empty string for type safety
    }
  ],
  pratos: [
    {
      name: "Costela no Bafo",
      description: "Costela assada lentamente, acompanha arroz e farofa",
      price: "Kz 14.579,78",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=60",
      featured: true
    },
    {
      name: "Picanha Grelhada",
      description: "Picanha grelhada no ponto, acompanha batatas",
      price: "Kz 16.198,78",
      image: "https://images.unsplash.com/photo-1594041680534-e8c8cdebd659?w=800&auto=format&fit=crop&q=60",
      featured: true
    },
    {
      name: "Feijoada Completa",
      description: "Feijoada tradicional com acompanhamentos",
      price: "Kz 12.306,18",
      image: "https://images.unsplash.com/photo-1574343635105-4cf2ea136b8b?w=800&auto=format&fit=crop&q=60",
      featured: true
    }
  ],
  fastfoods: [
    {
      name: "Hambúrguer Artesanal",
      description: "Pão brioche, blend 180g, queijo cheddar, bacon e molho especial",
      price: "Kz 5.336,38",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=60",
      featured: true
    },
    {
      name: "Pizza Margherita",
      description: "Molho de tomate, mussarela, manjericão fresco",
      price: "Kz 7.446,18",
      image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=800&auto=format&fit=crop&q=60",
      featured: true
    },
    {
      name: "Hot Dog Especial",
      description: "Salsicha artesanal, molhos especiais, batata palha",
      price: "Kz 4.200,18",
      image: "https://images.unsplash.com/photo-1627054248949-21f77275a15f?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
  ],
  adicionais: [
    {
      name: "Farofa Especial",
      description: "Farofa da casa com bacon e temperos",
      price: "Kz 1.297,60",
      image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&auto=format&fit=crop&q=60"
    },
    {
      name: "Arroz Extra",
      description: "Porção adicional de arroz branco",
      price: "Kz 973,20",
      image: "https://images.unsplash.com/photo-1516684732162-798a0062be99?w=800&auto=format&fit=crop&q=60"
    },
    {
      name: "Batatas Rústicas",
      description: "Batatas temperadas e crocantes",
      price: "Kz 1.946,40",
      image: "https://images.unsplash.com/photo-1623238913973-21e45cced554?w=800&auto=format&fit=crop&q=60"
    },
    {
      name: "Legumes Grelhados",
      description: "Mix de legumes frescos grelhados",
      price: "Kz 2.433,00",
      image: "https://images.unsplash.com/photo-1580013759032-c96505e24c1f?w=800&auto=format&fit=crop&q=60"
    },
    {
      name: "Molho da Casa",
      description: "Molho especial do chef",
      price: "Kz 811,00",
      image: "https://images.unsplash.com/photo-1472476443507-c7a5948772fc?w=800&auto=format&fit=crop&q=60"
    }
  ]
};


function SearchBar({ onSearch }: { onSearch: (query: string) => void }) {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2.3 }}
      className="relative mx-4 mb-6"
    >
      <div className="relative">
        <input
          type="text"
          placeholder="Buscar no cardápio..."
          onChange={(e) => onSearch(e.target.value)}
          className="w-full px-4 py-3 pl-12 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60" size={20} />
      </div>
    </motion.div>
  );
}

function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#de4209] to-[#fdaf17]"
    >
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 360],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="w-80 h-80"
      >
        <Image
          src="/Logo.png"
          alt="Logo"
          width={600}
          height={600}
        />
      </motion.div>
    </motion.div>
  );
}

function SmokeEffect() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="smoke-particle"></div>
      <div className="smoke-particle"></div>
      <div className="smoke-particle"></div>
    </div>
  );
}

function ItemModal({ item, onClose }: { item: MenuItem | null; onClose: () => void }) {
  if (!item) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative max-w-md w-full bg-gradient-to-br from-white/90 to-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6"
          onClick={e => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
          
          {item.image && (
            <div className="relative h-48 -mt-6 -mx-6 mb-4 rounded-t-2xl overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
          )}
          
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{item.name}</h2>
          <p className="text-gray-600 mb-4">{item.description}</p>
          
          <motion.div 
            className="flex items-center bg-orange-500 rounded-lg p-3 px-24"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-self-center gap-2">
              <span className="flex text-white font-bold text-xl">{item.price}</span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function FeaturedDishes({ onItemClick }: { onItemClick: (item: MenuItem) => void }) {
  const featuredItems = [
    ...menuData.pratos.filter(item => item.featured),
    ...menuData.fastfoods.filter(item => item.featured),
    ...menuData.bebidas.filter(item => item.featured),
  ];

  return (
    <div className="py-8 px-4 overflow-hidden">
      <motion.h2
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 2.1 }}
        className="text-2xl font-bold text-white mb-6 text-center"
      >
        Destaques / Mais Pedidos
      </motion.h2>
      
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 2.1 }}
        className="flex gap-4 overflow-x-auto pb-4 snap-x"
      >
        {featuredItems.map((item, index) => (
          <motion.div
            key={item.name}
            className="flex-none w-72 snap-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2 + index * 0.1 }}
            onClick={() => onItemClick(item)}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glass-effect rounded-xl overflow-hidden cursor-pointer h-full"
            >
              {item.image && (
                <div className="relative h-48">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
              )}
              <div className="p-4">
                <h3 className="text-lg font-bold text-white mb-2">{item.name}</h3>
                <p className="text-white/80 text-sm mb-3">{item.description}</p>
                <div className="flex items-center gap-2 bg-orange-500 w-fit px-3 py-1 rounded-full">
                  <span className="text-white font-bold">{item.price}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

function MenuSection({ items, onItemClick }: {
  title: string;
  items: MenuItem[];
  icon: React.ReactNode;
  isActive: boolean;
  onItemClick: (item: MenuItem) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="relative"
    >
      <SmokeEffect />
      <div className="grid gap-4">
        {items.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="glass-effect rounded-xl p-4 shadow-lg relative overflow-hidden cursor-pointer group"
            onClick={() => onItemClick(item)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {item.image && (
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover rounded-lg mb-3 transition-transform group-hover:scale-105"
              />
            )}
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">{item.name}</h3>
                <p className="text-white/80 mt-1">{item.description}</p>
              </div>
              <div 
                className="bg-orange-500 px-3 py-1 rounded-full"
              >
                <p className="text-white font-bold text-sm">{item.price}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState('pratos');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const tabs = [
    { id: 'pratos', title: 'Pratos', icon: <UtensilsCrossed size={20} /> },
    { id: 'fastfoods', title: 'Fast Food', icon: <Pizza size={20} /> },
    { id: 'bebidas', title: 'Bebidas', icon: <Beer size={20} /> },
    { id: 'adicionais', title: 'Adicionais', icon: <Sandwich size={20} /> },
  ];

  const filterItems = (items: MenuItem[]) => {
    if (!searchQuery) return items;
    const query = searchQuery.toLowerCase();
    return items.filter(item => 
      item.name.toLowerCase().includes(query) || 
      item.description.toLowerCase().includes(query)
    ).map(item => ({
      ...item,
      description: item.description.length > 50 
        ? `${item.description.slice(0, 50)}...` 
        : item.description
    }));
  };

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen />}
      </AnimatePresence>

      <div className="menu-background" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="min-h-screen pb-8"
      >
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center py-2 relative"
        >
          <SmokeEffect />
          <div className="flex justify-center">
            <Image
              src="/Logo.png"
              alt="Logo"
              width={150}
              height={150}
            />
          </div>
          <p className="text-white mt-2">Restaurante • Lounge • Bar</p>
        </motion.div>

        <SearchBar onSearch={setSearchQuery} />

        <FeaturedDishes onItemClick={setSelectedItem} />

        <div className="max-w-md mx-auto px-4">
          <motion.div 
            className="sticky top-4 z-30 mb-6 glass-effect rounded-full p-1.5 shadow-lg border border-white/20 overflow-x-auto"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 2.2 }}
          >
            <div className="flex justify-around min-w-max">
              {tabs.map(tab => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-full transition-all whitespace-nowrap ${
                    activeTab === tab.id 
                      ? 'bg-orange-500 text-white shadow-md' 
                      : 'text-white hover:text-orange-500'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tab.icon}
                  <span className="font-medium">{tab.title}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            {activeTab === 'pratos' && (
              <MenuSection
                key="pratos"
                title="Pratos"
                items={filterItems(menuData.pratos)}
                icon={<UtensilsCrossed />}
                isActive={activeTab === 'pratos'}
                onItemClick={setSelectedItem}
              />
            )}
            {activeTab === 'fastfoods' && (
              <MenuSection
                key="fastfoods"
                title="Fast Foods"
                items={filterItems(menuData.fastfoods)}
                icon={<Pizza />}
                isActive={activeTab === 'fastfoods'}
                onItemClick={setSelectedItem}
              />
            )}
            {activeTab === 'bebidas' && (
              <MenuSection
                key="bebidas"
                title="Bebidas"
                items={filterItems(menuData.bebidas)}
                icon={<Beer />}
                isActive={activeTab === 'bebidas'}
                onItemClick={setSelectedItem}
              />
            )}
            {activeTab === 'adicionais' && (
              <MenuSection
                key="adicionais"
                title="Adicionais"
                items={filterItems(menuData.adicionais)}
                icon={<Sandwich />}
                isActive={activeTab === 'adicionais'}
                onItemClick={setSelectedItem}
              />
            )}
          </AnimatePresence>
        </div>

        <ItemModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      </motion.div>
    </>
  );
}

export default App;