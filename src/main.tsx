import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ProductsPage, { productsPageLoader } from "./routes/ProductsPage";
import RootPage from "./routes/RootPage";
import ProductDetails, {
	productDetailsPageLoader,
} from "./routes/ProductDetails";
import BasketPage, { basketPageLoader } from "./routes/BasketPage";

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
				element: <ProductDetails />,
				loader: productDetailsPageLoader,
			},
			{
				path: "basket/:id",
				element: <BasketPage />,
				loader: basketPageLoader,
			},
		],
	},
]);

const root: HTMLElement | null = document.getElementById("root");
if (root !== null) {
	ReactDOM.createRoot(root).render(
		<React.StrictMode>
			<RouterProvider router={router} />
		</React.StrictMode>,
	);
} else {
	console.error("FATAL ERROR: Couldn't load page!");
}
