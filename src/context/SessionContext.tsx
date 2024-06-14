import { jwtDecode } from "jwt-decode";
import { type ReactNode, createContext, useState, useEffect } from "react";
import { useAuth } from "react-oidc-context";
import { v4 as uuidv4 } from "uuid";

interface SessionContextType {
	getBasketId: () => string;
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
}

const guest = {
	authenticated: false,
	roles: [],
	isAdmin: false,
	isUser: false,
}

export const SessionContext = createContext<SessionContextType>({
	getBasketId: () => "",
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
	const auth = useAuth();
	const [user, setUser] = useState<User>(guest);
	
	useEffect(() => {
		if (auth.isAuthenticated && auth.user) {
			try {
				const decoded = jwtDecode<CustomDecodedToken>(auth.user.access_token);
			const user: User = {
				authenticated: true,
				roles: decoded.resource_access.purrfectly_pawsh.roles,
				isAdmin: decoded.resource_access.purrfectly_pawsh.roles.includes("ADMIN"),
				isUser: decoded.resource_access.purrfectly_pawsh.roles.includes("ADMIN"),
			}
			setUser(user);
			} catch (error) {
				setUser(guest);
				console.error("Couldn't decode access token")
			}
		}
	}, [auth]);

	useEffect(() => {
		if (!basketId) {
			const newBasketId = uuidv4();
			localStorage.setItem("basketId", newBasketId);
			setBasketId(newBasketId);
		}
	}, [basketId]);

	const getBasketId = (): string => {
		return basketId;
	};

	return (
		<SessionContext.Provider value={{
			...auth,
			getBasketId,
			user
		}}>
			{children}
		</SessionContext.Provider>
	);
};
