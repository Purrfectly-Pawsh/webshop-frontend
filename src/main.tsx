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
		],
	},
]);

const root: HTMLElement | null = document.getElementById("root");
if (root !== null) {
	ReactDOM.createRoot(root).render(
		<React.StrictMode>
			<SessionContextProvider>
				<RouterProvider router={router} />
			</SessionContextProvider>
		</React.StrictMode>,
	);
} else {
	console.error("FATAL ERROR: Couldn't load page!");
}
