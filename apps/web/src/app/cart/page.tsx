"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getWithExpiry } from "@/lib/storage";
import type { Metadata } from "next";
import { useEffect, useState } from "react";

interface CartInfo {
	productVariants?: {
		size: string | null;
		color: string | null;
	};
	deliveryCep?: string;
}

export const metadata: Metadata = {
	title: "Cart - Clothing Store",
	description: "A clothing store for all your needs",
	keywords: ["clothing", "store", "fashion"],
};

export default function CartPage() {
	const [cartInfo, setCartInfo] = useState<CartInfo>({});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Get all saved cart information
		const variants = getWithExpiry<{
			size: string | null;
			color: string | null;
		}>("product-variants");
		const cep = getWithExpiry<string>("delivery-cep");

		setCartInfo({
			productVariants: variants ?? undefined,
			deliveryCep: cep ?? undefined,
		});
		setLoading(false);
	}, []);

	if (loading) {
		return (
			<div className="container mx-auto px-4 py-8">
				<div className="animate-pulse space-y-4">
					<div className="h-8 w-1/4 rounded bg-gray-200"></div>
					<div className="h-32 rounded bg-gray-200"></div>
				</div>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="mb-6 font-bold text-3xl">Carrinho</h1>

			<div className="grid gap-6">
				{cartInfo.productVariants ? (
					<Card className="p-6">
						<h2 className="mb-4 font-semibold text-xl">Produto Selecionado</h2>
						<div className="space-y-2">
							<p>
								<span className="font-medium">Tamanho:</span>{" "}
								{cartInfo.productVariants.size || "Não selecionado"}
							</p>
							<p>
								<span className="font-medium">Cor:</span>{" "}
								{cartInfo.productVariants.color || "Não selecionada"}
							</p>
						</div>
					</Card>
				) : (
					<Card className="p-6 text-center text-gray-500">
						Nenhum produto selecionado
					</Card>
				)}

				<Card className="p-6">
					<h2 className="mb-4 font-semibold text-xl">Informações de Entrega</h2>
					{cartInfo.deliveryCep ? (
						<p>
							<span className="font-medium">CEP de entrega:</span>{" "}
							{cartInfo.deliveryCep}
						</p>
					) : (
						<p className="text-gray-500">Nenhum CEP informado</p>
					)}
				</Card>

				<Button
					onClick={() => (window.location.href = "/")}
					className="w-full rounded-lg bg-green-600 py-6 font-semibold text-lg text-white transition-colors hover:bg-green-700"
				>
					Continuar Comprando
				</Button>
			</div>
		</div>
	);
}
