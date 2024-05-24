import { useLoaderData } from "react-router-dom";
import { Product } from "../utils/types";
import { GETProductsURL } from "../utils/urls";
import { useEffect, useState } from "react";

export const productsPageLoader = async () => {
	const response = fetch(GETProductsURL, {
		method: "GET",
		mode: "cors", // no-cors, *cors, same-origin
		headers: {
			"Content-Type": "application/json",
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
	})
		.then((response) => {
			if (response.ok) {
				return response.json() as Promise<Product[]>;
			}
			throw new Error("Network response was not ok!");
		})
		.then((data) => {
			return data;
		})
		.catch((error) => {
			console.error("Fetching [GET PRODUCTS] failed:\n", error);
			return [];
		});

	return response;
};

export default function ProductsPage() {
	const products = useLoaderData() as Product[];
	// This is only for styling purposes: we need to keep track of the index of the first element that is in the last row of products.
	// This is because from this index onwards (including the index), the last card elements must have a bottom margin.
	const [lastProductRowIndex, setIndex] = useState<number>(0);

	useEffect(() => {
		const length = products.length;
		const rest = length % 4;
		setIndex(rest === 0 ? length - 4 : length - rest);
	}, [products]);

	return (
		<div className="overflow-auto">
			<div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-0 gap-y-16">
				{products.map((product, index) => (
					<div
						className={`card w-96 mx-auto bg-white shadow-xl rounded-2xl ${
							index < 4 ? "mt-8" : ""
						} ${index >= lastProductRowIndex ? "mb-8" : ""}`}
					>
						<a
							href={`/product/${product.id}`}
							className="block hover:shadow-lg transition-shadow duration-300 rounded-b-2xl"
						>
							<figure className="h-60 overflow-hidden m-4">
								<img
									src={product.imageUrl}
									className="max-w-full max-h-full"
									alt="Shoes"
								/>
							</figure>
							<div className="card-body bg-primary rounded-b-2xl h-60">
								<h2 className="card-title">{product.name}</h2>
								<p>{product.producer}</p>
								<div className="card-actions justify-end">
									<div className="flex items-center justify-between w-full">
										<h2 className="font-bold text-xl">{product.price} $</h2>
										<button className="btn btn-primary bg-secondary">
											Buy
										</button>
									</div>
								</div>
							</div>
						</a>
					</div>
				))}
			</div>
		</div>
	);
}
