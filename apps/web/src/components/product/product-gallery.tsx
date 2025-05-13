'use client';

import { type UseEmblaCarouselType } from 'embla-carousel-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';
import { useState, useEffect } from 'react';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [api, setApi] = useState<UseEmblaCarouselType[1]>();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!api) return;

    api.on('select', () => {
      setCurrentIndex(api.selectedScrollSnap());
    });
  }, [api]);

  const handleSelect = (index: number) => {
    api?.scrollTo(index);
  };

  return (
    <div className="relative space-y-4">
      <Carousel className="w-full" setApi={setApi} opts={{ startIndex: currentIndex }}>
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="aspect-square relative overflow-hidden rounded-lg">
                <img
                  src={image}
                  alt={`${productName} view ${index + 1}`}
                  className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => handleSelect(index)}
            className={`relative min-w-[80px] aspect-square rounded-md overflow-hidden ${
              currentIndex === index ? 'ring-2 ring-primary ring-offset-2' : 'opacity-70 hover:opacity-100 transition-opacity'
            }`}
          >
            <img
              src={image}
              alt={`${productName} thumbnail ${index + 1}`}
              className="object-cover w-full h-full"
            />
          </button>
        ))}
      </div>
    </div>
  );
}