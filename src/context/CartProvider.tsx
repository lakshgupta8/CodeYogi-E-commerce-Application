import { useState, useMemo, useCallback, useEffect, type FC, type ReactNode } from "react";
import { getProduct, saveCart, getCart } from "../api";
import { CartContext } from "./CartContext";
import { useUser } from "./UserContext";
import { type Product, type Cartitems } from "../types";

const CartProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { isLoggedIn, token }: { isLoggedIn: boolean; token: string | null } = useUser();
  const [cartItems, setCartItems] = useState<Cartitems>(() => {
    const saved = localStorage.getItem("cartItems");
    return saved && !isLoggedIn ? JSON.parse(saved) : {};
  });
  const [pendingQuantities, setPendingQuantities] = useState<Cartitems>({});
  const [cartItemsData, setCartItemsData] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [fetched, setFetched] = useState<boolean>(false);

  useEffect(() => {
    if (isLoggedIn) {
      getCart(token as string)
        .then((data) => {
          setCartItems(data.cart || {});
          setFetched(true);
        })
        .catch(() => {
          setCartItems({});
          setFetched(true);
        });
    }
  }, [isLoggedIn, token]);

  const itemIds = useMemo(
    () => Object.keys(cartItems).filter((key) => cartItems[key] > 0),
    [cartItems]
  );

  const count = useMemo(
    () => Object.values(cartItems).reduce((sum, qty) => sum + qty, 0),
    [cartItems]
  );

  useEffect(() => {
    if (itemIds.length === 0) {
      Promise.resolve().then(() => setCartItemsData([]));
      if (!fetched && isLoggedIn) {
        return;
      }
      Promise.resolve().then(() => setLoading(false));
      return;
    }

    Promise.allSettled(
      itemIds.map((id) =>
        getProduct(+id).then((product) => ({
          ...product,
          quantity: cartItems[id],
        }))
      )
    )
      .then((results) => {
        const fulfilled = results.flatMap((r) =>
          r.status === "fulfilled" ? [r.value] : []
        );
        setCartItemsData(fulfilled);
      })
      .catch(() => {
        setCartItemsData([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [itemIds, cartItems, fetched, isLoggedIn]);

  const displayCartItemsData = useMemo(() => {
    return cartItemsData.map((item) => ({
      ...item,
      quantity: pendingQuantities[item.id] ?? item.quantity,
    }));
  }, [cartItemsData, pendingQuantities]);

  const subtotal = useMemo(() => {
    return cartItemsData.reduce(
      (sum, item) => sum + item.price * (cartItems[item.id] ?? 0),
      0
    );
  }, [cartItemsData, cartItems]);

  const addToCart = useCallback(
    (productId: number, count = 1) => {
      setCartItems((prev) => {
        const current = prev[productId] || 0;
        const updated = { ...prev, [productId]: current + count };
        if (isLoggedIn) {
          saveCart(updated, token as string);
          localStorage.removeItem("cartItems");
        } else {
          localStorage.setItem("cartItems", JSON.stringify(updated));
        }
        return updated;
      });
    },
    [isLoggedIn, token]
  );

  const removeFromCart = useCallback(
    (productId: number) => {
      setCartItems((prev) => {
        const updated = { ...prev, [productId]: 0 };
        if (isLoggedIn) {
          saveCart(updated, token as string);
          localStorage.removeItem("cartItems");
        } else {
          localStorage.setItem("cartItems", JSON.stringify(updated));
        }
        return updated;
      });
      setPendingQuantities((prev) => {
        const newPending = { ...prev };
        delete newPending[productId];
        return newPending;
      });
    },
    [isLoggedIn, token]
  );

  const updateQuantity = useCallback((productId: number, newQty: number) => {
    setPendingQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(0, newQty),
    }));
  }, []);

  const updateCart = useCallback(() => {
    const hasChanges = Object.entries(pendingQuantities).some(([id, qty]) => {
      const currentQty = cartItems[id] || 0;
      return currentQty !== qty;
    });

    if (!hasChanges) {
      setPendingQuantities({});
      return;
    }

    setCartItems((prevCart) => {
      let hasChanges = false;
      const updatedCart = { ...prevCart };

      for (const [productId, newQty] of Object.entries(pendingQuantities)) {
        if (newQty <= 0) {
          if (productId in updatedCart) {
            delete updatedCart[productId];
            hasChanges = true;
          }
        } else if (updatedCart[productId] !== newQty) {
          updatedCart[productId] = newQty;
          hasChanges = true;
        }
      }

      if (hasChanges) {
        setLoading(true);
        if (isLoggedIn) {
          saveCart(updatedCart, token as string);
          localStorage.removeItem("cartItems");
        } else {
          localStorage.setItem("cartItems", JSON.stringify(updatedCart));
        }
      }

      return hasChanges ? updatedCart : prevCart;
    });
    setPendingQuantities({});
  }, [pendingQuantities, token, isLoggedIn, cartItems]);

  const getItemSubtotal = useCallback((price: number, quantity: number) => {
    return price * Number(quantity);
  }, []);

  const resetPendingQuantities = useCallback(function () {
    setPendingQuantities({});
  }, []);

  const value = useMemo(
    () => ({
      cartItemsData: displayCartItemsData,
      loading,
      count,
      subtotal,
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      updateCart,
      getItemSubtotal,
      resetPendingQuantities,
    }),
    [
      displayCartItemsData,
      loading,
      count,
      subtotal,
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      updateCart,
      getItemSubtotal,
      resetPendingQuantities,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartProvider;