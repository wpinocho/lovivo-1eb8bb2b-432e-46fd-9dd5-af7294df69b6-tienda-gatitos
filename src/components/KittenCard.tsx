import React from 'react';
import { Heart, ShoppingCart, Check, X } from 'lucide-react';
import { Kitten } from '../types/kitten';
import { useCart } from '../contexts/CartContext';

interface KittenCardProps {
  kitten: Kitten;
  onViewDetails: (kitten: Kitten) => void;
}

const KittenCard = ({ kitten, onViewDetails }: KittenCardProps) => {
  const { addToCart } = useCart();

  console.log('Rendering KittenCard for:', kitten.name);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img 
          src={kitten.image} 
          alt={kitten.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2">
          <button className="bg-white/80 hover:bg-white p-2 rounded-full transition-colors">
            <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
          </button>
        </div>
        {!kitten.available && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              No disponible
            </span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800">{kitten.name}</h3>
          <span className="text-xl font-bold text-green-600">${kitten.price}</span>
        </div>
        
        <p className="text-sm text-gray-600 mb-2">{kitten.breed} • {kitten.age}</p>
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">{kitten.description}</p>
        
        <div className="flex items-center gap-4 mb-3 text-xs">
          <div className="flex items-center gap-1">
            <span className="font-medium">Vacunado:</span>
            {kitten.vaccinated ? (
              <Check className="w-3 h-3 text-green-500" />
            ) : (
              <X className="w-3 h-3 text-red-500" />
            )}
          </div>
          <span className="text-gray-500">•</span>
          <span className="font-medium">{kitten.gender}</span>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => onViewDetails(kitten)}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-md transition-colors text-sm font-medium"
          >
            Ver detalles
          </button>
          <button
            onClick={() => addToCart(kitten)}
            disabled={!kitten.available}
            className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-2 px-4 rounded-md transition-colors text-sm font-medium"
          >
            <ShoppingCart className="w-4 h-4" />
            Adoptar
          </button>
        </div>
      </div>
    </div>
  );
};

export default KittenCard;