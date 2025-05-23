import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../index.css";
import Header from "@/components/header";
import Providers from "@/components/providers";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Mus Clothing Store",
	description: "A modern clothing store built with Next.js and TypeScript",
	keywords: ["clothing", "store", "fashion", "next.js", "typescript"],
	openGraph: {
		title: "Mus Clothing Store",
		description: "A modern clothing store built with Next.js and TypeScript",
		siteName: "Mus Clothing Store",
		images: [
			{
				url: "https://media.discordapp.net/attachments/897676728288288808/1372036042051555338/rabbit.png?ex=68254fa3&is=6823fe23&hm=e16ef4a4c0bcba0ccfa28ecbadca0a26cf179e7af2cd806ad957375d01d654b8&=&format=webp&quality=lossless",
				width: 1200,
				height: 630,
				alt: "Mus Clothing Store Preview",
			},
		],
		locale: "pt-BR",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Mus Clothing Store",
		description: "A modern clothing store built with Next.js and TypeScript",
		images: [
			"https://media.discordapp.net/attachments/897676728288288808/1372036042051555338/rabbit.png?ex=68254fa3&is=6823fe23&hm=e16ef4a4c0bcba0ccfa28ecbadca0a26cf179e7af2cd806ad957375d01d654b8&=&format=webp&quality=lossless",
		],
		creator: "@musclothing",
	},
	viewport: {
		width: "device-width",
		initialScale: 1,
		maximumScale: 1,
	},
	icons: {
		icon: "/favicon.ico",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<Providers>
					<div className="grid h-svh grid-rows-[auto_1fr]">
						<Header />
						{children}
					</div>
				</Providers>
			</body>
		</html>
	);
}
