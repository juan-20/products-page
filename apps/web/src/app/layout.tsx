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
	authors: [{ name: "Better-T-Stack Team" }],
	keywords: ["clothing", "store", "fashion", "next.js", "typescript"],
	openGraph: {
		title: "Mus Clothing Store",
		description: "A modern clothing store built with Next.js and TypeScript",
		url: "https://musclothing.store",
		siteName: "Mus Clothing Store",
		images: [
			{
				url: "https://musclothing.store/og-image.jpg",
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
		images: ["https://musclothing.store/og-image.jpg"],
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
