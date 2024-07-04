import { useContext } from "react";
import type { BasketItem } from "../utils/types";
import { SessionContext } from "../context/SessionContext";
import noImage from "../../public/no-image.svg";

export default function BasketPage() {
	const { basketId, basket, removeItemFrombasket, user } =
		useContext(SessionContext);

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

								<select
									className="select rounded-2xl border-black"
									disabled={user.isAdmin}
								>
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
									<button
										type="button"
										disabled={user.isAdmin}
										className="btn bg-btnRed text-xl"
										onClick={() => removeItemFrombasket(basketItem, basketId)}
									>
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
					<div className="flex-grow border-t-2 rounded-2xl border-black mt-28" />
					<div className="flex justify-between text-2xl font-bold my-4">
						<span>Total:</span>
						<span>$ {basket.totalPrice.toFixed(2)}</span>
					</div>
					<div className="flex justify-center py-10">
						<button
							type="button"
							className="btn bg-btnBlue text-2xl px-4"
							disabled={user.isAdmin}
						>
							Checkout
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
