import type { Basket, BasketItem } from "./types";
import { DELETEProductFromBasketURL, POSTProductToBasketURL, POSTCheckoutURL, POSTProductURL } from "./urls";

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
		body: JSON.stringify({userId: id, ...basket}),
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
			return data
		})
		.catch((error) => {
			console.error(
				"There was a problem with the fetch operation [POST NEW BOOK]:",
				error,
			);
		});
	return response;
}
