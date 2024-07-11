import { useNavigate } from "react-router-dom";

const SuccessfulPaymentPage = () => {
	const navigate = useNavigate();

	return (
		<div className="flex flex-col items-center justify-center min-h-screen">
			<div className="bg-secondary rounded-2xl border-4 border-gray-400 w-4/5 md:w-1/2 mx-auto p-16 text-center">
				<h1 className="text-4xl font-bold mb-4">
					Your payment was successful!
				</h1>
				<img
					src="/payment-successful.gif"
					alt="Payment Success"
					className="w-56 h-56 mx-auto mb-4"
				/>
				<p className="text-xl mb-8">
					Thank you for choosing our shop for your purchase. Your order has been
					placed successfully.
				</p>
				<button
					type="button"
					className="btn btn-lg bg-btnBlue"
					onClick={() => navigate("/orders")}
				>
					Go to Orders
				</button>
			</div>
		</div>
	);
};

export default SuccessfulPaymentPage;
