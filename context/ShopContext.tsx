"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartItem } from "@/lib/types";
import { getProductById } from "@/lib/data/products";

type Panel = "menu" | "search" | "cart" | null;

interface ShopContextValue {
  cart: CartItem[];
  wishlist: string[];
  cartCount: number;
  cartTotal: number;
  addToCart: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  removeFromCart: (productId: string, size: string) => void;
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  panel: Panel;
  openPanel: (panel: Exclude<Panel, null>) => void;
  closePanel: () => void;
}

const ShopContext = createContext<ShopContextValue | null>(null);

const CART_KEY = "jackieo:cart";
const WISHLIST_KEY = "jackieo:wishlist";

function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage non disponibile (navigazione privata, quota piena): si ignora
  }
}

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [panel, setPanel] = useState<Panel>(null);

  useEffect(() => {
    setCart(readStorage<CartItem[]>(CART_KEY, []).filter((i) => getProductById(i.productId)));
    setWishlist(readStorage<string[]>(WISHLIST_KEY, []).filter((id) => getProductById(id)));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) writeStorage(CART_KEY, cart);
  }, [cart, hydrated]);

  useEffect(() => {
    if (hydrated) writeStorage(WISHLIST_KEY, wishlist);
  }, [wishlist, hydrated]);

  // Blocca lo scroll della pagina quando un pannello è aperto
  useEffect(() => {
    document.body.style.overflow = panel ? "hidden" : "";
    if (!panel) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setPanel(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [panel]);

  const addToCart = useCallback((productId: string, size: string) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.productId === productId && i.size === size);
      if (existing) {
        return prev.map((i) => (i === existing ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { productId, size, quantity: 1 }];
    });
    setPanel("cart");
  }, []);

  const removeFromCart = useCallback((productId: string, size: string) => {
    setCart((prev) => prev.filter((i) => !(i.productId === productId && i.size === size)));
  }, []);

  const updateQuantity = useCallback((productId: string, size: string, quantity: number) => {
    setCart((prev) =>
      quantity <= 0
        ? prev.filter((i) => !(i.productId === productId && i.size === size))
        : prev.map((i) =>
            i.productId === productId && i.size === size ? { ...i, quantity } : i,
          ),
    );
  }, []);

  const toggleWishlist = useCallback((productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    );
  }, []);

  const value = useMemo<ShopContextValue>(() => {
    const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);
    const cartTotal = cart.reduce(
      (sum, i) => sum + (getProductById(i.productId)?.price ?? 0) * i.quantity,
      0,
    );
    return {
      cart,
      wishlist,
      cartCount,
      cartTotal,
      addToCart,
      updateQuantity,
      removeFromCart,
      toggleWishlist,
      isWishlisted: (id) => wishlist.includes(id),
      panel,
      openPanel: setPanel,
      closePanel: () => setPanel(null),
    };
  }, [cart, wishlist, panel, addToCart, updateQuantity, removeFromCart, toggleWishlist]);

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop deve essere usato dentro <ShopProvider>");
  return ctx;
}
