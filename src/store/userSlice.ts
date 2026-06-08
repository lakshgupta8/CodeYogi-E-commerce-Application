import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../types";
import type { RootState } from "../store";

export interface UserState {
  user: User | null;
  token: string | null;
  loading: boolean;
}

const initialState: UserState = {
  user: null,
  token: localStorage.getItem("token"),
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchUserRequest(state) {
      state.loading = true;
    },
    fetchUserSuccess(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.loading = false;
    },
    fetchUserFailure(state) {
      state.user = null;
      state.token = null;
      state.loading = false;
    },
    loginSuccess(state, action: PayloadAction<{ user: User; token: string }>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.loading = false;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.loading = false;
    },
  },
});

export const {
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserFailure,
  loginSuccess,
  logout,
} = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;
export const selectToken = (state: RootState) => state.user.token;
export const selectIsLoggedIn = (state: RootState) => !!state.user.token;
export const selectUserLoading = (state: RootState) => state.user.loading;

export default userSlice.reducer;
