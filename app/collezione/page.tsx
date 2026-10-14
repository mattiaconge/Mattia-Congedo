import type { Metadata } from "next";
import { Suspense } from "react";
import { CollectionView } from "@/components/product/CollectionView";

export const metadata: Metadata = {
  title: "Collezione",
  description: "Tutta la collezione Jackie O' Padova: abiti e tute, capi spalla, giacche, tailleur, maglieria, jeans, gonne e accessori.",
};

export default function CollectionPage() {
  return (
    <Suspense>
      <CollectionView />
    </Suspense>
  );
}
