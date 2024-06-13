import { type ReactNode, createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface SessionContextType {
	getBasketId: () => string;
}

export const SessionContext = createContext<SessionContextType>({
	getBasketId: () => "",
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
		<SessionContext.Provider value={{ getBasketId }}>
			{children}
		</SessionContext.Provider>
	);
};
