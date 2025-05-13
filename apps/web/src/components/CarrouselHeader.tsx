'use client'

import Autoplay from 'embla-carousel-autoplay'
import React from 'react'
import { Card,  CardHeader,  CardTitle,  CardDescription } from './ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from './ui/carousel'
import type { ProductProps } from '@/app/page'


export default function CarrouselHeader({products}: {products: ProductProps[]}) {
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
								{products.map((product : ProductProps) => (
									<CarouselItem key={product.id}>
										<Card className="overflow-hidden">
											<div className="aspect-[16/9] relative overflow-hidden">
												<img 
													src={product.images[0]}
													className="object-cover w-full h-full"
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
  )
}
