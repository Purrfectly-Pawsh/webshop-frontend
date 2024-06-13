import { useContext, useEffect, useState } from "react";
import type { Basket, BasketItem } from "../utils/types";
import { SessionContext } from "../context/SessionContext";
import { GETBasketURL } from "../utils/urls";
import noImage from "../../public/no-image.svg";

export default function BasketPage() {
	const { getBasketId } = useContext(SessionContext);
	const [basket, setBasket] = useState<Basket>({
		basketItems: [],
		totalPrice: 0,
	});

	const basketId = getBasketId();

	useEffect(() => {
		const fetchBasket = async () => {
			await fetch(GETBasketURL(basketId), {
				method: "GET",
				mode: "cors",
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then((res) => {
					if (!res.ok) {
						setBasket({ basketItems: [], totalPrice: 0 });
						throw new Error("Network response was not ok!");
					}
					return res.json() as Promise<Basket>;
				})
				.then((data) => {
					setBasket(data);
				})
				.catch((err) => {
					console.error(
						`Fetching [GET BASKET WITH BASKET_ID ${basketId}] failed:\n`,
						err,
					);
				});
		};
		fetchBasket();
		// for local testing only
		console.log(basketId);
	}, [basketId]);

	return (
		<div className="bg-primary rounded-2xl m-40 border-4 border-gray-400 p-10">
			<div className="flex flex-wrap md:flex-nowrap bg-primary w-full pb-4 items-start md:space-x-8">
				<div className="flex-grow bg-primary w-full md:w-2/3 space-y-6">
					{basket.basketItems.map((basketItem: BasketItem) => (
						<div
							key={basketItem.basketItemId}
							className="bg-secondary rounded-2xl border-4 border-gray-400 p-4 flex justify-between items-center"
						>
							<a href={`/product/${basketItem.basketItemId}`}>
								<img
									src={
										basketItem.imageUrl === "" ? noImage : basketItem.imageUrl
									}
									alt={"No basket item preview"}
									className="max-w-1/4 h-40 border-4 rounded-2xl mx-4"
								/>
							</a>
							<div className="flex-grow  mx-4 space-y-4">
								<h2 className="text-lg font-bold">{basketItem.name}</h2>
								<h2 className="text-lg font-semibold">
									Amount: {basketItem.quantity}
								</h2>

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
										$ {basketItem.unitPrice}
									</h1>
									<button type="button" className="btn bg-btnRed text-xl">
										Remove
									</button>
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
					<div className="flex-grow border-t-2 rounded-2xl border-black mt-28" />
					<div className="flex justify-between text-2xl font-bold my-4">
						<span>Total:</span>
						<span>$ {basket.totalPrice.toFixed(2)}</span>
					</div>
					<div className="flex justify-center py-10">
						<button type="button" className="btn bg-btnBlue text-2xl px-4">
							Checkout
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
