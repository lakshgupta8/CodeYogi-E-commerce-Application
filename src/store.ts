import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import userReducer from "./store/userSlice";
import cartReducer from "./store/cartSlice";
import alertReducer from "./store/alertSlice";
import productReducer from "./store/productSlice";
import { rootSaga } from "./store/rootSaga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    alert: alertReducer,
    product: productReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
