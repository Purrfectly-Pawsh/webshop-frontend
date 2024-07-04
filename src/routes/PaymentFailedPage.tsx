const PaymentFailedPage = () => {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen">
			<div className="bg-secondary rounded-2xl border-4 border-gray-400 w-4/5 md:w-1/2 mx-auto p-16 text-center">
				<h1 className="text-4xl font-bold mb-4">
					Unfortunately the payment process has failed.
				</h1>
				<img
					src="/payment_failed.gif"
					alt="Payment failed"
					className="w-56 h-56 mx-auto mb-4 p-8"
				/>
				<p className="text-xl mb-8">Please try again.</p>
				<a href="/basket">
					<button type="button" className="btn btn-lg bg-btnBlue">
						Go to Basket
					</button>
				</a>
			</div>
		</div>
	);
};

export default PaymentFailedPage;
