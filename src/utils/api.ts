import type { Basket, BasketItem, Order, Product, Review } from "./types";
import {
	DELETEProductFromBasketURL,
	GETOrdersURL,
	GETBasketURL,
	POSTProductToBasketURL,
	POSTProductURL,
	POSTReviewURL,
	PUTUpdateBasketURL,
} from "./urls";

function sendFetch<ResponseType>(
	url: string,
	method: "GET" | "POST" | "PUT" | "DELETE",
	token: string,
	errMsg: string,
	payload?: object,
) {
	const requestOptions: RequestInit = {
		method,
		mode: "cors",
		headers: {
			"Content-Type": "application/json",
			...(token !== "" ? { Authorization: `Bearer ${token}` } : {}),
		},
		...(method !== "GET" && payload ? { body: JSON.stringify(payload) } : {}),
	};

	const response = fetch(url, requestOptions)
		.then((response) => {
			if (response.ok) {
				return response.json() as Promise<ResponseType>;
			}
			throw new Error("Network response was not 'ok'");
		})
		.then((data) => {
			return data;
		})
		.catch((error) => {
			console.error(errMsg, error);
		});
	return response;
}

export const postItemToBasket = async (basketId: string, itemId: string) => {
	return await sendFetch(
		POSTProductToBasketURL(basketId),
		"POST",
		"",
		"Failed to execute: 'post item to basket'",
		{ productId: itemId, quantity: 1 },
	);
};

export const deleteItemFromBasket = async (
	basketId: string,
	basketItem: BasketItem,
) => {
	return await sendFetch<Basket>(
		DELETEProductFromBasketURL(basketId, basketItem.basketItemId),
		"DELETE",
		"",
		"Failed to execute: 'delete item from basket'",
		basketItem,
	);
};

export async function postProduct(payload: Omit<Product, "id">, token: string) {
	return await sendFetch<Product>(
		POSTProductURL,
		"POST",
		token,
		"Failed to execute: 'post new product'",
		payload,
	);
}

export async function postReview(
	productId: string,
	payload: Omit<Review, "id">,
	token: string,
) {
	return await sendFetch<Review>(
		POSTReviewURL(productId),
		"POST",
		token,
		"Failed to execute: 'post review'",
		payload,
	);
}

export async function getOrders(userId: string): Promise<Order[]> {
	const response = await sendFetch<Order[]>(
		GETOrdersURL(userId),
		"GET",
		"",
		"Failed to execute: 'get orders'",
		undefined,
	);
	if (!response) {
		return [];
	}
	return response;
}

export const fetchBasket = (basketId: string) => {
	return sendFetch<Basket>(
		GETBasketURL(basketId),
		"GET",
		"",
		`Fetching [GET BASKET WITH BASKET_ID ${basketId}] failed:\n`,
		undefined,
	);
};

export const updateBasket = (
	guestId: string,
	userId: string,
	token: string,
) => {
	return sendFetch(
		PUTUpdateBasketURL(guestId),
		"PUT",
		token,
		`Updating BASKET WITH BASKET_ID ${guestId} to ${userId} failed\n`,
		{ userId: userId },
	);
};
