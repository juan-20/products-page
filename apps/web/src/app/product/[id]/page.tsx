import DeliveryCalculator from "@/components/product/delivery-calculator";
import ProductGallery from "@/components/product/product-gallery";
import ProductVariants from "@/components/product/product-variants";
import type { ProductProps } from "@/types/util";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface ProductPageProps {
	params: Promise<{
		id: string;
	}>;
}

async function getProduct(productId: string): Promise<ProductProps> {
	const res = await fetch(
		`https://empreender.nyc3.cdn.digitaloceanspaces.com/static/teste-prod-${productId}.json`,
		{
			next: {
				revalidate: 60, // Revalidate every minute
			},
		},
	);

	console.log(res);

	if (!res.ok) {
		if (res.status === 404) {
			notFound();
		}
		throw new Error("Failed to fetch product");
	}

	const data = await res.json();
	return data;
}

export async function generateMetadata({
	params,
}: ProductPageProps): Promise<Metadata> {
	const product = await getProduct((await params).id);

	return {
		title: product.name,
		description: product.description,
		keywords: ["clothing", "store", "fashion"],
		openGraph: {
			images: [product.images[0]],
		},
	};
}

export async function generateStaticParams() {
	// Return an array of objects with all possible id values
	return [{ id: "1" }, { id: "2" }];
}

export default async function ProductPage({ params }: ProductPageProps) {
	const product = await getProduct((await params).id);

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
				{/* Product Gallery */}
				<Suspense
					fallback={
						<div className="aspect-square animate-pulse rounded-lg bg-gray-100" />
					}
				>
					<ProductGallery images={product.images} productName={product.name} />
				</Suspense>

				{/* Product Info */}
				<div className="space-y-6">
					<div className="space-y-4">
						<Suspense
							fallback={
								<div className="h-40 animate-pulse rounded-lg bg-gray-100" />
							}
						>
							<ProductVariants
								values={product.values}
								variants={product.variants}
							/>
						</Suspense>

						<DeliveryCalculator />

						{/* Additional Info */}
						<div className="mt-4 rounded-lg bg-gray-50 p-4">
							<div className="flex items-center gap-2 text-gray-600">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
								>
									<path d="M20 6L9 17L4 12" />
								</svg>
								<span>Frete grátis para todo o Brasil</span>
							</div>
							<div className="mt-2 flex items-center gap-2 text-gray-600">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
								>
									<path d="M12 2L2 7L12 12L22 7L12 2Z" />
									<path d="M2 17L12 22L22 17" />
									<path d="M2 12L12 17L22 12" />
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
