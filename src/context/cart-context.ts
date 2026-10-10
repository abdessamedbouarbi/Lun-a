import { createContext } from 'react';
import type { Product, CartItem } from '@/types';

export interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CART_STORAGE_KEY = 'lunea-cart';
