import { useContext, useEffect, useState } from "react";
import { SessionContext } from "../context/SessionContext";
import { getOrders } from "../utils/api";
import type { Order } from "../utils/types";

export default function OrdersPage() {
	const { basketId } = useContext(SessionContext);
    const [orders, setOrders] = useState<Order[]>([])

	useEffect(() => {
		getOrders(basketId).then(orders => setOrders(orders))
	}, [basketId]);

	return (
        <div>
            {orders.map(order => (
                <div key={order.id}>
                    <p>{order.id}</p>
                    <p>{order.email}</p>
                    <p>{order.address}</p>
                    <p>{order.totalCost}</p>
                </div>
            ))}
        </div>
    );
}
