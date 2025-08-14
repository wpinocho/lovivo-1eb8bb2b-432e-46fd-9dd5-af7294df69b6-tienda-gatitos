import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem, Kitten } from '../types/kitten';
import { toast } from 'sonner';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (kitten: Kitten) => void;
  removeFromCart: (kittenId: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getCartItemsCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (kitten: Kitten) => {
    console.log('Adding kitten to cart:', kitten.name);
    setCartItems(prev => {
      const existingItem = prev.find(item => item.kitten.id === kitten.id);
      if (existingItem) {
        toast.info(`${kitten.name} ya está en tu carrito`);
        return prev;
      }
      toast.success(`${kitten.name} agregado al carrito`);
      return [...prev, { kitten, quantity: 1 }];
    });
  };

  const removeFromCart = (kittenId: number) => {
    console.log('Removing kitten from cart:', kittenId);
    setCartItems(prev => {
      const item = prev.find(item => item.kitten.id === kittenId);
      if (item) {
        toast.success(`${item.kitten.name} removido del carrito`);
      }
      return prev.filter(item => item.kitten.id !== kittenId);
    });
  };

  const clearCart = () => {
    console.log('Clearing cart');
    setCartItems([]);
    toast.success('Carrito vaciado');
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.kitten.price * item.quantity), 0);
  };

  const getCartItemsCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      clearCart,
      getTotalPrice,
      getCartItemsCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};