import { useLoaderData } from "react-router-dom";
import { Product } from "../utils/types";
import { GETProductURL } from "../utils/urls";

export const productDetailsPageLoader = async ({
	params,
}: { params: { id: string } }) => {
	const response = fetch(GETProductURL + params.id, {
		method: "GET",
		mode: "cors", // no-cors, *cors, same-origin
		headers: {
			"Content-Type": "application/json",
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
	})
		.then((response) => {
			if (response.ok) {
				return response.json() as Promise<Product>;
			}
			throw new Error("Network response was not ok!");
		})
		.then((data) => {
			return data;
		})
		.catch((error) => {
			console.error(`Fetching [GET PRODUCT ${params.id}] failed:\n`, error);
			return {};
		});

	return response;
};

export default function ProductsPage() {
	const product = useLoaderData() as Product;

	return (
		<div className="bg-primary rounded-2xl m-20 border-4 border-gray-400 p-4">
			<div className="m-4 bg-secondary rounded-2xl border-2 border-gray-400">
				<h1 className="text-6xl font-bold m-4">{product.name}</h1>
			</div>
			<div className="flex flex-wrap md:flex-nowrap bg-primary w-full pb-4 ">
				<div
					className="md:w-2/3 mx-6 rounded-2xl
          bg-secondary flex items-center justify-center border-2 border-gray-400 max-h-[700px]"
				>
					<img
						src={product.imageUrl}
						className="rounded-2xl py-10 px-5 max-h-full object-contain"
					/>
				</div>
				<div className="md:w-1/3 flex-col bg-secondary mx-6 rounded-2xl flex items-center border-2 border-gray-400 h-max">
					<div className="p-4 space-y-6">
						<p className="text-2xl font-bold ">${product.price}</p>
						<h2 className="text-2xl font-medium">{product.producer}</h2>
						<p>{product.description}</p>
					</div>
					<div className="flex flex-col my-10 space-y-4">
						<button className="btn bg-btn">
							<img src="/basket.svg" className="w-10 h-10" />
							Add to basket
						</button>
						<button className="btn bg-btn">
							<img src="/heart-svgrepo-com.svg" className="w-10 h-10" />
							Remember
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
