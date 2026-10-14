"use client";

import { Modal } from "@/components/ui/Modal";
import { ProductGallery } from "@/components/product/ProductGallery";
import { PurchasePanel } from "@/components/product/PurchasePanel";
import { useShop } from "@/context/ShopContext";
import { getProductById } from "@/lib/data/products";

export function QuickView() {
  const { quickView, openQuickView } = useShop();
  const product = quickView ? getProductById(quickView) : undefined;

  return (
    <Modal open={Boolean(product)} onClose={() => openQuickView(null)} title="Vista rapida" size="lg">
      {product && (
        <div className="grid md:grid-cols-[1.1fr_1fr]">
          <ProductGallery images={product.images} name={product.name} compact />
          <div className="p-6 md:p-10">
            {/* key: riparte da zero quando si cambia prodotto */}
            <PurchasePanel key={product.id} product={product} variant="quick" />
          </div>
        </div>
      )}
    </Modal>
  );
}
