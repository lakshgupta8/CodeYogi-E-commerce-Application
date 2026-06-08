import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AlertProps } from "../types";
import type { RootState } from "../store";

export interface AlertState {
  alert?: AlertProps;
  fading: boolean;
}

const initialState: AlertState = {
  alert: undefined,
  fading: false,
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showAlert(state, action: PayloadAction<{ message: string; type?: AlertProps["type"] }>) {
      state.alert = action.payload;
      state.fading = false;
    },
    setFading(state, action: PayloadAction<boolean>) {
      state.fading = action.payload;
    },
    removeAlert(state) {
      state.alert = undefined;
      state.fading = false;
    },
  },
});

export const { showAlert, setFading, removeAlert } = alertSlice.actions;

export const selectAlert = (state: RootState) => state.alert.alert;
export const selectAlertFading = (state: RootState) => state.alert.fading;

export default alertSlice.reducer;
