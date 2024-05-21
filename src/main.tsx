import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import RootPage, { loader } from './routes/RootPage';
import ProductsPage from './routes/ProductsPage';

const router = createBrowserRouter([
	{
		path: "/",
		element: <RootPage />,
		//loader: loader,
		children: [
			{
				path: "products",
				element: <ProductsPage />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
)
