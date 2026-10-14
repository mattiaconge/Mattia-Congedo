import type { Metadata } from "next";
import { CollectionView } from "@/components/product/CollectionView";
import { getCategory, isCategorySlug } from "@/lib/data/categories";

type Props = { searchParams: Promise<{ categoria?: string }> };

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { categoria } = await searchParams;
  const category = categoria ? getCategory(categoria) : undefined;
  return {
    title: category ? category.name : "Collezione",
    description: category?.tagline ?? "Tutta la collezione Jackie O' Padova.",
  };
}

export default async function CollectionPage({ searchParams }: Props) {
  const { categoria } = await searchParams;
  return <CollectionView initialCategory={categoria && isCategorySlug(categoria) ? categoria : "tutti"} />;
}
