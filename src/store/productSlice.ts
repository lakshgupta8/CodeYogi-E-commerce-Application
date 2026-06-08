import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../types";
import type { RootState } from "../store";

export type ProductState = {
  products: Product[];
  loading: boolean;
  error: string | null;
};

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    loadProducts(state) {
      state.loading = true;
      state.error = null;
    },
    productsLoaded(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
      state.loading = false;
    },
    loadProductsFailed(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { loadProducts, productsLoaded, loadProductsFailed } = productSlice.actions;

export const selectProducts = (state: RootState) => state.product.products;
export const selectProductsLoading = (state: RootState) => state.product.loading;
export const selectProductsError = (state: RootState) => state.product.error;

export default productSlice.reducer;
