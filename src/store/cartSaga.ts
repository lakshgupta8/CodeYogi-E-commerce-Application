import { call, put, takeLatest, select, all } from "redux-saga/effects";
import { getProduct, getCart, saveCart } from "../api";
import {
  setCartItems,
  setCartItemsData,
  setLoading,
  setFetched,
  fetchCartRequest,
  addToCartRequest,
  removeFromCartRequest,
  updateCartRequest,
  selectCartItems,
  selectPendingQuantities,
  resetPendingQuantities,
  selectCartFetched,
} from "./cartSlice";
import { selectToken, selectIsLoggedIn, loginSuccess, logout, fetchUserSuccess, fetchUserFailure } from "./userSlice";
import { type Cartitems, type CartResponse, type Product } from "../types";

function* fetchCartSaga(): Generator<any, void, any> {
  const isLoggedIn: boolean = yield select(selectIsLoggedIn);
  const token: string | null = yield select(selectToken);

  if (isLoggedIn && token) {
    try {
      const response: CartResponse = yield call(getCart, token);
      yield put(setCartItems(response.cart || {}));
    } catch {
      yield put(setCartItems({}));
    }
  } else {
    try {
      const saved: string | null = yield call([localStorage, "getItem"], "cartItems");
      yield put(setCartItems(saved ? JSON.parse(saved) : {}));
    } catch {
      yield put(setCartItems({}));
    }
  }
  yield put(setFetched(true));
}

function* fetchSingleProduct(id: number, quantity: number): Generator<any, Product | null, any> {
  try {
    const product = yield call(getProduct, id);
    return { ...product, quantity };
  } catch {
    return null;
  }
}

function* fetchCartItemsDataSaga(): Generator<any, void, any> {
  const cartItems: Cartitems = yield select(selectCartItems);
  const itemIds = Object.keys(cartItems).filter((key) => cartItems[key] > 0);
  const isLoggedIn: boolean = yield select(selectIsLoggedIn);
  const fetched: boolean = yield select(selectCartFetched);

  if (itemIds.length === 0) {
    yield put(setCartItemsData([]));
    if (!fetched && isLoggedIn) {
      return;
    }
    yield put(setLoading(false));
    return;
  }

  yield put(setLoading(true));
  try {
    const results: (Product | null)[] = yield all(
      itemIds.map((id) => call(fetchSingleProduct, +id, cartItems[id]))
    );
    const fulfilled = results.filter(Boolean) as Product[];
    yield put(setCartItemsData(fulfilled));
  } catch {
    yield put(setCartItemsData([]));
  } finally {
    yield put(setLoading(false));
  }
}

function* addToCartSaga(action: ReturnType<typeof addToCartRequest>): Generator<any, void, any> {
  const { productId, count = 1 } = action.payload;
  const cartItems: Cartitems = yield select(selectCartItems);
  const isLoggedIn: boolean = yield select(selectIsLoggedIn);
  const token: string | null = yield select(selectToken);

  const current = cartItems[productId] || 0;
  const updated = { ...cartItems, [productId]: current + count };

  yield put(setCartItems(updated));

  if (isLoggedIn && token) {
    try {
      yield call(saveCart, updated, token);
      yield call([localStorage, "removeItem"], "cartItems");
    } catch {
      console.log("Error");
    }
  } else {
    yield call([localStorage, "setItem"], "cartItems", JSON.stringify(updated));
  }
}

function* removeFromCartSaga(action: ReturnType<typeof removeFromCartRequest>): Generator<any, void, any> {
  const productId = action.payload;
  const cartItems: Cartitems = yield select(selectCartItems);
  const isLoggedIn: boolean = yield select(selectIsLoggedIn);
  const token: string | null = yield select(selectToken);

  const updated = { ...cartItems, [productId]: 0 };

  yield put(setCartItems(updated));

  if (isLoggedIn && token) {
    try {
      yield call(saveCart, updated, token);
      yield call([localStorage, "removeItem"], "cartItems");
    } catch {
      console.log("Error");
    }
  } else {
    yield call([localStorage, "setItem"], "cartItems", JSON.stringify(updated));
  }
}

function* updateCartSaga(): Generator<any, void, any> {
  const pendingQuantities: Cartitems = yield select(selectPendingQuantities);
  const cartItems: Cartitems = yield select(selectCartItems);
  const isLoggedIn: boolean = yield select(selectIsLoggedIn);
  const token: string | null = yield select(selectToken);

  const hasChanges = Object.entries(pendingQuantities).some(([id, qty]) => {
    const currentQty = cartItems[id] || 0;
    return currentQty !== qty;
  });

  if (!hasChanges) {
    yield put(resetPendingQuantities());
    return;
  }

  const updatedCart = { ...cartItems };
  let changed = false;

  for (const [productId, newQty] of Object.entries(pendingQuantities)) {
    if (newQty <= 0) {
      if (productId in updatedCart) {
        delete updatedCart[productId];
        changed = true;
      }
    } else if (updatedCart[productId] !== newQty) {
      updatedCart[productId] = newQty;
      changed = true;
    }
  }

  if (changed) {
    yield put(setLoading(true));
    yield put(setCartItems(updatedCart));

    if (isLoggedIn && token) {
      try {
        yield call(saveCart, updatedCart, token);
        yield call([localStorage, "removeItem"], "cartItems");
      } catch {
        console.log("Error");
      }
    } else {
      yield call([localStorage, "setItem"], "cartItems", JSON.stringify(updatedCart));
    }
  }

  yield put(resetPendingQuantities());
}

export function* watchCart(): Generator<any, void, any> {
  yield takeLatest(fetchCartRequest.type, fetchCartSaga);
  yield takeLatest(addToCartRequest.type, addToCartSaga);
  yield takeLatest(removeFromCartRequest.type, removeFromCartSaga);
  yield takeLatest(updateCartRequest.type, updateCartSaga);
  
  yield takeLatest(
    [loginSuccess.type, logout.type, fetchUserSuccess.type, fetchUserFailure.type],
    fetchCartSaga
  );

  yield takeLatest(setCartItems.type, fetchCartItemsDataSaga);
}
