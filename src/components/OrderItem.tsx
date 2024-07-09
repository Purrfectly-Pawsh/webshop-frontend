import { type FormEvent, useContext, useState } from "react";
import { postReview } from "../utils/api";
import type { OrderProduct, Review } from "../utils/types";
import { SessionContext } from "../context/SessionContext";

interface OrderItemProps {
	product: OrderProduct;
}

export default function OrderItem({ product }: OrderItemProps) {
	const { user } = useContext(SessionContext);
	const [title, setTitle] = useState<string>("");
	const [content, setContent] = useState<string>("");
	const [rating, setRating] = useState<number>(5);

	async function handleSubmit() {
		const review: Omit<Review, "id"> = {
			author: user.name,
			content: content,
			rating: rating,
			title: title,
			date: "",
		};

		postReview(product.id, review, user.token);
		
		setTitle("");
		setContent("");
		setRating(5);
	}

	return (
		<div key={product.id} className="card card-side bg-secondary h-32">
			<figure>
				<img
					className="w-24 h-24 m-4 ml-8 object-contain bg-white"
					src={product.imageUrl}
					alt={product.description}
				/>
			</figure>
			<div className="card-body flex flex-row items-center justify-between">
				<div className="flex flex-col">
					<h2 className="text-xl">{product.description}</h2>
					<p>Price: {product.price} €</p>
					<p>Quantity: {product.quantity}</p>
				</div>
				<button
					type="button"
					className="btn btn-primary"
					onClick={() =>
						document.getElementById(`review_modal_${product.id}`).showModal()
					}
				>
					Add Review
				</button>
				<dialog id={`review_modal_${product.id}`} className="modal">
					<div className="modal-box">
						<form method="dialog">
							{/* if there is a button in form, it will close the modal */}
							<button
								onClick={() => {
									setRating(5);
									setTitle("");
									setContent("");
								}}
								type="submit"
								className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
							>
								✕
							</button>
						</form>
						<h3 className="font-bold text-lg mb-4">Add your review!</h3>
						<form method="dialog" onSubmit={handleSubmit}>
							<div className="flex flex-col gap-4">
								<div className="flex flex-row justify-between items-center">
									<p>Rating:</p>
									<div className="rating">
										<input
											type="radio"
											name="rating-1"
											className="mask mask-star"
											value={1}
											onChange={(e) =>
												setRating(Number.parseInt(e.target.value))
											}
										/>
										<input
											type="radio"
											name="rating-1"
											className="mask mask-star"
											value={2}
											onChange={(e) =>
												setRating(Number.parseInt(e.target.value))
											}
										/>
										<input
											type="radio"
											name="rating-1"
											className="mask mask-star"
											value={3}
											onChange={(e) =>
												setRating(Number.parseInt(e.target.value))
											}
										/>
										<input
											type="radio"
											name="rating-1"
											className="mask mask-star"
											value={4}
											onChange={(e) =>
												setRating(Number.parseInt(e.target.value))
											}
										/>
										<input
											type="radio"
											name="rating-1"
											className="mask mask-star"
											value={5}
											onChange={(e) =>
												setRating(Number.parseInt(e.target.value))
											}
											checked={rating === 5}
										/>
									</div>
								</div>
								<div className="flex flex-row justify-between items-center">
									<p>Title:</p>
									<input
										type="text"
										required
										value={title}
										placeholder="Title"
										className="input input-bordered w-full max-w-xs"
										onChange={(e) => setTitle(e.target.value)}
									/>
								</div>
								<div className="flex flex-row justify-between">
									<p>Review:</p>
									<textarea
										placeholder="Type here"
										required
										value={content}
										className="input input-bordered w-full max-w-xs text-md"
										onChange={(e) => setContent(e.target.value)}
									/>
								</div>
							</div>
							<div className="flex justify-end">
							<button
								type="submit"
								className="btn bg-btnBlue mt-4"
								onSubmit={() => handleSubmit()}
							>
								Submit
							</button>
							</div>
							
						</form>
					</div>
				</dialog>
			</div>
		</div>
	);
}
