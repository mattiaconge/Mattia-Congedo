import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SearchOverlay } from "@/components/layout/SearchOverlay";
import { SideMenu } from "@/components/layout/SideMenu";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { QuickView } from "@/components/product/QuickView";
import { Toaster } from "@/components/ui/Toaster";
import { ShopProvider } from "@/context/ShopContext";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Jackie O' Padova — Boutique di abbigliamento donna",
    template: "%s · Jackie O' Padova",
  },
  description:
    "Jackie O' Padova, Via Fiume 4: le ultime tendenze della moda donna ai prezzi migliori. Abiti, capi spalla, maglieria, jeans, gonne e accessori di Vicolo, Have One, Susy Mix, Kontatto, Imperial e Kaos.",
  openGraph: {
    type: "website",
    locale: "it_IT",
    siteName: "Jackie O' Padova",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={`${cormorant.variable} ${inter.variable}`}>
      <body>
        <ShopProvider>
          <a href="#contenuto" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-paper focus:p-3">
            Vai al contenuto
          </a>
          <Header />
          <main id="contenuto">{children}</main>
          <Footer />
          <SideMenu />
          <SearchOverlay />
          <CartDrawer />
          <QuickView />
          <Toaster />
          <WhatsAppFab />
        </ShopProvider>
      </body>
    </html>
  );
}
