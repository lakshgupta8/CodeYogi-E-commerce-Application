import { createContext, useContext } from "react";
import type { Product, Cartitems } from "../types";

interface CartContextType {
    cartItemsData: Product[];
    loading: boolean;
    count: number;
    subtotal: number;
    cartItems: Cartitems;
    addToCart: (productId: number, count?: number) => void;
    removeFromCart: (productId: number) => void;
    updateQuantity: (productId: number, newQty: number) => void;
    updateCart: () => void;
    getItemSubtotal: (price: number, quantity: number) => number;
    resetPendingQuantities: () => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};