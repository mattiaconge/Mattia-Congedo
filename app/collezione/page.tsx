import type { Metadata } from "next";
import { Suspense } from "react";
import { CollectionView } from "@/components/product/CollectionView";

export const metadata: Metadata = {
  title: "Collezione",
  description: "Tutta la collezione Jackie O' Padova: abiti, capispalla, maglieria, accessori, borse e scarpe.",
};

export default function CollectionPage() {
  return (
    <Suspense>
      <CollectionView />
    </Suspense>
  );
}
