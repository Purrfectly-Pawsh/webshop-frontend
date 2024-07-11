import {
	type LoaderFunctionArgs,
	useLoaderData,
	useNavigate,
} from "react-router-dom";
import type { Review as ReviewType, Product } from "../utils/types";
import { GETProductURL, GETReviewsForProductURL } from "../utils/urls";
import { useContext, useEffect, useState } from "react";
import Review from "../components/Review";
import { deleteProduct, postItemToBasket } from "../utils/api";
import { SessionContext } from "../context/SessionContext";

export const ProductDetailsPageLoader = async ({
	params,
}: LoaderFunctionArgs) => {
	if (params.id === undefined) {
		throw new Error("");
	}
	const response = fetch(GETProductURL(params.id), {
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

export default function ProductDetailsPage() {
	const product = useLoaderData() as Product;
	const [reviews, setReviews] = useState<ReviewType[]>([]);
	const { basketId, user } = useContext(SessionContext);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchReviews = async () =>
			fetch(GETReviewsForProductURL(product.id), {
				method: "GET",
				mode: "cors", // no-cors
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then((response) => {
					if (response.ok) {
						return response.json() as Promise<ReviewType[]>;
					}
					throw new Error("Network response was not ok!");
				})
				.then((data) => {
					setReviews(data);
				})
				.catch((error) => {
					console.error(
						`Fetching [GET REVIEWS OF PRODUCT ${product.id}] failed:\n`,
						error,
					);
					setReviews([]);
				});
		fetchReviews();
	}, [product]);

	async function handleDeleteSubmit() {
		await deleteProduct(product.id, user.token).then(() => {
			navigate("/");
		});
	}

	return (
		<div className="bg-primary rounded-2xl border-4 border-gray-400 w-4/5 mx-auto m-8">
			<div className="m-8">
				<div className="bg-secondary rounded-2xl border-2 border-gray-400 mb-8">
					<h1 className="text-4xl font-bold m-4">{product.name}</h1>
				</div>
				<div className="flex bg-primary w-full gap-8">
					<div className="flex flex-col w-2/3 gap-y-8">
						<div className="w-full rounded-2xl bg-secondary flex items-center justify-center border-2 border-gray-400">
							<img
								alt={product.name}
								src={product.imageUrl}
								className="rounded-2xl py-10 px-5 max-h-full object-contain"
							/>
						</div>
						<div className="bg-secondary rounded-2xl border-2 border-gray-400">
							<h1 className="text-4xl m-4 font-bold">Reviews</h1>
							{reviews.map((review) => (
								<Review key={review.id} review={review} />
							))}
						</div>
					</div>
					<div className="w-1/3 flex-col bg-secondary rounded-2xl flex items-center border-2 border-gray-400">
						<div className="p-4 space-y-6">
							<p className="text-2xl font-bold ">{product.price} €</p>
							<h2 className="text-2xl font-medium">{product.producer}</h2>
							<p>{product.description}</p>
						</div>
						<div className="flex flex-col my-10 space-y-4">
							{!user.isAdmin && (
								<div>
									<button
										type="button"
										disabled={user.isAdmin}
										className="btn bg-btnBlue"
										onClick={() => postItemToBasket(basketId, product.id)}
									>
										<img alt="Basket" src="/basket.svg" className="w-10 h-10" />
										Add to basket
									</button>
									<button
										type="button"
										className="btn bg-btnBlue"
										disabled={user.isAdmin}
									>
										<img
											alt="Heart"
											src="/heart-svgrepo-com.svg"
											className="w-10 h-10"
										/>
										Remember
									</button>
								</div>
							)}
							{user.isAdmin && (
								<div className="flex gap-2">
									<button
										type="button"
										className="btn bg-btnBlue"
										onClick={() => navigate("edit")}
									>
										Edit
									</button>
									<button
										type="button"
										className="btn btn-error"
										onClick={() =>
											document
												.getElementById(`delete_modal_${product.id}`)
												.showModal()
										}
									>
										Delete
									</button>
									<dialog id={`delete_modal_${product.id}`} className="modal">
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
												onSubmit={() => handleDeleteSubmit()}
											>
												<div className="flex justify-end">
													<button type="submit" className="btn btn-error mt-4">
														Delete
													</button>
												</div>
											</form>
										</div>
									</dialog>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
