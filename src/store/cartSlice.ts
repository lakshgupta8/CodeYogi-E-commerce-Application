import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product, Cartitems } from "../types";
import type { RootState } from "../store";

export interface CartState {
  cartItems: Cartitems;
  pendingQuantities: Cartitems;
  cartItemsData: Product[];
  loading: boolean;
  fetched: boolean;
}

const initialState: CartState = {
  cartItems: {},
  pendingQuantities: {},
  cartItemsData: [],
  loading: true,
  fetched: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItems(state, action: PayloadAction<Cartitems>) {
      state.cartItems = action.payload;
    },
    setCartItemsData(state, action: PayloadAction<Product[]>) {
      state.cartItemsData = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setFetched(state, action: PayloadAction<boolean>) {
      state.fetched = action.payload;
    },
    updateQuantity(state, action: PayloadAction<{ productId: number; newQty: number }>) {
      state.pendingQuantities[action.payload.productId] = Math.max(0, action.payload.newQty);
    },
    resetPendingQuantities(state) {
      state.pendingQuantities = {};
    },
    fetchCartRequest() {},
    fetchCartItemsDataRequest() {},
    addToCartRequest(_state, _action: PayloadAction<{ productId: number; count?: number }>) {},
    removeFromCartRequest(_state, _action: PayloadAction<number>) {},
    updateCartRequest() {},
  },
});

export const {
  setCartItems,
  setCartItemsData,
  setLoading,
  setFetched,
  updateQuantity,
  resetPendingQuantities,
  fetchCartRequest,
  fetchCartItemsDataRequest,
  addToCartRequest,
  removeFromCartRequest,
  updateCartRequest,
} = cartSlice.actions;

export const selectCartItems = (state: RootState) => state.cart.cartItems;
export const selectPendingQuantities = (state: RootState) => state.cart.pendingQuantities;
export const selectCartLoading = (state: RootState) => state.cart.loading;
export const selectCartFetched = (state: RootState) => state.cart.fetched;

export const selectCartItemsData = (state: RootState) =>
  state.cart.cartItemsData.map((item) => ({
    ...item,
    quantity: state.cart.pendingQuantities[item.id] ?? item.quantity,
  }));

export const selectCartCount = (state: RootState) =>
  Object.values(state.cart.cartItems).reduce((sum, qty) => sum + qty, 0);

export const selectCartSubtotal = (state: RootState) =>
  state.cart.cartItemsData.reduce(
    (sum, item) => sum + item.price * (state.cart.cartItems[item.id] ?? 0),
    0
  );

export default cartSlice.reducer;
