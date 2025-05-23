"use client";

import { getWithExpiry, setWithExpiry } from "@/lib/storage";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";


[
  [
    "P",
    "M",
    "G"
  ],
  [
    "Preto",
    "Azul"
  ]
]

interface ProductVariantsProps {
	values: [string[], string[]],
	variants: Array<{
		id: number,
		product_id: number,
		price: number,
		sku: string | null,
		position: number,
		compare_at_price: number,
		values: string[],
		created_at: string,
		updated_at: string,
		barcode: string | null,
		image_id: number,
		weight: number,
		inventory_quantity: number,
		image_url: string,
	}>,
}

interface VariantSelections {
	size: string | null,
	color: string | null,
}

const STORAGE_KEY = "product-variants";
const FIFTEEN_MINUTES = 15 * 60 * 1000; // 15 minutes in milliseconds

export default function ProductVariants({
	values,
	variants,
}: ProductVariantsProps) {
	const [selectedSize, setSelectedSize] = useState<string | null>(null);
	const [selectedColor, setSelectedColor] = useState<string | null>(null);

	const [sizes, colors] = values;

		const getSelectedVariant = () => {
		if (!selectedSize || !selectedColor) return null;
		return variants.find(variant =>
			variant.values.includes(selectedSize) && variant.values.includes(selectedColor)
		);
	};

	const isOutOfStock = () => {
		const variant = getSelectedVariant();
		return !variant || variant.inventory_quantity <= 0;
	};

	// Inital load
	useEffect(() => {
		const savedSelections = getWithExpiry<VariantSelections>(STORAGE_KEY);
		if (savedSelections) {
			setSelectedSize(savedSelections.size);
			setSelectedColor(savedSelections.color);
		}
	}, []);

	// State update when changed the storage
	useEffect(() => {
		if (selectedSize || selectedColor) {
			setWithExpiry(
				STORAGE_KEY,
				{
					size: selectedSize,
					color: selectedColor,
				},
				FIFTEEN_MINUTES,
			);
		}
	}, [selectedSize, selectedColor]);

	return (
		<div className="space-y-4">
			<div>
				<h3 className="mb-2 font-semibold text-lg">Tamanhos</h3>
				<div className="flex flex-wrap gap-2">
					{sizes.map((size) => (
						<button
							key={size}
							onClick={() => setSelectedSize(size)}
							className={`rounded-md border-2 px-4 py-2 transition-colors ${
								selectedSize === size
									? "border-green-600 text-green-600"
									: "hover:border-green-600 hover:text-green-600"
							}`}
						>
							{size}
						</button>
					))}
				</div>
			</div>

			{/* Color Selection */}
			<div>
				<h3 className="mb-2 font-semibold text-lg">Cores</h3>
				<div className="flex flex-wrap gap-2">
					{colors.map((color) => (
						<button
							key={color}
							onClick={() => setSelectedColor(color)}
							className={`rounded-md border-2 px-4 py-2 transition-colors ${
								selectedColor === color
									? "border-green-600 text-green-600"
									: "hover:border-green-600 hover:text-green-600"
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
							toast.error("Por favor, selecione um tamanho e uma cor");
							return;
						}

						const variant = getSelectedVariant();
						
						if (!variant || variant.inventory_quantity <= 0) {
							toast.error("Produto esgotado");
							return;
						}

						toast.success(
							`Adicionado ao carrinho: Tamanho ${selectedSize}, Cor ${selectedColor}`,
						);
					}}
					disabled={!selectedSize || !selectedColor || isOutOfStock()}
					className={`w-full rounded-lg py-6 font-semibold text-lg transition-colors
						${isOutOfStock() || !selectedSize || !selectedColor
							? "bg-white text-gray-400 border-2 border-gray-200 cursor-not-allowed"
							: "bg-green-600 text-white hover:bg-green-700"
						}`}
				>
					{!selectedSize || !selectedColor 
						? "Selecione as opções"
						: isOutOfStock()
							? "Produto esgotado"
							: "Adicionar ao Carrinho"
					}
				</Button>
			</div>
		</div>
	);
}
