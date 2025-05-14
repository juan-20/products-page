import { type NextRequest, NextResponse } from "next/server";

export async function GET(
	req: NextRequest,
	context: { params: { id: string } },
) {
	const allProducts = [
		{
			id: 1,
			name: "Camiseta Casual Moderna",
			price: 79.9,
			description:
				"Camiseta casual de algodão premium, perfeita para o dia a dia.",
			images: [
				"https://cdn.discordapp.com/attachments/1018246428369354844/1371882858389569697/c79910326d9fc45e98b39aa69ada62de.jpg?ex=6824c0f9&is=68236f79&hm=2af9b45a380d4af128c67068020acf0ac09f2cbb9f6ff220e78edf0914653c1f&",
				"https://cdn.discordapp.com/attachments/1018246428369354844/1371882858389569697/c79910326d9fc45e98b39aa69ada62de.jpg?ex=6824c0f9&is=68236f79&hm=2af9b45a380d4af128c67068020acf0ac09f2cbb9f6ff220e78edf0914653c1f&",
				"https://cdn.discordapp.com/attachments/1018246428369354844/1371882858389569697/c79910326d9fc45e98b39aa69ada62de.jpg?ex=6824c0f9&is=68236f79&hm=2af9b45a380d4af128c67068020acf0ac09f2cbb9f6ff220e78edf0914653c1f&",
				"https://cdn.discordapp.com/attachments/1018246428369354844/1371882858389569697/c79910326d9fc45e98b39aa69ada62de.jpg?ex=6824c0f9&is=68236f79&hm=2af9b45a380d4af128c67068020acf0ac09f2cbb9f6ff220e78edf0914653c1f&",
			],
			variants: {
				sizes: ["P", "M", "G", "GG"],
				colors: ["Preto", "Branco", "Azul", "Vermelho"],
			},
		},
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

	const productId = Number.parseInt(context.params.id, 10);
	const product = allProducts.find((products) => products.id === productId);

	return NextResponse.json({ product });
}
