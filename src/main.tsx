import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ProductsPage, { productsPageLoader } from "./routes/ProductsPage";
import RootPage from "./routes/RootPage";
import ProductDetailsPage, { productDetailsPageLoader } from "./routes/ProductDetailsPage";

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
		],
	},
]);

const root: HTMLElement | null = document.getElementById("root")
if(root !== null) {
	ReactDOM.createRoot(root).render(
		<React.StrictMode>
			<RouterProvider router={router} />
		</React.StrictMode>,
	);
} else {
	console.error("FATAL ERROR: Couldn't load page!")
}

