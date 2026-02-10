import ProductDetailsPageClient from "./ProductDetailsPageClient";
import { notFound } from "next/navigation";
import { getProduct, getAllProductNames } from "@/utils/products/products";

// ISR: Revalidate every 5 minutes
export const revalidate = 300;

// SSG
export async function generateStaticParams() {
  const products = await getAllProductNames();
  return products.map((p) => ({ itemName: p.name }));
}

interface ProductDetailsPageProps {
  params: { itemName: string };
}

const ProductDetailsPage = async ({
  params,
}: ProductDetailsPageProps) => {
  const product = await getProduct(params.itemName);

  if (!product) {
    notFound();
  }

  return (
    <main className="dark:bg-primaryDarkTwo">
      <div className="container mx-auto py-4">
        <section
          className="grid grid-cols-1 gap-4 px-4 lg:px-20 2xl:px-32"
          aria-labelledby="product-name"
        >
          <ProductDetailsPageClient initialItem={product} />
        </section>
      </div>
    </main>
  );
};

export default ProductDetailsPage;
