import type {
	Address,
	Basket,
	BasketItem,
	Order,
	Product,
	Review,
	UnparsedOrder,
} from "./types";
import {
	DELETEProductFromBasketURL,
	GETOrdersURL,
	GETBasketURL,
	POSTProductToBasketURL,
	POSTProductURL,
	POSTCheckoutURL,
	POSTReviewURL,
	PUTUpdateBasketURL,
	DELETEProductURL,
} from "./urls";

function sendFetch<ResponseType>(
	url: string,
	method: "GET" | "POST" | "PUT" | "DELETE",
	token: string,
	errMsg: string,
	responseHasBody: boolean,
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
				if (responseHasBody) {
					return response.json() as Promise<ResponseType>;
				}
				return {} as Promise<ResponseType>;
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
		true,
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
		true,
		basketItem,
	);
};

export async function postProduct(payload: Omit<Product, "id">, token: string) {
	return await sendFetch<Product>(
		POSTProductURL,
		"POST",
		token,
		"Failed to execute: 'post new product'",
		true,
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
		true,
		payload,
	);
}

export async function getOrders(userId: string): Promise<Order[]> {
	let response = await sendFetch<UnparsedOrder[]>(
		GETOrdersURL(userId),
		"GET",
		"",
		"Failed to execute: 'get orders'",
		true,
		undefined,
	);

	if (!response) {
		response = [];
	}

	const parsedOrders: Order[] = [];

	for (const order of response) {
		const stringAddress = order.address;
		const jsonAddress = stringAddress.match(/{[^}]*}/)?.[0];

		if (jsonAddress) {
			const addressObject = JSON.parse(jsonAddress);

			const parsedAddress: Address = {
				city: addressObject.city,
				country: addressObject.country,
				line1: addressObject.line1,
				line2: addressObject.line2,
				postal_code: addressObject.postal_code,
				state: addressObject.state,
			};

			const parsedOrder: Order = {
				id: order.id,
				userId: order.userId,
				email: order.email,
				address: parsedAddress,
				invoiceUrl: order.invoiceUrl,
				totalCost: order.totalCost,
				products: order.products,
			};
			parsedOrders.push(parsedOrder);
		}
	}

	return parsedOrders;
}

export const fetchBasket = (basketId: string) => {
	return sendFetch<Basket>(
		GETBasketURL(basketId),
		"GET",
		"",
		`Fetching [GET BASKET WITH BASKET_ID ${basketId}] failed:\n`,
		true,
		undefined,
	);
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
		true,
		{ userId: userId },
	);
};

export async function deleteProduct(productId: string, token: string) {
	const response = await sendFetch(
		DELETEProductURL(productId),
		"DELETE",
		token,
		"Failed to execute: 'delete product'",
		false,
		undefined,
	);

	if (response) {
		return true;
	}
	return false;
}
