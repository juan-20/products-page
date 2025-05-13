import CarrouselHeader from "@/components/CarrouselHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Metadata } from "next";
import Link from "next/link";

export interface ProductProps {
	id: number;
	name: string;
	price: number;
	description: string;
	images: string[];
	variants: {
		sizes: string[];
		colors: string[];
	};
}

export interface ProductRecommendedProps extends Omit<ProductProps, 'description' | 'price' | 'variants'>{}

export const metadata: Metadata = {
  title: 'Mus Clothing Store',
  description: 'A clothing store for all your needs',
  keywords: ['clothing', 'store', 'fashion'],
}

async function getRecommendedProducts() {
	const res = await fetch("http://localhost:3000/product/recommended", {
		next: {
			revalidate: 60 // Revalidate every minute
		}
	});
	if (!res.ok) {
		throw new Error('Failed to fetch recommended products');
	}
	const data = await res.json();
	return data.products as ProductProps[];
}

async function getProducts() {
	const res = await fetch("http://localhost:3000/product", { 
		next: { 
			revalidate: 60 // Revalidate every minute
		} 
	});

	if (!res.ok) {
		throw new Error('Failed to fetch products');
	}

	const data = await res.json();
	return data.products as ProductProps[];
}

export default async function Home() {
	const products: ProductProps[] = await getProducts();
	const recommendedProducts: ProductProps[] = await getRecommendedProducts();

	return (
		<main>
			
			<div className="">
				<div className="flex justify-center">
						<CarrouselHeader products={recommendedProducts} />
				</div>
			</div>

			{/* Products Section */}
			<div className="container mx-auto px-4 py-12">
				<h2 className="text-3xl font-bold mb-8">Featured Products</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{products.map((product) => (
					<Link href={`/product/${product.id}`} key={product.id}>
							<Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
								{product.images.length > 0 && (
									<div className="aspect-square relative overflow-hidden">
										<img 
											src={product.images[0]}
											alt={product.name}
											className="object-cover w-full h-full hover:scale-105 transition-transform"
										/>
									</div>
								)}
								<CardHeader>
									<div className="flex justify-between items-start">
										<div>
											<CardTitle className="text-xl">{product.name}</CardTitle>
											<CardDescription className="text-lg font-semibold text-green-600">
												R$ {product.price.toFixed(2)}
											</CardDescription>
										</div>
									</div>
								</CardHeader>
								<CardContent>
									<p className="text-gray-600 mb-4">{product.description}</p>
									<div className="space-y-4">
										<div>
											<p className="font-medium mb-2">Tamanhos:</p>
											<div className="flex gap-2">
												{product.variants.sizes.map((size) => (
													<span key={size} className="px-3 py-1 border rounded hover:bg-gray-100 cursor-pointer">
														{size}
													</span>
												))}
											</div>
										</div>
										<div>
											<p className="font-medium mb-2">Cores:</p>
											<div className="flex gap-2">
												{product.variants.colors.map((color) => (
													<span key={color} className="px-3 py-1 border rounded hover:bg-gray-100 cursor-pointer">
														{color}
													</span>
												))}
											</div>
										</div>
										<button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
											Adicionar ao Carrinho
										</button>
									</div>
								</CardContent>
							</Card>
						</Link>
						))}
				</div>
			</div>
		</main>
	);
}
