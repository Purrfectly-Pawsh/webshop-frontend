import { type ReactNode, useContext } from "react";
import { SessionContext } from "../context/SessionContext";
import { Navigate, useLocation } from "react-router-dom";

interface RequireAdminProps {
	children: ReactNode
}

export default function RequireAdmin({ children }: RequireAdminProps) {
	const { user } = useContext(SessionContext);
	const location = useLocation();

	return user.isAdmin === true ? (
		children
	) : (
		<Navigate to="/" replace state={{ path: location.pathname }} />
	);
}
