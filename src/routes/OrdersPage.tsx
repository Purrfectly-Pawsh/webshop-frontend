import { useContext, useEffect, useState } from "react";
import { SessionContext } from "../context/SessionContext";
import { getOrders } from "../utils/api";
import type { Order } from "../utils/types";
import OrderItem from "../components/OrderItem";

export default function OrdersPage() {
	const { basketId } = useContext(SessionContext);
	const [orders, setOrders] = useState<Order[]>([]);

	useEffect(() => {
		getOrders(basketId).then((orders) => {
			setOrders(orders)
		});
	}, [basketId]);

	return (
		<div className="w-2/3 mx-auto m-8 flex flex-col gap-8">
			<h1 className="text-3xl font-bold mb-8">Your Orders</h1>
			{orders.map((order) => (
				<div key={order.id} className="collapse collapse-arrow bg-primary">
					<input type="radio" name="my-accordion-2" />
					<div className="collapse-title text-2xl font-bold">
						Order of {order.totalCost} €
					</div>
					<div className="collapse-content flex flex-col gap-2">
						<div className="flex gap-8">
							<div className="ml-4 mb-4">
								<p className="text-xl">Address:</p>
								<div className="flex gap-4 p-2 border-gray-400 border-2 rounded-lg">
									<div>
										<p>Country:</p>
										<p>City:</p>
										<p>Line 1:</p>
										<p>Line 2:</p>
										<p>Postal Code:</p>
										<p>State:</p>
									</div>
									<div>
										<p>{order.address.country}</p>
										<p>{order.address.city}</p>
										<p>{order.address.line1}</p>
										<p>{order.address.line2 ? order.address.line2 : "---"}</p>
										<p>{order.address.postal_code}</p>
										<p>{order.address.state ? order.address.state : "---"}</p>
									</div>
								</div>
							</div>
							<div className="flex flex-col justify-between">
								<div>
									<p className="text-xl">Email:</p>
									<p className="p-2 border-gray-400 border-2 rounded-lg">
										{order.email}
									</p>
								</div>
								<div className="mb-4">
									<p className="text-xl">Total Price:</p>
									<p className="p-2 border-gray-400 border-2 rounded-lg">
										{order.totalCost} €
									</p>
								</div>
							</div>
						</div>

						{order.products.map((product) => (
							<OrderItem key={product.productId} product={product} />
						))}
					</div>
				</div>
			))}
		</div>
	);
}
