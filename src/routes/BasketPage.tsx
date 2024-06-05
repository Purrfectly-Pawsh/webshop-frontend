import { useContext, useEffect, useState } from "react";
import { BasketItem } from "../utils/types";
import { SessionContext } from "../context/SessionContext";

export default function BasketPage() {
	const { getBasketId } = useContext(SessionContext);
	const [basketItems, setBasketItems] = useState<BasketItem[]>([]);

	const basket = {
		basketItems: [
			{
				itemId: "12345",
				price: 10.99,
				quantity: 2,
				name: "Apple",
				image: "https://example.com/images/apple.jpg",
			},
			{
				itemId: "67890",
				price: 5.49,
				quantity: 1,
				name: "Banana",
				image: "https://example.com/images/banana.jpg",
			},
			{
				itemId: "54321",
				price: 15.0,
				quantity: 3,
				name: "Cherry",
				image: "https://example.com/images/cherry.jpg",
			},
		],
		totalPrice: 67.96,
	};
	return (
		<div className="bg-primary rounded-2xl m-40 border-4 border-gray-400 p-10">
			<div className="flex flex-wrap md:flex-nowrap bg-primary w-full pb-4 items-start md:space-x-8">
				<div className="flex-grow bg-primary w-full md:w-2/3 space-y-6">
					{basket.basketItems.map((basketItem: BasketItem) => (
						<div
							key={basketItem.itemId}
							className="bg-secondary rounded-2xl border-4 border-gray-400 p-4 flex justify-between items-center"
						>
							<img
								src={basketItem.image}
								alt={basketItem.name}
								className="w-1/4 h-40 border-4 rounded-2xl mx-4"
							/>
							<div className="flex-grow  mx-4 space-y-4">
								<h2 className="text-lg font-bold">{basketItem.name}</h2>
								<p className="text-sm">Amount: {basketItem.quantity}</p>

								<select className="select rounded-2xl border-black">
									{[...Array(10).keys()].map((num) => (
										<option key={num} value={num + 1}>
											{num + 1}
										</option>
									))}
								</select>
							</div>
							<div>
								<div className="px-4 space-y-6 flex flex-col items-center">
									<h1 className="text-2xl font-semibold">
										$ {basketItem.price}
									</h1>
									<button className="btn bg-btnRed text-xl">Remove</button>
								</div>
							</div>
						</div>
					))}
				</div>
				<div className="bg-secondary rounded-2xl border-4 border-gray-400 p-4 w-full md:w-1/3">
					<h1 className="text-4xl font-bold m-4 text-center">Basket</h1>
					<div className="flex font-medium text-xl justify-between my-4">
						<span>Items:</span>
						<span>$ {basket.totalPrice.toFixed(2)}</span>
					</div>
					<div className="flex font-medium text-xl justify-between my-2">
						<span>Shipping:</span>
						<span>$ 4.99</span>
					</div>
					<div className="flex-grow border-t-2 rounded-2xl border-black mt-28"></div>
					<div className="flex justify-between text-2xl font-bold my-4">
						<span>Total:</span>
						<span>$ {(basket.totalPrice - 10.0 + 4.99).toFixed(2)}</span>
					</div>
					<div className="flex justify-center py-10">
						<button className="btn bg-btnBlue text-2xl px-4">Checkout</button>
					</div>
				</div>
			</div>
		</div>
	);
}
