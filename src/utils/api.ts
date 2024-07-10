import type { Basket, BasketItem, Product } from "./types";
import {
	DELETEProductFromBasketURL,
	GETBasketURL,
	POSTProductToBasketURL,
	POSTCheckoutURL,
	POSTProductURL,
} from "./urls";

import { PUTUpdateBasketURL } from "./urls";

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

export const postItemToBasket = async (basketId: string, itemId: string) => {
	await fetch(POSTProductToBasketURL(basketId), {
		method: "POST",
		mode: "cors",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			productId: itemId,
			quantity: 1,
		}),
	})
		.then((res) => {
			if (!res.ok) {
				throw new Error("Network response was not ok!");
			}
			return res;
		})
		.catch((err) => {
			console.error(err);
			throw err;
		});
};

export const deleteItemFromBasket = async (
	basketId: string,
	basketItem: BasketItem,
) => {
	return await fetch(
		DELETEProductFromBasketURL(basketId, basketItem.basketItemId),
		{
			method: "DELETE",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(basketItem),
		},
	)
		.then((res) => {
			if (!res.ok) {
				throw new Error("Network response was not ok!");
			}
			return res.json() as Promise<Basket>;
		})
		.then((data) => {
			return data;
		})
		.catch((err) => {
			console.error(err);
			throw err;
		});
};

export const postCheckout = async (basket: Basket, id: string) => {
	return await fetch(POSTCheckoutURL, {
		method: "POST",
		mode: "cors",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ userId: id, ...basket }),
	})
		.then((res) => {
			if (!res.ok) {
				throw new Error("Network response was not ok!");
			}
			return res.json();
		})
		.then((data) => {
			return data;
		})
		.catch((err) => {
			console.error(err);
			throw err;
		});
};

export async function postProduct(payload: Omit<Product, "id">, token: string) {
	const response = await fetch(POSTProductURL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(payload),
	})
		.then((response) => {
			if (response.ok) {
				return response.json() as Promise<Product>;
			}
		})
		.then((data) => {
			return data;
		})
		.catch((error) => {
			console.error(
				"There was a problem with the fetch operation [POST NEW BOOK]:",
				error,
			);
		});
	return response;
}
