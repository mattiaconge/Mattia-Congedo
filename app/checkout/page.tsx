import type { Metadata } from "next";
import { CheckoutView } from "@/components/checkout/CheckoutView";

export const metadata: Metadata = { title: "Il tuo ordine" };

export default function CheckoutPage() {
  return <CheckoutView />;
}
