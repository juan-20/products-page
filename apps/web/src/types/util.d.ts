export interface ProductProps {
	id: number;
	name: string;
	price: number;
	description: string;
	images: string[];
	values: [string[], string[]];
	variants: Array<{
		id: number;
		product_id: number;
		price: number;
		sku: string | null;
		position: number;
		compare_at_price: number;
		values: string[];
		created_at: string;
		updated_at: string;
		barcode: string | null;
		image_id: number;
		weight: number;
		inventory_quantity: number;
		image_url: string;
	}>;
}
