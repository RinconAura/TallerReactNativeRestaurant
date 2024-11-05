import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from './Types/Types';

type CartItem = {
  product: Product;
  quantity: number;
  totalPrice: number;
};

type CartContextType = {
  items: CartItem[];
  addItem: (product: Product, quantity: number) => void;
  updateItemQuantity: (productId: number, quantity: number) => void;
  removeItem: (productId: number) => void;
  getTotalAmount: () => number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

type CartProviderProps = {
  children: ReactNode;
};

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (product: Product, quantity: number) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find(item => item.product.id === product.id);

      if (existingItem) {
        return prevItems.map(item =>
          item.product.id === product.id
            ? {
                ...item,
                quantity: item.quantity + quantity,
                totalPrice: (item.quantity + quantity) * item.product.price,
              }
            : item
        );
      } else {
        return [...prevItems, { product, quantity, totalPrice: quantity * product.price }];
      }
    });
  };

  const updateItemQuantity = (productId: number, quantity: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId.toString()
          ? { ...item, quantity, totalPrice: item.product.price * quantity }
          : item
      )
    );
  };

  const removeItem = (productId: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.product.id !== productId.toString()));
  };

  const getTotalAmount = () => {
    return items.reduce((acc, item) => acc + item.totalPrice, 0);
  };

  return (
    <CartContext.Provider value={{ items, addItem, updateItemQuantity, removeItem, getTotalAmount }}>
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
