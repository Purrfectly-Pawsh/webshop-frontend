export interface Product {
	id: string;
	name: string;
	description: string;
	price: number;
	imageUrl: string;
	category: string;
	producer: string;
}

export interface Review {
	id: string;
	author: string;
	content: string;
	rating: number;
	title: string;
	date: string;
}
