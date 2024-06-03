import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";
import { v4 as uuidv4 } from "uuid";

interface SessionContextType {
	basketId: string;
}

interface SessionProviderProps {
	children: ReactNode;
}

const SessionContext = createContext<SessionContextType>({
	basketId: "",
});

export const SessionProvider = ({ children }: SessionProviderProps) => {
	const [basketId, setBasketId] = useState<string>(() => {
		const storedBasketId = localStorage.getItem("basketId");
		return storedBasketId || uuidv4();
	});

	useEffect(() => {
		localStorage.setItem("basketId", basketId);
	}, [basketId]);

	return (
		<SessionContext.Provider value={{ basketId }}>
			{children}
		</SessionContext.Provider>
	);
};

export const useSession = (): SessionContextType => {
	const context = useContext(SessionContext);
	if (!context) {
		throw new Error("useSession hook has to be used in a SessionProvider");
	}
	return context;
};
