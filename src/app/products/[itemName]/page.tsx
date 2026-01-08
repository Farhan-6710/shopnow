import React from "react";
import ProductDetailsPageClient from "./ProductDetailsPageClient";
import { notFound } from "next/navigation";
import { getProduct, getAllProductNames } from "@/lib/products";

// ISR: Revalidate every 5 minutes
export const revalidate = 300;

// SSG: Generate static params at build time
export async function generateStaticParams() {
  const products = await getAllProductNames();
  return products.map((p) => ({ itemName: p.name }));
}

interface ProductDetailsPageProps {
  params: Promise<{ itemName: string }>;
}

const ProductDetailsPage: React.FC<ProductDetailsPageProps> = async ({
  params,
}) => {
  const { itemName } = await params;
  const product = await getProduct(itemName);

  if (!product) {
    return notFound();
  }

  return (
    <main className="dark:bg-primaryDarkTwo">
      <div className="container mx-auto py-4">
        <section
          className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-4 px-4 lg:px-20 2xl:px-32"
          aria-labelledby="product-name"
        >
          <ProductDetailsPageClient initialItem={product} />
        </section>
      </div>
    </main>
  );
};

export default ProductDetailsPage;
