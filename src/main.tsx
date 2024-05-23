import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ProductsPage, { productsPageLoader } from "./routes/ProductsPage";
import RootPage from "./routes/RootPage";
import ProductDetails, {
	productDetailsPageLoader,
} from "./routes/ProductDetails";

const router = createBrowserRouter([
	{
		path: "/",
		element: <RootPage />,
		children: [
			{
				path: "products",
				loader: productsPageLoader,
				element: <ProductsPage />,
			},
			{
				path: "product/:id",
				element: <ProductDetails />,
				loader: productDetailsPageLoader,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
);
