import { type FormEvent, useState, useContext, useTransition } from "react";
import {
	type LoaderFunctionArgs,
	useNavigate,
	useLoaderData,
} from "react-router-dom";
import { getProduct, putProduct } from "../utils/api";
import { SessionContext } from "../context/SessionContext";
import { Categories, type Product } from "../utils/types";
import { useToast } from "../context/ToastContext";

export const EditProductPageLoader = async ({ params }: LoaderFunctionArgs) => {
	if (params.id === undefined) {
		throw new Error("It looks like that route doesn't exist.");
	}
	const response = await getProduct(params.id);
	return response;
};

export default function EditProductPage() {
	const navigate = useNavigate();
	const product = useLoaderData() as Product;
	console.log(product);
	const { user } = useContext(SessionContext);
	const [name, setName] = useState<string>(product.name);
	const [description, setDescription] = useState<string>(product.description);
	const [price, setPrice] = useState<string>(`${product.price}`);
	const [imageUrl, setImageUrl] = useState<string>(product.imageUrl);
	const [category, setCategory] = useState<string>(product.category);
	const [producer, setProducer] = useState<string>(product.producer);

	const { addToast } = useToast();

	async function handleSubmit(event: FormEvent) {
		event.preventDefault();

		const payload = {
			id: product.id,
			name: name,
			description: description,
			price: Number.parseFloat(price),
			imageUrl: imageUrl,
			category: category,
			producer: producer,
		};

		const newBook = await putProduct(payload, user.token);
		if (newBook) {
			navigate(`/product/${newBook.id}`);
		} else {
			// An error was thrown.
		}
	}

	return (
		<div className="overflow-auto flex-grow">
			<div className="w-1/3 mx-auto my-8 bg-accent p-8 rounded-lg">
				<h1 className="text-2xl font-bold mb-4">Create new product</h1>
				<form onSubmit={handleSubmit} className="flex flex-col gap-4">
					<label className="text-xl flex flex-row justify-between items-center">
						Name
						<input
							required
							type="text"
							placeholder="Name"
							className="input input-bordered w-full max-w-xs"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</label>

					<label className="text-xl flex flex-row justify-between">
						Description
						<textarea
							required
							placeholder="Description"
							className="input input-bordered textarea w-full max-w-xs h-24 text-base"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</label>
					<label className="text-xl flex flex-row justify-between items-center">
						<div className="flex flex-col">
							<p>Price</p>
							<p className="text-gray-600 text-base">in Dollar ($)</p>
						</div>
						<input
							required
							type="text"
							placeholder="0.00"
							pattern="[0-9]+\.[0-9]{2}"
							className="input input-bordered w-full max-w-xs"
							value={price}
							onChange={(e) => setPrice(e.target.value)}
						/>
					</label>
					<label className="text-xl flex flex-row justify-between items-center">
						<div className="flex flex-col">
							<p>Image</p>
							<p className="text-gray-600 text-base">as URL</p>
						</div>
						<input
							required
							type="text"
							placeholder="Image Link"
							className="input input-bordered w-full max-w-xs"
							value={imageUrl}
							onChange={(e) => setImageUrl(e.target.value)}
						/>
					</label>
					<label className="text-xl flex flex-row justify-between items-center">
						Category
						<select
							className="select select-bordered w-full max-w-xs"
							onChange={(e) => setCategory(e.target.value)}
							defaultValue={Categories[0]}
						>
							{Categories.map((category) => (
								<option key={category} className="">
									{category}
								</option>
							))}
						</select>
					</label>
					<label className="text-xl flex flex-row justify-between items-center">
						Producer
						<input
							required
							type="text"
							placeholder="Producer"
							className="input input-bordered w-full max-w-xs"
							value={producer}
							onChange={(e) => setProducer(e.target.value)}
						/>
					</label>

					<div className="flex flex-row justify-end gap-4 mt-4">
						<button
							type="submit"
							className="btn bg-btnBlue"
							onClick={() =>
								addToast(
									`${product.name} has been updated successfully.`,
									"success",
								)
							}
						>
							Save
						</button>
						<button
							type="button"
							className="btn bg-btnRed"
							onClick={() => navigate("/products")}
						>
							Cancel
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
