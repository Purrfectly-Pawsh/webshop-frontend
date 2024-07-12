import {
	createContext,
	useContext,
	useState,
	ReactNode,
	useCallback,
} from "react";
import { v4 as uuidv4 } from "uuid";

export interface Toast {
	id: string;
	message: string;
	type: "success" | "error" | "info";
}

interface ToastContextType {
	toasts: Toast[];
	addToast: (message: string, type: "success" | "error" | "info") => void;
	removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

const ToastProvider = ({ children }: { children: ReactNode }) => {
	const [toasts, setToasts] = useState<Toast[]>([]);

	const addToast = useCallback(
		(message: string, type: "success" | "error" | "info") => {
			const id = uuidv4();
			setToasts((prevToasts) => [...prevToasts, { id, message, type }]);
			setTimeout(() => {
				setToasts((prevToasts) =>
					prevToasts.filter((toast) => toast.id !== id),
				);
			}, 2000);
		},
		[],
	);

	const removeToast = useCallback((id: string) => {
		setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
	}, []);

	return (
		<ToastContext.Provider value={{ toasts, addToast, removeToast }}>
			{children}
		</ToastContext.Provider>
	);
};

const useToast = (): ToastContextType => {
	const context = useContext(ToastContext);
	if (context === undefined) {
		throw new Error("useToast must be used within a ToastProvider");
	}
	return context;
};

export { ToastProvider, useToast };
