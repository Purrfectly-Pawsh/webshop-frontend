import { useLoaderData } from "react-router-dom";
import { Product } from "../utils/types";

export const productDetailsPageLoader = async () => {
	return {
		id: "123",
		name: "Random",
		description: "Very Random",
		price: 123.99,
		imageUrl:
			"https://cdn.pixabay.com/photo/2016/07/07/16/46/dice-1502706_640.jpg",
		category: "Random",
		producer: "Some producer",
	};
};

export default function ProductsPage() {
	const productDetails = useLoaderData() as Product;

	return (
		<div className="bg-primary rounded-2xl m-20 border-4 border-gray-400">
			<div className="m-4 bg-secondary rounded-2xl border-2 border-gray-400">
				<h1 className="text-6xl font-bold m-4">{productDetails.name}</h1>
			</div>
			<div className="flex flex-wrap md:flex-nowrap bg-primary w-full mb-4 ">
				<div
					className="md:w-2/3 mx-6 rounded-2xl
          bg-secondary w-full h-full flex items-center justify-center border-2 border-gray-400"
				>
					<img
						src={productDetails.imageUrl}
						className="rounded-2xl m-4 max-w-full max-h-full"
					/>
				</div>
				<div className="md:w-1/3 flex-col bg-secondary mx-6 rounded-lg flex justify-center items-center border-2 border-gray-400">
					<div className="mx-4">
						<p className="text-2xl m-4 font-bold">${productDetails.price}</p>
						<p>
							Lorem ipsum dolor sit amet, officia excepteur ex fugiat
							reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit
							ex esse exercitation amet. Nisi anim cupidatat excepteur officia.
							Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet
							voluptate voluptate dolor minim nulla est proident. Nostrud
							officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex
							occaecat reprehenderit commodo officia dolor Lorem duis laboris
							cupidatat officia voluptate. Culpa proident adipisicing id nulla
							nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua
							reprehenderit commodo ex non excepteur duis sunt velit enim.
							Voluptate laboris sint cupidatat ullamco ut ea consectetur et est
							culpa et culpa duis.
						</p>
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
