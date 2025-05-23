import CarrouselHeader from "@/components/CarrouselHeader";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
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

export interface ProductRecommendedProps
	extends Omit<ProductProps, "description" | "price" | "variants"> {}

export const metadata: Metadata = {
	title: "Mus Clothing Store",
	description: "A clothing store for all your needs",
	keywords: ["clothing", "store", "fashion"],
};

async function getRecommendedProducts() {
	const res = await fetch(
		"https://products-page-server.vercel.app/product/recommended",
		{
			next: {
				revalidate: 60, // Revalidate every minute
			},
		},
	);
	if (!res.ok) {
		throw new Error("Failed to fetch recommended products");
	}
	const data = await res.json();
	return data.banner as ProductProps[];
}

async function getProducts() {
	const res = await fetch("https://products-page-server.vercel.app/product", {
		next: {
			revalidate: 60, // Revalidate every minute
		},
	});

	if (!res.ok) {
		throw new Error("Failed to fetch products");
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
				<h2 className="mb-8 font-bold text-3xl">Produtos em destaque</h2>
				<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
					{products.map((product) => (
						<Link href={`/product/${product.id}`} key={product.id}>
							<Card
								key={product.id}
								className="overflow-hidden transition-shadow hover:shadow-lg"
							>
								{product.images.length > 0 && (
									<div className="relative aspect-square overflow-hidden">
										<img
											src={product.images[0]}
											alt={product.name}
											className="h-full w-full object-cover transition-transform hover:scale-105"
										/>
									</div>
								)}
								<CardHeader>
									<div className="flex items-start justify-between">
										<div>
											<CardTitle className="text-xl">{product.name}</CardTitle>
											<CardDescription className="font-semibold text-green-600 text-lg">
												R$ {product.price.toFixed(2)}
											</CardDescription>
										</div>
									</div>
								</CardHeader>
								<CardContent>
									<p className="mb-4 text-gray-600">{product.description}</p>
									<div className="space-y-4">
										<div>
											<p className="mb-2 font-medium">Tamanhos:</p>
											<div className="flex gap-2">
												{product.variants.sizes.map((size) => (
													<span
														key={size}
														className="cursor-pointer rounded border px-3 py-1 hover:bg-gray-100"
													>
														{size}
													</span>
												))}
											</div>
										</div>
										<div>
											<p className="mb-2 font-medium">Cores:</p>
											<div className="flex gap-2">
												{product.variants.colors.map((color) => (
													<span
														key={color}
														className="cursor-pointer rounded border px-3 py-1 hover:bg-gray-100"
													>
														{color}
													</span>
												))}
											</div>
										</div>
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
