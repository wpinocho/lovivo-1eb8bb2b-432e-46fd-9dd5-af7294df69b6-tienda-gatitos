import React from 'react';
import { X, Heart, ShoppingCart, Check, Calendar, Palette, User } from 'lucide-react';
import { Kitten } from '../types/kitten';
import { useCart } from '../contexts/CartContext';

interface KittenDetailsModalProps {
  kitten: Kitten | null;
  isOpen: boolean;
  onClose: () => void;
}

const KittenDetailsModal = ({ kitten, isOpen, onClose }: KittenDetailsModalProps) => {
  const { addToCart } = useCart();

  if (!isOpen || !kitten) return null;

  console.log('KittenDetailsModal opened for:', kitten.name);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <img
            src={kitten.image}
            alt={kitten.name}
            className="w-full h-64 object-cover rounded-t-lg"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/80 hover:bg-white p-2 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <button className="absolute top-4 left-4 bg-white/80 hover:bg-white p-2 rounded-full transition-colors">
            <Heart className="w-5 h-5 text-gray-600 hover:text-red-500" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{kitten.name}</h2>
              <p className="text-lg text-gray-600">{kitten.breed}</p>
            </div>
            <div className="text-right">
              <span className="text-3xl font-bold text-green-600">${kitten.price}</span>
              <p className="text-sm text-gray-500">Precio de adopción</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
              <Calendar className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-xs text-gray-500">Edad</p>
                <p className="font-medium">{kitten.age}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
              <User className="w-5 h-5 text-purple-500" />
              <div>
                <p className="text-xs text-gray-500">Género</p>
                <p className="font-medium">{kitten.gender}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
              <Palette className="w-5 h-5 text-orange-500" />
              <div>
                <p className="text-xs text-gray-500">Color</p>
                <p className="font-medium">{kitten.color}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
              <Check className={`w-5 h-5 ${kitten.vaccinated ? 'text-green-500' : 'text-red-500'}`} />
              <div>
                <p className="text-xs text-gray-500">Vacunado</p>
                <p className="font-medium">{kitten.vaccinated ? 'Sí' : 'No'}</p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Descripción</h3>
            <p className="text-gray-600 leading-relaxed">{kitten.description}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Información adicional</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Perfecto para familias con niños</li>
              <li>• Se lleva bien con otros animales</li>
              <li>• Incluye certificado de salud</li>
              <li>• Primera consulta veterinaria gratuita</li>
            </ul>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-medium transition-colors"
            >
              Cerrar
            </button>
            <button
              onClick={() => {
                addToCart(kitten);
                onClose();
              }}
              disabled={!kitten.available}
              className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              {kitten.available ? 'Adoptar ahora' : 'No disponible'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KittenDetailsModal;