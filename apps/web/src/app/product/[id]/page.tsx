import type { ProductProps } from "@/app/page";
import ProductGallery from "@/components/product/product-gallery";
import ProductVariants from "@/components/product/product-variants";
import { Suspense } from "react";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: {
    id: string;
  };
}

async function getProduct(productId: string): Promise<ProductProps> {
  const res = await fetch(`http://localhost:3000/product/${productId}`, { 
    next: { 
      revalidate: 60 // Revalidate every minute
    } 
  });

  if (!res.ok) {
    if (res.status === 404) {
      notFound();
    }
    throw new Error('Failed to fetch product');
  }

  const data = await res.json();
  return data.product;
}

export async function generateStaticParams() {
  // Return an array of objects with all possible id values
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
  ];
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Gallery */}
        <Suspense fallback={<div className="aspect-square bg-gray-100 animate-pulse rounded-lg" />}>
          <ProductGallery images={product.images} productName={product.name} />
        </Suspense>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-2xl font-bold text-green-600">
              R$ {product.price.toFixed(2)}
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Descrição</h3>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            <Suspense fallback={<div className="h-40 bg-gray-100 animate-pulse rounded-lg" />}>
              <ProductVariants 
                sizes={product.variants.sizes} 
                colors={product.variants.colors} 
              />
            </Suspense>

            {/* Additional Info */}
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6L9 17L4 12"/>
                </svg>
                <span>Frete grátis para todo o Brasil</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 mt-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z"/>
                  <path d="M2 17L12 22L22 17"/>
                  <path d="M2 12L12 17L22 12"/>
                </svg>
                <span>7 dias para troca ou devolução</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}