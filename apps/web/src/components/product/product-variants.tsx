'use client';

import { useState } from 'react';
import { Button } from '../ui/button';

interface ProductVariantsProps {
  sizes: string[];
  colors: string[];
}

export default function ProductVariants({ sizes, colors }: ProductVariantsProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      {/* Size Selection */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Tamanhos</h3>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`px-4 py-2 border-2 rounded-md transition-colors ${
                selectedSize === size 
                  ? 'border-green-600 text-green-600' 
                  : 'hover:border-green-600 hover:text-green-600'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Color Selection */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Cores</h3>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`px-4 py-2 border-2 rounded-md transition-colors ${
                selectedColor === color 
                  ? 'border-green-600 text-green-600' 
                  : 'hover:border-green-600 hover:text-green-600'
              }`}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      {/* Add to Cart */}
      <div className="pt-6">
        <Button 
          onClick={() => {
            if (!selectedSize || !selectedColor) {
              alert('Por favor, selecione um tamanho e uma cor');
              return;
            }
            // TODO: Add to cart logic
            alert(`Adicionado ao carrinho: Tamanho ${selectedSize}, Cor ${selectedColor}`);
          }}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg font-semibold rounded-lg transition-colors"
        >
          Adicionar ao Carrinho
        </Button>
      </div>
    </div>
  );
}