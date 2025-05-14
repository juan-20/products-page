"use client";

import { getWithExpiry, setWithExpiry } from "@/lib/storage";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

interface ProductVariantsProps {
	sizes: string[];
	colors: string[];
}

interface VariantSelections {
	size: string | null;
	color: string | null;
}

const STORAGE_KEY = "product-variants";
const FIFTEEN_MINUTES = 15 * 60 * 1000; // 15 minutes in milliseconds

export default function ProductVariants({
	sizes,
	colors,
}: ProductVariantsProps) {
	const [selectedSize, setSelectedSize] = useState<string | null>(null);
	const [selectedColor, setSelectedColor] = useState<string | null>(null);

	// Load saved selections on component mount
	useEffect(() => {
		const savedSelections = getWithExpiry<VariantSelections>(STORAGE_KEY);
		if (savedSelections) {
			setSelectedSize(savedSelections.size);
			setSelectedColor(savedSelections.color);
		}
	}, []);

	// Save selections whenever they change
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
						toast.success(
							`Adicionado ao carrinho: Tamanho ${selectedSize}, Cor ${selectedColor}`,
						);
					}}
					className="w-full rounded-lg bg-green-600 py-6 font-semibold text-lg text-white transition-colors hover:bg-green-700"
				>
					Adicionar ao Carrinho
				</Button>
			</div>
		</div>
	);
}
