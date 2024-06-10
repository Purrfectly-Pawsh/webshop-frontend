import { ReactNode, createContext, useContext, useState } from "react";

type UserRole = "CUSTOMER" | "ADMIN" | "GUEST";

interface AuthContextType {
	role: UserRole;
	setRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthContextProviderProps {
	children: ReactNode;
}

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
	const [role, setRole] = useState<UserRole>("GUEST");

	return (
		<AuthContext.Provider value={{ role, setRole }}>
			{children}
		</AuthContext.Provider>
	);
};

const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used with an AuthProvider");
	}
	return context;
};

export { AuthContextProvider, useAuth };
