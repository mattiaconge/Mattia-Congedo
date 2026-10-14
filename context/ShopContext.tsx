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

type Panel = "menu" | "search" | "cart" | "filters" | null;

export interface Toast {
  id: number;
  message: string;
  productId?: string;
}

interface ShopContextValue {
  cart: CartItem[];
  wishlist: string[];
  cartCount: number;
  cartTotal: number;
  /** openCart=false: mostra solo una notifica senza aprire la bag */
  addToCart: (productId: string, size: string, openCart?: boolean) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  removeFromCart: (productId: string, size: string) => void;
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  panel: Panel;
  openPanel: (panel: Exclude<Panel, null>) => void;
  closePanel: () => void;
  quickView: string | null;
  openQuickView: (productId: string | null) => void;
  toasts: Toast[];
  notify: (message: string, productId?: string) => void;
  recentlyViewed: string[];
  markViewed: (productId: string) => void;
  clearCart: () => void;
}

const ShopContext = createContext<ShopContextValue | null>(null);

const CART_KEY = "jackieo:cart";
const WISHLIST_KEY = "jackieo:wishlist";
const RECENT_KEY = "jackieo:recent";

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
  const [quickView, setQuickView] = useState<string | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);

  useEffect(() => {
    setCart(readStorage<CartItem[]>(CART_KEY, []).filter((i) => getProductById(i.productId)));
    setWishlist(readStorage<string[]>(WISHLIST_KEY, []).filter((id) => getProductById(id)));
    setRecentlyViewed(readStorage<string[]>(RECENT_KEY, []).filter((id) => getProductById(id)));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) writeStorage(RECENT_KEY, recentlyViewed);
  }, [recentlyViewed, hydrated]);

  useEffect(() => {
    if (hydrated) writeStorage(CART_KEY, cart);
  }, [cart, hydrated]);

  useEffect(() => {
    if (hydrated) writeStorage(WISHLIST_KEY, wishlist);
  }, [wishlist, hydrated]);

  // Blocca lo scroll della pagina quando un pannello o la vista rapida sono aperti
  const overlayOpen = Boolean(panel || quickView);
  useEffect(() => {
    document.body.style.overflow = overlayOpen ? "hidden" : "";
    if (!overlayOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setPanel(null);
      setQuickView(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [overlayOpen]);

  const notify = useCallback((message: string, productId?: string) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev.slice(-2), { id, message, productId }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3200);
  }, []);

  const markViewed = useCallback((productId: string) => {
    setRecentlyViewed((prev) => [productId, ...prev.filter((id) => id !== productId)].slice(0, 8));
  }, []);

  const addToCart = useCallback((productId: string, size: string, openCart = true) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.productId === productId && i.size === size);
      if (existing) {
        return prev.map((i) => (i === existing ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { productId, size, quantity: 1 }];
    });
    setQuickView(null);
    if (openCart) setPanel("cart");
    else notify(`Aggiunto alla bag · taglia ${size}`, productId);
  }, [notify]);

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
    const removing = wishlist.includes(productId);
    notify(removing ? "Rimosso dalla wishlist" : "Salvato nella wishlist", productId);
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    );
  }, [wishlist, notify]);

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
      quickView,
      openQuickView: setQuickView,
      toasts,
      notify,
      recentlyViewed,
      markViewed,
      clearCart: () => setCart([]),
    };
  }, [cart, wishlist, panel, quickView, toasts, recentlyViewed, addToCart, updateQuantity, removeFromCart, toggleWishlist, notify, markViewed]);

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop deve essere usato dentro <ShopProvider>");
  return ctx;
}
