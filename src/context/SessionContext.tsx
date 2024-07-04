import { jwtDecode } from "jwt-decode";
import { type ReactNode, createContext, useState, useEffect } from "react";
import { useAuth } from "react-oidc-context";
import { v4 as uuidv4 } from "uuid";
import type { Basket, BasketItem } from "../utils/types";
import { GETBasketURL } from "../utils/urls";
import { deleteItemFromBasket } from "../utils/api";

interface SessionContextType {
	basketId: string;
	basket: Basket;
	removeItemFrombasket: (itemId: BasketItem, basketId: string) => void;
	signinRedirect: () => Promise<void>;
	signoutSilent: () => Promise<void>;
	isLoading: boolean;
	user: User;
}

interface CustomDecodedToken {
	resource_access: {
		purrfectly_pawsh: {
			roles: string[];
		};
	};
}

interface User {
	authenticated: boolean;
	roles: string[];
	isAdmin: boolean;
	isUser: boolean;
	token: string;
}

const guest = {
	authenticated: false,
	roles: [],
	isAdmin: false,
	isUser: false,
	token: "",
};

export const SessionContext = createContext<SessionContextType>({
	basketId: "",
	basket: { totalPrice: 0, basketItems: [] },
	removeItemFrombasket: () => {},
	signinRedirect: async () => {},
	signoutSilent: async () => {},
	isLoading: false,
	user: guest,
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
	const auth = useAuth();
	const [user, setUser] = useState<User>(guest);

	useEffect(() => {
		if (auth.isAuthenticated && auth.user) {
			try {
				const decoded = jwtDecode<CustomDecodedToken>(auth.user.access_token);
				const user: User = {
					authenticated: true,
					roles: decoded.resource_access.purrfectly_pawsh.roles,
					isAdmin:
						decoded.resource_access.purrfectly_pawsh.roles.includes("ADMIN"),
					isUser:
						decoded.resource_access.purrfectly_pawsh.roles.includes("USER"),
					token: auth.user.access_token,
				};
				setUser(user);
			} catch (error) {
				setUser(guest);
				console.error("Couldn't decode access token");
			}
		} else {
			setUser(guest);
		}
	}, [auth]);

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
		<SessionContext.Provider
			value={{
				...auth,
				basketId,
				basket,
				removeItemFrombasket,
				user,
			}}
		>
			{children}
		</SessionContext.Provider>
	);
};
