// Anteprima in file singolo: stesso layout e stessi componenti del sito Next.js,
// con le pagine scelte dal router a hash.
import { AnimatePresence, motion } from "framer-motion";
import HomePage from "@/app/page";
import NotFound from "@/app/not-found";
import SupportPage from "@/app/assistenza/page";
import WishlistPage from "@/app/wishlist/page";
import { CheckoutView } from "@/components/checkout/CheckoutView";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SearchOverlay } from "@/components/layout/SearchOverlay";
import { SideMenu } from "@/components/layout/SideMenu";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { CollectionView } from "@/components/product/CollectionView";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductDetail } from "@/components/product/ProductDetail";
import { QuickView } from "@/components/product/QuickView";
import { RecentlyViewed } from "@/components/product/RecentlyViewed";
import { Toaster } from "@/components/ui/Toaster";
import { ShopProvider } from "@/context/ShopContext";
import { getProductBySlug, getRelatedProducts } from "@/lib/data/products";
import { useRoute } from "./router";

const titles: Record<string, string> = {
  "/collezione": "Collezione",
  "/wishlist": "Wishlist",
  "/assistenza": "Assistenza",
  "/checkout": "Il tuo ordine",
};

function Page({ path }: { path: string }) {
  if (path === "/") return <HomePage />;
  if (path === "/collezione") return <CollectionView />;
  if (path === "/wishlist") return <WishlistPage />;
  if (path === "/assistenza") return <SupportPage />;
  if (path === "/checkout") return <CheckoutView />;
  if (path.startsWith("/prodotto/")) {
    const product = getProductBySlug(path.slice("/prodotto/".length));
    if (!product) return <NotFound />;
    return (
      <>
        <ProductDetail product={product} />
        <section className="mx-auto max-w-[1600px] px-4 pt-24 md:px-8 md:pt-32">
          <h2 className="mb-10 font-serif text-3xl md:text-5xl">Potrebbe piacerti anche</h2>
          <div className="grid grid-cols-2 gap-x-3 gap-y-10 md:gap-x-5 lg:grid-cols-4">
            {getRelatedProducts(product).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
        <RecentlyViewed excludeId={product.id} />
      </>
    );
  }
  return <NotFound />;
}

export function App() {
  const route = useRoute();
  const product = route.path.startsWith("/prodotto/") ? getProductBySlug(route.path.slice(10)) : undefined;
  document.title = `${product?.name ?? titles[route.path] ?? "Boutique di abbigliamento donna"} · Jackie O' Padova`;

  return (
    <ShopProvider>
      <Header />
      <AnimatePresence mode="wait">
        <motion.main
          key={route.path}
          id="contenuto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Page path={route.path} />
        </motion.main>
      </AnimatePresence>
      <Footer />
      <SideMenu />
      <SearchOverlay />
      <CartDrawer />
      <QuickView />
      <Toaster />
      <WhatsAppFab />
    </ShopProvider>
  );
}
