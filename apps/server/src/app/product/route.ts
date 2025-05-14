import { NextResponse } from "next/server";

export async function GET() {
	const products = [
		{
			id: 2,
			name: "Camiseta Casual Moderna",
			price: 79.9,
			description:
				"Camiseta casual de algodão premium, perfeita para o dia a dia.",
			images: [
				"https://acdn-us.mitiendanube.com/stores/001/040/334/products/mockup-para-site-d5989384a12855cad117466468056855-640-0.png",
				"https://acdn-us.mitiendanube.com/stores/001/040/334/products/turma-retro-3-site-f6ddcb8eb07a0314ef17466468032317-640-0.png",
				"https://acdn-us.mitiendanube.com/stores/001/040/334/products/turma-retro-2-site-be8d096899c539c24f17466468023700-640-0.png",
				"https://acdn-us.mitiendanube.com/stores/001/040/334/products/tabela-de-medida-chico-40e7ed19f9f44d499817466468076199-640-0.png",
			],
			variants: {
				sizes: ["P", "M", "G", "GG"],
				colors: ["Preto", "Branco", "Azul", "Vermelho"],
			},
		},
	];

	return NextResponse.json({ products });
}
