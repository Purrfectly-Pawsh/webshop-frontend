import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ProductsPage, { productsPageLoader } from "./routes/ProductsPage";
import RootPage from "./routes/RootPage";
import BasketPage from "./routes/BasketPage";
import { SessionContextProvider } from "./context/SessionContext";
import ProductDetailsPage, {
	productDetailsPageLoader,
} from "./routes/ProductDetailsPage";
import { type User, UserManager } from "oidc-client-ts";
import { keycloakClientID, keycloakServerURL } from "./utils/urls";
import { AuthProvider } from "react-oidc-context";

const router = createBrowserRouter([
	{
		path: "/",
		element: <RootPage />,
		children: [
			{
				path: "products/search?/",
				loader: productsPageLoader,
				element: <ProductsPage />,
			},
			{
				path: "product/:id",
				element: <ProductDetailsPage />,
				loader: productDetailsPageLoader,
			},
			{
				path: "basket",
				element: <BasketPage />,
			},
			{
				path: "/payment/success",
				element: (
					<div>
						<h1>Successful Payment</h1>
					</div>
				),
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
