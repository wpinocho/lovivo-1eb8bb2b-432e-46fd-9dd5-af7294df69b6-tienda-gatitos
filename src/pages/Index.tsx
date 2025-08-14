import React, { useState } from 'react';
import { CartProvider } from '../contexts/CartContext';
import Header from '../components/Header';
import KittenCard from '../components/KittenCard';
import Cart from '../components/Cart';
import KittenDetailsModal from '../components/KittenDetailsModal';
import { kittens } from '../data/kittens';
import { Kitten } from '../types/kitten';

const Index = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedKitten, setSelectedKitten] = useState<Kitten | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  console.log('Index page rendered with', kittens.length, 'kittens');

  const handleViewDetails = (kitten: Kitten) => {
    console.log('Opening details for kitten:', kitten.name);
    setSelectedKitten(kitten);
    setIsDetailsModalOpen(true);
  };

  const handleCloseDetails = () => {
    console.log('Closing kitten details modal');
    setIsDetailsModalOpen(false);
    setSelectedKitten(null);
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50">
        <Header onCartClick={() => setIsCartOpen(true)} />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Encuentra tu compañero perfecto
            </h2>
            <p className="text-gray-600">
              Descubre gatitos adorables esperando un hogar lleno de amor
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {kittens.map((kitten) => (
              <KittenCard
                key={kitten.id}
                kitten={kitten}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        </main>

        <Cart 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)} 
        />

        <KittenDetailsModal
          kitten={selectedKitten}
          isOpen={isDetailsModalOpen}
          onClose={handleCloseDetails}
        />
      </div>
    </CartProvider>
  );
};

export default Index;