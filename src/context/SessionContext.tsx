import { jwtDecode } from "jwt-decode";
import { type ReactNode, createContext, useState, useEffect } from "react";
import { useAuth } from "react-oidc-context";
import { v4 as uuidv4 } from "uuid";
import type { Basket, BasketItem } from "../utils/types";
import { deleteItemFromBasket, fetchBasket, updateBasket } from "../utils/api";

interface SessionContextType {
	basketId: string;
	basket: Basket;
	removeItemFromBasket: (itemId: BasketItem, basketId: string) => void;
	signinRedirect: () => Promise<void>;
	signoutRedirect: () => Promise<void>;
	isLoading: boolean;
	user: User;
}

interface CustomDecodedToken {
	sub: string; // sub claim => userId
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
	removeItemFromBasket: () => {},
	signinRedirect: async () => {},
	signoutRedirect: async () => {},
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
				console.log("LOGGED IN    ", "SUB: ", decoded.sub);
				if (basket.basketItems.length !== 0) {
					updateBasket(basketId, decoded.sub, user.token).then((bask) =>
						setBasket(bask),
					);
				}
				setBasketId(decoded.sub);
			} catch (error) {
				setUser(guest);
				console.error("Couldn't decode access token");
			}
		} else {
			setUser(guest);
		}
		if (
			auth.activeNavigator === "signoutRedirect" ||
			auth.activeNavigator === "signoutSilent"
		) {
			const newBasketId = uuidv4();
			setBasketId(newBasketId);
		}
	}, [auth.isAuthenticated, auth.user, auth.activeNavigator]);

	useEffect(() => {
		localStorage.setItem("basketId", basketId);
	}, [basketId]);

	useEffect(() => {
		fetchBasket(basketId)
			.then((retrievedBasket: Basket) => setBasket(retrievedBasket))
			.catch((err: Error) => {
				console.log(err.message);
				throw err;
			});
	}, [basketId]);

	const removeItemFromBasket = async (itemId: BasketItem, basketId: string) => {
		const basketUpdated = await deleteItemFromBasket(basketId, itemId);
		setBasket(basketUpdated);
	};

	return (
		<SessionContext.Provider
			value={{
				...auth,
				basketId,
				basket,
				removeItemFromBasket,
				user,
			}}
		>
			{children}
		</SessionContext.Provider>
	);
};
