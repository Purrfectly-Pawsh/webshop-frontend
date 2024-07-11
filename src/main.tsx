import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ProductsPage, { ProductsPageLoader } from "./routes/ProductsPage";
import RootPage from "./routes/RootPage";
import BasketPage from "./routes/BasketPage";
import { SessionContextProvider } from "./context/SessionContext";
import ProductDetailsPage, {
	ProductDetailsPageLoader,
} from "./routes/ProductDetailsPage";
import { type User, UserManager } from "oidc-client-ts";
import { keycloakClientID, keycloakServerURL } from "./utils/urls";
import { AuthProvider } from "react-oidc-context";
import CreateProductPage from "./routes/CreateProductPage";
import RequireAdmin from "./components/RequireAdmin";
import ErrorPage from "./routes/ErrorPage";
import OrdersPage from "./routes/OrdersPage";
import EditProductPage, { EditProductPageLoader } from "./routes/EditProductPage";

const router = createBrowserRouter([
	{
		path: "/",
		element: <RootPage />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "products/search?/",
				loader: ProductsPageLoader,
				element: <ProductsPage />,
				errorElement: <ErrorPage />,
			},
			{
				path: "products/create",
				element: (
					<RequireAdmin>
						<CreateProductPage />
					</RequireAdmin>
				),
				errorElement: <ErrorPage />,
			},
			{
				path: "product/:id/edit",
				loader: EditProductPageLoader,
				element: (
					<RequireAdmin>
						<EditProductPage />
					</RequireAdmin>
				),
				errorElement: <ErrorPage />,
			},
			{
				path: "product/:id",
				element: <ProductDetailsPage />,
				loader: ProductDetailsPageLoader,
				errorElement: <ErrorPage />,
			},
			{
				path: "basket",
				element: <BasketPage />,
				errorElement: <ErrorPage />,
			},
			{
				path: "orders",
				errorElement: <ErrorPage />,
				element: <OrdersPage />,
			},
			{
				path: "*",
				element: <ErrorPage />,
			},
		],
	},
]);

const onSigninCallback = (_user: User | void): void => {
	window.history.replaceState({}, document.title, window.location.pathname);
};

const oidcConfig = new UserManager({
	authority: keycloakServerURL,
	client_id: keycloakClientID,
	redirect_uri: `${window.location.origin}${window.location.pathname}`,
	post_logout_redirect_uri: window.location.origin,
});

const root: HTMLElement | null = document.getElementById("root");
if (root !== null) {
	ReactDOM.createRoot(root).render(
		<React.StrictMode>
			<AuthProvider
				userManager={oidcConfig}
				onSigninCallback={onSigninCallback}
			>
				<SessionContextProvider>
					<RouterProvider router={router} />
				</SessionContextProvider>
			</AuthProvider>
		</React.StrictMode>,
	);
} else {
	console.error("FATAL ERROR: Couldn't load page!");
}
