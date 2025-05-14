"use client";

import type { ProductProps } from "@/app/page";
import Autoplay from "embla-carousel-autoplay";
import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "./ui/carousel";

export default function CarrouselHeader({
	products,
}: { products: ProductProps[] }) {
	console.log(products);
	return (
		<Carousel
			className="w-full max-w-7xl"
			opts={{
				loop: true,
			}}
			plugins={[
				Autoplay({
					delay: 6000,
				}),
			]}
		>
			<CarouselContent>
				{products.map((product: ProductProps) => (
					<CarouselItem key={product.id}>
						<Card className="overflow-hidden">
							<div className="relative aspect-[16/9] overflow-hidden">
								<img
									src={product.images[0]}
									className="h-full w-full object-cover"
								/>
							</div>
							<CardHeader>
								<CardTitle className="text-2xl">{product.name}</CardTitle>
							</CardHeader>
						</Card>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	);
}
