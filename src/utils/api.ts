import { Basket, BasketItem } from "./types";
import {
	DELETEProductFromBasketURL,
	GETBasketURL,
	POSTProductToBasketURL,
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
