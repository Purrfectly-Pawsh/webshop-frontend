export interface Product {
	id: string;
	name: string;
	description: string;
	price: number;
	imageUrl: string;
	category: string;
	producer: string;
}

export interface Basket {
	basketItems: BasketItem[];
	totalPrice: number;
}

export interface BasketItem {
	basketItemId: string;
	name: string;
	unitPrice: number;
	quantity: number;
	imageUrl: string;
}

export interface Review {
	id: string;
	author: string;
	content: string;
	rating: number;
	title: string;
	date: string;
}

export interface OrderProduct {
	id: string;
	description: string;
	quantity: number;
	price: number;
}

export interface Order {
	id: string;
	userId: string;
	email: string;
	address: string;
	invoiceUrl: string;
	totalCost: string;
	products: OrderProduct[];
}

export const Categories = ["DOG", "CAT", "BIRD"];
