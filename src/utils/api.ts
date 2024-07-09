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
	name: string,
	payload?: object,
) {
	const requestOptions: RequestInit = {
		method,
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
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
			console.error(
				`There was a problem with the fetch operation [${name}]:`,
				error,
			);
		});
	return response;
}


export const postItemToBasket = async (basketId: string, itemId: string) => {
	return await sendFetch(
		POSTProductToBasketURL(basketId),
		"POST",
		"",
		"POST ITEM TO BASKET",
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
		"DELETE PRODUCT FROM BASKET",
		basketItem,
	);
};

export async function postProduct(payload: Omit<Product, "id">, token: string) {
	return await sendFetch<Product>(
		POSTProductURL,
		"POST",
		token,
		"POST NEW BOOK",
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
		"POST NEW REVIEW",
		payload,
	);
}

export async function getOrders(userId: string): Promise<Order[]> {
	const response = await sendFetch<Order[]>(
		GETOrdersURL(userId),
		"GET",
		"",
		"GET ORDERS",
		undefined,
	);
	if (!response) {
		return [];
	}
	return response;
}

export const fetchBasket = (basketId: string) => {
	return fetch(GETBasketURL(basketId), {
		method: "GET",
		mode: "cors",
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((res) => {
			if (!res.ok) {
				throw new Error("Network response was not ok!");
			}
			return res.json() as Promise<Basket>;
		})
		.then((data: Basket) => {
			return data;
		})
		.catch((err) => {
			console.error(
				`Fetching [GET BASKET WITH BASKET_ID ${basketId}] failed:\n`,
				err,
			);
			throw err;
		});
};

export const updateBasket = (
	guestId: string,
	userId: string,
	token: string,
) => {
	return fetch(PUTUpdateBasketURL(guestId), {
		method: "PUT",
		mode: "cors",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ userId: userId }),
	})
		.then((res) => {
			if (!res.ok) {
				throw new Error("Network response was not ok!");
			}
			return res.json() as Promise<Basket>;
		})
		.then((data: Basket) => {
			return data;
		})
		.catch((err: Error) => {
			console.error(
				`Updating BASKET WITH BASKET_ID ${guestId} to ${userId} failed\n`,
				err,
			);
			throw err;
		});
};
