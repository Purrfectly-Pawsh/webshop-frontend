import {
	type LoaderFunctionArgs,
	useLoaderData,
	useNavigate,
} from "react-router-dom";
import type { Product } from "../utils/types";
import { GETProductsByKeywordURL, GETProductsURL } from "../utils/urls";
import { useContext } from "react";
import { SessionContext } from "../context/SessionContext";
import { deleteProduct, postItemToBasket } from "../utils/api";
import { useToast } from "../context/ToastContext";

export const ProductsPageLoader = async ({ request }: LoaderFunctionArgs) => {
	const url: URL = new URL(request.url);
	const keyword: string = url.searchParams.get("keyword") || "";
	const fetchURL: string =
		keyword === "" ? GETProductsURL : GETProductsByKeywordURL + keyword;

	const response = fetch(fetchURL, {
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
	const { basketId, user } = useContext(SessionContext);
	const navigate = useNavigate();
	const { addToast } = useToast();

	async function handleDeleteSubmit(productId: string) {
		await deleteProduct(productId, user.token).then(() => {
			navigate("/");
		});
	}

	return (
		<div className="mx-16">
			{user.isAdmin && (
				<div className="w-full flex justify-end">
					<button
						type="button"
						className="btn bg-btnBlue mt-8 text-lg h-16"
						onClick={() => navigate("create")}
					>
						Create new product
					</button>
				</div>
			)}
			<div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-16 gap-x-24 mt-8 mb-8">
				{products.map((product) => (
					<div
						key={product.id}
						className={"card w-full bg-white shadow-xl rounded-2xl"}
					>
						<a
							href={`/product/${product.id}`}
							className="block hover:shadow-lg transition-shadow duration-300 rounded-b-2xl"
						>
							<figure className="h-60 overflow-hidden m-4">
								<img
									src={product.imageUrl}
									className="max-w-full max-h-full"
									alt={product.name}
								/>
							</figure>
						</a>
						<div className="card-body bg-primary rounded-b-2xl h-60">
							<h2 className="card-title">{product.name}</h2>
							<p>{product.producer}</p>
							<div className="card-actions justify-end">
								<div className="flex items-center justify-between w-full">
									<h2 className="font-bold text-xl">{product.price} €</h2>
									{user.isAdmin && (
										<div className="flex gap-2">
											<button
												type="button"
												className="btn bg-btnBlue"
												onClick={() => navigate(`/product/${product.id}/edit`)}
											>
												Edit
											</button>
											<button
												type="button"
												className="btn btn-error"
												onClick={() => {
													const productToDelete = document.getElementById(
														`delete_modal_${product.id}`,
													);
													if (productToDelete !== null) {
														(productToDelete as HTMLDialogElement).showModal();
													}
												}}
											>
												Delete
											</button>
											<dialog
												id={`delete_modal_${product.id}`}
												className="modal"
											>
												<div className="modal-box">
													<form method="dialog">
														<button
															type="submit"
															className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
														>
															✕
														</button>
													</form>
													<h3 className="font-bold text-lg">
														Do you really want to delete this product?
													</h3>
													<form
														method="dialog"
														onSubmit={() => {
															handleDeleteSubmit(product.id);
															addToast(
																`${product.name} has been deleted.`,
																"info",
															);
														}}
													>
														<div className="flex justify-end">
															<button
																type="submit"
																className="btn btn-error mt-4"
															>
																Delete
															</button>
														</div>
													</form>
												</div>
											</dialog>
										</div>
									)}
									{!user.isAdmin && (
										<button
											type="button"
											disabled={user.isAdmin}
											className="btn btn-primary bg-secondary"
											onClick={() => {
												postItemToBasket(basketId, product.id);
												addToast(
													`${product.name} has been added to your basket.`,
													"success",
												);
											}}
										>
											Buy
										</button>
									)}
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
