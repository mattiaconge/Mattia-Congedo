import { BoutiqueSection } from "@/components/home/BoutiqueSection";
import { CategoryShowcase } from "@/components/home/CategoryShowcase";
import { Hero } from "@/components/home/Hero";
import { NewArrivals } from "@/components/home/NewArrivals";
import { TrendEditorial } from "@/components/home/TrendEditorial";

export default function HomePage() {
  return (
    <>
      <Hero />
      <NewArrivals />
      <CategoryShowcase />
      <TrendEditorial />
      <BoutiqueSection />
    </>
  );
}
