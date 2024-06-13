import { type ReactNode, createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import type { Basket, BasketItem } from "../utils/types";
import { GETBasketURL } from "../utils/urls";
import { deleteItemFromBasket } from "../utils/api";

interface SessionContextType {
	basketId: string;
	basket: Basket;
	removeItemFrombasket: (itemId: BasketItem, basketId: string) => void;
}

export const SessionContext = createContext<SessionContextType>({
	basketId: "",
	basket: { totalPrice: 0, basketItems: [] },
	removeItemFrombasket: () => {},
});

interface SessionContextProviderProps {
	children: ReactNode;
}

export const SessionContextProvider = ({
	children,
}: SessionContextProviderProps) => {
	const [basketId, setBasketId] = useState<string>(() => {
		const storedBasketId = localStorage.getItem("basketId");
		return storedBasketId || "";
	});

	const [basket, setBasket] = useState<Basket>({
		totalPrice: 0,
		basketItems: [],
	});

	useEffect(() => {
		if (!basketId) {
			const newBasketId = uuidv4();
			localStorage.setItem("basketId", newBasketId);
			setBasketId(newBasketId);
		}
	}, [basketId]);

	useEffect(() => {
		const fetchBasket = async () => {
			console.log("Updating basket");
			await fetch(GETBasketURL(basketId), {
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
				.then((data) => {
					setBasket(data);
				})
				.catch((err) => {
					console.error(
						`Fetching [GET BASKET WITH BASKET_ID ${basketId}] failed:\n`,
						err,
					);
				});
		};
		fetchBasket();
	}, [basketId]);

	const removeItemFrombasket = async (itemId: BasketItem, basketId: string) => {
		const basketUpdated = await deleteItemFromBasket(basketId, itemId);
		setBasket(basketUpdated);
	};

	return (
		<SessionContext.Provider value={{ basketId, basket, removeItemFrombasket }}>
			{children}
		</SessionContext.Provider>
	);
};
